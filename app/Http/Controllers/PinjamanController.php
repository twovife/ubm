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
    public function pinjaman()
    {
        return Inertia::render('Pinjaman/Pinjaman');
    }

    public function requestPinjaman()
    {
        return Inertia::render('Pinjaman/RequestPinjaman');
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
        })->with('customer', 'branch')->get();

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
            $customer = Customer::where('nik', $request->nik)->firstOrCreate([
                "nama" => $request->nama,
                "nik" => $request->nik,
                "no_kk" => $request->no_kk,
                "alamat" => $request->alamat,
                "unit_id" => $request->unit_id,
                "mantri" => $request->mantri,
                "area" => $mantri->area,
            ]);
            $customer->loan_request()->create([
                "branch_id" => $request->unit_id,
                "mantri" => $request->mantri,
                "kelompok" => $mantri->area,
                "hari" => AppHelper::dateName($request->tanggal_drop),
                "pinjaman" => $request->pinjaman,
                "tanggal_drop" => $request->tanggal_drop,
                "approved_date" => $request->type_drop ? $request->input('tanggal_drop') : null,
                "approved_by" => $request->type_drop ? $request->mantri : null,
                'status' => $request->type_drop ? 'acc' : 'open'
            ]);
            if (request()->input('type_drop', false)) {
                $customer->loan()->create([
                    "branch_id" => $request->unit_id,
                    "mantri" => $request->mantri,
                    "kelompok" => $mantri->area,
                    "hari" => AppHelper::dateName($request->tanggal_drop),
                    "pinjaman" => $request->pinjaman,
                    "saldo" => $request->pinjaman,
                    "status" => "nn "
                ]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e);
            return redirect()->route('unit.pinjaman.request.requestPinjaman')->withErrors('input gagal silahkan refresh page terlebih dahulu');
        }
        return redirect()->route('unit.pinjaman.request.requestPinjaman')->with('message', 'Data berhasil ditambahkan');
    }
}
// "nama" => "Et dolor velit quia"
// "nik" => "1"
// "no_kk" => "Magna quia id culpa"
// "alamat" => "Nisi voluptatibus ac"
// "unit_id" => 32
// "unit" => "Kediri 1"
// "mantri" => "709"
// "tanggal_drop" => "1"
// "pinjaman" => "500000"
