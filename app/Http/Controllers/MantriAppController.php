<?php

namespace App\Http\Controllers;

use App\Helpers\AppHelper;
use App\Models\Customer;
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
        return Inertia::render('MantriApp/RequestDrop');
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
}
