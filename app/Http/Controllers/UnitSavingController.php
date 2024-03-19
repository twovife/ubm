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


    public function dashboard()
    {
        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??  Carbon::now()->month;
        $getFilter->tanggal = Carbon::createFromDate(request()->transaction_year, request()->transaction_month, 1)->endOfMonth()->format('Y-m-d');
        $getFilter->tanggal_start = Carbon::createFromDate(request()->transaction_year, request()->transaction_month, 1)->startOfMonth()->format('Y-m-d');
        $getFilter->branch_id = auth()->user()->hasPermissionTo('unit') ? auth()->user()->employee->branch_id : (request()->branch_id ?? 1);
        $getFilter->wilayah = -1;

        $branch = Branch::query()->select('id', 'unit')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->get();

        $data = UnitSaving::with('savingaccount')->whereBetween('transaction_date', [$getFilter->tanggal_start, $getFilter->tanggal])->whereNot('transaction_type', 'PO')->get();
        $data_before = UnitSaving::with('savingaccount')->where('transaction_date', "<", $getFilter->tanggal_start)->whereNot('transaction_type', 'PO')->get();
        // dd($data_before);
        $saldo_before = $data_before->where('transaction', 'D')->sum('nominal') - $data_before->where('transaction', 'K')->sum('nominal');
        $saldo = $saldo_before;
        $data_bulanan = $data->map(function ($item) use (&$saldo) {
            $saldo_before_counting = $saldo;
            $saldo = $item->transaction == "D" ? $saldo + $item->nominal : $saldo - $item->nominal;
            // dd($item->savingaccount->employee);
            return [
                'id' => $item->id,
                'bulan' => Carbon::create($item->transaction_date)->format('M Y'),
                'transaction_date' => Carbon::create($item->transaction_date)->format('Y-m-d'),
                'type_transaksi' => $item->transaction_type == "TB" ? "TABUNGAN 1JT" : ($item->transaction_type == "BP" ? "Bon Panjer" : "Pinjaman Modal"),
                'wilayah' => $item->transaction_type == "BP" ? $item->savingaccount->employee->branch->wilayah : $item->savingaccount->branch->wilayah,
                'unit' =>  $item->transaction_type == "BP" ? $item->savingaccount->employee->branch->unit : $item->savingaccount->branch->unit,
                'nama_karyawan' => $item->transaction_type == "BP" ? $item->savingaccount->employee->nama_karyawan : null,
                'saldo_sebelumya' => $saldo_before_counting,
                'debit' => $item->transaction == "D" ? $item->nominal : 0,
                'kredit' => $item->transaction == "K" ? $item->nominal : 0,
                'saldo' => $saldo,
            ];
        })->values();
        // dd($data_bulanan);

        return Inertia::render('UnitSaving/Dashboard', [
            'datas' => $data_bulanan,
            'branch' => $branch,
            'saldo_akhir' => $saldo,
            'server_filters' => $getFilter ?? null
        ]);
    }
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
            ->select('unit_saving_accounts.id as account_id', 'branches.wilayah', 'branches.id as branch_id', 'branches.unit', DB::raw('COALESCE(SUM(unit_savings.nominal), 0) as total'), DB::raw('max(transaction_date) as last_payment'))
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
                        'thismont' => Carbon::createFromDate($getFilter->tanggal, 1)->endOfMonth()->format('Y-m'),
                        'last_month_payment' => $saving_perwilayah['total'] == 0 ? 1
                            : (Carbon::createFromDate($saving_perwilayah['last_payment'], 1)->endOfMonth()->format('Y-m') == Carbon::createFromDate($getFilter->tanggal, 1)->endOfMonth()->format('Y-m') ? 0 : 1),
                        'tanggungan' => $saving_perwilayah['total'] == 0 ? 'Belum Ada Transaksi'
                            : (Carbon::createFromDate($saving_perwilayah['last_payment'], 1)->endOfMonth()->format('Y-m') == Carbon::createFromDate($getFilter->tanggal, 1)->endOfMonth()->format('Y-m') ? 'Nihil' : 'Ada Tanggungan'),
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
        $awalBulanIni = $unitSavingAccount->load('unitssaving')->unitssaving()->max('transaction_date');
        $akhirBulanIni = Carbon::now()->endOfMonth()->format('Y-m-d');

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

        $data = UnitSavingAccount::with('unitssaving', 'employee.branch')->where('account_type', 'BP')->whereNull('note')->whereHas('unitsaving', function ($query) use ($getFilter) {
            $query->where('transaction_date', "<=", $getFilter->tanggal);
        })->get();
        // dd($data);


        $data_per_pic = $data->map(function ($queries) use ($getFilter) {
            $jumlah_pinjam = $queries->unitssaving->where('transaction', 'K')->first()->nominal;
            $tanggal_pinjaman = $queries->unitssaving->where('transaction', 'K')->first()->transaction_date;
            $setoran_bulan_lalu = $queries->unitssaving->where('transaction', 'D')->where('transaction_date', "<", $getFilter->tanggal_awal)->sum('nominal');
            $setoran_bulan_ini =  $queries->unitssaving->where('transaction', 'D')->whereBetween('transaction_date', [$getFilter->tanggal_awal, $getFilter->tanggal])->sum('nominal') ?? 0;
            $pinjaman_bulan_ini =  $queries->unitssaving->where('transaction', 'K')->whereBetween('transaction_date', [$getFilter->tanggal_awal, $getFilter->tanggal])->sum('nominal') ?? 0;
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


        $isExist = UnitSavingAccount::where('employee_id', $request->employee_id)->where('account_type', 'BP')->whereNull('note')->count();

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

        return redirect()->route('bonpanjer.bon_panjer')->with('message', 'Data berhasil ditambahkan');
    }




    public function bon_panjer_show(UnitSavingAccount $unitSavingAccount)
    {
        $awalBulanIni = $unitSavingAccount->load('unitssaving')->unitssaving()->max('transaction_date');
        $akhirBulanIni = Carbon::now()->endOfMonth()->format('Y-m-d');
        $saving = $unitSavingAccount->unitssaving;

        $nominal_pinjaman = 0;
        $enableToAdd = true;

        $data = $saving->map(function ($item) use ($unitSavingAccount, &$nominal_pinjaman, &$enableToAdd) {

            $saldo = $item->transaction == "D" ? $nominal_pinjaman - $item->nominal : $nominal_pinjaman + $item->nominal;
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
                'pinjaman' => $item->transaction == "K" ? $item->nominal : 0,
                'angsuran' => $item->transaction == "D" ? $item->nominal : 0,
                'saldo' => $saldo
            ];
        });


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

        $currentDate = Carbon::now();
        $request->validate([
            'debit' => ['required', 'integer']
        ]);
        try {
            DB::beginTransaction();
            $unitsaving = $unitSavingAccount->unitssaving()->create([
                "transaction_date" => $currentDate->format('Y-m-d'),
                "nominal" => $request->debit,
                "transaction" => "D",
                "transaction_type" => "BP"
            ]);

            $tanggal_awal =    Carbon::now()->startOfMonth()->format('Y-m-d');
            if ($saldo - $request->debit == 0) {
                $unitSavingAccount->note = $tanggal_awal;
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

        // $data = UnitSavingAccount::with('unitssaving', 'branch')->whereIn('account_type', ['PM', 'PO'])->whereNull('note')->whereHas('unitsaving', function ($query) use ($getFilter) {
        //     $query->where('transaction_date', "<=", $getFilter->tanggal);
        // })->get();

        $data = UnitSaving::with('savingaccount.branch')->whereHas('savingaccount', function ($saving) {
            $saving->whereIn('account_type', ['PM', 'PO'])->whereNull('note');
        })->get();
        // dd($data);

        $data_per_pic = $data->groupBy('savingaccount.branch_id')->map(function ($queries) use ($getFilter) {
            // dd($queries);
            $kredit_owner = $queries->where('transaction', 'K')->where('transaction_type', 'PO');
            $total_setoran_owner = $queries->where('transaction', 'D')->where('transaction_type', 'PO')?->sum('nominal') ?? 0;
            $transaksi_terakhir_owner = $queries->where('transaction_type', 'PO')->sortByDesc('id')->first()?->transaction_date;


            $kredit_pusat = $queries->where('transaction', 'K')->where('transaction_type', 'PM');
            $total_setoran_pusat = $queries->where('transaction', 'D')->where('transaction_type', 'PM')?->sum('nominal') ?? 0;
            $transaksi_terakhir_pusat = $queries->where('transaction_type', 'PM')->sortByDesc('id')->first()?->transaction_date;
            // $transaksi_terakhir_pusat = $queries->where('transaction_type', 'PM')->sortBy('id', 'desc')->first();


            return [
                'branch_id' => $queries->first()->savingaccount->branch->id,
                'branch' => $queries->first()->savingaccount->branch->unit,
                'wilayah' => $queries->first()->savingaccount->branch->wilayah,

                'id_pinjaman_owner' => $kredit_owner->first()?->savingaccount->id ?? "-",
                'tanggal_pinjaman_owner' => $kredit_owner->first()?->transaction_date ?? '-',
                'nominal_pinjaman_owner' => $kredit_owner?->sum('nominal') ?? 0,
                'total_setoran_pinjaman_owner' => $total_setoran_owner ?? 0,
                'saldo_pinjaman_owner' => ($kredit_owner?->sum('nominal') ?? 0) - $total_setoran_owner,
                'transaksi_terakhir_owner' => $transaksi_terakhir_owner ?? '-',


                'id_pinjaman_pusat' => $kredit_pusat->first()?->savingaccount->id ?? "-",
                'tanggal_pinjaman_pusat' => $kredit_pusat->first()?->transaction_date ?? '-',
                'nominal_pinjaman_pusat' => $kredit_pusat?->sum('nominal') ?? 0,
                'total_setoran_pinjaman_pusat' => $total_setoran_pusat ?? 0,
                'saldo_pinjaman_pusat' => ($kredit_pusat?->sum('nominal') ?? 0) - $total_setoran_pusat,
                'transaksi_terakhir_pusat' => $transaksi_terakhir_pusat ?? '-',

                'total_pinjaman' => ($kredit_owner?->sum('nominal') ?? 0) + ($kredit_pusat?->sum('nominal') ?? 0),
                'total_saldo_pinjaman' => (($kredit_owner?->sum('nominal') ?? 0) - $total_setoran_owner) + (($kredit_pusat?->sum('nominal') ?? 0) - $total_setoran_pusat),
                'jasa_modal_owner' => $queries->sum('jasa_modal') ?? 0,



            ];
        })->sortBy('branch')->sortBy('wilayah')->values();
        // dd($data_per_pic);

        return Inertia::render('PinjamanModal/Index', [
            'datas' => $data_per_pic,
            'branch' => $branch,
            'server_filters' => $getFilter ?? null
        ]);
    }



    public function pinjaman_modal_create()
    {
        $branches = Branch::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('id', auth()->user()->employee->branch_id))->get();
        $employee = Employee::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('branch_id', auth()->user()->employee->branch_id))->get();

        return Inertia::render('PinjamanModal/Create', [
            'branch' => $branches,
            'employees' => $employee
        ]);
    }


    public function pinjaman_modal_store(Request $request)
    {

        // dd($request->all());
        $branch = Branch::find($request->branch_id);
        // dd($branch);
        $currentDate = Carbon::now();
        $request->validate([
            'setoran_awal' => ['required', 'integer', 'min:1'],
            'branch_id' => ['required', 'integer',],
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
                "transaction_date" => $currentDate->format('Y-m-d'),
                "nominal" => $request->setoran_awal,
                "transaction" => "K",
                "transaction_type" => $request->source
            ]);


            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);

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
                'saldo' => $saldo
            ];
        });


        return Inertia::render('PinjamanModal/Detail', [
            'details' => $data,
            'curent_unit' => ['id' => $unitSavingAccount->id, 'max_payment' => $nominal_pinjaman, 'wilayah' => $unitSavingAccount->branch->wilayah, 'unit' => $unitSavingAccount->branch->unit, 'nama_karyawan' => $unitSavingAccount->nama_karyawan, 'awalbulan' => $awalBulanIni, 'akhirbulan' => $akhirBulanIni, 'editable' => $enableToAdd]
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
            dd($e);
            return redirect()->route('pinjamanmodal.pinjaman_modal_show', $unitSavingAccount->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }

        return redirect()->route('pinjamanmodal.pinjaman_modal_show', $unitSavingAccount->id)->with('message', 'Data berhasil ditambahkan');
    }
}
