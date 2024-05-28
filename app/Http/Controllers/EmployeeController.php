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

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()

    {
        // dd(request()->branch_id);

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
            'pencairan_simpanan_w_by' => $que->ttdsw->pencairan_simpanan_w_by ?? '-',
        ])->sortBy('status')->sortBy('unit')->sortBy('wilayah')->values();

        // dd($data);

        return Inertia::render('NewPage/Emp/Index', [
            'datas' => $data,
            'server_filter' => ['wilayah' => request()->filled('branch_id') ? $emp->first()->branch->wilayah : null, 'branch_id' => request()->branch_id, 'branch' => $branch]
        ]);
    }

    public function show(Employee $employee)
    {
        $branches = Branch::all();
        $emp = $employee->load('branch', 'histories');
        $sksw = Deposit::with('deposit_transactions')->where('employee_id', $emp->id)->first();
        $saldo_sw = $sksw?->deposit_transactions?->sum('sw_debit') - $sksw?->deposit_transactions?->sum('sw_kredit');
        $saldo_sk = $sksw?->deposit_transactions?->sum('sk_debit') - $sksw?->deposit_transactions?->sum('sk_kredit');
        $deposit_sksw = [
            'deposit_id' => $sksw->id ?? null,
            'saldo_sk' => $saldo_sk ?? 0,
            'saldo_sw' => $saldo_sw ?? 0,
            'max_tanggal' => $sksw?->deposit_transactions->max('transaction_date') ?? null
        ];
        return Inertia::render('NewPage/Emp/Show', [
            'employee' => $emp,
            'deposit_sksw' => $deposit_sksw,
            'server_filter' => ['branch' => $branches]
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
            $employee->resign_status = $request->resign_status == 4 ? "Pecat" : "Resign";
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
        $branch_asal = $employee->branch->unit;
        $data = [
            ['history_date' => $employee->date_resign, 'keterangan' => $employee->resign_status, 'record' => "$employee->resign_status dengan alasan $employee->resign_reson"],
            ['history_date' => $employee->date_resign, 'keterangan' => $employee->resign_status,    'record' =>  "$employee->resign_status dari $branch_asal sebagai $employee->jabatan"],
            ['history_date' => $employee->tanggal_kembali, 'keterangan' => 'Kembali Masuk',    'record' => 'Kembali menjadi Karyawan']
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


    public function indexx()
    {

        $branch = Branch::query()->select('id', 'unit')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->get();


        $emp = Employee::query()->with('branch', 'history', 'ttdss', 'ttdsw', 'ttdjaminan')->filterData()->orderBy('branch_id', 'asc')->orderBy('date_resign', 'asc')->orderBy('updated_at', 'desc')->get();

        $data = collect($emp)->map(fn ($que) => [
            'id' => $que->id ?? null,
            'nama' => $que->nama_karyawan ?? '-',
            'status_karyawan' => $que->date_resign ? 'off' : ($que->janis_jaminan == null ? 'belum-lengkap' : "on"),
            'nik' => $que->nik ?? '-',
            'alamat' => $que->alamat ?? '-',
            'hire_date' => $que->hire_date ?? '-',
            'masa_kerja' => now()->diffInYears(\Carbon\Carbon::parse($que->hire_date)) ?? '-',
            'jabatan' => $que->jabatan ?? '-',
            'area' => $que->area ?? '-',
            'unit' => $que->branch?->unit ?? '-',
            'wilayah' => $que->branch?->wilayah ?? '-',
            'janis_jaminan' => !$que->janis_jaminan ? '-' : $que->janis_jaminan,
            'tanggal_perpindahan' => $que->history?->history_date ?? '-',
            'history_perpindahan' => $que->history?->record ?? '-',
            'keterangan_perpindahan' => $que->history?->keterangan ?? '-',
            'date_resign' => $que->date_resign ?? '-',
            'resign_status' => $que->resign_status ?? '-',
            'pencairan_simpanan_date' => $que->pencairan_simpanan_date ?? '-',
            'pencairan_simpanan_by' => $que->ttdss->nama_karyawan ?? '-',
            'handover_jaminan' => $que->handover_jaminan ?? '-',
            'handover_jaminan_by' => $que->ttdjaminan->nama_karyawan ?? '-',
            'pencairan_simpanan_w_date' => $que->pencairan_simpanan_w_date ?? '-',
            'pencairan_simpanan_w_by' => $que->ttdsw->pencairan_simpanan_w_by ?? '-',

        ]);
        return Inertia::render('V2/Employee/Index', [
            'branch' => $branch,
            'datas' => $data,
            'server_filters' => request()->branch_id ?? null
        ]);
    }

    public function exemployee()
    {
        $branch = Branch::query()->select('id', 'unit')->get();
        $emp = Employee::query()->with('branch', 'history')->whereNotNull('date_resign')->orderBy('id', 'asc')->paginate(10);
        return Inertia::render('Employee/ExEmployee', [
            'branch' => $branch,
            'employee' => $emp
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $branch = Branch::query()->select('id', 'unit')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->get();
        $emp = Employee::query()->with('branch', 'history', 'ttdss', 'ttdsw', 'ttdjaminan')->filterData()->orderBy('branch_id', 'asc')->paginate(10)->withQueryString();
        return Inertia::render('Employee/EmployeeCreate', [
            'branch' => $branch,
            'employee' => $emp,
            'titles' => Title::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreEmployeeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEmployeeRequest $request)
    {
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

        $arrayFilter = [
            "branch_id" => $employee->branch_id ?? null
        ];
        return redirect()->route('employee.index', ['data' => $arrayFilter])->with('message', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function edit(Employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateEmployeeRequest  $request
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */

    public function action(Employee $employee)
    {
        $branch = Branch::query()->select('id', 'unit')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->get();

        $countCustomer = Customer::whereHas('employee', function ($q) use ($employee) {
            $q->where('mantri', $employee->id);
        })->count();

        $countLoan = Loan::whereHas('mantri', function ($q) use ($employee) {
            $q->where('mantri', $employee->id);
        })->count();
        $countLoanReq = LoanRequest::whereHas('mantri', function ($q) use ($employee) {
            $q->where('mantri', $employee->id);
        })->count();
        $countLoanReq = LoanRequest::whereHas('mantri', function ($q) use ($employee) {
            $q->where('mantri', $employee->id);
        })->count();
        $countInst = Instalment::whereHas('mantri', function ($q) use ($employee) {
            $q->where('mantri', $employee->id);
        })->count();

        $isDeletable = $countCustomer + $countLoan + $countLoanReq + $countInst;

        return Inertia::render('Employee/EmployeeAction', [
            'titles' => Title::all(),
            'branch' => $branch,
            'data' => $employee->load('branch', 'history', 'ttdss', 'ttdsw', 'ttdjaminan'),
            'deletable' => $isDeletable == 0 ? true : false
        ]);
    }

    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        // dd($employee);
        if ($employee->nik !== $request->nik) {
            $request->validate([
                'nik' => 'unique:employees'
            ]);
        }

        try {
            DB::beginTransaction();
            $employee->update($request->all());
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('somethink went wrong refresh or contact @itdev');
        }

        $arrayFilter = [
            "branch_id" => $employee->branch_id ?? null
        ];

        return redirect()->route('employee.index', ['data' => $arrayFilter])->with('message', 'data berhasil diubah');
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
        return redirect()->route('employee.index', ['data' => $arrayFilter])->with('message', 'data berhasil diubah');
    }

    public function resign(UpdateEmployeeResignRequest $request, Employee $employee)
    {

        try {
            DB::beginTransaction();
            $employee->resign_status = $request->resign_status;
            $employee->date_resign = $request->date_resign;
            $employee->resign_reson = $request->resign_reson;
            $employee->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            // dd($e);
            return redirect()->back()->withErrors('somethink went wrong refresh or contact @itdev');
        }

        $arrayFilter = [
            "branch_id" => $employee->branch_id ?? null
        ];
        return redirect()->route('employee.index', ['data' => $arrayFilter])->with('message', 'data berhasil diubah');
    }

    public function reactive(Request $request, Employee $employee)
    {
        $data = [
            ['history_date' => $employee->date_resign, 'keterangan' => 'resign', 'record' => $employee->resign_status . ' dengan alasan ' . $employee->resign_reson],
            ['history_date' => $request->history_date, 'keterangan' => 'resign',    'record' =>  $employee->load('branch')->branch->unit . ' sebagai ' . $employee->getOriginal('jabatan')],
            ['history_date' => $request->history_date, 'keterangan' => 'reactive',    'record' => 'Kembali menjadi karyawan']
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

            $employee->jabatan =  $request->jabatan;
            $employee->area = $request->area ?? 0;
            $employee->branch_id = $request->branch_id;
            $employee->janis_jaminan = $request->janis_jaminan;
            $employee->save();

            $employee->histories()->createMany($data);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('somethink went wrong refresh or contact @itdev');
        }

        $arrayFilter = [
            "branch_id" => $employee->branch_id ?? null
        ];
        return redirect()->route('employee.index', ['data' => $arrayFilter])->with('message', 'data berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Employee  $employee
     * @return \Illuminate\Http\Response
     */
    public function destroy(Employee $employee)
    {
        try {
            DB::beginTransaction();
            $employee->delete();
            $employee->histories()->delete();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('somethink went wrong refresh or contact @itdev');
        }
        $arrayFilter = [
            "branch_id" => $employee->branch_id ?? null
        ];
        return redirect()->route('employee.index', ['data' => $arrayFilter])->with('message', 'data berhasil dihapus');
    }

    public function handover(Request $request, Employee $employee)
    {
        $employee->pencairan_simpanan_date = $request->pencairan_simpanan_date;
        $employee->pencairan_simpanan_by = $request->pencairan_simpanan_date ? auth()->user()->employee->id : null;
        $employee->pencairan_simpanan_w_date = $request->pencairan_simpanan_w_date;
        $employee->pencairan_simpanan_w_by = $request->pencairan_simpanan_w_date ? auth()->user()->employee->id : null;
        $employee->handover_jaminan = $request->handover_jaminan;
        $employee->handover_jaminan_by = $request->handover_jaminan ? auth()->user()->employee->id : null;
        $employee->save();

        $arrayFilter = [
            "branch_id" => $employee->branch_id ?? null
        ];
        return redirect()->route('employee.index', ['data' => $arrayFilter])->with('message', 'data berhasil diubah');
    }


    // v2 controller
    public function newindex()
    {
        $branch = Branch::query()->select('id', 'unit')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->get();
        $emp = Employee::query()->with('branch', 'history', 'ttdss', 'ttdsw', 'ttdjaminan')->filterData()->orderBy('branch_id', 'asc')->orderBy('date_resign', 'asc')->orderBy('updated_at', 'desc')->get();

        $data = collect($emp)->map(fn ($que) => [
            'id' => $que->id ?? null,
            'nama' => $que->nama_karyawan ?? '-',
            'nik' => $que->nik ?? '-',
            'alamat' => $que->alamat ?? '-',
            'hire_date' => $que->hire_date ?? '-',
            'masa_kerja' => now()->diffInYears(\Carbon\Carbon::parse($que->hire_date)) ?? '-',
            'jabatan' => $que->jabatan ?? '-',
            'area' => $que->area ?? '-',
            'unit' => $que->branch?->unit ?? '-',
            'wilayah' => $que->branch?->wilayah ?? '-',
            'janis_jaminan' => $que->janis_jaminan ?? '-',
            'tanggal_perpindahan' => $que->history?->history_date ?? '-',
            'history_perpindahan' => $que->history?->record ?? '-',
            'keterangan_perpindahan' => $que->history?->keterangan ?? '-',
            'date_resign' => $que->date_resign ?? '-',
            'resign_status' => $que->resign_status ?? '-',
            'pencairan_simpanan_date' => $que->pencairan_simpanan_date ?? '-',
            'pencairan_simpanan_by' => $que->ttdss->nama_karyawan ?? '-',
            'handover_jaminan' => $que->handover_jaminan ?? '-',
            'handover_jaminan_by' => $que->ttdjaminan->nama_karyawan ?? '-',
            'pencairan_simpanan_w_date' => $que->pencairan_simpanan_w_date ?? '-',
            'pencairan_simpanan_w_by' => $que->ttdsw->pencairan_simpanan_w_by ?? '-',

        ]);
        return Inertia::render('V2/Employee/Index', [
            'branch' => $branch,
            'employee' => $data,
            'filters' => request()->data ?? null
        ]);
    }
}
