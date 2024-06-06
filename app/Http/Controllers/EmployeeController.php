<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeMutationRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Requests\UpdateEmployeeResignRequest;
use App\Models\Branch;
use App\Models\Customer;
use App\Models\Loan;
use App\Models\Instalment;
use App\Models\LoanRequest;
use App\Models\Title;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Helpers\AppHelper;
use App\Models\Deposit;
use Carbon\Carbon;
use Illuminate\Support\Facades\Session;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index(Request $request)

    {
        $branch = Branch::orderBy('wilayah', 'asc')->orderBy('unit', 'asc')->get();
        // dd($branch);
        $emp = Employee::with('branch', 'history', 'ttdss', 'ttdsw', 'ttdjaminan')->when(request()->filled('branch_id'), function ($q) {
            $q->where('branch_id', request()->branch_id);
        })->get();


        $data = collect($emp)->map(fn ($que) => [
            'id' => $que->id,
            'nama' => $que->nama_karyawan ?? '-',
            'status' => $que->date_resign ? 3 : ($que->janis_jaminan == null ? 1 : 2),
            'status_karyawan' => $que->date_resign ? $que->resign_status : ($que->janis_jaminan == null ? 'belum-lengkap' : "Aktif"),
            'nik' => $que->nik ?? '-',
            'alamat' => $que->alamat ?? '-',
            'hire_date' => $que->hire_date ?? '-',
            'masa_kerja' => now()->diffInYears(\Carbon\Carbon::parse($que->hire_date)) ?? '-',
            'jabatan' => $que->jabatan == "mantri" ? "$que->jabatan - $que->area" : $que->jabatan ?? "-",
            'area' => $que->area ?? '-',
            'unit' => $que->branch?->unit ?? '-',
            'wilayah' => $que->branch?->wilayah ?? '-',
            'janis_jaminan' => !$que->janis_jaminan ? '-' : $que->janis_jaminan,
            'tanggal_perpindahan' => $que->history?->history_date ?? null,
            'history_perpindahan' => $que->history?->record ?? '-',
            'keterangan_perpindahan' => $que->history?->keterangan ?? '-',
            'date_resign' => $que->date_resign ?? null,
            'resign_status' => $que->resign_status ?? '-',
            'pencairan_simpanan_date' => $que->pencairan_simpanan_date ?? null,
            'pencairan_simpanan_by' => $que->ttdss->nama_karyawan ?? '-',
            'handover_jaminan' => $que->handover_jaminan ?? null,
            'handover_jaminan_by' => $que->ttdjaminan->nama_karyawan ?? '-',
            'pencairan_simpanan_w_date' => $que->pencairan_simpanan_w_date ?? null,
            'pencairan_simpanan_w_by' => $que->ttdsw->nama_karyawan ?? '-',
        ])->sortBy('status')->sortBy('unit')->sortBy('wilayah')->values();


        $filterData = ['wilayah' => request()->filled('branch_id') ? $emp->first()->branch->wilayah : null, 'branch_id' => request()->branch_id, 'branch' => $branch];
        session(['employee_index' => $filterData]);


        return Inertia::render('NewPage/Emp/Index', [
            'datas' => $data,
            'server_filter' => $request->session()->get('employee_index')
        ]);
    }

    public function store(StoreEmployeeRequest $request)
    {
        dd($request->all());

        try {
            DB::beginTransaction();
            $data = $request->all();
            $data['area'] = $request->area ?? 0;
            $employee = Employee::create($data);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('somethink went wrong refresh or contact @itdev');
        }

        return redirect()->route('emp.show', $employee->id)->with('message', 'Data berhasil ditambahkan');
    }


    public function show(Employee $employee)
    {
        $branches = Branch::all();
        $emp = $employee->load('branch', 'histories', 'ttdss', 'ttdsw', 'ttdjaminan');
        $sksw = Deposit::with('deposit_transactions')->where('employee_id', $emp->id)->first();
        $saldo_sw = $sksw?->deposit_transactions?->sum('sw_debit') - $sksw?->deposit_transactions?->sum('sw_kredit');
        $saldo_sk = $sksw?->deposit_transactions?->sum('sk_debit') - $sksw?->deposit_transactions?->sum('sk_kredit');
        $deposit_sksw = [
            'deposit_id' => $sksw->id ?? null,
            'unit' => $sksw->branch->unit ?? null,
            'saldo_sk' => $saldo_sk ?? 0,
            'saldo_sw' => $saldo_sw ?? 0,
            'max_tanggal' => $sksw?->deposit_transactions->max('transaction_date') ?? null
        ];
        return Inertia::render('NewPage/Emp/Show', [
            'employee' => $emp,
            'deposit_sksw' => $deposit_sksw,
            'server_filter' => ['branch' => $branches],
            'back_params' => Session::get('employee_index')
        ]);
    }


    public function perpindahan_karyawan(Employee $employee, Request $request)
    {
        // dd([$employee, $request->all()]);
        $validate = $request->validate([
            "branch_id" => ['required'],
            "tanggal_mutasi" => ['required'],
            "status_kontrak" => ['required'],
            "jabatan" => ['required'],
            "area" => ['required'],
        ], [
            "*.required" => "Wajib Diisi"
        ]);
        // dd($request->all());

        $oldUnit = $employee->branch->unit;
        $keterangan = AppHelper::typeMutasi($request->typeMutasi);
        $area = $employee->area == 0 ? "" : " - $employee->area";

        try {
            DB::beginTransaction();
            $history = [
                "employee_id" => $employee->id,
                "history_date" => $request->tanggal_mutasi,
                "keterangan" => $keterangan,
                "record" => "dari unit $oldUnit sebagai $employee->jabatan$area"
            ];

            $employee->branch_id = $request->branch_id;
            $employee->jabatan = $request->jabatan;
            $employee->area = $request->area;
            $employee->area = $request->area;
            $employee->status_kontrak = $request->status_kontrak;

            if ($employee->isDirty('status_kontrak')) {
                $history_kontrak = [
                    "employee_id" => $employee->id,
                    "history_date" => $request->tanggal_mutasi,
                    "keterangan" => "Ubah Kontrak",
                    "record" => "Mengubah Kontrak ke $request->status_kontrak"
                ];
                $employee->histories()->create($history_kontrak);
            }

            $employee->histories()->create($history);
            $employee->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);
            return redirect()->back()->withErrors('Terjadi Kesalahan saat input coba hubungi IT');
        }

        return redirect()->route('emp.show', $employee->id)->with('message', 'data berhasil di update');
    }

    public function resign_karyawan(Employee $employee, Request $request)
    {
        try {
            DB::beginTransaction();
            $employee->resign_status = $request->resign_status == 4 ? "Resign" : "Pecat";
            $employee->date_resign = $request->date_resign;
            $employee->resign_reson = $request->resign_reson;
            $employee->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('somethink went wrong refresh or contact @itdev');
        }
        return redirect()->route('emp.show', $employee->id)->with('message', 'data berhasil di update');
    }

    public function kembali_karyawan(Employee $employee, Request $request)
    {
        // dd($request->all());
        $branch_asal = $employee->branch->unit;
        $data = [
            ['history_date' => $employee->date_resign, 'keterangan' => $employee->resign_status, 'record' => "$employee->resign_status dengan alasan $employee->resign_reson"],
            ['history_date' => $employee->date_resign, 'keterangan' => $employee->resign_status,    'record' =>  "$employee->resign_status dari $branch_asal sebagai $employee->jabatan"],
            ['history_date' => $request->tanggal_kembali, 'keterangan' => 'Kembali Masuk',    'record' => 'Kembali menjadi Karyawan']
        ];

        try {
            DB::beginTransaction();
            $employee->date_resign = null;
            $employee->resign_status = null;
            $employee->resign_reson = null;
            $employee->pencairan_simpanan_date = null;
            $employee->pencairan_simpanan_by = null;
            $employee->handover_jaminan = null;
            $employee->handover_jaminan_by = null;
            $employee->pencairan_simpanan_w_date = null;
            $employee->pencairan_simpanan_w_by = null;


            $employee->status_kontrak =  $request->status_kontrak;
            $employee->hire_date = $request->tanggal_kembali;
            $employee->jabatan =  $request->jabatan;
            $employee->area = $request->area ?? 0;
            $employee->branch_id = $request->branch_id;
            $employee->janis_jaminan = $request->jenis_jaminan;
            $employee->save();

            $employee->histories()->createMany($data);


            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('somethink went wrong refresh or contact @itdev');
        }

        return redirect()->route('emp.show', $employee->id)->with('message', 'data berhasil di update');
    }





    public function pengembalianjaminan(Employee $employee, Request $request)
    {
        $request->validate([
            'handover_jaminan' => "required"
        ], [
            '*.required' => "Harus Diisi"
        ]);

        try {
            DB::beginTransaction();
            $employee->handover_jaminan = $request->handover_jaminan;
            $employee->handover_jaminan_by = auth()->user()->employee_id;
            $employee->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('somethink went wrong refresh or contact @itdev');
        }

        $arrayFilter = [
            "branch_id" => $employee->branch_id ?? null
        ];
        return redirect()->route('emp.show', $employee->id)->with('message', 'data berhasil diubah');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateEmployeeRequest  $request
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */



    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {

        // $validatedData = $request->validated();

        try {
            DB::beginTransaction();
            $employee->update($request->all());
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('somethink went wrong refresh or contact @itdev');
        }


        return redirect()->route('emp.show', $employee->id)->with('message', 'data berhasil diubah');
    }

    public function mutasi(UpdateEmployeeMutationRequest $request, Employee $employee)
    {
        $tanggal_tabungan = Carbon::now()->endOfMonth()->format('Y-m-d');
        try {
            DB::beginTransaction();
            $record =  $employee->load('branch')->branch->unit . ' sebagai ' . $employee->getOriginal('jabatan');
            $employee->branch_id = $request->branch_id;
            $employee->jabatan = $request->jabatan;
            $employee->area = $request->area ?? 0;
            $employee->save();


            $data = [
                'employee_id' => $request->employee_id,
                'history_date' => $request->history_date,
                'keterangan' => $request->keterangan,
                'record' => $record,
            ];

            $employee->histories()->create($data);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('somethink went wrong refresh or contact @itdev');
        }


        $arrayFilter = [
            "branch_id" => $employee->branch_id ?? null
        ];
        return redirect()->route('emp.show', $employee->id)->with('message', 'data berhasil diubah');
    }
}
