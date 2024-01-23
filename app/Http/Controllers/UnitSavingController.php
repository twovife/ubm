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

    public function index()
    {
        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??  Carbon::now()->month;
        $getFilter->tanggal =    Carbon::createFromDate(request()->transaction_year, request()->transaction_month, 1)->endOfMonth()->format('Y-m-d');
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
                $que->where('transaction_date', "<=", $getFilter->tanggal);
            });
        })
            ->select('unit_saving_accounts.id as account_id', 'branches.wilayah', 'branches.id as branch_id', 'branches.unit', DB::raw('COALESCE(SUM(unit_savings.debit), 0) as total'), DB::raw('max(transaction_date) as last_payment'))
            ->groupBy('branches.wilayah', 'branches.id', 'branches.unit', 'unit_saving_accounts.id')
            ->get();



        $data_perunit = $data->groupBy('wilayah')->map(function ($queries) use ($getFilter) {
            return [
                'wilayah' => $queries->first()['wilayah'],
                'data' => $queries->map(function ($saving_perwilayah) use ($getFilter) {
                    return [
                        'wilayah' => $saving_perwilayah['wilayah'],
                        'id' => $saving_perwilayah['account_id'],
                        'unit' => $saving_perwilayah['unit'],
                        'branch_id' => $saving_perwilayah['branch_id'],
                        'total' => $saving_perwilayah['total'],
                        'lastmont' => Carbon::createFromDate($saving_perwilayah['last_year_payment'], $saving_perwilayah['last_month_payment'], 1)->format('Y-m'),
                        'thismont' => Carbon::createFromDate($getFilter->transaction_year, $getFilter->transaction_month, 1)->format('Y-m'),
                        'last_month_payment' => $saving_perwilayah['total'] == 0 ? 1
                            : (Carbon::createFromDate($saving_perwilayah['last_payment'], 1)->format('Y-m') == Carbon::createFromDate($getFilter->transaction_year, $getFilter->transaction_month, 1)->format('Y-m') ? 0 : 1),
                        'tanggungan' => $saving_perwilayah['total'] == 0 ? 'Belum Ada Transaksi'
                            : (Carbon::createFromDate($saving_perwilayah['last_payment'], 1)->format('Y-m') == Carbon::createFromDate($getFilter->transaction_year, $getFilter->transaction_month, 1)->format('Y-m') ? 'Nihil' : 'Ada Tanggungan'),
                    ];
                })->values(),
            ];
        })->values();


        $data_perwilayah = $data_perunit->map(function ($queries) {
            return [
                'wilayah' => $queries['wilayah'],
                'total' => $queries['data']->sum('total'),
                'last_month_payment' => $queries['data']->sum('last_month_payment') == 0 ? 'Nihil' : "Ada Tanggungan",
            ];
        })->values();




        return Inertia::render('UnitSaving/Index', [
            'datas' => $data_perwilayah,
            'batch_datas' => $data_perunit,
            'branch' => $branch,
            'server_filters' => $getFilter ?? null
        ]);
    }


    public function create(Branch $branch)
    {
        $id = $branch->id;
        $branches = Branch::where('id', $id)->get();
        $employee = Employee::where('branch_id', $id)->get();
        return Inertia::render('UnitSaving/Create', [
            'branch' => $branches,
            'employees' => $employee
        ]);
    }

    public function savingdetails(UnitSavingAccount $unitSavingAccount)
    {
        $saving = $unitSavingAccount->load('unitssaving');
        $saldo_before = 0;
        $enableToAdd = true;
        $data = $saving->unitssaving->map(function ($item) use (&$saldo_before, $saving, &$enableToAdd) {
            $saldo = $saldo_before + ($item->debit - $item->kredit);
            $enableToAdd = Carbon::create($item->transaction_date)->format('Y-m') == Carbon::now()->format('Y-m') ? false : true;
            $saldo_sebelum = $saldo_before;
            $saldo_before = $saldo;
            return [
                'tanggal' => Carbon::create($item->transaction_date)->format('F Y'),
                'wilayah' => $saving->load('branch')->branch->wilayah,
                'unit' => $saving->load('branch')->branch->unit,
                'id' => $item->id,
                'debit' => $item->debit,
                'saldo_before' => $saldo_sebelum,
                'saldo' => $saldo,
            ];
        })->values();

        return Inertia::render('UnitSaving/Detail', [
            'details' => $data,
            'curent_unit' => ['id' => $unitSavingAccount->id, 'wilayah' => $saving->load('branch')->branch->wilayah, 'unit' => $saving->load('branch')->branch->unit, 'now' => Carbon::now()->format('Y-m'), 'editable' => $enableToAdd]
        ]);
    }


    public function savingdetailspost(UnitSavingAccount $unitSavingAccount, Request $request)
    {
        $currentDate = Carbon::now();
        $request->validate([
            'debit' => ['required', 'integer']
        ]);

        try {
            DB::beginTransaction();


            $unitsaving = $unitSavingAccount->unitssaving()->create([
                "transaction_date" => $currentDate->format('Y-m-d'),
                "transaction_month" => $currentDate->month,
                "transaction_year" => $currentDate->year,

                "debit" => $request->debit,
                "kredit" => 0,
                "saldo" => null,
                "transaction" => "D",
                "transaction_type" => "TB"
            ]);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);

            return redirect()->route('unitsaving.savingdetails', $unitSavingAccount->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }

        return redirect()->route('unitsaving.savingdetails', $unitSavingAccount->id)->with('message', 'Data berhasil ditambahkan');
    }

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
                "transaction" => "D",
                "transaction_type" => "TB"
            ]);


            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);

            return redirect()->route('unitsaving.index')->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }

        return redirect()->route('unitsaving.index')->with('message', 'Data berhasil ditambahkan');
    }


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


    public function bon_panjer()
    {
        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??  Carbon::now()->month;
        $getFilter->tanggal =    Carbon::createFromDate(request()->transaction_year, request()->transaction_month, 1)->endOfMonth()->format('Y-m-d');
        $getFilter->tanggal_awal =    Carbon::createFromDate(request()->transaction_year, request()->transaction_month, 1)->startOfMonth()->format('Y-m-d');
        $getFilter->branch_id = auth()->user()->hasPermissionTo('unit') ? auth()->user()->employee->branch_id : (request()->branch_id ?? 1);
        $getFilter->wilayah = -1;

        $branch = Branch::query()->select('id', 'unit')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->get();

        $data = UnitSavingAccount::with('unitssaving', 'branch', 'employee')->where('account_type', 'BP')->whereNull('note')->whereHas('unitsaving', function ($query) use ($getFilter) {
            $query->where('transaction_date', "<=", $getFilter->tanggal);
        })->get();



        $data_per_pic = $data->map(function ($queries) use ($getFilter) {
            $jumlah_pinjam = $queries->unitssaving->where('transaction', 'K')->where('transaction_type', 'BP')->first()->kredit;
            $tanggal_pinjaman = $queries->unitssaving->where('transaction', 'K')->where('transaction_type', 'BP')->first()->transaction_date;
            $setoran_bulan_lalu = $queries->unitssaving->where('transaction', 'D')->where('transaction_type', 'BP')->where('transaction_date', "<", $getFilter->tanggal_awal)->sum('debit');
            $setoran_bulan_ini =  $queries->unitssaving->where('transaction', 'D')->where('transaction_type', 'BP')->whereBetween('transaction_date', [$getFilter->tanggal_awal, $getFilter->tanggal])->sum('debit') ?? 0;
            $pinjaman_bulan_ini =  $queries->unitssaving->where('transaction', 'K')->where('transaction_type', 'BP')->whereBetween('transaction_date', [$getFilter->tanggal_awal, $getFilter->tanggal])->sum('kredit') ?? 0;
            $keterangan = $setoran_bulan_ini + $pinjaman_bulan_ini == 0 ? 'unpaid' : 'nihil';
            return [
                'id' => $queries['id'],
                'branch_id' => $queries->employee->branch->id,
                'wilayah' => $queries->employee->branch->wilayah,
                'branch' =>  $queries->employee->branch->unit,
                'nama_karyawan' =>  $queries->employee->nama_karyawan,
                'jabatan' =>  $queries->employee->jabatan,
                'tanggal_pinjaman' => $tanggal_pinjaman,
                'nominal_pinjaman' => $jumlah_pinjam,
                'saldo_bulan_lalu' => $jumlah_pinjam - $setoran_bulan_lalu,
                'setoran_bulan_lalu' => $setoran_bulan_lalu,
                'setoran_bulan_ini' => $setoran_bulan_ini,
                'total_setoran' => $setoran_bulan_ini + $setoran_bulan_lalu,
                'saldo' => ($jumlah_pinjam - $setoran_bulan_lalu) - $setoran_bulan_ini,
                'keterangan' => $keterangan
            ];
        })->values()->sortBy('wilayah')->sortBy('branch');

        return Inertia::render('BonPanjer/Index', [
            'datas' => $data_per_pic,
            'branch' => $branch,
            'server_filters' => $getFilter ?? null
        ]);
    }



    public function bon_panjer_create()
    {
        $branches = Branch::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('id', auth()->user()->employee->branch_id))->get();
        $employee = Employee::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('branch_id', auth()->user()->employee->branch_id))->get();

        return Inertia::render('BonPanjer/Create', [
            'branch' => $branches,
            'employees' => $employee
        ]);
    }


    public function bon_panjer_store(Request $request)
    {

        $branch = Employee::find($request->employee_id);
        // dd($branch);
        $currentDate = Carbon::now();
        $request->validate([
            'besar_pinjaman' => ['required', 'integer', 'min:1'],
            'employee_id' => ['required', 'integer',],
        ]);


        $isExist = UnitSavingAccount::where('employee_id', $request->employee_id)->whereNull('note')->count();

        if ($isExist > 0) {
            return redirect()->route('bonpanjer.bon_panjer_create')->withErrors('Karyawan masih mempunyai pinjaman yang belum Lunas');
            // dd('asd');
        }


        try {
            DB::beginTransaction();
            $unitAccount = UnitSavingAccount::create([
                "branch_id" => $branch->id,
                "employee_id" => $request->employee_id,
                "account_type" => 'BP',
            ]);


            $unitsaving = $unitAccount->unitssaving()->create([
                "transaction_date" => $currentDate->format('Y-m-d'),
                "transaction_month" => $currentDate->month,
                "transaction_year" => $currentDate->year,

                "debit" => 0,
                "kredit" => $request->besar_pinjaman,
                "transaction" => "K",
                "transaction_type" => "BP"
            ]);


            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);

            return redirect()->route('bonpanjer.bon_panjer')->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }

        return redirect()->route('bonpanjer.bon_panjer')->with('message', 'Data berhasil ditambahkan');
    }




    public function bon_panjer_show(UnitSavingAccount $unitSavingAccount)
    {
        $saving = $unitSavingAccount->unitssaving;

        $nominal_pinjaman = 0;
        $enableToAdd = true;

        $data = $saving->map(function ($item) use ($unitSavingAccount, &$nominal_pinjaman, &$enableToAdd) {

            $saldo = $nominal_pinjaman - ($item->debit - $item->kredit);
            $enableToAdd = Carbon::create($item->transaction_date)->format('Y-m') == Carbon::now()->format('Y-m') ? false : true;
            $saldo_sebelum = $nominal_pinjaman;
            $nominal_pinjaman = $saldo;
            return [
                'wilayah' => $unitSavingAccount->employee->branch->wilayah,
                'unit' => $unitSavingAccount->employee->branch->unit,
                'nama_karyawan' => $unitSavingAccount->employee->nama_karyawan,
                'jabatan' => $unitSavingAccount->employee->jabatan,
                'transaction_date' => $item->transaction_date,
                'saldo_sebelum' => $saldo_sebelum,
                'pinjaman' => $item->kredit,
                'angsuran' => $item->debit,
                'saldo' => $saldo
            ];
        });


        return Inertia::render('BonPanjer/Detail', [
            'details' => $data,
            'curent_unit' => ['id' => $unitSavingAccount->id, 'wilayah' => $unitSavingAccount->employee->branch->wilayah, 'unit' => $unitSavingAccount->employee->branch->unit, 'nama_karyawan' => $unitSavingAccount->employee->nama_karyawan, 'now' => Carbon::now()->format('Y-m'), 'editable' => $enableToAdd]
        ]);
    }


    public function bon_panjer_post(UnitSavingAccount $unitSavingAccount, Request $request)
    {
        $currentDate = Carbon::now();
        $request->validate([
            'debit' => ['required', 'integer']
        ]);

        try {
            DB::beginTransaction();


            $unitsaving = $unitSavingAccount->unitssaving()->create([
                "transaction_date" => $currentDate->format('Y-m-d'),
                "transaction_month" => $currentDate->month,
                "transaction_year" => $currentDate->year,

                "debit" => $request->debit,
                "kredit" => 0,
                "transaction" => "D",
                "transaction_type" => "BP"
            ]);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);

            return redirect()->route('bonpanjer.bon_panjer_show', $unitSavingAccount->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }

        return redirect()->route('bonpanjer.bon_panjer_show', $unitSavingAccount->id)->with('message', 'Data berhasil ditambahkan');
    }
}
