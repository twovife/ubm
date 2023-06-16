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

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $branch = Branch::query()->select('id', 'unit')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->get();
        $emp = Employee::query()->with('branch', 'history', 'ttdss', 'ttdsw', 'ttdjaminan')->filterData()->orderBy('branch_id', 'asc')->orderBy('date_resign', 'asc')->orderBy('updated_at', 'desc')->paginate(10)->withQueryString();
        return Inertia::render('Employee/Employee', [
            'branch' => $branch,
            'employee' => $emp,
            'filters' => request()->data ?? null
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
    public function show(Employee $employee)
    {
    }

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
            ['history_date' => $employee->pencairan_simpanan_date ?? $request->history_date, 'keterangan' => 'resign',    'record' => $employee->pencairan_simpanan_date ? 'telah mengambil simpanan' : "simpanan belum pernah diambil"],
            ['history_date' => $employee->date_resign, 'keterangan' => 'resign', 'record' => $employee->resign_status . ' dengan alasan ' . $employee->resign_reson],
            ['history_date' => $request->history_date, 'keterangan' => 'resign',    'record' =>  $employee->load('branch')->branch->unit . ' sebagai ' . $employee->getOriginal('jabatan')],
            ['history_date' => $employee->pencairan_simpanan_date ?? $request->history_date, 'keterangan' => 'reactive',    'record' => 'Kembali menjadi karyawan']
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
}
