<?php

namespace App\Http\Controllers;

use App\Models\Deposit;
use Illuminate\Http\Request;
use App\Models\Branch;
use App\Models\Employee;
use App\Models\MandatoryDepositTransaction;
use App\Models\OptionalDepositTransaction;
use Carbon\Carbon;
use Exception;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use stdClass;

use Illuminate\Database\Eloquent\Builder;
use SebastianBergmann\CodeCoverage\Report\Xml\Unit;

class DepositController extends Controller
{

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

        $simpanan = Deposit::with('employee', 'branch')->where('sw_balance', ">", 0)->orWhere('sk_balance', ">", 0)->withFilter($getFilter)->get();

        $data = collect($simpanan)->map(fn ($que) => [
            'id' => $que->id,
            'wilayah' => $que->branch->wilayah ?? '-',
            'unit' => $que->branch->unit ?? '-',
            'nama' => $que->employee->nama_karyawan ?? '-',
            'jabatan' => $que->employee->jabatan ?? '-',
            'tanggal_tabungan' => $que->tgl_tabugan ?? '-',
            'saldo_sw' => $que->sw_balance ?? 0,
            'saldo_sk' => $que->sk_balance ?? 0,
            'total_saldo' => ($que->sw_balance ?? 0) + ($que->sk_balance ?? 0),
            'isactive' => $que->employee->date_resign ? 1 : 2,
            'status_karyawan' => $que->employee->date_resign ? 'Non Aktiv' : 'Aktiv',
            'hiredate' => $que->employee->hire_date ?? '-',
        ])->sortBy('wilayah')->sortBy('unit')->values();


        // dd($data);
        return Inertia::render('Sk/Index', [
            'datas' => $data,
            'branch' => $branch,
            'server_filters' => $getFilter ?? null
        ]);
    }


    public function create()
    {
        $branch = Branch::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('id', auth()->user()->employee->branch_id))->get();
        $employee = Employee::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('branch_id', auth()->user()->employee->branch_id))->get();
        return Inertia::render('Sk/Create', [
            'branch' => $branch,
            'employees' => $employee
        ]);
    }

    public function store(Request $request)
    {
        $validation = $request->validate([
            "employee_id" => ['required', 'numeric'],
            "sw_balance" => ['required', 'numeric'],
            "sk_balance" => ['required', 'numeric'],
            "tgl_tabugan" => ['required'],


        ], [
            '*.required' => ['wajib diisi'],
            '*.numeric' => ['isikan angka minimal 1'],
            '*.string' => ['karakter eror hanya masukkan angka dan huruf saja'],
            '*.unique' => ['karyawan sudah mempunyai simpanan sebelumnya'],
        ]);


        $karyawan = Employee::find($request->employee_id);
        $tanggal_tabungan = Carbon::parse($request->tgl_tabugan)->endOfMonth()->format('Y-m-d');
        try {
            DB::beginTransaction();

            $deposit = Deposit::firstOrCreate([
                "employee_id" => $request->employee_id,
            ], [
                "branch_id" => $karyawan->branch_id,
                "tgl_tabugan" => $tanggal_tabungan,
                "sw_balance" => $request->sw_balance,
                "sk_balance" => $request->sk_balance,
            ]);



            if (!$deposit->wasRecentlyCreated) {
                if ($deposit->sk_balance > 0 || $deposit->sw_balance > 0) {
                    return redirect()->route('simpanan.index')->withErrors('Karyawan masih mempunyai tabungan aktiv');
                }
                $deposit->update([
                    'sw_balance' => $request->sw_balance,
                    'sk_balance' => $request->sk_balance,
                ]);
            }


            $mandatorytransaction = $deposit->mandatorytrasactions()->create(
                [
                    'branch_id' => $karyawan->branch_id,
                    'transaction_date' => $tanggal_tabungan,
                    'transaction_month' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->month,
                    'transaction_year' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->year,
                    'transaction' => 'D',
                    'balance_before' => 0,
                    'debit' => $request->sw_balance,
                    'kredit' => 0,
                    'balance' => $request->sw_balance,
                    'transaction_type' => 'D',
                    'transaction_input_user_id' => auth()->user()->id,
                ]
            );

            $optionalTransaction = $deposit->optionaltrasactions()->create(
                [
                    'branch_id' => $karyawan->branch_id,
                    'transaction_date' => $tanggal_tabungan,
                    'transaction_month' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->month,
                    'transaction_year' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->year,
                    'transaction' => 'D',
                    'balance_before' => 0,
                    'debit' => $request->sk_balance,
                    'kredit' => 0,
                    'balance' => $request->sk_balance,
                    'transaction_type' => 'D',
                    'transaction_input_user_id' => auth()->user()->id,
                ]
            );


            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            dd($e);
            return redirect()->route('simpanan.index')->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }
        return redirect()->route('simpanan.index')->with('message', 'Data berhasil ditambahkan');
    }

    public function show(Deposit $deposit)
    {
        //
    }


    public function edit(Deposit $deposit)
    {
        //
    }


    public function update(Request $request, Deposit $deposit)
    {
        //
    }


    public function destroy(Deposit $deposit)
    {
        //
    }

    public function swdestroy(MandatoryDepositTransaction $mandatoryDepositTransaction)
    {
        try {
            DB::beginTransaction();
            if ($mandatoryDepositTransaction->transaction == "D") {
                // dd("d");
                $mandatoryDepositTransaction->deposit->sw_balance =  $mandatoryDepositTransaction->deposit->sw_balance - $mandatoryDepositTransaction->debit;
                $mandatoryDepositTransaction->deposit->save();
                $mandatoryDepositTransaction->delete();
            } else if ($mandatoryDepositTransaction->transaction == "K") {
                // dd("k");
                $mandatoryDepositTransaction->deposit->sw_balance =  $mandatoryDepositTransaction->deposit->sw_balance + $mandatoryDepositTransaction->debit;
                $mandatoryDepositTransaction->deposit->save();
                $mandatoryDepositTransaction->delete();
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();
            // dd($e);
            return redirect()->back()->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }
        return redirect()->route('simpanan.transaksi', $mandatoryDepositTransaction->deposit->id)->with('message', 'data berhasil di hapuskan');
    }

    public function skdestroy(OptionalDepositTransaction $optionalDepositTransaction)
    {

        try {
            DB::beginTransaction();
            if ($optionalDepositTransaction->transaction == "D") {
                // dd("D");
                $optionalDepositTransaction->deposit->sk_balance =  $optionalDepositTransaction->deposit->sk_balance - $optionalDepositTransaction->debit;
                $optionalDepositTransaction->deposit->save();
                $optionalDepositTransaction->delete();
            } else if ($optionalDepositTransaction->transaction == "K") {
                // dd("K");
                $optionalDepositTransaction->deposit->sk_balance =  $optionalDepositTransaction->deposit->sk_balance + $optionalDepositTransaction->debit;
                $optionalDepositTransaction->deposit->save();
                $optionalDepositTransaction->delete();
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            dd($e);
            return redirect()->back()->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }
        return redirect()->route('simpanan.transaksi', $optionalDepositTransaction->deposit->id)->with('message', 'data berhasil di hapuskan');
    }


    public function transaksi(Deposit $deposit)
    {


        $branch = Branch::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('id', auth()->user()->employee->branch_id))->get();
        $employee = Employee::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('branch_id', auth()->user()->employee->branch_id))->get();
        return Inertia::render('Sk/Transaksi', [
            'deposit' => $deposit->load('optionaltrasactions.branch', 'mandatorytrasactions.branch', 'branch', 'employee'),
            'branch' => $branch,
            'employees' => $employee
        ]);
    }

    public function addtransaksi(Deposit $deposit, Request $request)
    {

        // dd([$request->all(), $deposit]);
        $request->validate([
            'transaction_date' => ['required'],
            'transaction' => ['required'],
            'transaction_type' => ['required']
        ]);

        $tanggal_tabungan = Carbon::parse($request->transaction_date)->endOfMonth()->format('Y-m-d');
        // dd($tanggal_tabungan);
        try {
            DB::beginTransaction();
            if ($request->transaction == "D") {
                if ($request->nominal_sw > 0) {
                    $sw_balance = $deposit->sw_balance;
                    $req_sw_balance = $request->saldo_awal_sw;
                    $after_sw_balance = $req_sw_balance + $request->nominal_sw;
                    if ($sw_balance !== $req_sw_balance) {
                        return redirect()->route('simpanan.transaksi', $deposit->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
                    }

                    $deposit->sw_balance = $after_sw_balance;

                    $deposit->mandatorytrasactions()->create([
                        "branch_id" => $deposit->branch_id,
                        "transaction_date" => $tanggal_tabungan,

                        'transaction_month' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->month,
                        'transaction_year' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->year,


                        "transaction" => $request->transaction,

                        "balance_before" => $sw_balance,

                        "debit" => $request->nominal_sw,
                        "kredit" => 0,
                        "balance" => $after_sw_balance,

                        "transaction_type" => $request->transaction_type,
                        "transaction_input_user_id" => auth()->user()->employee_id,
                    ]);
                }
                if ($request->nominal_sk > 0) {
                    $sk_balance = $deposit->sk_balance;
                    $req_sk_balance = $request->saldo_awal_sk;
                    $after_sk_balance = $req_sk_balance + $request->nominal_sk;
                    if ($sk_balance !== $req_sk_balance) {
                        return redirect()->route('simpanan.transaksi', $deposit->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
                    }

                    $deposit->sk_balance = $after_sk_balance;

                    $deposit->optionaltrasactions()->create([
                        "branch_id" => $deposit->branch_id,
                        "transaction_date" => $tanggal_tabungan,

                        'transaction_month' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->month,
                        'transaction_year' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->year,


                        "transaction" => $request->transaction,

                        "balance_before" => $sk_balance,

                        "debit" => $request->nominal_sk,
                        "kredit" => 0,
                        "balance" => $after_sk_balance,

                        "transaction_type" => $request->transaction_type,
                        "transaction_input_user_id" =>  auth()->user()->employee_id,
                    ]);
                }
            }

            if ($request->transaction == "K") {
                if ($request->nominal_sw > 0) {
                    $sw_balance = $deposit->sw_balance;
                    $req_sw_balance = $request->saldo_awal_sw;
                    $after_sw_balance = $req_sw_balance - $request->nominal_sw;

                    if ($sw_balance !== $req_sw_balance || $after_sw_balance < 0) {
                        return redirect()->route('simpanan.transaksi', $deposit->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
                    }

                    $deposit->sw_balance = $after_sw_balance;

                    $deposit->mandatorytrasactions()->create([
                        "branch_id" => $deposit->branch_id,
                        "transaction_date" => $tanggal_tabungan,

                        'transaction_month' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->month,
                        'transaction_year' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->year,


                        "transaction" => $request->transaction,

                        "balance_before" => $sw_balance,

                        "kredit" => $request->nominal_sw,
                        "debit" => 0,
                        "balance" => $after_sw_balance,

                        "transaction_type" => $request->transaction_type,
                        "transaction_input_user_id" => auth()->user()->employee_id,
                    ]);

                    if ($request->transaction_type == "KRMD") {
                        $employee = Employee::find($deposit->employee_id);
                        $employee->pencairan_simpanan_w_date = $tanggal_tabungan;
                        $employee->pencairan_simpanan_w_by = auth()->user()->employee_id;
                        $employee->save();
                    }
                }
                if ($request->nominal_sk > 0) {
                    $sk_balance = $deposit->sk_balance;
                    $req_sk_balance = $request->saldo_awal_sk;
                    $after_sk_balance = $req_sk_balance - $request->nominal_sk;

                    if ($sk_balance !== $req_sk_balance || $after_sk_balance < 0) {
                        return redirect()->route('simpanan.transaksi', $deposit->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
                    }

                    $deposit->sk_balance = $after_sk_balance;

                    $deposit->optionaltrasactions()->create([
                        "branch_id" => $deposit->branch_id,
                        "transaction_date" => $tanggal_tabungan,

                        'transaction_month' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->month,
                        'transaction_year' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->year,


                        "transaction" => $request->transaction,

                        "balance_before" => $sk_balance,

                        "kredit" => $request->nominal_sk,
                        "debit" => 0,
                        "balance" => $after_sk_balance,

                        "transaction_type" => $request->transaction_type,
                        "transaction_input_user_id" =>  auth()->user()->employee_id,
                    ]);

                    if ($request->transaction_type == "KRMD") {
                        $employee = Employee::find($deposit->employee_id);
                        $employee->pencairan_simpanan_date = $tanggal_tabungan;
                        $employee->pencairan_simpanan_by = auth()->user()->employee_id;
                        $employee->save();
                    }
                }
            }

            if ($request->transaction == "M") {
                $request->validate([
                    'branch_id' => ['required']
                ]);

                $sw_saldo = $deposit->sw_balance;
                $sk_saldo = $deposit->sk_balance;
                $branch_asal = $deposit->branch_id;

                // change id, deposit_id, branch_id, transaction_date, transaction_month, transaction_year, transaction, balance_before, debit, kredit, balance, transaction_type, transaction_input_user_id, created_at, updated_at


                // change deposit
                $deposit->branch_id = $request->branch_id;

                $transaksi_sw = [
                    // keluarkan dari branch awal
                    [
                        "branch_id" => $branch_asal,
                        "transaction_date" => $tanggal_tabungan,
                        'transaction_month' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->month,
                        'transaction_year' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->year,
                        "transaction" => "K",
                        "transaction_type" => "KM",

                        "transaction_input_user_id" =>  auth()->user()->employee_id,

                        "balance_before" => $sw_saldo,
                        "debit" => 0,
                        "kredit" => $sw_saldo,
                        "balance" => 0,
                    ],
                    // masukkan ke branch baru
                    [
                        "branch_id" => $request->branch_id,
                        "transaction_date" => $tanggal_tabungan,
                        'transaction_month' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->month,
                        'transaction_year' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->year,
                        "transaction" => "D",
                        "transaction_type" => "DM",

                        "transaction_input_user_id" =>  auth()->user()->employee_id,

                        "balance_before" => 0,
                        "debit" => $sw_saldo,
                        "kredit" => 0,
                        "balance" => $sw_saldo,
                    ]
                ];

                $transaksi_sk = [
                    // keluarkan dari branch awal buat balance menjadi 0
                    [
                        "branch_id" => $branch_asal,
                        "transaction_date" => $tanggal_tabungan,
                        'transaction_month' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->month,
                        'transaction_year' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->year,
                        "transaction" => "K",
                        "transaction_type" => "KM",

                        "transaction_input_user_id" =>  auth()->user()->employee_id,

                        "balance_before" => $sk_saldo,
                        "debit" => 0,
                        "kredit" => $sk_saldo,
                        "balance" => 0,
                    ],

                    // masukkan ke branch baru membuat balance sejumlah kredit
                    [
                        "branch_id" => $request->branch_id,
                        "transaction_date" => $tanggal_tabungan,
                        'transaction_month' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->month,
                        'transaction_year' => Carbon::createFromFormat('Y-m-d', $tanggal_tabungan)->year,
                        "transaction" => "D",
                        "transaction_type" => "DM",

                        "transaction_input_user_id" =>  auth()->user()->employee_id,

                        "balance_before" => 0,
                        "debit" => $sk_saldo,
                        "kredit" => 0,
                        "balance" => $sk_saldo,
                    ]
                ];


                $deposit->mandatorytrasactions()->createMany($transaksi_sw);
                $deposit->optionaltrasactions()->createMany($transaksi_sk);
            }
            $deposit->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            dd($e);
            return redirect()->route('simpanan.transaksi', $deposit->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }
        return redirect()->route('simpanan.transaksi', $deposit->id)->with('message', 'Data berhasil ditambahkan');
    }


    public function global()
    {
        $branch = Branch::query()->select('id', 'unit')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->get();

        $simpanan = Deposit::with('employee', 'branch')->withFilter()->get();

        $totalBalancePerUnit = $simpanan->groupBy('branch_id')->map(function ($data) {
            return [
                'wilayah' => $data->first()->branch->wilayah,
                'unit' => $data->first()->branch->unit,
                'total_balance' => $data->sum('balance')
            ];
        })->values();

        dd($totalBalancePerUnit);
    }


    //   SK PERBULAN
    public function detailPerBulan()
    {
        $branch = Branch::query()->select('wilayah')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->distinct()->get();

        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??  Carbon::now()->month;
        $getFilter->wilayah = auth()->user()->hasPermissionTo('unit') ? auth()->user()->employee->area : (request()->wilayah ?? 0);
        // $getFilter->wilayah = request()->wilayah ?? 1;



        $getBranch = Branch::where('wilayah', $getFilter->wilayah)->pluck('id');

        $queryBuilder = OptionalDepositTransaction::query();
        $queryBuilder->selectRaw('*, RANK() OVER (PARTITION BY deposit_id, branch_id ORDER BY transaction_month ASC) AS ranking')
            ->where('transaction_month', '<=', $getFilter->transaction_month)
            ->where('transaction_year', '<=', $getFilter->transaction_year)
            ->whereIn('branch_id', $getBranch);

        $queryId = $queryBuilder->getQuery()
            ->fromSub($queryBuilder, 'a')
            ->where('a.ranking', '=', 1)
            ->pluck('id');

        $simpenan = OptionalDepositTransaction::with('deposit.branch', 'deposit.employee', 'branch')->whereIn('id', $queryId)->orderBy('branch_id')->get();

        // $simpenan = OptionalDepositTransaction::with('deposit.branch', 'deposit.employee', 'branch')->withFilter($getFilter)->get();
        $groupingPerUnit = $simpenan->groupBy('branch_id')->map(function ($data) use ($getFilter) {
            return [
                'branch_id' => $data->first()->branch_id,
                'unit' => $data->first()->branch->unit,
                'data' => $data->groupBy('deposit_id')->map(function ($quer) use ($getFilter) {
                    $firstRecord = $quer->sortBy('id')->first();
                    $lastRecord = $quer->sortByDesc('id')->first();
                    return [
                        'wilayah' => $firstRecord->branch->wilayah,
                        'unit' => $firstRecord->branch->unit,
                        'bulan' => Carbon::create()->month($firstRecord->transaction_month)->format('F') . " " . $firstRecord->transaction_year,
                        'id_tabungan' => $firstRecord->deposit_id,
                        'nama_karyawan' => $firstRecord->deposit->employee->nama_karyawan,
                        'balance_before' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $firstRecord->balance_before : $lastRecord->balance,
                        'debit' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ?  $quer->sum('debit') : 0,
                        'kredit' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ?  $quer->sum('kredit') : 0,
                        'balance' => $lastRecord->balance ?? 0,
                        'K' => $quer->where('transaction_type', 'K')->sum('kredit'),
                        'D' => $quer->where('transaction_type', 'D')->sum('debit'),
                        'KM' => $quer->where('transaction_type', 'KM')->sum('kredit'),
                        'DM' => $quer->where('transaction_type', 'DM')->sum('debit'),
                        'KRMD' => $quer->where('transaction_type', 'KRMD')->sum('kredit'),
                    ];
                })->values()
            ];
        })->values();



        // dd($groupingPerUnit);

        return Inertia::render('Sk/DetailPerBulan', [
            'batch_datas' => $groupingPerUnit,
            'branch' => $branch,
            'server_filters' => $getFilter ?? null
        ]);
    }



    // SW PERBULAN
    public function sw_perbulan()
    {
        $branch = Branch::query()->select('wilayah')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->distinct()->get();



        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??  Carbon::now()->month;
        $getFilter->wilayah = auth()->user()->hasPermissionTo('unit') ? auth()->user()->employee->area : (request()->wilayah ?? 0);



        $getBranch = Branch::where('wilayah', $getFilter->wilayah)->pluck('id');

        $queryBuilder = MandatoryDepositTransaction::query();
        $queryBuilder->selectRaw('*, RANK() OVER (PARTITION BY deposit_id, branch_id ORDER BY transaction_month ASC) AS ranking')
            ->where('transaction_month', '<=', $getFilter->transaction_month)
            ->where('transaction_year', '<=', $getFilter->transaction_year)
            ->whereIn('branch_id', $getBranch);

        $queryId = $queryBuilder->getQuery()
            ->fromSub($queryBuilder, 'a')
            ->where('a.ranking', '=', 1)
            ->pluck('id');

        $simpenan = MandatoryDepositTransaction::with('deposit.branch', 'deposit.employee', 'branch')->whereIn('id', $queryId)->orderBy('branch_id')->get();


        $groupingPerUnit = $simpenan->groupBy('branch_id')->map(function ($data) use ($getFilter) {
            return [
                'branch_id' => $data->first()->branch_id,
                'unit' => $data->first()->branch->unit,
                'data' => $data->groupBy('deposit_id')->map(function ($quer) use ($getFilter) {
                    $firstRecord = $quer->sortBy('id')->first();
                    $lastRecord = $quer->sortByDesc('id')->first();
                    return [
                        'wilayah' => $firstRecord->branch->wilayah,
                        'unit' => $firstRecord->branch->unit,
                        'bulan' => Carbon::create()->month($firstRecord->transaction_month)->format('F') . " " . $firstRecord->transaction_year,
                        'id_tabungan' => $firstRecord->deposit_id,
                        'nama_karyawan' => $firstRecord->deposit->employee->nama_karyawan,
                        'balance_before' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $firstRecord->balance_before : $lastRecord->balance,
                        'debit' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ?  $quer->sum('debit') : 0,
                        'kredit' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ?  $quer->sum('kredit') : 0,
                        'balance' => $lastRecord->balance ?? 0,

                        'K' => $quer->where('transaction_type', 'K')->sum('kredit'),
                        'D' => $quer->where('transaction_type', 'D')->sum('debit'),
                        'KM' => $quer->where('transaction_type', 'KM')->sum('kredit'),
                        'DM' => $quer->where('transaction_type', 'DM')->sum('debit'),
                        'KRMD' => $quer->where('transaction_type', 'KRMD')->sum('kredit'),
                    ];
                })->values()
            ];
        })->values();


        // dd($groupingPerUnit);

        return Inertia::render('Sk/SwPerbulan', [
            'batch_datas' => $groupingPerUnit,
            'branch' => $branch,
            'server_filters' => $getFilter ?? null
        ]);
    }





    // SK PERUNIT
    public function globalPerBulan()
    {

        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??  Carbon::now()->month;
        // $getFilter->wilayah = request()->wilayah ?? 1;


        // $getBranch = Branch::where('wilayah', $getFilter->wilayah)->pluck('id');
        $queryBuilder = OptionalDepositTransaction::query();
        $queryBuilder->selectRaw('*, RANK() OVER (PARTITION BY deposit_id, branch_id ORDER BY transaction_month ASC) AS ranking')
            ->where('transaction_month', '<=', $getFilter->transaction_month)
            ->where('transaction_year', '<=', $getFilter->transaction_year);
        // ->whereIn('branch_id', $getBranch);

        $queryId = $queryBuilder->getQuery()
            ->fromSub($queryBuilder, 'a')
            ->where('a.ranking', '=', 1)
            ->pluck('id');

        $simpenan = OptionalDepositTransaction::with('deposit.branch', 'deposit.employee', 'branch')->whereIn('id', $queryId)->orderBy('branch_id')->get();
        $groupingPerUnit = $simpenan->groupBy('branch.wilayah')->map(function ($data) use ($getFilter) {
            return [
                'wilayah' => $data->first()->branch->wilayah,
                'data' => $data->groupBy('branch_id')->map(function ($quer) use ($getFilter) {
                    return [
                        'wilayah' => $quer->first()->branch->wilayah,
                        'unit' => $quer->first()->branch->unit,
                        'branch_id' => $quer->first()->branch->branch_id,
                        'bulan' => Carbon::create()->month($quer->first()->transaction_month)->format('F') . " " . $quer->sortByDesc('id')->first()->transaction_year,

                        'balance_before' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sortBy('id')->first()->balance_before : $q->sortByDesc('id')->first()->balance;
                            return $data;
                        })->values()->sum(),


                        'detail_balance_before' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? [$q->sortBy('id')->first()->id, $q->sortBy('id')->first()->balance_before, 'before'] : [$q->sortBy('id')->first()->id, $q->sortByDesc('id')->first()->balance, 'balance'];
                            return $data;
                        })->values(),



                        'debit' =>  $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('debit') : 0;
                            return $data;
                        })->values()->sum(),

                        'kredit' =>  $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('kredit') : 0;
                            return $data;
                        })->values()->sum(),



                        'balance' =>  $quer->groupBy('deposit_id')->map(fn ($q) => $q->sortByDesc('id')->first()->balance)->values()->sum(),

                        'detail_balance' => $quer->groupBy('deposit_id')->map(fn ($q) => [$q->sortByDesc('id')->first()->id, $q->sortByDesc('id')->first()->balance])->values(),

                        'K' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'K')->sum('kredit') : 0;
                            return $data;
                        })->values()->sum(),

                        'D' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'D')->sum('debit') : 0;
                            return $data;
                        })->values()->sum(),

                        'KM' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'KM')->sum('kredit') : 0;
                            return $data;
                        })->values()->sum(),

                        'DM' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'DM')->sum('debit') : 0;
                            return $data;
                        })->values()->sum(),


                        'KRMD' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'KRMD')->sum('kredit') : 0;
                            return $data;
                        })->values()->sum(),
                    ];
                })->sortBy('unit')->values()
            ];
        })->sortBy('wilayah')->values();


        // dd(json_encode($groupingPerUnit[1]['data'][13]['detail_balance']));
        return Inertia::render('Sk/GlobalPerBulan', [
            'batch_datas' => $groupingPerUnit,
            'server_filters' => $getFilter ?? null
        ]);
    }



    // SW GLOBAL PERUNIT
    public function sw_global()
    {


        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??  Carbon::now()->month;
        // $getFilter->wilayah = -1;

        // $getBranch = Branch::where('wilayah', $getFilter->wilayah)->pluck('id');
        $queryBuilder = MandatoryDepositTransaction::query();
        $queryBuilder->selectRaw('*, RANK() OVER (PARTITION BY deposit_id, branch_id ORDER BY transaction_month ASC) AS ranking')
            ->where('transaction_month', '<=', $getFilter->transaction_month)
            ->where('transaction_year', '<=', $getFilter->transaction_year);
        // ->whereIn('branch_id', $getBranch);

        $queryId = $queryBuilder->getQuery()
            ->fromSub($queryBuilder, 'a')
            ->where('a.ranking', '=', 1)
            ->pluck('id');

        $simpenan = MandatoryDepositTransaction::with('deposit.branch', 'deposit.employee', 'branch')->whereIn('id', $queryId)->orderBy('branch_id')->get();


        // $simpenan = MandatoryDepositTransaction::with('deposit.branch', 'deposit.employee', 'branch')->withFilter($getFilter)->get();
        $groupingPerUnit = $simpenan->groupBy('branch.wilayah')->map(function ($data) use ($getFilter) {
            return [
                'wilayah' => $data->first()->branch->wilayah,
                'data' => $data->groupBy('branch_id')->map(function ($quer) use ($getFilter) {
                    return [
                        'wilayah' => $quer->first()->branch->wilayah,
                        'unit' => $quer->first()->branch->unit,
                        'branch_id' => $quer->first()->branch->branch_id,
                        'bulan' => Carbon::create()->month($quer->first()->transaction_month)->format('F') . " " . $quer->sortByDesc('id')->first()->transaction_year,

                        'balance_before' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sortBy('id')->first()->balance_before : $q->sortByDesc('id')->first()->balance;
                            return $data;
                        })->values()->sum(),


                        'detail_balance_before' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sortBy('id')->first()->balance_before : $q->sortByDesc('id')->first()->balance;
                            return $data;
                        })->values(),



                        'debit' =>  $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('debit') : 0;
                            return $data;
                        })->values()->sum(),

                        'kredit' =>  $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('kredit') : 0;
                            return $data;
                        })->values()->sum(),



                        'balance' =>  $quer->groupBy('deposit_id')->map(fn ($q) => $q->sortByDesc('id')->first()->balance)->values()->sum(),

                        'detail_balance' => $quer->groupBy('deposit_id')->map(fn ($q) => $q->sortByDesc('id')->first()->balance)->values(),

                        'K' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'K')->sum('kredit') : 0;
                            return $data;
                        })->values()->sum(),

                        'D' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'D')->sum('debit') : 0;
                            return $data;
                        })->values()->sum(),

                        'KM' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'KM')->sum('kredit') : 0;
                            return $data;
                        })->values()->sum(),

                        'DM' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'DM')->sum('debit') : 0;
                            return $data;
                        })->values()->sum(),


                        'KRMD' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                            $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'KRMD')->sum('kredit') : 0;
                            return $data;
                        })->values()->sum(),
                    ];
                })->sortBy('unit')->values()
            ];
        })->sortBy('wilayah')->values();

        return Inertia::render('Sk/SwGlobal', [
            'batch_datas' => $groupingPerUnit,
            'server_filters' => $getFilter ?? null
        ]);
    }


    public function sumallsk()
    {

        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??  Carbon::now()->month;
        // $getFilter->wilayah = -1;

        // $getBranch = Branch::where('wilayah', $getFilter->wilayah)->pluck('id');
        $queryBuilder = OptionalDepositTransaction::query();
        $queryBuilder->selectRaw('*, RANK() OVER (PARTITION BY deposit_id, branch_id ORDER BY transaction_month ASC) AS ranking')
            ->where('transaction_month', '<=', $getFilter->transaction_month)
            ->where('transaction_year', '<=', $getFilter->transaction_year);
        // ->whereIn('branch_id', $getBranch);

        $queryId = $queryBuilder->getQuery()
            ->fromSub($queryBuilder, 'a')
            ->where('a.ranking', '=', 1)
            ->pluck('id');

        $simpenan = OptionalDepositTransaction::with('deposit.branch', 'deposit.employee', 'branch')->whereIn('id', $queryId)->orderBy('branch_id')->get();



        // $simpenan = OptionalDepositTransaction::with('deposit.branch', 'deposit.employee', 'branch')->get();
        $groupingPerUnit = $simpenan->groupBy('branch.wilayah')->map(function ($data) use ($getFilter) {
            return [
                'wilayah' => $data->first()->branch->wilayah,
                'unit' => $data->first()->branch->unit,
                'branch_id' => $data->first()->branch->branch_id,
                'bulan' => Carbon::create()->month($data->first()->transaction_month)->format('F') . " " . $data->sortByDesc('id')->first()->transaction_year,



                'balance_before' => $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sortBy('id')->first()->balance_before : $q->sortByDesc('id')->first()->balance;
                    return $data;
                })->values()->sum(),



                'detail_balance_before' => $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sortBy('id')->first()->balance_before : $q->sortByDesc('id')->first()->balance;
                    return $data;
                })->values(),



                'debit' =>  $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('debit') : 0;
                    return $data;
                })->values()->sum(),

                'kredit' =>  $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('kredit') : 0;
                    return $data;
                })->values()->sum(),



                'balance' =>  $data->groupBy('deposit_id')->map(fn ($q) => $q->sortByDesc('id')->first()->balance)->values()->sum(),

                'detail_balance' => $data->groupBy('deposit_id')->map(fn ($q) => $q->sortByDesc('id')->first()->balance)->values(),

                'K' => $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'K')->sum('kredit') : 0;
                    return $data;
                })->values()->sum(),

                'D' => $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'D')->sum('debit') : 0;
                    return $data;
                })->values()->sum(),

                'KM' => $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'KM')->sum('kredit') : 0;
                    return $data;
                })->values()->sum(),

                'DM' => $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'DM')->sum('debit') : 0;
                    return $data;
                })->values()->sum(),


                'KRMD' => $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'KRMD')->sum('kredit') : 0;
                    return $data;
                })->values()->sum(),
            ];
        })->values();

        // dd($groupingPerUnit);
        return Inertia::render('Sk/SumAllSk', [
            'datas' => $groupingPerUnit,
            'server_filters' => $getFilter ?? null
        ]);
    }

    public function sumallsw()
    {

        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??  Carbon::now()->month;
        // $getFilter->wilayah = -1;

        // $getBranch = Branch::where('wilayah', $getFilter->wilayah)->pluck('id');
        $queryBuilder = MandatoryDepositTransaction::query();
        $queryBuilder->selectRaw('*, RANK() OVER (PARTITION BY deposit_id, branch_id ORDER BY transaction_month ASC) AS ranking')
            ->where('transaction_month', '<=', $getFilter->transaction_month)
            ->where('transaction_year', '<=', $getFilter->transaction_year);
        // ->whereIn('branch_id', $getBranch);

        $queryId = $queryBuilder->getQuery()
            ->fromSub($queryBuilder, 'a')
            ->where('a.ranking', '=', 1)
            ->pluck('id');

        $simpenan = MandatoryDepositTransaction::with('deposit.branch', 'deposit.employee', 'branch')->whereIn('id', $queryId)->orderBy('branch_id')->get();



        $groupingPerUnit = $simpenan->groupBy('branch.wilayah')->map(function ($data) use ($getFilter) {
            return [
                'wilayah' => $data->first()->branch->wilayah,
                'unit' => $data->first()->branch->unit,
                'branch_id' => $data->first()->branch->branch_id,
                'bulan' => Carbon::create()->month($data->first()->transaction_month)->format('F') . " " . $data->sortByDesc('id')->first()->transaction_year,



                'balance_before' => $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sortBy('id')->first()->balance_before : $q->sortByDesc('id')->first()->balance;
                    return $data;
                })->values()->sum(),



                'detail_balance_before' => $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sortBy('id')->first()->balance_before : $q->sortByDesc('id')->first()->balance;
                    return $data;
                })->values(),



                'debit' =>  $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('debit') : 0;
                    return $data;
                })->values()->sum(),

                'kredit' =>  $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('kredit') : 0;
                    return $data;
                })->values()->sum(),



                'balance' =>  $data->groupBy('deposit_id')->map(fn ($q) => $q->sortByDesc('id')->first()->balance)->values()->sum(),

                'detail_balance' => $data->groupBy('deposit_id')->map(fn ($q) => $q->sortByDesc('id')->first()->balance)->values(),

                'K' => $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'K')->sum('kredit') : 0;
                    return $data;
                })->values()->sum(),

                'D' => $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'D')->sum('debit') : 0;
                    return $data;
                })->values()->sum(),

                'KM' => $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'KM')->sum('kredit') : 0;
                    return $data;
                })->values()->sum(),

                'DM' => $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'DM')->sum('debit') : 0;
                    return $data;
                })->values()->sum(),


                'KRMD' => $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->where('transaction_type', 'KRMD')->sum('kredit') : 0;
                    return $data;
                })->values()->sum(),
            ];
        })->values();

        return Inertia::render('Sk/SumAllSw', [
            'datas' => $groupingPerUnit,
            'server_filters' => $getFilter ?? null
        ]);
    }
}
