<?php

namespace App\Http\Controllers;

use App\Helpers\AppHelper;
use App\Models\Customer;
use App\Models\Employee;
use App\Models\Loan;
use App\Models\LoanRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PinjamanController extends Controller
{

    public function testdump()
    {

        $branch_path = database_path('seeders/data/branch.csv');
        $branch_get_contents = file_get_contents($branch_path);
        $branch_data = array_map("str_getcsv", explode("\n", $branch_get_contents));
        $branch_header = array_shift($branch_data);
        $newTittle = array();
        foreach ($branch_data as $row) {
            $data = array_combine($branch_header, $row);
            $newTittle[] = $data;
        }
        dd($newTittle);
    }

    function editNotes(Loan $loan, Request $request)
    {
        $loan->loan_notes = $request->loan_notes;
        $loan->save();
        return redirect()->back()->with('message', 'Data berhasil diubah');
    }

    public function pinjaman()
    {
        return Inertia::render('Pinjaman/Pinjaman');
    }

    public function requestPinjaman()
    {
        $requestDrop = LoanRequest::with('customer', 'branch', 'approvedby', 'mantri')
            ->withFilter()
            ->whereHas('customer', function ($q) {
                $q->withFilter();
            })
            ->doesntHave('loan')
            ->whereNot('status', 'tolak')
            ->orderBy('kelompok', 'asc')
            ->orderBy('tanggal_drop', 'asc')
            ->paginate(10)
            ->withQueryString();

        $kelompok = Employee::when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('branch_id', auth()->user()->employee->branch_id);
        })->where('area', '!=', "0")->distinct('area')->get('area');

        $arrayFilter = [
            "hari" => request()->data['hari'] ?? AppHelper::dateName(Carbon::now()->format('Y-m-d')),
            "kelompok" => request()->data['kelompok'] ?? "1",
            "search" => ""
        ];

        return Inertia::render('Pinjaman/RequestPinjaman', [
            'requestDrops' => $requestDrop,
            'employee' => $kelompok,
            'dataFilters' => $arrayFilter,
            'canCreate' => true
        ]);
    }

    public function bukutransaksi()
    {
        $requestDrop = LoanRequest::with('customer', 'branch', 'approvedby', 'mantri')
            ->withFilter()
            ->whereHas('customer', function ($q) {
                $q->withFilter();
            })
            ->orderBy('kelompok', 'asc')
            ->orderBy('tanggal_drop', 'asc')
            ->paginate(10)
            ->withQueryString();

        $kelompok = Employee::when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('branch_id', auth()->user()->employee->branch_id);
        })->where('area', '!=', "0")->distinct('area')->get('area');

        $arrayFilter = [
            "hari" => request()->data['hari'] ?? AppHelper::dateName(Carbon::now()->format('Y-m-d')),
            "kelompok" => request()->data['kelompok'] ?? "1",
            "search" => ""
        ];

        return Inertia::render('Pinjaman/RequestPinjaman', [
            'requestDrops' => $requestDrop,
            'employee' => $kelompok,
            'dataFilters' => $arrayFilter,
            'canCreate' => false
        ]);
    }

    public function create()
    {

        $data_customer = Customer::where("nik", request()->nik)->first();
        $emp = Employee::where('jabatan', 'mantri')->filterData()->orderBy('area', 'asc')->get();
        $request = LoanRequest::whereHas('customer', function ($q) {
            $q->where('nik', request()->nik);
        })->with('customer', 'branch')->where('status', 'open')->get();

        $pinjaman = Loan::whereHas('customer', function ($q) {
            $q->where('nik', request()->nik);
        })->with('customer', 'branch')->orderBy('branch_id', 'asc')->orderBy('tanggal_drop', 'desc')->get();


        return Inertia::render('Pinjaman/CreatePinjaman', [
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

            // dd(LoanRequest::where('customer_id', $customer->id)->count('id'));
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
                'loan_notes' => $request->loan_notes,
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
                    "loan_notes" => $request->loan_notes,
                ]);
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();

            $arrayFilter = [
                "hari" => AppHelper::dateName($request->tanggal_drop),
                "kelompok" => $mantri->area,
            ];

            return redirect()->route('unit.pinjaman.request.requestPinjaman')->withErrors('input gagal silahkan refresh page terlebih dahulu');
        }


        $arrayFilter = [
            "hari" => AppHelper::dateName($request->tanggal_drop),
            "kelompok" => $mantri->area,
        ];
        return redirect()->route('unit.pinjaman.request.requestPinjaman', ['data' => $arrayFilter])->with('message', 'Data berhasil ditambahkan');
    }

    public function actions(Request $request, LoanRequest $loanRequest)
    {
        // dd($request->all());
        if ($request->value == 0) {
            $loanRequest->status = "tolak";
            $loanRequest->save();
            return redirect()->route('unit.pinjaman.request.requestPinjaman')->with('message', 'Data berhasil ditambahkan');
        } else if ($request->value == 1) {
            try {
                DB::beginTransaction();
                $loanRequest->status = "acc";
                $loanRequest->approved_date = Carbon::now()->format('Y-m-d');
                $loanRequest->approved_by = auth()->user()->employee->id;
                $loanRequest->save();
                DB::commit();
                return redirect()->route('unit.pinjaman.request.requestPinjaman')->with('message', 'Data berhasil ditambahkan');
            } catch (\Throwable $th) {
                DB::rollBack();
                return redirect()->route('unit.pinjaman.request.requestPinjaman')->withErrors('input gagal silahkan refresh page terlebih dahulu');
            }
        } else if ($request->value == 3) {
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
                    "status" => "normal",
                    "loan_notes" => $loanRequest->loan_notes,
                ]);
                DB::commit();
                $arrayFilter = [
                    "hari" => AppHelper::dateName($request->tanggal_drop),
                    "kelompok" => $loanRequest->kelompok,
                ];
                return redirect()->route('unit.pinjaman.angsuran.index', ['data' => $arrayFilter])->with('message', 'Data berhasil ditambahkan');
            } catch (\Throwable $th) {
                DB::rollBack();
                return redirect()->route('unit.pinjaman.request.requestPinjaman')->withErrors('input gagal silahkan refresh page terlebih dahulu');
            }
        }
    }
}
