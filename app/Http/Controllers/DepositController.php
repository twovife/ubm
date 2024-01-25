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

        $branch = Branch::query()->select('id', 'unit', 'wilayah')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->distinct()->get();

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
            // $divisi_sekarang =

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
        $queryBuilder->selectRaw('*, RANK() OVER (PARTITION BY deposit_id, branch_id ORDER BY transaction_month DESC) AS ranking')
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
                    $firstRecord = $quer->first();
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


                        'K' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ?   $quer->where('transaction_type', 'K')->sum('kredit') : 0,
                        'D' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'D')->sum('debit') : 0,
                        'KM' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'KM')->sum('kredit') : 0,
                        'DM' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'DM')->sum('debit') : 0,
                        'KRMD' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'KRMD')->sum('kredit') : 0,
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
        $queryBuilder->selectRaw('*, RANK() OVER (PARTITION BY deposit_id, branch_id ORDER BY transaction_month DESC) AS ranking')
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

                        'K' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ?   $quer->where('transaction_type', 'K')->sum('kredit') : 0,
                        'D' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'D')->sum('debit') : 0,
                        'KM' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'KM')->sum('kredit') : 0,
                        'DM' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'DM')->sum('debit') : 0,
                        'KRMD' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'KRMD')->sum('kredit') : 0,
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
        $queryBuilder->selectRaw('*, RANK() OVER (PARTITION BY deposit_id, branch_id ORDER BY transaction_month DESC) AS ranking')
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
                'wilayah' => $data->sortBy('id')->first()->branch->wilayah,
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
        $queryBuilder->selectRaw('*, RANK() OVER (PARTITION BY deposit_id, branch_id ORDER BY transaction_month DESC) AS ranking')
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
        $queryBuilder->selectRaw('*, RANK() OVER (PARTITION BY deposit_id, branch_id ORDER BY transaction_month DESC) AS ranking')
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
        $queryBuilder = MandatoryDepositTransaction::query();
        $queryBuilder->selectRaw('*, RANK() OVER (PARTITION BY deposit_id, branch_id ORDER BY transaction_month DESC) AS ranking')
            ->where('transaction_month', '<=', $getFilter->transaction_month)
            ->where('transaction_year', '<=', $getFilter->transaction_year);

        $queryId = $queryBuilder->getQuery()
            ->fromSub($queryBuilder, 'a')
            ->where('a.ranking', '=', 1)
            ->pluck('id');

        $simpenan = MandatoryDepositTransaction::with('deposit.branch', 'deposit.employee', 'branch')->whereIn('id', $queryId)->orderBy('branch_id')->get();


        $groupingPerUnit = $simpenan->groupBy('branch.wilayah')->map(function ($data) use ($getFilter) {
            return [
                'wilayah' => $data->first()->branch->wilayah,
                'bulan' => Carbon::create()->month($data->max('transaction_month'))->format('F') . " " . $data->max('transaction_year'),

                'balance_before' => $data->groupBy('branch_id')->map(function ($q) use ($getFilter) {
                    $dataunit = $q->groupBy('deposit_id')->map(function ($qq) use ($getFilter) {
                        $data = ($qq->first()->transaction_month == $getFilter->transaction_month && $qq->first()->transaction_year == $getFilter->transaction_year) ? $qq->sortBy('id')->first()->balance_before : $qq->sortByDesc('id')->first()->balance;
                        return $data;
                    });
                    return $dataunit->sum();
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


    public function sksw_unit()
    {

        $branch = Branch::query()->select('wilayah')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->distinct()->get();

        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??   Carbon::now()->month;
        $getFilter->tanggal = Carbon::createFromDate(request()->transaction_year, request()->transaction_month, 1)->endOfMonth()->format('Y-m-d');
        $getFilter->tanggal_start = Carbon::createFromDate(request()->transaction_year, request()->transaction_month, 1)->startOfMonth()->format('Y-m-d');

        $getFilter->isWilayanNeeded = request()->isWilayanNeeded ??  true;

        $tanggal = Carbon::create($getFilter->transaction_year, $getFilter->transaction_month)->format('F Y');
        // $getFilter->wilayah = 0;
        $getFilter->wilayah = auth()->user()->hasPermissionTo('unit') ? auth()->user()->employee->area : (request()->wilayah ?? 0);

        $sk = OptionalDepositTransaction::queryBuilder($getFilter);
        $sw = MandatoryDepositTransaction::queryBuilder($getFilter);

        $hasilSk = $sk->groupBy('branch_id')->map(function ($data) use ($getFilter) {
            return $data->groupBy('deposit_id')->map(function ($quer) use ($getFilter) {
                $firstRecord = $quer->first();
                $lastRecord = $quer->sortByDesc('id')->first();
                return [
                    'depo' => 'sk',
                    'is_active' => $firstRecord->deposit->employee->date_resign ? 'yes' : 'no',
                    'wilayah' => $firstRecord->branch->wilayah,
                    'unit' => $firstRecord->branch->unit,
                    'branch_id' => $firstRecord->branch_id,
                    'bulan' => Carbon::create()->month($firstRecord->transaction_month)->format('F') . " " . $firstRecord->transaction_year,
                    'id_tabungan' => $firstRecord->deposit_id,
                    'nama_karyawan' => $firstRecord->deposit->employee->nama_karyawan,
                    'balance_before' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $firstRecord->balance_before : $lastRecord->balance,
                    'debit' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ?  $quer->sum('debit') : 0,
                    'kredit' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ?  $quer->sum('kredit') : 0,
                    'balance' => $lastRecord->balance ?? 0,


                    'K' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ?   $quer->where('transaction_type', 'K')->sum('kredit') : 0,
                    'D' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'D')->sum('debit') : 0,
                    'KM' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'KM')->sum('kredit') : 0,
                    'DM' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'DM')->sum('debit') : 0,
                    'KRMD' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'KRMD')->sum('kredit') : 0,
                ];
            })->values();
        })->sortBy('unit')->flatten(1)->values();

        $hasilSw = $sw->groupBy('branch_id')->map(function ($data) use ($getFilter) {
            return $data->groupBy('deposit_id')->map(function ($quer) use ($getFilter) {
                $firstRecord = $quer->first();
                $lastRecord = $quer->sortByDesc('id')->first();
                return [
                    'depo' => 'sw',
                    'is_active' => $firstRecord->deposit->employee->date_resign ? 'Off' : 'Active',
                    'wilayah' => $firstRecord->branch->wilayah,
                    'unit' => $firstRecord->branch->unit,
                    'branch_id' => $firstRecord->branch_id,
                    'bulan' => Carbon::create()->month($firstRecord->transaction_month)->format('F') . " " . $firstRecord->transaction_year,
                    'id_tabungan' => $firstRecord->deposit_id,
                    'nama_karyawan' => $firstRecord->deposit->employee->nama_karyawan,
                    'balance_before' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $firstRecord->balance_before : $lastRecord->balance,
                    'debit' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ?  $quer->sum('debit') : 0,
                    'kredit' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ?  $quer->sum('kredit') : 0,
                    'balance' => $lastRecord->balance ?? 0,


                    'K' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ?   $quer->where('transaction_type', 'K')->sum('kredit') : 0,
                    'D' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'D')->sum('debit') : 0,
                    'KM' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'KM')->sum('kredit') : 0,
                    'DM' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'DM')->sum('debit') : 0,
                    'KRMD' => ($firstRecord->transaction_month == $getFilter->transaction_month &&  $firstRecord->transaction_year == $getFilter->transaction_year) ? $quer->where('transaction_type', 'KRMD')->sum('kredit') : 0,
                ];
            })->values();
        })->sortBy('unit')->flatten(1)->values();

        $merge_data = $hasilSw->concat($hasilSk);

        $hasil_marge =  $merge_data->sortBy('branch_id')->groupBy('unit')->map(function ($qq) use ($tanggal) {
            return [
                'branch_id' => $qq->first()['branch_id'],
                'unit' => $qq->first()['unit'],
                'data' => $qq->groupBy('id_tabungan')->map(function ($q) use ($tanggal) {
                    return [
                        'id_tabungan' => $q->first()['id_tabungan'],
                        'wilayah' => $q->first()['wilayah'],
                        'unit' => $q->first()['unit'],
                        'is_active' => $q->whereNotNull('is_active')->first()['is_active'],
                        'nama_karyawan' => $q->first()['nama_karyawan'],
                        'bulan' => $tanggal,

                        'balance_before_sw' => $q->where('depo', 'sw')->first()['balance_before'] ?? 0,
                        'debit_sw' => $q->where('depo', 'sw')->first()['debit'] ?? 0,
                        'kredit_sw' => $q->where('depo', 'sw')->first()['kredit'] ?? 0,
                        'balance_sw' => $q->where('depo', 'sw')->first()['balance'] ?? 0,
                        'K_sw' => $q->where('depo', 'sw')->first()['K'] ?? 0,
                        'D_sw' => $q->where('depo', 'sw')->first()['D'] ?? 0,
                        'KM_sw' => $q->where('depo', 'sw')->first()['KM'] ?? 0,
                        'DM_sw' => $q->where('depo', 'sw')->first()['DM'] ?? 0,
                        'KRMD_sw' => $q->where('depo', 'sw')->first()['KRMD'] ?? 0,

                        'isvisible' => ($q->where('depo', 'sw')->first()['balance'] ?? 0) + ($q->where('depo', 'sk')->first()['balance'] ?? 0) + ($q->where('depo', 'sw')->first()['balance_before'] ?? 0) + ($q->where('depo', 'sk')->first()['balance_before'] ?? 0),
                        'saldo_global' => ($q->where('depo', 'sw')->first()['balance'] ?? 0) + ($q->where('depo', 'sk')->first()['balance'] ?? 0),

                        'balance_before_sk' => $q->where('depo', 'sk')->first()['balance_before'] ?? 0,
                        'debit_sk' => $q->where('depo', 'sk')->first()['debit'] ?? 0,
                        'kredit_sk' => $q->where('depo', 'sk')->first()['kredit'] ?? 0,
                        'balance_sk' => $q->where('depo', 'sk')->first()['balance'] ?? 0,
                        'K_sk' => $q->where('depo', 'sk')->first()['K'] ?? 0,
                        'D_sk' => $q->where('depo', 'sk')->first()['D'] ?? 0,
                        'KM_sk' => $q->where('depo', 'sk')->first()['KM'] ?? 0,
                        'DM_sk' => $q->where('depo', 'sk')->first()['DM'] ?? 0,
                        'KRMD_sk' => $q->where('depo', 'sk')->first()['KRMD'] ?? 0,
                    ];
                })->where('isvisible', '>', 0)->sortBy('nama_karyawan')->values()
            ];
        })->values();

        // dd($hasil_marge);

        return Inertia::render('Sksw/Unit', [

            'batch_datas' => $hasil_marge,
            'branch' => $branch,
            'server_filters' => $getFilter ?? null

        ]);
    }

    public function sksw_wilayah()
    {
        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??   Carbon::now()->month;
        $getFilter->isWilayanNeeded = request()->isWilayanNeeded ??  false;
        $getFilter->tanggal = Carbon::createFromDate(request()->transaction_year, request()->transaction_month, 1)->endOfMonth()->format('Y-m-d');
        $getFilter->tanggal_start = Carbon::createFromDate(request()->transaction_year, request()->transaction_month, 1)->startOfMonth()->format('Y-m-d');

        $tanggal = Carbon::create($getFilter->transaction_year, $getFilter->transaction_month)->format('F Y');
        // $getFilter->wilayah = $isWilayanNeeded ? (auth()->user()->hasPermissionTo('unit') ? auth()->user()->employee->area : (request()->wilayah ?? 0)) : -1;

        $sk = OptionalDepositTransaction::queryBuilder($getFilter);
        $sw = MandatoryDepositTransaction::queryBuilder($getFilter);

        $hasilSk = $sk->groupBy('branch.wilayah')->map(function ($data) use ($getFilter) {
            return  $data->groupBy('branch_id')->map(function ($quer) use ($getFilter) {
                return [
                    'depo' => 'sk',
                    'wilayah' => $quer->first()->branch->wilayah,
                    'unit' => $quer->first()->branch->unit,
                    'branch_id' => $quer->first()->branch_id,
                    'bulan' => Carbon::create()->month($quer->first()->transaction_month)->format('F') . " " . $quer->sortByDesc('id')->first()->transaction_year,

                    'balance_before' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                        $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sortBy('id')->first()->balance_before : $q->sortByDesc('id')->first()->balance;
                        return $data;
                    })->values()->sum(),


                    'debit' =>  $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                        $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('debit') : 0;
                        return $data;
                    })->values()->sum(),

                    'kredit' =>  $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                        $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('kredit') : 0;
                        return $data;
                    })->values()->sum(),



                    'balance' =>  $quer->groupBy('deposit_id')->map(fn ($q) => $q->sortByDesc('id')->first()->balance)->values()->sum(),


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
            })->sortBy('unit')->values();
        })->sortBy('wilayah')->flatten(1)->values();


        $hasilSw = $sw->groupBy('branch.wilayah')->map(function ($data) use ($getFilter) {
            return  $data->groupBy('branch_id')->map(function ($quer) use ($getFilter) {
                return [
                    'depo' => 'sw',
                    'wilayah' => $quer->first()->branch->wilayah,
                    'unit' => $quer->first()->branch->unit,
                    'branch_id' => $quer->first()->branch_id,
                    'bulan' => Carbon::create()->month($quer->first()->transaction_month)->format('F') . " " . $quer->sortByDesc('id')->first()->transaction_year,

                    'balance_before' => $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                        $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sortBy('id')->first()->balance_before : $q->sortByDesc('id')->first()->balance;
                        return $data;
                    })->values()->sum(),



                    'debit' =>  $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                        $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('debit') : 0;
                        return $data;
                    })->values()->sum(),

                    'kredit' =>  $quer->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                        $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('kredit') : 0;
                        return $data;
                    })->values()->sum(),



                    'balance' =>  $quer->groupBy('deposit_id')->map(fn ($q) => $q->sortByDesc('id')->first()->balance)->values()->sum(),

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
            })->sortBy('unit')->values();
        })->sortBy('wilayah')->flatten(1)->values();



        $merge_data = $hasilSw->concat($hasilSk);

        $hasil_marge =  $merge_data->sortBy('wilayah')->groupBy('wilayah')->map(function ($data) use ($tanggal) {
            return [
                'wilayah' => $data->first()['wilayah'],
                'data' => $data->groupBy('branch_id')->map(function ($qq) use ($tanggal) {
                    $firstRecord = $qq->sortBy('id')->first();
                    return [
                        'wilayah' => $firstRecord['wilayah'],
                        'unit' => $firstRecord['unit'],
                        'branch_id' => $firstRecord['branch_id'],
                        'bulan' => $tanggal,

                        'balance_before_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['balance_before'] ?? 0)->values()->sum(),
                        'debit_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['debit'] ?? 0)->values()->sum(),
                        'kredit_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['kredit'] ?? 0)->values()->sum(),
                        'balance_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['balance'] ?? 0)->values()->sum(),
                        'K_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['K'] ?? 0)->values()->sum(),
                        'D_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['D'] ?? 0)->values()->sum(),
                        'KM_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['KM'] ?? 0)->values()->sum(),
                        'DM_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['DM'] ?? 0)->values()->sum(),
                        'KRMD_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['KRMD'] ?? 0)->values()->sum(),
                        'saldo_global' => ($qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['balance'] ?? 0)->values()->sum()) + ($qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['balance'] ?? 0)->values()->sum()),

                        'balance_before_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['balance_before'] ?? 0)->values()->sum(),
                        'debit_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['debit'] ?? 0)->values()->sum(),
                        'kredit_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['kredit'] ?? 0)->values()->sum(),
                        'balance_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['balance'] ?? 0)->values()->sum(),
                        'K_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['K'] ?? 0)->values()->sum(),
                        'D_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['D'] ?? 0)->values()->sum(),
                        'KM_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['KM'] ?? 0)->values()->sum(),
                        'DM_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['DM'] ?? 0)->values()->sum(),
                        'KRMD_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['KRMD'] ?? 0)->values()->sum(),
                    ];
                })->values()
            ];
        })->values();

        return Inertia::render('Sksw/Wilayah', [
            'batch_datas' => $hasil_marge,
            'server_filters' => $getFilter ?? null
        ]);
    }




    public function sksw_global()
    {
        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??   Carbon::now()->month;
        $getFilter->isWilayanNeeded = request()->isWilayanNeeded ??  false;
        $getFilter->tanggal = Carbon::createFromDate(request()->transaction_year, request()->transaction_month, 1)->endOfMonth()->format('Y-m-d');
        $getFilter->tanggal_start = Carbon::createFromDate(request()->transaction_year, request()->transaction_month, 1)->startOfMonth()->format('Y-m-d');

        $tanggal = Carbon::create($getFilter->transaction_year, $getFilter->transaction_month)->format('F Y');

        $sk = OptionalDepositTransaction::queryBuilder($getFilter);
        $sw = MandatoryDepositTransaction::queryBuilder($getFilter);




        $hasilSk = $sk->groupBy('branch.wilayah')->map(function ($data) use ($getFilter) {
            return [
                'depo' => 'sk',
                'wilayah' => $data->first()->branch->wilayah,
                'bulan' => Carbon::create()->month($data->max('transaction_month'))->format('F') . " " . $data->max('transaction_year'),

                'balance_before' => $data->groupBy('branch_id')->map(function ($q) use ($getFilter) {
                    $dataunit = $q->groupBy('deposit_id')->map(function ($qq) use ($getFilter) {
                        $data = ($qq->first()->transaction_month == $getFilter->transaction_month && $qq->first()->transaction_year == $getFilter->transaction_year) ? $qq->sortBy('id')->first()->balance_before : $qq->sortByDesc('id')->first()->balance;
                        return $data;
                    });
                    return $dataunit->sum();
                })->values()->sum(),


                'debit' =>  $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('debit') : 0;
                    return $data;
                })->values()->sum(),

                'kredit' =>  $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('kredit') : 0;
                    return $data;
                })->values()->sum(),



                'balance' =>  $data->groupBy('deposit_id')->map(fn ($q) => $q->sortByDesc('id')->first()->balance)->values()->sum(),


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

        $hasilSw = $sw->groupBy('branch.wilayah')->map(function ($data) use ($getFilter) {
            return [
                'depo' => 'sw',
                'wilayah' => $data->first()->branch->wilayah,
                'bulan' => Carbon::create()->month($data->max('transaction_month'))->format('F') . " " . $data->max('transaction_year'),

                'balance_before' => $data->groupBy('branch_id')->map(function ($q) use ($getFilter) {
                    $dataunit = $q->groupBy('deposit_id')->map(function ($qq) use ($getFilter) {
                        $data = ($qq->first()->transaction_month == $getFilter->transaction_month && $qq->first()->transaction_year == $getFilter->transaction_year) ? $qq->sortBy('id')->first()->balance_before : $qq->sortByDesc('id')->first()->balance;
                        return $data;
                    });
                    return $dataunit->sum();
                })->values()->sum(),


                'debit' =>  $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('debit') : 0;
                    return $data;
                })->values()->sum(),

                'kredit' =>  $data->groupBy('deposit_id')->map(function ($q) use ($getFilter) {
                    $data = ($q->first()->transaction_month == $getFilter->transaction_month && $q->first()->transaction_year == $getFilter->transaction_year) ? $q->sum('kredit') : 0;
                    return $data;
                })->values()->sum(),



                'balance' =>  $data->groupBy('deposit_id')->map(fn ($q) => $q->sortByDesc('id')->first()->balance)->values()->sum(),


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



        $merge_data = $hasilSw->concat($hasilSk);
        $hasil_marge =  $merge_data->sortBy('wilayah')->groupBy('wilayah')->map(function ($qq) use ($tanggal) {
            $firstRecord = $qq->sortBy('id')->first();
            return [

                // 'data' => $qq->values()
                'wilayah' => $firstRecord['wilayah'],
                'bulan' => $tanggal,

                'balance_before_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['balance_before'] ?? 0)->values()->sum(),
                'debit_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['debit'] ?? 0)->values()->sum(),
                'kredit_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['kredit'] ?? 0)->values()->sum(),
                'balance_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['balance'] ?? 0)->values()->sum(),
                'K_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['K'] ?? 0)->values()->sum(),
                'D_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['D'] ?? 0)->values()->sum(),
                'KM_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['KM'] ?? 0)->values()->sum(),
                'DM_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['DM'] ?? 0)->values()->sum(),
                'KRMD_sw' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['KRMD'] ?? 0)->values()->sum(),
                'saldo_global' => ($qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sw')->first()['balance'] ?? 0)->values()->sum()) + ($qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['balance'] ?? 0)->values()->sum()),

                'balance_before_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['balance_before'] ?? 0)->values()->sum(),
                'debit_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['debit'] ?? 0)->values()->sum(),
                'kredit_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['kredit'] ?? 0)->values()->sum(),
                'balance_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['balance'] ?? 0)->values()->sum(),
                'K_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['K'] ?? 0)->values()->sum(),
                'D_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['D'] ?? 0)->values()->sum(),
                'KM_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['KM'] ?? 0)->values()->sum(),
                'DM_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['DM'] ?? 0)->values()->sum(),
                'KRMD_sk' => $qq->groupBy('id_tabungan')->map(fn ($queries) => $queries->where('depo', 'sk')->first()['KRMD'] ?? 0)->values()->sum(),
            ];
        })->values();




        return Inertia::render('Sksw/Index', [
            'datas' => $hasil_marge,
            'server_filters' => $getFilter ?? null
        ]);
    }
}
