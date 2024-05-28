<?php

namespace App\Http\Controllers;

use App\Models\BopAccountTransaction;
use App\Models\BopTransaction;
use App\Models\Branch;
use App\Models\Employee;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BopTransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index_mutation()
    {
        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now()->subMonth()->format('Y-m'));
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = true;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');


        $data = BopTransaction::with('akun')->whereBetween('transaction_date', [$requestFilter->startOfMonth,  $requestFilter->endOfMonth])->orderBy('transaction_date', 'asc')->get();
        $data_before = BopTransaction::with('akun')->where('transaction_date', "<",  $requestFilter->startOfMonth)->get();

        $saldo_before = $data_before->where('transaction', 'D')->sum('nominal') - $data_before->where('transaction', 'K')->sum('nominal');
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

            // return  [
            //     'id' => $item->id,
            //     'bulan' => Carbon::create($item->transaction_date)->format('M Y'),
            //     'transaction_date' => Carbon::create($item->transaction_date)->format('Y-m-d'),
            //     'type_transaksi' => $item->transaction_type == "TB" ? "TABUNGAN 1JT" : ($item->transaction_type == "BP" ? "Bon Panjer" : "Pinjaman Modal"),
            //     'wilayah' => $item->transaction_type == "BP" ? $item->savingaccount->employee->branch->wilayah : $item->savingaccount->branch->wilayah,
            //     'unit' =>  $item->transaction_type == "BP" ? $item->savingaccount->employee->branch->unit : $item->savingaccount->branch->unit,
            //     'nama_karyawan' => $item->transaction_type == "BP" ? $item->savingaccount->employee->nama_karyawan : null,
            //     'saldo_sebelumya' => $saldo_before_counting,
            //     'bop' => $item->transaction == "D" && $item->transaction_type == "TB" ? $item->nominal : null,
            //     'debit' => $item->transaction == "D" && $item->transaction_type != "TB" ? $item->nominal : null,
            //     'kredit' => $item->transaction == "K" ? $item->nominal : null,
            //     'saldo' => $saldo,
            // ];


            return [
                'id' => $item->id,
                'bulan' => Carbon::create($item->transaction_date)->format('M Y'),
                'transaction_date' => Carbon::create($item->transaction_date)->format('Y-m-d'),
                'type_transaksi' => $item->transaction_type == "BOP" ? "BOP" : ($item->transaction_type == "BONPRIVE" ? 'BONPRIVE' : 'LAIN'),
                'keterangan' => $item->keterangan,
                'wilayah' => $item->akun->branch->wilayah,
                'unit' =>  $item->akun->branch->unit,
                'keterangan' => $item->keterangan,
                'nama_karyawan' => $item->transaction_type == "BONPRIVE" ? $item->akun->employee->nama_karyawan : null,
                'saldo_sebelumya' => $saldo_before_counting,

                'bop' => $item->transaction == "D" && $item->transaction_type == "BOP" ? $item->nominal : null,
                'debit' => $item->transaction == "D"  && $item->transaction_type != "BOP" ? $item->nominal : null,
                'kredit' => $item->transaction == "K" ? $item->nominal : null,
                'saldo' => $saldo,
            ];
        })->values();
        $data_bulanan->prepend($additional_array);
        // dd($data_bulanan);

        return Inertia::render('BiayaOperasional/Dashboard', [
            'datas' => $data_bulanan,
            'saldo_akhir' => $saldo,
            'server_filter' => ['bulan' => $tanggal->format('Y-m')]
        ]);
    }


    public function index_bop()
    {

        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now()->subMonth()->format('Y-m'));
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = true;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');

        $data = Branch::leftJoin('bop_account_transactions', function ($join) {
            $join->on('branches.id', '=', 'bop_account_transactions.branch_id')->where(function ($que) {
                $que->where('bop_account_transactions.transaction_type', 'BOP');
            });
        })
            ->leftJoin('bop_transactions', function ($join) use ($requestFilter) {
                $join->on('bop_account_transactions.id', '=', 'bop_transactions.bop_account_transaction_id')->where(function ($que) use ($requestFilter) {
                    $que->where('transaction_date', "<=", $requestFilter->endOfMonth);
                });
            })

            ->select('bop_account_transactions.id as account_id', 'branches.wilayah', 'branches.id as branch_id', 'branches.unit', 'branches.isactive', DB::raw('COALESCE(SUM(bop_transactions.nominal), 0) as total'), DB::raw('max(transaction_date) as last_payment'))
            ->groupBy('branches.wilayah', 'branches.id', 'branches.unit', 'bop_account_transactions.id', 'branches.isactive')
            ->get();

        // dd($data);

        $data_perunit = $data->groupBy('wilayah')->map(function ($queries) use ($requestFilter) {
            return [
                'wilayah' => $queries->first()['wilayah'],
                'data' => $queries->map(function ($saving_perwilayah) use ($requestFilter) {
                    return [
                        'wilayah' => $saving_perwilayah['wilayah'],
                        'id' => $saving_perwilayah['account_id'],
                        'unit' => $saving_perwilayah['unit'],
                        'branch_id' => $saving_perwilayah['branch_id'],
                        'total' => $saving_perwilayah['total'],
                        'lastmont' => Carbon::createFromDate($saving_perwilayah['last_year_payment'], $saving_perwilayah['last_month_payment'], 1)->format('Y-m'),
                        'thismont' => Carbon::createFromDate($requestFilter->endOfMonth, 1)->endOfMonth()->format('Y-m'),

                        'isPaid' => $saving_perwilayah['total'] == 0 ? 1
                            : (Carbon::createFromDate($saving_perwilayah['last_payment'], 1)->endOfMonth()->format('Y-m') == Carbon::createFromDate($requestFilter->endOfMonth, 1)->endOfMonth()->format('Y-m') ? 0 : 1),


                        'last_month_payment' => $saving_perwilayah['isactive'] == 0 ? 0
                            : ($saving_perwilayah['total'] == 0 ? 1
                                : (Carbon::createFromDate($saving_perwilayah['last_payment'], 1)->endOfMonth()->format('Y-m') == Carbon::createFromDate($requestFilter->endOfMonth, 1)->endOfMonth()->format('Y-m') ? 0
                                    : 1)),

                        'tanggungan' => $saving_perwilayah['isactive'] == 0 ? 'Unit Non Aktif'
                            : ($saving_perwilayah['total'] == 0 ? 'Belum Ada Transaksi'
                                : (Carbon::createFromDate($saving_perwilayah['last_payment'], 1)->endOfMonth()->format('Y-m') == Carbon::createFromDate($requestFilter->endOfMonth, 1)->endOfMonth()->format('Y-m') ? 'Nihil'
                                    : 'Ada Tanggungan')),
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




        return Inertia::render('BiayaOperasional/Index', [
            'datas' => $data_perwilayah,
            'batch_datas' => $data_perunit,
            'server_filter' => ['bulan' => $tanggal->format('Y-m')]
        ]);
    }

    public function index_bonpriv()
    {

        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now()->subMonth()->format('Y-m'));
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = true;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');



        $branch = Branch::query()->select('id', 'unit')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->get();

        $data = BopAccountTransaction::with('transaksi', 'employee.branch')->where('transaction_type', 'BONPRIVE')->where(fn ($qq) => $qq->whereNull('paid_on'))->whereHas('transaksi', function ($query) use ($requestFilter) {
            $query->where('transaction_date', "<=",   $requestFilter->endOfMonth);
        })->get();
        // dd($data);


        $data_per_pic = $data->map(function ($queries) use ($requestFilter) {
            $jumlah_pinjam = $queries->transaksi->where('transaction', 'K')->first()->nominal;
            $tanggal_pinjaman = $queries->transaksi->where('transaction', 'K')->first()->transaction_date;
            $setoran_bulan_lalu = $queries->transaksi->where('transaction', 'D')->where('transaction_date', "<",  $requestFilter->startOfMonth)->sum('nominal');
            $setoran_bulan_ini =  $queries->transaksi->where('transaction', 'D')->whereBetween('transaction_date', [$requestFilter->startOfMonth,  $requestFilter->endOfMonth])->sum('nominal') ?? 0;
            $pinjaman_bulan_ini =  $queries->transaksi->where('transaction', 'K')->whereBetween('transaction_date', [$requestFilter->startOfMonth,  $requestFilter->endOfMonth])->sum('nominal') ?? 0;
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

        return Inertia::render('BonPrive/Index', [
            'datas' => $data_per_pic,
            'branch' => $branch,
            'server_filter' => ['bulan' => $tanggal->format('Y-m')]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index_bonpriv_lunas()
    {
        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now()->subMonth()->format('Y-m'));
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = true;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');



        $branch = Branch::query()->select('id', 'unit')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->get();

        $data = BopAccountTransaction::with('transaksi', 'employee.branch')->where('transaction_type', 'BONPRIVE')->where(fn ($qq) => $qq->whereNotNull('paid_on'))->whereHas('transaksi', function ($query) use ($requestFilter) {
            $query->where('transaction_date', "<=",   $requestFilter->endOfMonth);
        })->get();
        // dd($data);


        $data_per_pic = $data->map(function ($queries) use ($requestFilter) {
            $jumlah_pinjam = $queries->transaksi->where('transaction', 'K')->first()->nominal;
            $tanggal_pinjaman = $queries->transaksi->where('transaction', 'K')->first()->transaction_date;
            $setoran_bulan_lalu = $queries->transaksi->where('transaction', 'D')->where('transaction_date', "<",  $requestFilter->startOfMonth)->sum('nominal');
            $setoran_bulan_ini =  $queries->transaksi->where('transaction', 'D')->whereBetween('transaction_date', [$requestFilter->startOfMonth,  $requestFilter->endOfMonth])->sum('nominal') ?? 0;
            $pinjaman_bulan_ini =  $queries->transaksi->where('transaction', 'K')->whereBetween('transaction_date', [$requestFilter->startOfMonth,  $requestFilter->endOfMonth])->sum('nominal') ?? 0;
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

        return Inertia::render("BonPrive/Lunas", [
            'datas' => $data_per_pic,
            'server_filter' => ['bulan' => $tanggal->format('Y-m')]
        ]);
    }

    public function create_mutation()
    {

        $akhirBulanIni = Carbon::now()->endOfMonth()->format('Y-m-d');
        $awalBulanIni = Carbon::now()->startOfMonth()->subMonth(1)->format('Y-m-d');
        return Inertia::render('BiayaOperasional/Outcome', [
            'curent_unit' => ['akhirbulan' => $akhirBulanIni, 'awalbulan' => $awalBulanIni],
        ]);
    }

    public function create_bop(Branch $branch)
    {
        $id = $branch->id;
        $akhirBulanIni = Carbon::now()->endOfMonth()->format('Y-m-d');
        $awalBulanIni = Carbon::now()->startOfMonth()->subMonth(1)->format('Y-m-d');

        $branches = Branch::where('id', $id)->get();
        $employee = Employee::where('branch_id', $id)->get();
        return Inertia::render('BiayaOperasional/Create', [
            'branch' => $branches,
            'employees' => $employee,
            'curent_unit' => ['akhirbulan' => $akhirBulanIni, 'awalbulan' => $awalBulanIni],
        ]);
    }

    public function create_bonpriv()
    {
        $akhirBulanIni = Carbon::now()->endOfMonth()->format('Y-m-d');
        $awalBulanIni = Carbon::now()->startOfMonth()->subMonth(1)->format('Y-m-d');
        // $branches = Branch::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('id', auth()->user()->employee->branch_id))->get();
        $employee = Employee::where('branch_id', 91)->get();

        return Inertia::render('BonPrive/Create', [
            // 'branch' => $branches,

            'curent_unit' => ['akhirbulan' => $akhirBulanIni, 'awalbulan' => $awalBulanIni],
            'employees' => $employee
        ]);
    }

    public function store_mutation(Request $request)
    {


        $validation = $request->validate([
            "nominal" => ['required', 'integer', 'min:1'],
            "keterangan" => ['required', 'string'],
            'transaction_date' => ['required', 'date']

        ]);

        try {
            DB::beginTransaction();
            $akun = BopAccountTransaction::where('transaction_type', 'LAIN')->first();
            $akun->transaksi()->create([
                "transaction_date" => $request->transaction_date,
                'transaction' => "K",
                'transaction_type' => 'LAIN',
                'nominal' => $request->nominal,
                'keterangan' => $request->keterangan
            ]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->route('mutation.create')->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }


        return redirect()->route('mutation.index')->with('message', 'Data berhasil ditambahkan');
    }



    public function store_bop(Request $request)
    {

        $request->validate([
            'branch_id' => ['required', 'integer'],
            'setoran_awal' => ['required', 'integer'],
            'transaction_date' => ['required', 'date']
        ]);

        $branch = Branch::find($request->branch_id);
        // dd($branch);
        try {
            DB::beginTransaction();
            $bopAccount = BopAccountTransaction::create([
                "branch_id" => $request->branch_id,
                "transaction_type" => 'BOP',
                "mark" => 'BOP Unit ' . $branch->unit,
            ]);


            $bopAccount->transaksi()->create([
                "transaction_date" => $request->transaction_date,
                'transaction' => "D",
                'transaction_type' => 'BOP',
                'nominal' => $request->setoran_awal,
                'keterangan' => 'Pembayaran ' . $bopAccount['mark']
            ]);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);
            return redirect()->route('bop.index')->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }

        return redirect()->route('bop.index')->with('message', 'Data berhasil ditambahkan');
    }



    public function store_bonpriv(Request $request)
    {

        $validation = $request->validate([
            "employee_id" => ['required'],
            "besar_pinjaman" => ['required'],
            'transaction_date' => ['required', 'date']

        ]);

        // dd($validation);

        $isactivebonprive = BopAccountTransaction::where('employee_id', $request->employee_id)->whereNull('paid_on')->first();


        if ($isactivebonprive !== null) {
            return redirect()->route('bonpriv.show', $isactivebonprive->id)->withErrors('PIC Masih mempunyai bon priv aktif');
        }

        try {
            DB::beginTransaction();
            $branch = Employee::find($request->employee_id);
            $generate_new_account = BopAccountTransaction::create([
                'branch_id' => $branch->branch_id,
                'employee_id' => $request->employee_id,
                'mark' => 'Bon Prive ' . $branch->nama_karyawan,
                'transaction_type' => 'BONPRIVE',
            ]);

            $generate_new_account->transaksi()->create([
                'transaction_date' => $request->transaction_date,
                'transaction' => "K",
                'transaction_type' => 'BONPRIVE',
                'nominal' => $request->besar_pinjaman,
                'keterangan' => 'Pinjaman ' . $generate_new_account['mark']
            ]);

            // dd($generate_new_account->id);
            //
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('bonpriv.create')->withErrors('terjadi kesalahan, mohon refresh browser atau hubungi IT');
        }

        return redirect()->route('bonpriv.show', $generate_new_account->id)->with('message', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\BopTransaction  $bopTransaction
     * @return \Illuminate\Http\Response
     */
    public function show(BopTransaction $bopTransaction)
    {
        //
    }


    public function show_bop(BopAccountTransaction $bopAccountTransaction)
    {
        $saving = $bopAccountTransaction->load('transaksi');
        $saldo_before = 0;
        $enableToAdd = true;
        $awalBulanIni = Carbon::createFromDate($bopAccountTransaction->load('transaksi')->transaksi()->max('transaction_date'))->endOfMonth()->addDay(1)->format('Y-m-d');
        $akhirBulanIni = Carbon::now()->endOfMonth()->format('Y-m-d');

        $data = $saving->transaksi->map(function ($item) use (&$saldo_before, $saving, &$enableToAdd) {
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

        return Inertia::render('BiayaOperasional/Detail', [
            'details' => $data,
            'curent_unit' => ['id' => $bopAccountTransaction->id, 'wilayah' => $saving->load('branch')->branch->wilayah, 'unit' => $saving->load('branch')->branch->unit, 'awalbulan' => $awalBulanIni, 'akhirbulan' => $akhirBulanIni, 'editable' => $enableToAdd]
        ]);
    }


    public function show_bonpriv(BopAccountTransaction $bopAccountTransaction)
    {

        $dataMaping = $bopAccountTransaction->load('transaksi', 'employee', 'branch');
        $akhirBulanIni = Carbon::now()->endOfMonth()->format('Y-m-d');
        $awalBulanIni = Carbon::create($dataMaping->transaksi()->max('transaction_date'))->endOfMonth();
        $nominal_pinjaman = 0;

        $data = $dataMaping->transaksi->map(function ($item) use ($bopAccountTransaction, &$nominal_pinjaman) {

            $saldo = $item->transaction == "D" ? $nominal_pinjaman - $item->nominal : $nominal_pinjaman + $item->nominal;

            $saldo_sebelum = $nominal_pinjaman;

            $nominal_pinjaman = $saldo;

            return [
                'wilayah' => $bopAccountTransaction->branch->wilayah,
                'unit' => $bopAccountTransaction->branch->unit,
                'nama_karyawan' => $bopAccountTransaction->employee->nama_karyawan,

                'transaction_date' => $item->transaction_date,
                'saldo_sebelum' => $saldo_sebelum,

                'pinjaman' => $item->transaction == "K" ? $item->nominal : 0,
                'angsuran' => $item->transaction == "D" ? $item->nominal : 0,
                'saldo' => $saldo
            ];
        });

        // dd($data);

        return Inertia::render('BonPrive/Detail', [
            'details' => $data,
            'curent_unit' => [
                'id' => $bopAccountTransaction->id, 'wilayah' => $bopAccountTransaction->branch->wilayah, 'unit' => $bopAccountTransaction->branch->unit, 'nama_karyawan' => $bopAccountTransaction->employee->nama_karyawan, 'awalbulan' => $awalBulanIni, 'akhirbulan' => $akhirBulanIni, 'editable' => $bopAccountTransaction->paid_on == null ? true : false
            ]
        ]);

        // return response()->json([
        //     'data' => $bopAccountTransaction
        // ]);
        // // dd($bopAccountTransaction->load('transaksi'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\BopTransaction  $bopTransaction
     * @return \Illuminate\Http\Response
     */
    public function edit(BopTransaction $bopTransaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\BopTransaction  $bopTransaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, BopAccountTransaction $bopAccountTransaction)
    {
        //
    }

    public function update_bop(Request $request, BopAccountTransaction $bopAccountTransaction)
    {
        // $pinjaman = $bopAccountTransaction->load('transaksi')->transaksi()->where('transaction', 'K')->sum('nominal');
        // $total_angsuran = $bopAccountTransaction->load('transaksi')->transaksi()->where('transaction', 'D')->sum('nominal');
        // $saldo = $pinjaman - $total_angsuran;

        // if ($saldo - $request->debit < 0) {
        //     return redirect()->route('bop.show', $bopAccountTransaction->id)->withErrors('Saldo tidak boleh melebihi 0');
        // }

        // dd($request->all());
        try {
            DB::beginTransaction();
            $bopAccountTransaction->transaksi()->create([
                'transaction_date' => $request->transaction_date,
                'transaction' => "D",
                'transaction_type' => 'BOP',
                'nominal' => $request->debit,
                'keterangan' => 'Pembayaran ' . $bopAccountTransaction->mark
            ]);


            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('bop.index')->withErrors('terjadi kesalahan, mohon refresh browser atau hubungi IT');
        }
        return redirect()->route('bop.show', $bopAccountTransaction->id)->with('message', 'Data berhasil ditambahkan');
    }

    public function update_bonpriv(Request $request, BopAccountTransaction $bopAccountTransaction)
    {
        $pinjaman = $bopAccountTransaction->load('transaksi')->transaksi()->where('transaction', 'K')->sum('nominal');
        $total_angsuran = $bopAccountTransaction->load('transaksi')->transaksi()->where('transaction', 'D')->sum('nominal');
        $saldo = $pinjaman - $total_angsuran;

        if ($saldo - $request->debit < 0) {
            return redirect()->route('bonpriv.show', $bopAccountTransaction->id)->withErrors('Saldo tidak boleh melebihi 0');
        }

        try {
            DB::beginTransaction();
            $bopAccountTransaction->transaksi()->create([
                'transaction_date' => $request->transaction_date,
                'transaction' => "D",
                'transaction_type' => 'BONPRIVE',
                'nominal' => $request->debit,
                'keterangan' => 'Pembayaran ' . $bopAccountTransaction->mark
            ]);

            if ($saldo - $request->debit == 0) {
                $bopAccountTransaction->paid_on = $request->transaction_date;
                $bopAccountTransaction->save();
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('bonpriv.create')->withErrors('terjadi kesalahan, mohon refresh browser atau hubungi IT');
        }
        return redirect()->route('bonpriv.show', $bopAccountTransaction->id)->with('message', 'Data berhasil ditambahkan');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\BopTransaction  $bopTransaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(BopTransaction $bopTransaction)
    {
        //
    }
}
