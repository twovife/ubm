<?php

namespace App\Http\Controllers;

use App\Models\Deposit;
use Illuminate\Http\Request;
use App\Models\Branch;
use App\Models\DepositTransaction;
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

    public function dashboard()
    {
        $branch = Branch::query()->select('wilayah')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->distinct()->get();


        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??  Carbon::now()->month;
        $getFilter->branch_id = auth()->user()->hasPermissionTo('unit') ? auth()->user()->employee->branch_id : (request()->branch_id ?? 1);
        $getFilter->wilayah = -1;

        $branch = Branch::query()->select('id', 'unit', 'wilayah')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->distinct()->get();

        $simpanan = Deposit::with('employee', 'branch', 'deposit_transactions')->withFilter($getFilter)->get();
        // dd($simpanan);

        $data = collect($simpanan)->map(
            function ($que) {
                // dd($que->deposit_transactions);
                $saldoSw = ($que->deposit_transactions->sum('sw_debit') - $que->deposit_transactions->sum('sw_kredit')) ?? 0;
                $saldoSk = ($que->deposit_transactions->sum('sk_debit') - $que->deposit_transactions->sum('sk_kredit')) ?? 0;
                return  [
                    'id' => $que->id,
                    'wilayah' => $que->branch->wilayah ?? '-',
                    'unit' => $que->branch->unit ?? '-',
                    'nama' => $que->employee->nama_karyawan ?? '-',
                    'jabatan' => $que->employee->jabatan ?? '-',
                    'tanggal_tabungan' => $que->tgl_tabugan ?? '-',
                    'saldo_sw' => $saldoSw,
                    'saldo_sk' => $saldoSk,
                    'total_saldo' => $saldoSk + $saldoSw,
                    'isactive' => $que->employee->date_resign ? 1 : 2,
                    'status_karyawan' => $que->employee->date_resign ? 'Non Aktiv' : 'Aktiv',
                    'hiredate' => $que->employee->hire_date ?? '-',
                ];
            }
        )->sortBy('nama')->values();


        return Inertia::render('Sk/Index', [
            'datas' => $data,
            'branch' => $branch,
            'server_filters' => $getFilter ?? null
        ]);
    }
    public function index()
    {

        // dd('asd');
        // $sksw = json_decode(file_get_contents(storage_path('sksw2.json')), true);
        // dd($sksw);



        // $getFilter = new \stdClass;
        // $getFilter = (object) request()->all();
        // $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        // $getFilter->transaction_month = request()->transaction_month ??  Carbon::now()->month;
        // $getFilter->branch_id = auth()->user()->hasPermissionTo('unit') ? auth()->user()->employee->branch_id : (request()->branch_id ?? 1);
        // $getFilter->wilayah = -1;

        // $branch = Branch::query()->select('id', 'unit', 'wilayah')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
        //     $q->where('id', auth()->user()->employee->branch_id);
        // })->distinct()->get();

        // $simpanan = Deposit::with('employee', 'branch')->where('sw_balance', ">", 0)->orWhere('sk_balance', ">", 0)->withFilter($getFilter)->get();

        // $data = collect($simpanan)->map(fn ($que) => [
        //     'id' => $que->id,
        //     'wilayah' => $que->branch->wilayah ?? '-',
        //     'unit' => $que->branch->unit ?? '-',
        //     'nama' => $que->employee->nama_karyawan ?? '-',
        //     'jabatan' => $que->employee->jabatan ?? '-',
        //     'tanggal_tabungan' => $que->tgl_tabugan ?? '-',
        //     'saldo_sw' => $que->sw_balance ?? 0,
        //     'saldo_sk' => $que->sk_balance ?? 0,
        //     'total_saldo' => ($que->sw_balance ?? 0) + ($que->sk_balance ?? 0),
        //     'isactive' => $que->employee->date_resign ? 1 : 2,
        //     'status_karyawan' => $que->employee->date_resign ? 'Non Aktiv' : 'Aktiv',
        //     'hiredate' => $que->employee->hire_date ?? '-',
        // ])->sortBy('wilayah')->sortBy('unit')->values();


        // // dd($data);
        // return Inertia::render('Sk/Index', [
        //     'datas' => $data,
        //     'branch' => $branch,
        //     'server_filters' => $getFilter ?? null
        // ]);
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
        $tanggal_tabungan = Carbon::parse($request->tgl_tabugan)->startOfMonth()->format('Y-m-d');
        try {
            DB::beginTransaction();

            $deposit = Deposit::firstOrCreate([
                "employee_id" => $request->employee_id,
            ], [
                "branch_id" => $karyawan->branch_id,
                "tgl_tabugan" => $tanggal_tabungan,
            ]);



            if (!$deposit->wasRecentlyCreated) {
                if ($deposit->sk_balance > 0 || $deposit->sw_balance > 0) {
                    return redirect()->route('sksw.dashboard')->withErrors('Karyawan masih mempunyai tabungan aktiv');
                }
                $deposit->update([
                    'sw_balance' => $request->sw_balance,
                    'sk_balance' => $request->sk_balance,
                ]);
            }


            $mandatorytransaction = $deposit->deposit_transactions()->create(
                [
                    "branch_id" => $karyawan->branch_id,
                    "transaction_date" => $tanggal_tabungan,
                    "sw_transaction" => 'D',
                    "sw_transaction_type" => 'D',
                    "sw_debit" => $request->sw_balance,
                    "sw_kredit" => 0,
                    "sk_transaction" => 'D',
                    "sk_transaction_type" => 'D',
                    "sk_debit" => $request->sk_balance,
                    "sk_kredit" => 0,
                    "transaction_input_user_id" => auth()->user()->id,
                ]
            );
            $mandatorytransaction->idx_transaction = $mandatorytransaction->id;
            $mandatorytransaction->save();

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            return redirect()->route('sksw.dashboard')->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }
        return redirect()->route('sksw.transaksi', $deposit->id)->with('message', 'Data berhasil ditambahkan');
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

        $branch = Branch::where('id', '!=', $deposit->branch_id)->get();
        $employee = Employee::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('branch_id', auth()->user()->employee->branch_id))->get();
        $deposit = $deposit->load('deposit_transactions.branch', 'branch', 'employee');
        $data_deposit = [
            'id' => $deposit->id,
            'sk_balance' => ($deposit->deposit_transactions->sum('sk_debit') - $deposit->deposit_transactions->sum('sk_kredit')),
            'sw_balance' => ($deposit->deposit_transactions->sum('sw_debit') - $deposit->deposit_transactions->sum('sw_kredit')),
            'nama_karyawan' => $deposit->employee->nama_karyawan,
            'unit' => $deposit->branch->unit,
        ];
        // dd($data_deposit);
        $sw_balance = 0;
        $sk_balance = 0;

        $data = $deposit->deposit_transactions->map(function ($query) use (&$sw_balance, &$sk_balance) {
            $sw_transaction = $query->sw_debit - $query->sw_kredit;
            $sw_balance_before = $sw_balance;
            $sw_balance = $sw_balance_before + $sw_transaction;

            $sk_transaction = $query->sk_debit - $query->sk_kredit;
            $sk_balance_before = $sk_balance;
            $sk_balance = $sk_balance_before + $sk_transaction;
            return [
                'wilayah' => $query->branch->wilayah,
                'unit' => $query->branch->unit,
                'transaction_date' => $query->transaction_date,

                'sw_balance_before' => $sw_balance_before,
                'sw_debit' => $query->sw_debit,
                'sw_kredit' => $query->sw_kredit,
                'sw_saldo' => $sw_balance,

                'K_sw' => $query->sw_transaction_type == 'K' ? $query->sw_kredit : 0,
                'D_sw' => $query->sw_transaction_type == 'D' ? $query->sw_debit : 0,
                'KM_sw' => $query->sw_transaction_type == 'KM' ? $query->sw_kredit : 0,
                'DM_sw' => $query->sw_transaction_type == 'DM' ? $query->sw_debit : 0,
                'KRMD_sw' => $query->sw_transaction_type == 'KRMD' ? $query->sw_kredit : 0,



                'sk_balance_before' => $sk_balance_before,
                'sk_debit' => $query->sk_debit,
                'sk_kredit' => $query->sk_kredit,
                'sk_saldo' => $sk_balance,

                'K_sk' => $query->sk_transaction_type == 'K' ? $query->sk_kredit : 0,
                'D_sk' => $query->sk_transaction_type == 'D' ? $query->sk_debit : 0,
                'KM_sk' => $query->sk_transaction_type == 'KM' ? $query->sk_kredit : 0,
                'DM_sk' => $query->sk_transaction_type == 'DM' ? $query->sk_debit : 0,
                'KRMD_sk' => $query->sk_transaction_type == 'KRMD' ? $query->sk_kredit : 0,
            ];
        });
        $mindate = $deposit->deposit_transactions->sortByDesc('transaction_date')->first()->transaction_date;
        return Inertia::render('Sk/Transaksi', [
            'deposit' => $data_deposit,
            'datas' => $data,
            'branch' => $branch,
            'validating' => ['min_date' => Carbon::create($mindate)->format('Y-m'), 'max_date' => Carbon::now()->lastOfMonth()->format('Y-m')],
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

        $tanggal_tabungan = Carbon::parse($request->transaction_date)->startOfMonth()->format('Y-m-d');
        // dd($tanggal_tabungan);
        try {
            DB::beginTransaction();
            if ($request->transaction == "D") {

                $sk_balance = ($deposit->deposit_transactions->sum('sk_debit') - $deposit->deposit_transactions->sum('sk_kredit'));
                $sw_balance = ($deposit->deposit_transactions->sum('sw_debit') - $deposit->deposit_transactions->sum('sw_kredit'));


                $req_sw_balance = $request->saldo_awal_sw;
                $req_sk_balance = $request->saldo_awal_sk;

                $after_sw_balance = $req_sw_balance + $request->nominal_sw;
                $after_sk_balance = $req_sk_balance + $request->nominal_sk;

                if ($sw_balance !== $req_sw_balance || $sk_balance !== $req_sk_balance) {
                    return redirect()->route('sksw.transaksi', $deposit->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
                }


                $deposit->deposit_transactions()->create([
                    "branch_id" => $deposit->branch_id,
                    "transaction_date" => $tanggal_tabungan,
                    "sw_transaction" =>  $request->transaction,
                    "sw_transaction_type" => $request->transaction_type,
                    "sw_debit" => $request->nominal_sw,
                    "sw_kredit" => 0,

                    "sk_transaction" => $request->transaction,
                    "sk_transaction_type" => $request->transaction_type,
                    "sk_debit" => $request->nominal_sk,
                    "sk_kredit" => 0,
                    "transaction_input_user_id" => auth()->user()->employee_id ?? 1,
                    "idx_transaction" => $deposit->deposit_transactions->sortByDesc('transaction_date')->sortByDesc('id')->first()->idx_transaction,
                ]);
            }

            if ($request->transaction == "K") {


                $sk_balance = ($deposit->deposit_transactions->sum('sk_debit') - $deposit->deposit_transactions->sum('sk_kredit'));
                $sw_balance = ($deposit->deposit_transactions->sum('sw_debit') - $deposit->deposit_transactions->sum('sw_kredit'));


                $req_sw_balance = $request->saldo_awal_sw;
                $req_sk_balance = $request->saldo_awal_sk;

                $after_sw_balance = $req_sw_balance + $request->nominal_sw;
                $after_sk_balance = $req_sk_balance + $request->nominal_sk;



                if ($sw_balance !== $req_sw_balance || $sk_balance !== $req_sk_balance) {
                    return redirect()->route('sksw.transaksi', $deposit->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
                }

                if ($sk_balance - $request->nominal_sk < 0 || $sw_balance - $request->nominal_sw < 0) {
                    return redirect()->route('sksw.transaksi', $deposit->id)->withErrors('Saldo Tidak Boleh Mines');
                }

                $deposit->deposit_transactions()->create([
                    "branch_id" => $deposit->branch_id,
                    "transaction_date" => $tanggal_tabungan,
                    "sw_transaction" =>  $request->transaction,
                    "sw_transaction_type" => $request->transaction_type,
                    "sw_debit" => 0,
                    "sw_kredit" => $request->nominal_sw,

                    "sk_transaction" => $request->transaction,
                    "sk_transaction_type" => $request->transaction_type,
                    "sk_debit" => 0,

                    "sk_kredit" => $request->nominal_sk,
                    "transaction_input_user_id" => auth()->user()->employee_id ?? 1,
                    "idx_transaction" => $deposit->deposit_transactions->sortByDesc('transaction_date')->sortByDesc('id')->first()->idx_transaction,
                ]);


                if ($request->transaction_type == "KRMD") {
                    if ($request->nominal_sw > 0) {
                        $employee = Employee::find($deposit->employee_id);
                        $employee->pencairan_simpanan_w_date = $tanggal_tabungan;
                        $employee->pencairan_simpanan_w_by = auth()->user()->employee_id;
                        $employee->save();
                    }

                    if ($request->nominal_sk > 0) {

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

                $sk_balance = ($deposit->deposit_transactions->sum('sk_debit') - $deposit->deposit_transactions->sum('sk_kredit'));
                $sw_balance = ($deposit->deposit_transactions->sum('sw_debit') - $deposit->deposit_transactions->sum('sw_kredit'));
                $branch_asal = $deposit->branch_id;
                // dd([$sk_balance, $sw_balance]);

                // change id, deposit_id, branch_id, transaction_date, transaction_month, transaction_year, transaction, balance_before, debit, kredit, balance, transaction_type, transaction_input_user_id, created_at, updated_at


                // change deposit


                $deposit->deposit_transactions()->create([
                    "branch_id" =>  $branch_asal,
                    "transaction_date" => $tanggal_tabungan,
                    "sw_transaction" =>  'K',
                    "sw_transaction_type" => 'KM',
                    "sw_debit" => 0,
                    "sw_kredit" => $sw_balance,

                    "sk_transaction" =>  'K',
                    "sk_transaction_type" => 'KM',
                    "sk_debit" => 0,
                    "sk_kredit" => $sk_balance,
                    "transaction_input_user_id" => auth()->user()->employee_id ?? 1,
                    "idx_transaction" => $deposit->deposit_transactions->sortByDesc('transaction_date')->sortByDesc('id')->first()->idx_transaction,
                ]);

                $deposit_mutation = $deposit->deposit_transactions()->create(
                    [
                        "branch_id" => $request->branch_id,
                        "transaction_date" => $tanggal_tabungan,
                        "sw_transaction" =>  'D',
                        "sw_transaction_type" => 'DM',
                        "sw_debit" => $sw_balance,
                        "sw_kredit" => 0,

                        "sk_transaction" => 'D',
                        "sk_transaction_type" => 'DM',
                        "sk_debit" => $sk_balance,
                        "sk_kredit" => 0,
                        "transaction_input_user_id" => auth()->user()->employee_id ?? 1,
                    ]
                );
                $deposit->branch_id = $request->branch_id;
                $deposit->save();
                $deposit_mutation->idx_transaction = $deposit_mutation->id;
                $deposit_mutation->save();
            }
            $deposit->save();
            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            dd($e);
            return redirect()->route('sksw.transaksi', $deposit->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }
        return redirect()->route('sksw.transaksi', $deposit->id)->with('message', 'Data berhasil ditambahkan');
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
        $getFilter->wilayah = auth()->user()->hasPermissionTo('unit') ? auth()->user()->employee->area : (request()->wilayah ?? 0);

        $ranked_partition = DepositTransaction::queryBuilder($getFilter)->get(['idx_transaction']);
        $ranked_sksw = DepositTransaction::queryBuilder($getFilter)->with('deposit.branch', 'deposit.employee', 'branch')->get();
        $all_transaction = DepositTransaction::whereIn('idx_transaction', $ranked_partition->toArray())->get(['idx_transaction', 'transaction_date', 'sw_kredit', 'sw_debit', 'sk_kredit', 'sk_debit']);

        $maping_sksw = $ranked_sksw->groupBy('branch_id')->map(function ($data) use ($getFilter, $all_transaction) {
            return [
                'branch_id' => $data->first()->branch->id,
                'unit' => $data->first()->branch->unit,
                'data' =>  $data->groupBy('deposit_id')->map(function ($quer) use ($getFilter, $all_transaction) {
                    $first_data = $quer->first();
                    $transbefore =  $all_transaction->where('idx_transaction', $first_data->idx_transaction)->where('transaction_date', '<', $getFilter->tanggal_start);
                    $sksaldo_before = $transbefore->sum('sk_debit') - $transbefore->sum('sk_kredit');
                    $trans_now = $quer->where('transaction_date', $getFilter->tanggal_start);
                    $balance_sk = $sksaldo_before + ($trans_now->sum('sk_debit') - $trans_now->sum('sk_kredit')) ?? 0;
                    $swsaldo_before =  $transbefore->sum('sw_debit') - $transbefore->sum('sw_kredit');
                    $balance_sw = $swsaldo_before + ($trans_now->sum('sw_debit') - $trans_now->sum('sw_kredit')) ?? 0;
                    return [
                        'id_tabungan' => $first_data->deposit_id,
                        'wilayah' => $first_data->branch->wilayah,
                        'unit' =>  $first_data->branch->unit,
                        'is_active' => $first_data->deposit->employee->date_resign ? 'Off' : 'Active',
                        'nama_karyawan' => $first_data->deposit->employee->nama_karyawan,
                        'bulan' => $getFilter->tanggal,

                        'balance_before_sw' => $swsaldo_before ?? 0,
                        'debit_sw' => $trans_now->sum('sw_debit') ?? 0,
                        'kredit_sw' => $trans_now->sum('sw_kredit') ?? 0,
                        'balance_sw' => $balance_sw,
                        'K_sw' => $trans_now->where('sw_transaction_type', 'K')->sum('sw_kredit') ?? 0,
                        'D_sw' => $trans_now->where('sw_transaction_type', 'D')->sum('sw_debit') ?? 0,
                        'KM_sw' => $trans_now->where('sw_transaction_type', 'KM')->sum('sw_kredit') ?? 0,
                        'DM_sw' => $trans_now->where('sw_transaction_type', 'DM')->sum('sw_debit') ?? 0,
                        'KRMD_sw' => $trans_now->where('sw_transaction_type', 'KRMD')->sum('sw_kredit') ?? 0,

                        // 'isvisible' => ($q->where('depo', 'sw')->first()['balance'] ?? 0) + ($q->where('depo', 'sk')->first()['balance'] ?? 0) + ($q->where('depo', 'sw')->first()['balance_before'] ?? 0) + ($q->where('depo', 'sk')->first()['balance_before'] ?? 0),
                        'saldo_global' => $balance_sk + $balance_sw,

                        'balance_before_sk' => $sksaldo_before ?? 0,
                        'debit_sk' => $trans_now->sum('sk_debit') ?? 0,
                        'kredit_sk' => $trans_now->sum('sk_kredit') ?? 0,
                        'balance_sk' => $balance_sk,
                        'K_sk' => $trans_now->where('sk_transaction_type', 'K')->sum('sk_kredit') ?? 0,
                        'D_sk' => $trans_now->where('sk_transaction_type', 'D')->sum('sk_debit') ?? 0,
                        'KM_sk' => $trans_now->where('sk_transaction_type', 'KM')->sum('sk_kredit') ?? 0,
                        'DM_sk' => $trans_now->where('sk_transaction_type', 'DM')->sum('sk_debit') ?? 0,
                        'KRMD_sk' => $trans_now->where('sk_transaction_type', 'KRMD')->sum('sk_kredit') ?? 0,

                    ];
                })->values()
            ];
        })->sortBy('unit')->values();

        // dd($maping_sksw);
        return Inertia::render('Sksw/Unit', [
            'batch_datas' => $maping_sksw,
            'branch' => $branch,
            'server_filters' => $getFilter ?? null

        ]);
    }

    public function sksw_wilayah()
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
        $getFilter->isWilayanNeeded = request()->isWilayanNeeded ??  false;
        $getFilter->wilayah = auth()->user()->hasPermissionTo('unit') ? auth()->user()->employee->area : (request()->wilayah ?? 0);

        $ranked_partition = DepositTransaction::queryBuilder($getFilter)->get(['idx_transaction']);
        $ranked_sksw = DepositTransaction::queryBuilder($getFilter)->with('deposit.branch', 'deposit.employee', 'branch')->get();
        $all_transaction = DepositTransaction::whereIn('idx_transaction', $ranked_partition->toArray())->get(['idx_transaction', 'branch_id', 'transaction_date', 'sw_kredit', 'sw_debit', 'sk_kredit', 'sk_debit']);

        $maping_sksw = $ranked_sksw->groupBy('branch.wilayah')->map(function ($data) use ($getFilter, $all_transaction) {
            return [
                'wilayah' => $data->first()->branch->wilayah,
                'data' => $data->groupBy('branch_id')->map(function ($query) use ($getFilter, $all_transaction) {
                    $first_data = $query->first();

                    $transbefore =  $all_transaction->where('branch_id', $first_data->branch_id)->where('transaction_date', '<', $getFilter->tanggal_start);
                    $trans_now = $query->where('transaction_date', $getFilter->tanggal_start);
                    $sksaldo_before = $transbefore->sum('sk_debit') - $transbefore->sum('sk_kredit');
                    $balance_sk = $sksaldo_before + ($trans_now->sum('sk_debit') - $trans_now->sum('sk_kredit')) ?? 0;
                    $swsaldo_before =  $transbefore->sum('sw_debit') - $transbefore->sum('sw_kredit');
                    $balance_sw = $swsaldo_before + ($trans_now->sum('sw_debit') - $trans_now->sum('sw_kredit')) ?? 0;
                    return [
                        'wilayah' => $first_data->branch->wilayah,
                        'unit' => $first_data->branch->unit,
                        'branch_id' => $first_data->branch_id,
                        'bulan' => $getFilter->tanggal,

                        'balance_before_sw' => $swsaldo_before ?? 0,
                        'debit_sw' => $trans_now->sum('sw_debit') ?? 0,
                        'kredit_sw' => $trans_now->sum('sw_kredit') ?? 0,
                        'balance_sw' => $balance_sw,
                        'K_sw' => $trans_now->where('sw_transaction_type', 'K')->sum('sw_kredit') ?? 0,
                        'D_sw' => $trans_now->where('sw_transaction_type', 'D')->sum('sw_debit') ?? 0,
                        'KM_sw' => $trans_now->where('sw_transaction_type', 'KM')->sum('sw_kredit') ?? 0,
                        'DM_sw' => $trans_now->where('sw_transaction_type', 'DM')->sum('sw_debit') ?? 0,
                        'KRMD_sw' => $trans_now->where('sw_transaction_type', 'KRMD')->sum('sw_kredit') ?? 0,

                        // 'isvisible' => ($q->where('depo', 'sw')->first()['balance'] ?? 0) + ($q->where('depo', 'sk')->first()['balance'] ?? 0) + ($q->where('depo', 'sw')->first()['balance_before'] ?? 0) + ($q->where('depo', 'sk')->first()['balance_before'] ?? 0),
                        'saldo_global' => $balance_sk + $balance_sw,

                        'balance_before_sk' => $sksaldo_before ?? 0,
                        'debit_sk' => $trans_now->sum('sk_debit') ?? 0,
                        'kredit_sk' => $trans_now->sum('sk_kredit') ?? 0,
                        'balance_sk' => $balance_sk,
                        'K_sk' => $trans_now->where('sk_transaction_type', 'K')->sum('sk_kredit') ?? 0,
                        'D_sk' => $trans_now->where('sk_transaction_type', 'D')->sum('sk_debit') ?? 0,
                        'KM_sk' => $trans_now->where('sk_transaction_type', 'KM')->sum('sk_kredit') ?? 0,
                        'DM_sk' => $trans_now->where('sk_transaction_type', 'DM')->sum('sk_debit') ?? 0,
                        'KRMD_sk' => $trans_now->where('sk_transaction_type', 'KRMD')->sum('sk_kredit') ?? 0,


                    ];
                })->values()
            ];
        })->sortBy('wilayah')->values();

        return Inertia::render('Sksw/Wilayah', [
            'batch_datas' => $maping_sksw,
            'server_filters' => $getFilter ?? null
        ]);
    }




    public function sksw_global()
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
        $getFilter->isWilayanNeeded = request()->isWilayanNeeded ??  false;
        $getFilter->wilayah = auth()->user()->hasPermissionTo('unit') ? auth()->user()->employee->area : (request()->wilayah ?? 0);

        $ranked_partition = DepositTransaction::queryBuilder($getFilter)->get(['idx_transaction']);
        $ranked_sksw = DepositTransaction::queryBuilder($getFilter)->with('deposit.branch', 'deposit.employee', 'branch')->get();

        $all_transaction = DepositTransaction::whereIn('idx_transaction', $ranked_partition->toArray())->with('branch')->get(['idx_transaction', 'branch_id', 'transaction_date', 'sw_kredit', 'sw_debit', 'sk_kredit', 'sk_debit']);

        $maping_sksw = $ranked_sksw->groupBy('branch.wilayah')->map(function ($data) use ($getFilter, $all_transaction) {
            $first_data = $data->first();
            $transbefore =  $all_transaction->where('branch.wilayah', $first_data->branch->wilayah)->where('transaction_date', '<', $getFilter->tanggal_start);
            $trans_now = $data->where('transaction_date', $getFilter->tanggal_start);
            $sksaldo_before = $transbefore->sum('sk_debit') - $transbefore->sum('sk_kredit');
            $balance_sk = $sksaldo_before + ($trans_now->sum('sk_debit') - $trans_now->sum('sk_kredit')) ?? 0;
            $swsaldo_before =  $transbefore->sum('sw_debit') - $transbefore->sum('sw_kredit');
            $balance_sw = $swsaldo_before + ($trans_now->sum('sw_debit') - $trans_now->sum('sw_kredit')) ?? 0;
            return [
                'wilayah' => $first_data->branch->wilayah,
                'bulan' => $getFilter->tanggal,

                'balance_before_sw' => $swsaldo_before ?? 0,
                'debit_sw' => $trans_now->sum('sw_debit') ?? 0,
                'kredit_sw' => $trans_now->sum('sw_kredit') ?? 0,
                'balance_sw' => $balance_sw,
                'K_sw' => $trans_now->where('sw_transaction_type', 'K')->sum('sw_kredit') ?? 0,
                'D_sw' => $trans_now->where('sw_transaction_type', 'D')->sum('sw_debit') ?? 0,
                'KM_sw' => $trans_now->where('sw_transaction_type', 'KM')->sum('sw_kredit') ?? 0,
                'DM_sw' => $trans_now->where('sw_transaction_type', 'DM')->sum('sw_debit') ?? 0,
                'KRMD_sw' => $trans_now->where('sw_transaction_type', 'KRMD')->sum('sw_kredit') ?? 0,

                // 'isvisible' => ($q->where('depo', 'sw')->first()['balance'] ?? 0) + ($q->where('depo', 'sk')->first()['balance'] ?? 0) + ($q->where('depo', 'sw')->first()['balance_before'] ?? 0) + ($q->where('depo', 'sk')->first()['balance_before'] ?? 0),
                'saldo_global' => $balance_sk + $balance_sw,

                'balance_before_sk' => $sksaldo_before ?? 0,
                'debit_sk' => $trans_now->sum('sk_debit') ?? 0,
                'kredit_sk' => $trans_now->sum('sk_kredit') ?? 0,
                'balance_sk' => $balance_sk,
                'K_sk' => $trans_now->where('sk_transaction_type', 'K')->sum('sk_kredit') ?? 0,
                'D_sk' => $trans_now->where('sk_transaction_type', 'D')->sum('sk_debit') ?? 0,
                'KM_sk' => $trans_now->where('sk_transaction_type', 'KM')->sum('sk_kredit') ?? 0,
                'DM_sk' => $trans_now->where('sk_transaction_type', 'DM')->sum('sk_debit') ?? 0,
                'KRMD_sk' => $trans_now->where('sk_transaction_type', 'KRMD')->sum('sk_kredit') ?? 0,

            ];
        })->sortBy('wilayah')->values();




        return Inertia::render('Sksw/Index', [
            'datas' => $maping_sksw,
            'server_filters' => $getFilter ?? null
        ]);
    }
}
