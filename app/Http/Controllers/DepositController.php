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
use Illuminate\Support\Facades\Validator;
use SebastianBergmann\CodeCoverage\Report\Xml\Unit;

class DepositController extends Controller
{

    public function dashboard()
    {

        $branch = Branch::all();
        $employee = Employee::orderBy("date_resign", "asc")->orderBy("nama_karyawan", "asc")->get();
        $requestFilter = new \stdClass;
        $requestFilter->branch_id = request()->branch_id ?? 91;
        $requestFilter->wilayah = Branch::find($requestFilter->branch_id)->wilayah;

        $simpanan = Deposit::with('employee', 'branch', 'deposit_transactions')->where('branch_id', $requestFilter->branch_id)->get();
        $data = collect($simpanan)->map(
            function ($que) {
                $saldoSw = ($que->deposit_transactions->sum('sw_debit') - $que->deposit_transactions->sum('sw_kredit')) ?? 0;
                $saldoSk = ($que->deposit_transactions->sum('sk_debit') - $que->deposit_transactions->sum('sk_kredit')) ?? 0;
                $tidak_punya_saldo = $saldoSw + $saldoSk == 0;
                $is_active = $tidak_punya_saldo &&  $que->employee->date_resign ?  "tidak" : "active";
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
                    'isactive' => $is_active,
                    'status_karyawan' => $que->employee->date_resign ? 'Resign' : 'Aktif',
                    'hiredate' => $que->employee->hire_date ?? '-',
                ];
            }
        )->where('isactive', "active")->sortBy('nama')->values();

        // dd($data);
        return Inertia::render("NewPage/SKSW/Dashboard", [
            'datas' => $data,
            'branch' => $branch,
            'server_filter' => ['wilayah' => $requestFilter->wilayah, 'branch_id' => $requestFilter->branch_id, 'branch' => $branch,  'employees' => $employee]
        ]);
    }

    public function sksw_non_active()
    {
        $branch = Branch::all();
        $employee = Employee::orderBy("date_resign", "asc")->orderBy("nama_karyawan", "asc")->get();
        $requestFilter = new \stdClass;
        $requestFilter->branch_id = request()->branch_id ?? 91;
        $requestFilter->wilayah = Branch::find($requestFilter->branch_id)->wilayah;

        $simpanan = Deposit::with('employee', 'branch', 'deposit_transactions')->where('branch_id', $requestFilter->branch_id)->get();
        $data = collect($simpanan)->map(
            function ($que) {
                $saldoSw = ($que->deposit_transactions->sum('sw_debit') - $que->deposit_transactions->sum('sw_kredit')) ?? 0;
                $saldoSk = ($que->deposit_transactions->sum('sk_debit') - $que->deposit_transactions->sum('sk_kredit')) ?? 0;
                $saldoTerakhirsw = $que->deposit_transactions->where('sw_transaction_type', 'KRMD')->sortByDesc('transaction_date')->first()?->sw_kredit;
                $saldoTerakhirsk = $que->deposit_transactions->where('sk_transaction_type', 'KRMD')->sortByDesc('transaction_date')->first()?->sk_kredit;
                $tidak_punya_saldo = $saldoSw + $saldoSk == 0;
                $is_active = $tidak_punya_saldo &&  $que->employee->date_resign ?  "tidak" : "active";
                return  [
                    'id' => $que->id,
                    'wilayah' => $que->branch->wilayah ?? '-',
                    'unit' => $que->branch->unit ?? '-',
                    'nama' => $que->employee->nama_karyawan ?? '-',
                    'jabatan' => $que->employee->jabatan ?? '-',
                    'tanggal_tabungan' => $que->tgl_tabugan ?? '-',
                    'saldo_sw' => $saldoTerakhirsw,
                    'saldo_sk' => $saldoTerakhirsk,
                    'total_saldo' => $saldoTerakhirsw + $saldoTerakhirsk,
                    'isactive' => $is_active,
                    'status_karyawan' => $que->employee->date_resign ? 'Resign' : 'Aktif',
                    'hiredate' => $que->employee->hire_date ?? '-',
                ];
            }
        )->where('isactive', "tidak")->sortBy('nama')->values();

        // dd($data);
        return Inertia::render("NewPage/SKSW/DashboardNon", [
            'datas' => $data,
            'branch' => $branch,
            'server_filter' => ['wilayah' => $requestFilter->wilayah, 'branch_id' => $requestFilter->branch_id, 'branch' => $branch,  'employees' => $employee]
        ]);
    }


    public function store(Request $request)
    {

        // dd($request->all());
        $validation = $request->validate([
            "employee_id" => ['required', 'integer'],
            "sw_balance" => ['required', 'integer'],
            "sk_balance" => ['required', 'integer'],
            "tgl_tabugan" => ['required', 'date'],


        ], [
            '*.required' => ['wajib diisi'],
            '*.numeric' => ['isikan angka minimal 1'],
            '*.string' => ['karakter eror hanya masukkan angka dan huruf saja'],
        ]);

        $validator = Validator::make($request->all(), ['employee_id' => 'required|unique:deposits,employee_id']);
        $sksw_id = $validator->fails() ? Deposit::where('employee_id', $request->employee_id)->first()->id : null;

        if ($validator->fails()) {
            return redirect()->route('sksw.transaksi', $sksw_id)->withErrors('Karyawan Sudah Memiliki Data SKSW');
        }


        $karyawan = Employee::find($request->employee_id);
        $tanggal_tabungan = Carbon::parse($request->tgl_tabugan)->startOfMonth()->format('Y-m-d');


        try {
            DB::beginTransaction();
            $deposit = Deposit::create([
                "employee_id" => $request->employee_id,
                "branch_id" => $karyawan->branch_id,
                "tgl_tabugan" => $tanggal_tabungan,
            ]);

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



    public function transaksi(Deposit $deposit)
    {

        $branch = Branch::where('id', '!=', $deposit->branch_id)->orderBy('wilayah', 'asc')->orderBy('unit', 'asc')->get();
        $employee = Employee::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('branch_id', auth()->user()->employee->branch_id))->get();
        $deposit = $deposit->load('deposit_transactions.branch', 'branch', 'employee');
        $saldoSk =  ($deposit->deposit_transactions->sum('sk_debit') - $deposit->deposit_transactions->sum('sk_kredit'));
        $saldoSw = ($deposit->deposit_transactions->sum('sw_debit') - $deposit->deposit_transactions->sum('sw_kredit'));
        $tidak_punya_saldo = $saldoSw + $saldoSk == 0;
        $is_active = $tidak_punya_saldo &&  $deposit->employee->date_resign ?  "Non Active" : "Active";
        $data_deposit = [
            'id' => $deposit->id,

            'sk_balance' => $saldoSk,
            'sw_balance' => $saldoSw,

            'nama_karyawan' => $deposit->employee->nama_karyawan,
            'status_karyawan' => $deposit->employee->date_resign ? 'Resign' : 'Aktive',

            'status_sksw' => $is_active,

            'unit' => $deposit->branch->unit,
        ];

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
        return Inertia::render("NewPage/SKSW/Transaksi", [
            'deposit' => $data_deposit,
            'datas' => $data,
            'branch' => $branch,
            'validating' => ['min_date' => Carbon::create($mindate)->format('Y-m'), 'max_date' => Carbon::now()->lastOfMonth()->format('Y-m')],
            'employees' => $employee
        ]);
    }

    public function addtransaksi(Deposit $deposit, Request $request)
    {
        // dd($request->all());

        $request->validate([
            'transaction_date' => ['required'],
            'transaction' => ['required'],
            'transaction_type' => ['required']
        ]);

        $tanggal_tabungan = Carbon::parse($request->transaction_date)->startOfMonth()->format('Y-m-d');
        $max_idx = $deposit->deposit_transactions()->max('idx_transaction');
        try {
            DB::beginTransaction();
            if ($request->transaction == "D") {

                $sk_balance = ($deposit->deposit_transactions->sum('sk_debit') - $deposit->deposit_transactions->sum('sk_kredit'));
                $sw_balance = ($deposit->deposit_transactions->sum('sw_debit') - $deposit->deposit_transactions->sum('sw_kredit'));


                $req_sw_balance = $request->saldo_awal_sw;
                $req_sk_balance = $request->saldo_awal_sk;


                if ($sw_balance !== $req_sw_balance || $sk_balance !== $req_sk_balance) {
                    return redirect()->route('sksw.transaksi', $deposit->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
                }

                // $idx_transaction = $deposit->deposit_transactions()->where('branch_id',$deposit->branch_id)

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
                    "idx_transaction" => $max_idx,
                ]);
            }

            if ($request->transaction == "K") {


                $sk_balance = ($deposit->deposit_transactions->sum('sk_debit') - $deposit->deposit_transactions->sum('sk_kredit'));
                $sw_balance = ($deposit->deposit_transactions->sum('sw_debit') - $deposit->deposit_transactions->sum('sw_kredit'));


                $req_sw_balance = $request->saldo_awal_sw;
                $req_sk_balance = $request->saldo_awal_sk;



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
                    "idx_transaction" =>  $max_idx,
                ]);



                if ($request->transaction_type == "KRMD") {

                    if ($sk_balance == $request->nominal_sk) {
                        $employee = Employee::find($deposit->employee_id);
                        $employee->pencairan_simpanan_date =   $employee->pencairan_simpanan_date ?? $tanggal_tabungan;
                        $employee->pencairan_simpanan_by =  $employee->pencairan_simpanan_by ?? auth()->user()->employee_id;
                        $employee->save();
                    }

                    if ($sw_balance == $request->nominal_sw) {
                        $employee = Employee::find($deposit->employee_id);
                        $employee->pencairan_simpanan_w_date =   $employee->pencairan_simpanan_w_date ?? $tanggal_tabungan;
                        $employee->pencairan_simpanan_w_by =     $employee->pencairan_simpanan_w_by ?? auth()->user()->employee_id;
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
                    "idx_transaction" => $max_idx,
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
            return redirect()->route('sksw.transaksi', $deposit->id)->withErrors('Data gagal ditambahkan refresh sebelum memulai lagi');
        }
        return redirect()->route('sksw.transaksi', $deposit->id)->with('message', 'Data berhasil ditambahkan');
    }


    public function sksw_global()
    {



        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now()->format('Y-m'));
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = false;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');



        $ranked_partition = DepositTransaction::queryBuilder($requestFilter)->get(['idx_transaction']);
        $ranked_sksw = DepositTransaction::queryBuilder($requestFilter)->with('deposit.branch', 'deposit.employee', 'branch')->get();

        $all_transaction = DepositTransaction::whereIn('idx_transaction', $ranked_partition->toArray())->with('branch')->get(['idx_transaction', 'branch_id', 'transaction_date', 'sw_kredit', 'sw_debit', 'sk_kredit', 'sk_debit']);

        $maping_sksw = $ranked_sksw->groupBy('branch.wilayah')->map(function ($data) use ($requestFilter, $all_transaction) {
            $first_data = $data->first();
            $transbefore =  $all_transaction->where('branch.wilayah', $first_data->branch->wilayah)->where('transaction_date', '<', $requestFilter->startOfMonth);
            $trans_now = $data->where('transaction_date', $requestFilter->startOfMonth);
            $sksaldo_before = $transbefore->sum('sk_debit') - $transbefore->sum('sk_kredit');
            $balance_sk = $sksaldo_before + ($trans_now->sum('sk_debit') - $trans_now->sum('sk_kredit')) ?? 0;
            $swsaldo_before =  $transbefore->sum('sw_debit') - $transbefore->sum('sw_kredit');
            $balance_sw = $swsaldo_before + ($trans_now->sum('sw_debit') - $trans_now->sum('sw_kredit')) ?? 0;
            return [
                'wilayah' => $first_data->branch->wilayah,
                'bulan' => $requestFilter->endOfMonth,

                'balance_before_sw' => $swsaldo_before ?? 0,
                'debit_sw' => $trans_now->sum('sw_debit') ?? 0,
                'kredit_sw' => $trans_now->sum('sw_kredit') ?? 0,
                'balance_sw' => $balance_sw,
                'K_sw' => $trans_now->where('sw_transaction_type', 'K')->sum('sw_kredit') ?? 0,
                'D_sw' => $trans_now->where('sw_transaction_type', 'D')->sum('sw_debit') ?? 0,
                'KM_sw' => $trans_now->where('sw_transaction_type', 'KM')->sum('sw_kredit') ?? 0,
                'DM_sw' => $trans_now->where('sw_transaction_type', 'DM')->sum('sw_debit') ?? 0,
                'KRMD_sw' => $trans_now->where('sw_transaction_type', 'KRMD')->sum('sw_kredit') ?? 0,

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


        return Inertia::render("NewPage/SKSW/Index", [
            'datas' => $maping_sksw,
            'server_filter' => ['bulan' => $tanggal->format('Y-m')]
        ]);
    }

    public function sksw_wilayah()
    {
        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now()->format('Y-m'));
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = false;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');

        $ranked_partition = DepositTransaction::queryBuilder($requestFilter)->get(['idx_transaction']);
        $ranked_sksw = DepositTransaction::queryBuilder($requestFilter)->with('deposit.branch', 'deposit.employee', 'branch')->get();
        $all_transaction = DepositTransaction::whereIn('idx_transaction', $ranked_partition->toArray())->get(['idx_transaction', 'branch_id', 'transaction_date', 'sw_kredit', 'sw_debit', 'sk_kredit', 'sk_debit']);

        $maping_sksw = $ranked_sksw->groupBy('branch.wilayah')->map(function ($data) use ($requestFilter, $all_transaction) {
            return [
                'wilayah' => $data->first()->branch->wilayah,
                'data' => $data->groupBy('branch_id')->map(function ($query) use ($requestFilter, $all_transaction) {
                    $first_data = $query->first();

                    $transbefore =  $all_transaction->where('branch_id', $first_data->branch_id)->where('transaction_date', '<', $requestFilter->startOfMonth);
                    $trans_now = $query->where('transaction_date', $requestFilter->startOfMonth);
                    $sksaldo_before = $transbefore->sum('sk_debit') - $transbefore->sum('sk_kredit');
                    $balance_sk = $sksaldo_before + ($trans_now->sum('sk_debit') - $trans_now->sum('sk_kredit')) ?? 0;
                    $swsaldo_before =  $transbefore->sum('sw_debit') - $transbefore->sum('sw_kredit');
                    $balance_sw = $swsaldo_before + ($trans_now->sum('sw_debit') - $trans_now->sum('sw_kredit')) ?? 0;
                    return [
                        'wilayah' => $first_data->branch->wilayah,
                        'unit' => $first_data->branch->unit,
                        'branch_id' => $first_data->branch_id,
                        'bulan' => $requestFilter->endOfMonth,

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


        // dd($maping_sksw);
        return Inertia::render("NewPage/SKSW/Wilayah", [
            'batch_datas' => $maping_sksw,
            'server_filter' => ['bulan' => $tanggal->format('Y-m')]
        ]);
    }


    public function sksw_unit()
    {

        $branch = Branch::all();
        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now()->format('Y-m'));
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = true;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');
        $requestFilter->wilayah = (request()->wilayah ?? 0);
        // dd(request()->wilayah);


        $ranked_partition = DepositTransaction::queryBuilder($requestFilter)->get(['idx_transaction']);
        $ranked_sksw = DepositTransaction::queryBuilder($requestFilter)->with('deposit.branch', 'deposit.employee', 'branch')->get();
        $all_transaction = DepositTransaction::whereIn('idx_transaction', $ranked_partition->toArray())->get(['idx_transaction', 'transaction_date', 'sw_kredit', 'sw_debit', 'sk_kredit', 'sk_debit']);

        $maping_sksw = $ranked_sksw->groupBy('branch_id')->map(function ($data) use ($requestFilter, $all_transaction) {
            return [
                'branch_id' => $data->first()->branch->id,
                'unit' => $data->first()->branch->unit,
                'data' =>  $data->groupBy('deposit_id')->map(function ($quer) use ($requestFilter, $all_transaction) {
                    $first_data = $quer->first();
                    $transbefore =  $all_transaction->where('idx_transaction', $first_data->idx_transaction)->where('transaction_date', '<', $requestFilter->startOfMonth);
                    $sksaldo_before = $transbefore->sum('sk_debit') - $transbefore->sum('sk_kredit');
                    $trans_now = $quer->where('transaction_date', $requestFilter->startOfMonth);
                    $balance_sk = $sksaldo_before + ($trans_now->sum('sk_debit') - $trans_now->sum('sk_kredit')) ?? 0;
                    $swsaldo_before =  $transbefore->sum('sw_debit') - $transbefore->sum('sw_kredit');
                    $balance_sw = $swsaldo_before + ($trans_now->sum('sw_debit') - $trans_now->sum('sw_kredit')) ?? 0;
                    return [
                        'id_tabungan' => $first_data->deposit_id,
                        'wilayah' => $first_data->branch->wilayah,
                        'unit' =>  $first_data->branch->unit,
                        'is_active' => $first_data->deposit->employee->date_resign ? 'Off' : 'Active',
                        'nama_karyawan' => $first_data->deposit->employee->nama_karyawan,
                        'bulan' => $requestFilter->endOfMonth,

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
        // dd(sksw_unit);
        // dd($maping_sksw);
        return Inertia::render("NewPage/SKSW/Unit", [
            'batch_datas' => $maping_sksw,
            'branch' => $branch,
            'server_filter' => ['wilayah' => $requestFilter->wilayah, 'branch' => $branch, 'bulan' => $tanggal->format('Y-m')]

        ]);
    }
}
