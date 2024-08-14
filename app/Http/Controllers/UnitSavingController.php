<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Employee;
use App\Models\UnitSaving;
use App\Models\UnitSavingAccount;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class UnitSavingController extends Controller
{


    public function dashboard()
    {


        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now());
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = true;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');

        $data = UnitSaving::with(['savingaccount' => function ($savingacc) {
            $savingacc->with('employee.branch', 'branch');
        }])->whereBetween('transaction_date', [$requestFilter->startOfMonth, $requestFilter->endOfMonth])->whereNot('transaction_type', 'PO')->orderBy('transaction_date', 'asc')->get();

        $data_before = UnitSaving::with(['savingaccount' => function ($savingacc) {
            $savingacc->with('employee.branch');
        }])->where('transaction_date', "<", $requestFilter->startOfMonth)->whereNot('transaction_type', 'PO')->get();

        $saldo_before = $data_before->where('transaction', 'D')->sum('nominal')  - $data_before->where('transaction', 'K')->sum('nominal');
        $saldo = $saldo_before;

        $additional_array = [
            'id' => 0,
            'bulan' =>  $tanggal->startOfMonth()->format('M Y'),
            'transaction_date' => $requestFilter->startOfMonth,
            'type_transaksi' => "Saldo Sebelumnya",
            'wilayah' => null,
            'unit' => null,
            'nama_karyawan' => null,
            'saldo_sebelumya' => 0,
            'bop' => null,
            'debit' => null,
            'kredit' => null,
            'saldo' => $saldo_before,
        ];

        $data_bulanan = $data->map(function ($item) use (&$saldo) {
            $saldo_before_counting = $saldo;
            $saldo = $item->transaction == "D" ? $saldo + $item->nominal : $saldo - $item->nominal;

            return  [
                'id' => $item->id,
                'bulan' => Carbon::create($item->transaction_date)->format('M Y'),
                'transaction_date' => Carbon::create($item->transaction_date)->format('Y-m-d'),
                'deletable' => $item->unit_saving_account_id == 1 ? "true" : "false",
                'type_transaksi' => $item->transaction_type == "TB"
                    ? "TABUNGAN 1JT"
                    : ($item->transaction_type == "BP"
                        ? ($item->transaction == "D"
                            ? "Pengembalian Bon Panjer"
                            : "Bon Panjer")
                        : ($item->transaction_type == "PM"
                            ? ($item->transaction == "D"
                                ? "Pengembalian Pinjaman Modal"
                                : "Pinjaman Modal")
                            : ($item->transaction == "D"
                                ? "$item->keterangan"
                                : "$item->keterangan"))),
                'wilayah' => $item->transaction_type == "BP" ? $item->savingaccount->employee->branch->wilayah : $item->savingaccount->branch->wilayah,
                'unit' =>  $item->transaction_type == "BP" ? $item->savingaccount->employee->branch->unit : $item->savingaccount->branch->unit,
                'nama_karyawan' => $item->transaction_type == "BP" ? $item->savingaccount->employee->nama_karyawan : null,
                'saldo_sebelumya' => $saldo_before_counting,
                'bop' => $item->transaction == "D" && $item->transaction_type == "TB" ? $item->nominal : null,
                'debit' => $item->transaction == "D" && $item->transaction_type != "TB" ? $item->nominal : null,
                'kredit' => $item->transaction == "K" ? $item->nominal : null,
                'saldo' => $saldo,
            ];
        })->values();
        $data_bulanan->prepend($additional_array);
        // ddd($data_bulanan);

        return Inertia::render('UnitSaving/Dashboard', [
            'datas' => $data_bulanan,
            'saldo_akhir' => $saldo,
            'server_filter' => ['bulan' => $tanggal->format('Y-m')]
        ]);
    }

    public function index()
    {

        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now());
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = true;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');



        $data = Branch::with('unit_saving_accounts')->leftJoin('unit_saving_accounts', function ($join) {
            $join->on('branches.id', '=', 'unit_saving_accounts.branch_id')->where(function ($que) {
                $que->where('unit_saving_accounts.account_type', 'TB');
            });
        })->leftJoin('unit_savings', function ($join) use ($requestFilter) {
            $join->on('unit_saving_accounts.id', '=', 'unit_savings.unit_saving_account_id')->where(function ($que) use ($requestFilter) {
                $que->where('transaction_date', "<=",  $requestFilter->endOfMonth);
            });
        })
            ->select('unit_saving_accounts.id as account_id', 'branches.wilayah', 'branches.id as branch_id', 'branches.unit', 'branches.isactive', DB::raw('COALESCE(SUM(unit_savings.nominal), 0) as total'), DB::raw('max(unit_savings.transaction_date) as last_payment'))
            ->groupBy('branches.wilayah', 'branches.id', 'branches.unit', 'unit_saving_accounts.id', 'branches.isactive')
            ->get();



        $data_perunit = $data->groupBy('wilayah')->map(function ($queries) use ($requestFilter) {
            return [
                'wilayah' => $queries->first()['wilayah'],
                'data' => $queries->map(function ($saving_perwilayah) use ($requestFilter) {
                    $minDate = UnitSaving::where("unit_saving_account_id", $saving_perwilayah['account_id'])?->min("transaction_date");
                    $parseMindate = Carbon::parse($minDate)->format('M Y');
                    return [
                        'wilayah' => $saving_perwilayah['wilayah'],
                        'id' => $saving_perwilayah['account_id'],
                        'unit' => $saving_perwilayah['unit'],
                        'branch_id' => $saving_perwilayah['branch_id'],
                        'total' => $saving_perwilayah['total'],
                        'lastmont' => Carbon::createFromDate($saving_perwilayah['last_year_payment'], $saving_perwilayah['last_month_payment'], 1)->format('Y-m'),
                        'thismont' => Carbon::createFromDate($requestFilter->endOfMonth, 1)->endOfMonth()->format('Y-m'),

                        'button_type' =>  $saving_perwilayah['isactive'] == 0
                            ? ($saving_perwilayah['account_id']
                                ? 3
                                : 4
                            )
                            : (!$saving_perwilayah['account_id']
                                ? 2
                                : ($saving_perwilayah['last_payment']
                                    ? (Carbon::createFromDate($saving_perwilayah['last_payment'], 1)->endOfMonth()->format('Y-m') == Carbon::createFromDate($requestFilter->endOfMonth, 1)->endOfMonth()->format('Y-m')
                                        ? 5
                                        : 1)
                                    : 1
                                )
                            ),

                        'last_month_payment' => $saving_perwilayah['isactive'] == 0
                            ? 0
                            : (!$saving_perwilayah['account_id']
                                ? 1
                                : ($saving_perwilayah['last_payment']
                                    ? (Carbon::createFromDate($saving_perwilayah['last_payment'], 1)->endOfMonth()->format('Y-m') == Carbon::createFromDate($requestFilter->endOfMonth, 1)->endOfMonth()->format('Y-m')
                                        ? 0
                                        : 1)
                                    : 0
                                )
                            ),

                        'tanggungan' => $saving_perwilayah['isactive'] == 0
                            ? ($saving_perwilayah['account_id']
                                ? 'Unit Tutup'
                                : "Unit Tutup Tdk Ada Transaksi"
                            )
                            : (!$saving_perwilayah['account_id']
                                ? 'Unit Baru'
                                : ($saving_perwilayah['last_payment']
                                    ? (Carbon::createFromDate($saving_perwilayah['last_payment'], 1)->endOfMonth()->format('Y-m') == Carbon::createFromDate($requestFilter->endOfMonth, 1)->endOfMonth()->format('Y-m')
                                        ? "Nihil"
                                        : "Ada Tanggungan")
                                    : "Setoran Awal $parseMindate"
                                )
                            ),

                    ];
                })->sortBy('unit')->values(),
            ];
        })->values();



        $data_perwilayah = $data_perunit->map(function ($queries) {
            return [
                'wilayah' => $queries['wilayah'],
                'total' => $queries['data']->sum('total'),
                'last_month_payment' => $queries['data']->sum('last_month_payment') == 0 ? 'Nihil' : "Ada Tanggungan",
            ];
        })->values();

        // ddd($data_perunit);
        $sessionValue = ['bulan' => $tanggal->format('Y-m')];
        Session::put('unitsavingindex', $sessionValue);


        return Inertia::render('UnitSaving/Index', [
            'datas' => $data_perwilayah,
            'batch_datas' => $data_perunit,
            'server_filter' => $sessionValue,
        ]);
    }


    public function create(Branch $branch)
    {
        $id = $branch->id;
        $branches = Branch::where('id', $id)->get();
        $employee = Employee::where('branch_id', $id)->get();
        return Inertia::render('UnitSaving/Create', [
            'branch' => $branches,
            'back_params' => Session::get('unitsavingindex'),
            'employees' => $employee
        ]);
    }

    public function savingdetails(UnitSavingAccount $unitSavingAccount)
    {
        $saving = $unitSavingAccount->load('unitssaving');
        $saldo_before = 0;
        $enableToAdd = true;
        $awalBulanIni = Carbon::parse($unitSavingAccount->load('unitssaving')->unitssaving()->max('transaction_date'))->endOfMonth()->addDay(1)->format('Y-m-d');
        $akhirBulanIni = Carbon::now()->endOfMonth()->format('Y-m-d');

        $branch = Branch::where('id', '!=', $unitSavingAccount->branch_id)->orderBy('wilayah', 'asc')->orderBy('unit', 'asc')->get();

        $data = $saving->unitssaving->map(function ($item) use (&$saldo_before, $saving, &$enableToAdd) {
            // dd($item->nominal);
            $saldo = $saldo_before + $item->nominal;
            $enableToAdd = Carbon::create($item->transaction_date)->format('Y-m') == Carbon::now()->format('Y-m') ? false : true;
            $saldo_sebelum = $saldo_before;
            $saldo_before = $saldo;
            return [
                'tanggal' => Carbon::create($item->transaction_date)->format('F Y'),
                'wilayah' => $saving->load('branch')->branch->wilayah,
                'unit' => $saving->load('branch')->branch->unit,
                'id' => $item->id,
                'debit' => $item->nominal,
                'saldo_before' => $saldo_sebelum,
                'saldo' => $saldo,
            ];
        })->values();

        return Inertia::render('UnitSaving/Detail', [
            'details' => $data,
            'branch' => $branch,
            'back_params' => Session::get('unitsavingindex'),
            'curent_unit' => ['id' => $unitSavingAccount->id, 'wilayah' => $saving->load('branch')->branch->wilayah, 'unit' => $saving->load('branch')->branch->unit, 'awalbulan' => $awalBulanIni, 'akhirbulan' => $akhirBulanIni, 'editable' => $enableToAdd]
        ]);
    }


    public function savingdetailspost(UnitSavingAccount $unitSavingAccount, Request $request)
    {
        $request->validate([
            'debit' => ['required', 'integer'],
            'transaction_date' => ['required', 'date']
        ]);

        try {
            DB::beginTransaction();
            $unitsaving = $unitSavingAccount->unitssaving()->create([
                "transaction_date" => $request->transaction_date,
                "nominal" => $request->debit,
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
        $request->validate([
            'branch_id' => ['required', 'integer'],
            'transaction_date' => ['required'],
            'setoran_awal' => ['required', 'integer']
        ]);


        try {
            DB::beginTransaction();
            $unitAccount = UnitSavingAccount::firstOrcreate([
                "branch_id" => $request->branch_id,
                "account_type" => 'TB',
            ]);


            $unitsaving = $unitAccount->unitssaving()->create([
                "transaction_date" => $request->transaction_date,
                "nominal" => $request->setoran_awal,
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



    public function bon_panjer()
    {


        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now());
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = true;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');



        $data = UnitSavingAccount::with('unitssaving', 'employee.branch')->where('account_type', 'BP')->whereNull('note')->whereHas('unitsaving', function ($query) use ($requestFilter) {
            $query->where('transaction_date', "<=", $requestFilter->endOfMonth);
        })->get();


        $data_per_pic = $data->map(function ($queries) use ($requestFilter) {
            $jumlah_pinjam = $queries->unitssaving->where('transaction', 'K')->first()->nominal;
            $tanggal_pinjaman = $queries->unitssaving->where('transaction', 'K')->first()->transaction_date;
            $setoran_bulan_lalu = $queries->unitssaving->where('transaction', 'D')->where('transaction_date', "<", $requestFilter->startOfMonth)->sum('nominal');
            $setoran_bulan_ini =  $queries->unitssaving->where('transaction', 'D')->whereBetween('transaction_date', [$requestFilter->startOfMonth, $requestFilter->endOfMonth])->sum('nominal') ?? 0;
            $pinjaman_bulan_ini =  $queries->unitssaving->where('transaction', 'K')->whereBetween('transaction_date', [$requestFilter->startOfMonth, $requestFilter->endOfMonth])->sum('nominal') ?? 0;
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
        })->sortBy('branch')->sortBy('wilayah')->values();

        return Inertia::render('BonPanjer/Index', [
            'datas' => $data_per_pic,
            'server_filter' => ['bulan' => $tanggal->format('Y-m')]
        ]);
    }

    public function bon_panjer_lunas()
    {
        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now());
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = true;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');



        $data = UnitSavingAccount::with('unitssaving', 'employee.branch')->where('account_type', 'BP')->whereNotNull('note')->get();

        $data_per_pic = $data->map(function ($queries) use ($requestFilter) {
            $jumlah_pinjam = $queries->unitssaving->where('transaction', 'K')->first()->nominal;
            $tanggal_pinjaman = $queries->unitssaving->where('transaction', 'K')->first()->transaction_date;
            $setoran_bulan_lalu = $queries->unitssaving->where('transaction', 'D')->where('transaction_date', "<", $requestFilter->startOfMonth)->sum('nominal');
            $setoran_bulan_ini =  $queries->unitssaving->where('transaction', 'D')->whereBetween('transaction_date', [$requestFilter->startOfMonth, $requestFilter->endOfMonth])->sum('nominal') ?? 0;
            $pinjaman_bulan_ini =  $queries->unitssaving->where('transaction', 'K')->whereBetween('transaction_date', [$requestFilter->startOfMonth, $requestFilter->endOfMonth])->sum('nominal') ?? 0;
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
                'keterangan' => $keterangan,
                'note' => $queries['note']
            ];
        })->sortBy('branch')->sortBy('wilayah')->values();

        return Inertia::render('BonPanjer/Lunas', [
            'datas' => $data_per_pic,
            'server_filter' => ['bulan' => $tanggal->format('Y-m')]
        ]);
    }



    public function bon_panjer_create()
    {
        $branches = Branch::when(auth()->user()->hasPermissionTo('unit'), fn($que) => $que->where('id', auth()->user()->employee->branch_id))->get();
        $employee = Employee::when(auth()->user()->hasPermissionTo('unit'), fn($que) => $que->where('branch_id', auth()->user()->employee->branch_id))->get();

        return Inertia::render('BonPanjer/Create', [
            'branch' => $branches,
            'employees' => $employee
        ]);
    }


    public function bon_panjer_store(Request $request)
    {

        $branch = Employee::find($request->employee_id);
        $request->validate([
            'besar_pinjaman' => ['required', 'integer', 'min:1'],
            'employee_id' => ['required', 'integer',],
            'transaction_date' => ['required', 'date',],
        ]);


        $isExist = UnitSavingAccount::where('employee_id', $request->employee_id)->where('account_type', 'BP')->whereNull('note')->count();
        if ($isExist > 0) {
            return redirect()->route('bonpanjer.bon_panjer_create')->withErrors('Karyawan masih mempunyai pinjaman yang belum Lunas');
        }

        try {
            DB::beginTransaction();
            $unitAccount = UnitSavingAccount::create([
                "branch_id" => $branch->id,
                "employee_id" => $request->employee_id,
                "account_type" => 'BP',
            ]);


            $unitsaving = $unitAccount->unitssaving()->create([
                "transaction_date" => $request->transaction_date,
                "nominal" =>  $request->besar_pinjaman,
                "transaction" => "K",
                "transaction_type" => "BP"
            ]);


            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);
            return redirect()->route('bonpanjer.bon_panjer')->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }

        $data = ['bulan' => Carbon::parse($request->transaction_date)->format('Y-m')];
        return redirect()->route('bonpanjer.bon_panjer', $data)->with('message', 'Data berhasil ditambahkan');
    }




    public function bon_panjer_show(UnitSavingAccount $unitSavingAccount)
    {
        $awalBulanIni = $unitSavingAccount->load('unitssaving')->unitssaving()->min('transaction_date');
        $akhirBulanIni = Carbon::now()->endOfMonth()->format('Y-m-d');
        $saving = $unitSavingAccount->unitssaving;

        $nominal_pinjaman = 0;
        $enableToAdd = true;

        $data = $saving->map(function ($item) use ($unitSavingAccount, &$nominal_pinjaman, &$enableToAdd) {

            $saldo = $item->transaction == "D" ? $nominal_pinjaman - $item->nominal : $nominal_pinjaman + $item->nominal;
            $enableToAdd = Carbon::create($item->transaction_date)->format('Y-m') == Carbon::now()->format('Y-m') ? false : (isset($unitSavingAccount->note) ? false : true);
            $saldo_sebelum = $nominal_pinjaman;
            $nominal_pinjaman = $saldo;
            return [
                'wilayah' => $unitSavingAccount->employee->branch->wilayah,
                'unit' => $unitSavingAccount->employee->branch->unit,
                'nama_karyawan' => $unitSavingAccount->employee->nama_karyawan,
                'jabatan' => $unitSavingAccount->employee->jabatan,
                'transaction_date' => $item->transaction_date,
                'saldo_sebelum' => $saldo_sebelum,
                'pinjaman' => $item->transaction == "K" ? $item->nominal : 0,
                'angsuran' => $item->transaction == "D" ? $item->nominal : 0,
                'saldo' => $saldo
            ];
        })->sortBy('transaction_date')->values();


        return Inertia::render('BonPanjer/Detail', [
            'details' => $data,
            'curent_unit' => ['id' => $unitSavingAccount->id, 'wilayah' => $unitSavingAccount->employee->branch->wilayah, 'unit' => $unitSavingAccount->employee->branch->unit, 'nama_karyawan' => $unitSavingAccount->employee->nama_karyawan, 'awalbulan' => $awalBulanIni, 'akhirbulan' => $akhirBulanIni, 'editable' => $enableToAdd]
        ]);
    }


    public function bon_panjer_post(UnitSavingAccount $unitSavingAccount, Request $request)
    {
        $pinjaman = $unitSavingAccount->load('unitssaving')->unitssaving()->where('transaction', 'K')->sum('nominal');
        $total_angsuran = $unitSavingAccount->load('unitssaving')->unitssaving()->where('transaction', 'D')->sum('nominal');
        $saldo = $pinjaman - $total_angsuran;

        if ($saldo - $request->debit < 0) {
            return redirect()->route('bonpanjer.bon_panjer_show', $unitSavingAccount->id)->withErrors('Saldo Tidak Boleh lebih dari 0');
        }

        $request->validate([
            'debit' => ['required', 'integer']
        ]);
        try {
            DB::beginTransaction();
            $unitsaving = $unitSavingAccount->unitssaving()->create([
                "transaction_date" => $request->transaction_date,
                "nominal" => $request->debit,
                "transaction" => "D",
                "transaction_type" => "BP"
            ]);

            if ($saldo - $request->debit == 0) {
                $unitSavingAccount->note = $request->transaction_date;
                $unitSavingAccount->save();
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);

            return redirect()->route('bonpanjer.bon_panjer_show', $unitSavingAccount->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }

        return redirect()->route('bonpanjer.bon_panjer_show', $unitSavingAccount->id)->with('message', 'Data berhasil ditambahkan');
    }


    //

    public function pinjaman_modal()
    {

        $data = UnitSaving::with('savingaccount.branch')->whereHas('savingaccount', function ($saving) {
            $saving->whereIn('account_type', ['PM', 'PO'])->whereNull('note');
        })->get();


        $data_per_pic = $data->groupBy('savingaccount.branch.wilayah')->map(function ($queries) {
            return [
                'wilayah' => $queries->first()->savingaccount->branch->wilayah,
                'data' => $queries->groupBy('savingaccount.branch_id')->map(function ($sub_queries) {
                    // return $sub_queries;
                    $kredit_owner = $sub_queries->where('transaction', 'K')->where('transaction_type', 'PO');
                    $total_setoran_owner = $sub_queries->where('transaction', 'D')->where('transaction_type', 'PO')?->sum('nominal') ?? 0;
                    $transaksi_terakhir_owner = $sub_queries->where('transaction_type', 'PO')->sortByDesc('id')->first()?->transaction_date;

                    $kredit_pusat = $sub_queries->where('transaction', 'K')->where('transaction_type', 'PM');
                    $total_setoran_pusat = $sub_queries->where('transaction', 'D')->where('transaction_type', 'PM')?->sum('nominal') ?? 0;
                    $transaksi_terakhir_pusat = $sub_queries->where('transaction_type', 'PM')->sortByDesc('id')->first()?->transaction_date;

                    return [
                        'branch_id' => $sub_queries->first()->savingaccount->branch->id,
                        'branch' => $sub_queries->first()->savingaccount->branch->unit,
                        'wilayah' => $sub_queries->first()->savingaccount->branch->wilayah,

                        'type_pinjaman_owner' => $kredit_owner->first()?->savingaccount->id ? ($kredit_owner->sum("nominal") == $total_setoran_owner ? 1 : 2) : 3,
                        'id_pinjaman_owner' => $kredit_owner->first()?->savingaccount->id ?? "-",

                        'tanggal_pinjaman_owner' => $kredit_owner->first()?->transaction_date ?? '-',
                        'nominal_pinjaman_owner' => $kredit_owner?->sum('nominal') ?? 0,
                        'total_setoran_pinjaman_owner' => $total_setoran_owner ?? 0,
                        'saldo_pinjaman_owner' => ($kredit_owner?->sum('nominal') ?? 0) - $total_setoran_owner,
                        'transaksi_terakhir_owner' => $transaksi_terakhir_owner ?? '-',

                        'type_pinjaman_pusat' => $kredit_pusat->first()?->savingaccount->id ? ($kredit_pusat->sum("nominal") == $total_setoran_pusat ? 1 : 2) : 3,
                        'id_pinjaman_pusat' => $kredit_pusat->first()?->savingaccount->id ?? "-",

                        // 'id_pinjaman_pusat' => $kredit_pusat->first()?->savingaccount->id ?? "-",
                        'tanggal_pinjaman_pusat' => $kredit_pusat->first()?->transaction_date ?? '-',
                        'nominal_pinjaman_pusat' => $kredit_pusat?->sum('nominal') ?? 0,
                        'total_setoran_pinjaman_pusat' => $total_setoran_pusat ?? 0,
                        'saldo_pinjaman_pusat' => ($kredit_pusat?->sum('nominal') ?? 0) - $total_setoran_pusat,
                        'transaksi_terakhir_pusat' => $transaksi_terakhir_pusat ?? '-',

                        'total_pinjaman' => ($kredit_owner?->sum('nominal') ?? 0) + ($kredit_pusat?->sum('nominal') ?? 0),
                        'total_saldo_pinjaman' => (($kredit_owner?->sum('nominal') ?? 0) - $total_setoran_owner) + (($kredit_pusat?->sum('nominal') ?? 0) - $total_setoran_pusat),
                        'jasa_modal_owner' => $sub_queries->sum('jasa_modal') ?? 0,
                    ];
                })->sortBy('branch')->sortBy('wilayah')->values()
            ];
        })->sortBy('wilayah')->values();


        // dd($data_per_pic);

        return Inertia::render('PinjamanModal/Index', [
            'batch_datas' => $data_per_pic,
        ]);
    }



    public function pinjaman_modal_create()
    {
        $branches = Branch::when(auth()->user()->hasPermissionTo('unit'), fn($que) => $que->where('id', auth()->user()->employee->branch_id))->get();
        $employee = Employee::when(auth()->user()->hasPermissionTo('unit'), fn($que) => $que->where('branch_id', auth()->user()->employee->branch_id))->get();

        return Inertia::render('PinjamanModal/Create', [
            'branch' => $branches,
            'employees' => $employee
        ]);
    }

    public function pinjaman_modal_transaksi()
    {

        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now());
        $requestFilter = new \stdClass;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');

        $data = UnitSaving::with('savingaccount.branch')->whereBetween('transaction_date', [$requestFilter->startOfMonth, $requestFilter->endOfMonth])->get()->whereIn('transaction_type', ['PO', 'PM']);



        $data_per_wilayah =  $data->map(function ($queries) {
            $markerketerangan = $queries->transaction == "D" ? "Pengembalian Pinjaman" : "Pinjaman";
            $secondMarker = $queries->transaction_type == "PO" ? "Pak Hartawan" : "Pusat";
            return [
                'wilayah' => $queries->first()->savingaccount->branch->wilayah,
                'branch_id' => $queries->savingaccount->branch->id,
                'branch' => $queries->savingaccount->branch->unit,
                'wilayah' => $queries->savingaccount->branch->wilayah,
                'transaction_date' => $queries->transaction_date,

                'transaction_type' => $queries->transaction_type,
                'keterangan' => "$markerketerangan $secondMarker",

                'DPO' => $queries->transaction_type == "PO" && $queries->transaction == "D" ? $queries->nominal : 0,
                'KPO' =>  $queries->transaction_type == "PO" && $queries->transaction == "K" ? $queries->nominal : 0,

                'DPP' =>  $queries->transaction_type == "PM" && $queries->transaction == "D" ? $queries->nominal : 0,
                'KPP' => $queries->transaction_type == "PM" && $queries->transaction == "K" ? $queries->nominal : 0,

                'jasamodal' => $queries->jasa_modal
            ];
        })->sortBy('branch')->sortBy('wilayah')->values();
        // dd($data_per_wilayah);
        return Inertia::render("PinjamanModal/Transaksi", [
            'datas' => $data_per_wilayah,
            'server_filter' => ['bulan' => $tanggal->format('Y-m')]
        ]);
    }

    // kspusahabersamamandiriindo


    public function pinjaman_modal_store(Request $request)
    {

        // dd($request->all());
        $branch = Branch::find($request->branch_id);
        // dd($branch);
        $currentDate = $request->transaction_date;

        $request->validate([
            'setoran_awal' => ['required', 'integer', 'min:1'],
            'branch_id' => ['required', 'integer'],
            "transaction_date" => ["required"]
        ]);




        try {
            DB::beginTransaction();
            $unitAccount = UnitSavingAccount::firstOrCreate(
                [
                    "branch_id" => $branch->id,
                    "account_type" =>  $request->source
                ],
                [
                    'branch_id' => $branch->id,
                    'employee_id' => null,
                    'account_type' =>   $request->source
                ]
            );


            $unitsaving = $unitAccount->unitssaving()->create([
                "transaction_date" => $currentDate,
                "nominal" => $request->setoran_awal,
                "transaction" => "K",
                "transaction_type" => $request->source
            ]);


            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('pinjamanmodal.pinjaman_modal')->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }

        return redirect()->route('pinjamanmodal.pinjaman_modal')->with('message', 'Data berhasil ditambahkan');
    }


    public function pinjaman_modal_show(UnitSavingAccount $unitSavingAccount)
    {

        $saving = $unitSavingAccount->unitssaving;
        $awalBulanIni = $unitSavingAccount->load('unitssaving')->unitssaving()->max('transaction_date');
        $akhirBulanIni = Carbon::now()->endOfMonth()->format('Y-m-d');
        $nominal_pinjaman = 0;
        $enableToAdd = true;

        $branch = Branch::where('id', '!=', $unitSavingAccount->branch_id)->orderBy('wilayah', 'asc')->orderBy('unit', 'asc')->get();


        $data = $saving->map(function ($item) use ($unitSavingAccount, &$nominal_pinjaman, &$enableToAdd) {

            $saldo = $item->transaction == "D" ? $nominal_pinjaman - $item->nominal : $nominal_pinjaman + $item->nominal;
            $saldo_sebelum = $nominal_pinjaman;
            $nominal_pinjaman = $saldo;
            return [
                'wilayah' => $unitSavingAccount->branch->wilayah,
                'unit' => $unitSavingAccount->branch->unit,
                'nama_karyawan' => $unitSavingAccount->nama_karyawan,
                'jabatan' => $unitSavingAccount->jabatan,
                'transaction_date' => $item->transaction_date,

                'saldo_sebelum' => $saldo_sebelum,
                'pinjaman' => $item->transaction == "K" ? $item->nominal : 0,
                'angsuran' => $item->transaction == "D" ? $item->nominal : 0,
                'jasa_modal' => $item->jasa_modal ? $item->jasa_modal : 0,
                'saldo' => $saldo
            ];
        });

        // dd($unitSavingAccount->account_type);


        return Inertia::render('PinjamanModal/Detail', [
            'details' => $data,
            'server_filter' => ['branch' => $branch],
            'curent_unit' => ['type_pinjaman' => $unitSavingAccount->account_type, 'id' => $unitSavingAccount->id, 'max_payment' => $nominal_pinjaman, 'wilayah' => $unitSavingAccount->branch->wilayah, 'unit' => $unitSavingAccount->branch->unit, 'nama_karyawan' => $unitSavingAccount->nama_karyawan, 'awalbulan' => $awalBulanIni, 'akhirbulan' => $akhirBulanIni, 'editable' => $enableToAdd]
        ]);
    }


    public function pinjaman_modal_post(UnitSavingAccount $unitSavingAccount, Request $request)
    {
        // dd($request->all());
        $validate = $request->validate([
            'debit' => ['required', 'integer'],
            'jasa' => ['required', 'integer'],
            'transaction_date' => ['required', 'date'],
        ]);

        // dd($request->transaction_date);

        $date = Carbon::create($request->transaction_date);

        try {
            DB::beginTransaction();

            $unitsaving = $unitSavingAccount->unitssaving()->create([
                "transaction_date" => $request->transaction_date,
                "nominal" => $request->debit,
                "jasa_modal" => $request->jasa,
                "transaction" => "D",
                "transaction_type" => $unitSavingAccount->account_type
            ]);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('pinjamanmodal.pinjaman_modal_show', $unitSavingAccount->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }

        return redirect()->route('pinjamanmodal.pinjaman_modal_show', $unitSavingAccount->id)->with('message', 'Data berhasil ditambahkan');
    }

    public function pinjaman_modal_mutasi(UnitSavingAccount $unitSavingAccount, Request $request)
    {
        // dd($request->all());

        $sumPinjam = $unitSavingAccount->unitssaving->where('transaction', 'K')->sum('nominal');
        $sumBayar = $unitSavingAccount->unitssaving->where('transaction', 'D')->sum('nominal');
        $total = $sumPinjam - $sumBayar;

        try {
            DB::beginTransaction();
            $newUnitSavingAccount = UnitSavingAccount::firstOrCreate([
                'branch_id' => $request->branch_id,
                'account_type' =>  $unitSavingAccount->account_type,
            ],   [
                'branch_id' => $request->branch_id,
                'employee_id' => null,
                'account_type' =>   $unitSavingAccount->account_type,
            ]);

            $unitsaving = $newUnitSavingAccount->unitssaving()->create([
                "transaction_date" => $request->transaction_date,
                "nominal" => $total,
                "transaction" => "K",
                "transaction_type" => $unitSavingAccount->account_type,
            ]);

            $unitsavingPelunasan = $unitSavingAccount->unitssaving()->create([
                "transaction_date" => $request->transaction_date,
                "nominal" => $total,
                "jasa_modal" => 0,
                "transaction" => "D",
                "transaction_type" => $unitSavingAccount->account_type
            ]);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('pinjamanmodal.pinjaman_modal_show', $unitSavingAccount->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }
        return redirect()->route('pinjamanmodal.pinjaman_modal_show', $newUnitSavingAccount->id)->with('message', 'Pinjaman Berhasil Di Pindahkan');
    }

    public function create_mutation()
    {

        $akhirBulanIni = Carbon::now()->endOfMonth()->format('Y-m-d');
        $awalBulanIni = Carbon::now()->startOfMonth()->subMonth(1)->format('Y-m-d');
        return Inertia::render("UnitSaving/Outcome", [
            'curent_unit' => ['akhirbulan' => $akhirBulanIni, 'awalbulan' => $awalBulanIni],
        ]);
    }

    public function store_mutation(Request $request)
    {


        $validation = $request->validate([
            "nominal" => ['required', 'integer', 'min:1'],
            "keterangan" => ['required', 'string'],
            'transaction_date' => ['required', 'date'],
            'transaksi' => ['required']

        ]);

        try {
            DB::beginTransaction();
            // $akun = UnitSavingAccount::where('transaction_type', 'LAIN')->first();
            $unitAccount = UnitSavingAccount::firstOrcreate([
                "branch_id" => "91",
                "account_type" => 'LAIN',
            ]);

            $unitAccount->unitssaving()->create([
                "transaction_date" => $request->transaction_date,
                'transaction' => $request->transaksi,
                'transaction_type' => 'LAIN',
                'nominal' => $request->nominal,
                'keterangan' => $request->keterangan
            ]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->back()->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }


        return redirect()->back()->with('message', 'Data berhasil ditambahkan');
    }

    public function delete_mutation(UnitSaving $unitSaving): RedirectResponse
    {
        try {
            DB::beginTransaction();
            $unitSaving->delete();
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('Data Gagal Disimpan Mohon Muat Ulang Halaman');
        }

        $previousUrl = url()->previous();
        return  Redirect::to($previousUrl)->with('message', 'Data Berhasil disimpan');
    }
}
