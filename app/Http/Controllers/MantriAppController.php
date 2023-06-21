<?php

namespace App\Http\Controllers;

use App\Helpers\AppHelper;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\Loan;
use App\Models\LoanRequest;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MantriAppController extends Controller
{
    public function index()
    {
        return Inertia::render('MantriApp/Index');
    }

    public function requestDrop()
    {
        $data_customer = Customer::where("nik", request()->nik)->first();

        $emp = Employee::where('jabatan', 'mantri')->filterData()->orderBy('area', 'asc')->get();

        $request = LoanRequest::whereHas('customer', function ($q) {
            $q->where('nik', request()->nik);
        })->with('customer', 'branch')->where('status', 'open')->get();

        $pinjaman = Loan::whereHas('customer', function ($q) {
            $q->where('nik', request()->nik);
        })->with('customer', 'branch')->orderBy('branch_id', 'asc')->orderBy('tanggal_drop', 'desc')->get();
        return Inertia::render('MantriApp/RequestDrop', [
            'customer' => $data_customer ?? null,
            'keyword' => request()->nik ?? null,
            'employees' => $emp,
            'request' => $request ?? null,
            'pinjaman' => $pinjaman ?? null,
        ]);
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $mantri = Employee::find($request->mantri);
            $customer = Customer::firstOrCreate(["nik" => $request->nik], [
                "nama" => $request->nama,
                "no_kk" => $request->no_kk,
                "alamat" => $request->alamat,
                "unit_id" => $request->unit_id,
                "mantri" => $request->mantri,
                "area" => $mantri->area,
            ]);
            $req = $customer->loan_request()->create([

                "branch_id" => $request->unit_id,
                "mantri" => $request->mantri,
                "kelompok" => $mantri->area,
                "hari" => AppHelper::dateName($request->tanggal_drop),
                "pinjaman" => $request->pinjaman,
                'pinjaman_ke' => LoanRequest::where('customer_id', $customer->id)->count('id') + 1,
                "tanggal_drop" => $request->tanggal_drop,
                "approved_date" => $request->type_drop ? $request->input('tanggal_drop') : null,
                "approved_by" => $request->type_drop ? $request->mantri : null,
                'status' => $request->type_drop ? 'acc' : 'open',

            ]);
            if (request()->input('type_drop', false)) {
                $req->loan()->create([
                    "customer_id" => $customer->id,
                    "branch_id" => $request->unit_id,
                    "mantri" => $request->mantri,
                    "kelompok" => $mantri->area,
                    "hari" => AppHelper::dateName($request->tanggal_drop),
                    "drop" => $request->pinjaman,
                    "pinjaman" => $request->pinjaman + ($request->pinjaman * 0.3),
                    'pinjaman_ke' => Loan::where('customer_id', $customer->id)->count('id') + 1,
                    "saldo" => $request->pinjaman + ($request->pinjaman * 0.3),
                    "tanggal_drop" => $request->tanggal_drop,
                    'lunas' => 'belum lunas',
                    "status" => "normal",

                ]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('mantriapps.drop.calonDrop')->withErrors('input gagal silahkan refresh page terlebih dahulu');
        }


        return redirect()->route('mantriapps.drop.calonDrop')->with('message', 'Data berhasil ditambahkan');
    }

    public function newCustomerDropStore(Request $request)
    {
        $request->validate([
            'nik' => ["required", 'unique:customers'],
            'no_kk' => ["required"],
            'nama' => ["required"],
            'alamat' => ["required"],
            'tanggal_drop' => ["required", 'date'],
            'pinjaman' => ['required', 'min:1', 'integer'],
        ], [
            '*.required' => ['Kolom ini wajib diisi'],
            '*.unique' => ['NIK SUDAH TERDAFTAR'],
            '*.date' => ['Masukkan tanggal dengan benar'],
            '*.min' => ['minimal pinjaman Rp. 1'],
        ]);


        $customer_input = [
            "nama" => $request->nama,
            "nik" => $request->nik,
            "no_kk" => $request->no_kk,
            "alamat" => $request->alamat,
            "unit_id" => auth()->user()->employee->branch_id,
            "mantri" => auth()->user()->employee->id,
            "area" => auth()->user()->employee->area,
        ];
        $load_input = [

            'branch_id' => auth()->user()->employee->branch_id,
            'mantri' => auth()->user()->employee->id,
            'kelompok' => auth()->user()->employee->area,
            'hari' =>  AppHelper::dateName($request->tanggal_drop),
            'pinjaman' => $request->pinjaman,
            'tanggal_drop' => $request->tanggal_drop,
        ];
        try {
            DB::beginTransaction();
            $customer = Customer::create($customer_input);
            $customer->loan_request()->create($load_input);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }

    public function oldCustomerDropStore(Request $request)
    {
        $request->validate([
            'nik' => ['required', 'exists:customers,nik'],
            'tanggal_drop' => ["required", 'date'],
            'pinjaman' => ['required', 'min:1', 'integer'],
        ], [
            '*.exists' => ['NIK TIDAK VALID MOHON REFRESH HALAMAN'],
            '*.required' => ['Kolom ini wajib diisi'],
            '*.date' => ['Masukkan tanggal dengan benar'],
            '*.min' => ['minimal pinjaman Rp. 1'],
        ]);

        $load_input = [
            'branch_id' => auth()->user()->employee->branch_id,
            'mantri' => auth()->user()->employee->id,
            'kelompok' => auth()->user()->employee->area,
            'hari' =>  AppHelper::dateName($request->tanggal_drop),
            'pinjaman' => $request->pinjaman,
            'tanggal_drop' => $request->tanggal_drop,
        ];

        $nik = $request->nik;
        $fileExist = LoanRequest::whereHas('customer', function (Builder $query) use ($nik) {
            $query->where('nik', $nik);
        })->first();

        if ($fileExist) {
            return redirect()->back()->withErrors('Maaf Nasabah sudah melakkan request Pinjaman');
        }

        try {
            DB::beginTransaction();
            $customer = Customer::where('nik', $request->nik);
            $customer->loan_request()->create($load_input);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }

    public function mantriDrop()
    {
        $requestDrop = LoanRequest::with('customer', 'branch', 'approvedby', 'mantri')
            ->where('kelompok', auth()->user()->employee->area)
            ->where('tanggal_drop', Carbon::now()->format('Y-m-d'))
            ->doesntHave('loan')
            ->orderBy('tanggal_drop', 'asc')
            ->get();
        return Inertia::render('MantriApp/DropMantri', [
            'requestDrop' => $requestDrop
        ]);
    }
    public function calonDrop()
    {
        $requestDrop = LoanRequest::with('customer', 'branch', 'approvedby', 'mantri')
            ->where('kelompok', auth()->user()->employee->area)
            ->where('tanggal_drop', ">", Carbon::now()->format('Y-m-d'))
            ->doesntHave('loan')
            ->orderBy('tanggal_drop', 'asc')
            ->get();
        return Inertia::render('MantriApp/CalonDrop', [
            'requestDrop' => $requestDrop
        ]);
    }

    public function storeMantriDrop(Request $request, LoanRequest $loanRequest)
    {
        try {
            DB::beginTransaction();
            $loanRequest->loan()->create([
                "customer_id" => $loanRequest->customer_id,
                "branch_id" => $loanRequest->branch_id,
                "mantri" => $loanRequest->mantri,
                "kelompok" => $loanRequest->kelompok,
                "hari" => $loanRequest->hari,
                "drop" => $loanRequest->pinjaman,
                "pinjaman" => $loanRequest->pinjaman + ($loanRequest->pinjaman * 0.3),
                'pinjaman_ke' => Loan::where('customer_id', $loanRequest->customer_id)->count('id') + 1,
                "saldo" => $loanRequest->pinjaman + ($loanRequest->pinjaman * 0.3),
                "tanggal_drop" => $loanRequest->tanggal_drop,
                'lunas' => 'belum lunas',
                "status" => "normal"
            ]);
            DB::commit();
            return redirect()->route('mantriapps.drop.mantriDrop')->with('message', 'Data berhasil ditambahkan');
        } catch (\Throwable $th) {
            DB::rollBack();
            return redirect()->route('mantriapps.drop.mantriDrop')->withErrors('input gagal silahkan refresh page terlebih dahulu');
        }
    }
}
