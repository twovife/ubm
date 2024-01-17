<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Employee;
use App\Models\UnitSaving;
use App\Models\UnitSavingAccount;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UnitSavingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??  Carbon::now()->month;
        $getFilter->branch_id = auth()->user()->hasPermissionTo('unit') ? auth()->user()->employee->branch_id : (request()->branch_id ?? 1);
        $getFilter->wilayah = -1;

        $branch = Branch::query()->select('id', 'unit')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->get();

        $data = Branch::leftJoin('unit_saving_accounts', function ($join) {
            $join->on('branches.id', '=', 'unit_saving_accounts.branch_id')->where(function ($que) {
                $que->where('unit_saving_accounts.account_type', 'TB');
            });
        })->leftJoin('unit_savings', function ($join) use ($getFilter) {
            $join->on('unit_saving_accounts.id', '=', 'unit_savings.unit_saving_account_id')->where(function ($que) use ($getFilter) {
                $que->where('unit_savings.transaction_month', '<=', $getFilter->transaction_month)->where('transaction_year', '<=', $getFilter->transaction_year);
            });
        })
            ->select('branches.wilayah', 'branches.id', 'branches.unit', DB::raw('COALESCE(SUM(unit_savings.debit), 0) as total'), DB::raw('max(unit_savings.transaction_month) as last_month_payment'), DB::raw('max(unit_savings.transaction_year) as last_year_payment'))
            ->groupBy('branches.wilayah', 'branches.id', 'branches.unit')
            ->get();

        // dd($data);


        $data_perunit = $data->groupBy('wilayah')->map(function ($queries) use ($getFilter) {
            return [
                'wilayah' => $queries->first()['wilayah'],
                'data' => $queries->map(function ($saving_perwilayah) use ($getFilter) {
                    return [
                        'wilayah' => $saving_perwilayah->first()['wilayah'],
                        'unit' => $saving_perwilayah['unit'],
                        'total' => $saving_perwilayah['total'],
                        'last_month_payment' => $saving_perwilayah['total'] == 0 ? 1
                            : (Carbon::createFromDate($saving_perwilayah['last_year_payment'], $saving_perwilayah['last_month_payment'], 1)->format('M - Y') == Carbon::createFromDate($getFilter->transaction_year, $getFilter->transaction_month, 1)->format('M - Y') ? 0 : 1),
                        'tanggungan' => $saving_perwilayah['total'] == 0 ? 'Belum Ada Transaksi'
                            : (Carbon::createFromDate($saving_perwilayah['last_year_payment'], $saving_perwilayah['last_month_payment'], 1)->format('M - Y') == Carbon::createFromDate($getFilter->transaction_year, $getFilter->transaction_month, 1)->format('M - Y') ? 'Nihil' : 'Ada Tanggungan'),
                    ];
                })->values(),
            ];
        })->values();

        // dd($data_perunit);

        $data_perwilayah = $data_perunit->map(function ($queries) {
            return [
                'wilayah' => $queries['wilayah'],
                'total' => $queries['data']->sum('total'),
                'last_month_payment' => $queries['data']->sum('last_month_payment') == 0 ? 'Nihil' : "Ada Tanggungan",
            ];
        })->values();



        // dd($data_perunit);
        // dd($branch);
        // $tanggal = Carbon::create($getFilter->transaction_year, $getFilter->transaction_month)->format('F Y');

        // $sk = OptionalDepositTransaction::queryBuilder($getFilter);
        // $sw = MandatoryDepositTransaction::queryBuilder($getFilter);

        return Inertia::render('UnitSaving/Index', [
            'datas' => $data_perwilayah,
            'batch_datas' => $data_perunit,
            'branch' => $branch,
            'server_filters' => $getFilter ?? null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $branch = Branch::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('id', auth()->user()->employee->branch_id))->get();
        $employee = Employee::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('branch_id', auth()->user()->employee->branch_id))->get();
        return Inertia::render('UnitSaving/Create', [
            'branch' => $branch,
            'employees' => $employee
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $currentDate = Carbon::now();
        $request->validate([
            'branch_id' => ['required', 'integer', 'unique:unit_saving_accounts'],
            'setoran_awal' => ['required', 'integer']
        ]);

        try {
            DB::beginTransaction();
            $unitAccount = UnitSavingAccount::create([
                "branch_id" => $request->branch_id,
                "account_type" => 'TB',
            ]);


            $unitsaving = $unitAccount->unitssaving()->create([
                "transaction_date" => $currentDate->format('Y-m-d'),
                "transaction_month" => $currentDate->month,
                "transaction_year" => $currentDate->year,

                "debit" => $request->setoran_awal,
                "kredit" => 0,
                "saldo" => $request->setoran_awal,
                "transaction" => "D",
                "transaction_type" => "DTB"
            ]);


            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);

            return redirect()->route('unitsaving.index')->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }

        return redirect()->route('unitsaving.index')->with('message', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UnitSaving  $unitSaving
     * @return \Illuminate\Http\Response
     */
    public function show(UnitSaving $unitSaving)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UnitSaving  $unitSaving
     * @return \Illuminate\Http\Response
     */
    public function edit(UnitSaving $unitSaving)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UnitSaving  $unitSaving
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UnitSaving $unitSaving)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UnitSaving  $unitSaving
     * @return \Illuminate\Http\Response
     */
    public function destroy(UnitSaving $unitSaving)
    {
        //
    }
}
