<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\UnitPayment;
use App\Models\UnitPaymentTransaction;
use App\Models\UnitSaving;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class UnitPaymentController extends Controller
{




    public function goro_index()
    {
        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now());
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = true;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');


        $data = Branch::with(['unit_transaction' => function ($query) use ($requestFilter) {
            $query->whereHas('account', function ($sub_query) {
                $sub_query->where('account_name', 'GORO');
            })
                ->where('transaction_date', '<=', $requestFilter->endOfMonth);
        }])->get();
        // dd($data);

        $result = $data->groupBy('wilayah')->map(function ($wilayah) use ($requestFilter) {
            $sumBefore = $wilayah->map(function ($branch) use ($requestFilter) {
                return $branch->unit_transaction->where('transaction_date', "<", $requestFilter->startOfMonth)->sum('nominal');
            })->sum();
            $sumOn = $wilayah->map(function ($branch) use ($requestFilter) {
                return $branch->unit_transaction->whereBetween('transaction_date', [$requestFilter->startOfMonth, $requestFilter->endOfMonth])
                    ->sum('nominal');
            })->sum();

            $count_wilayah = $wilayah->unique('id')->count();
            return [
                'wilayah' => $wilayah->first()->wilayah,
                'sum_nominal_before' => $sumBefore,
                'sum_nominal_on' => $sumOn,
                'total_pembayaran' => $sumBefore + $sumOn,
                'sisa_goro' => (100000000 * $count_wilayah) - ($sumBefore + $sumOn),
            ];
        })->sortBy('wilayah')->values();

        Session::put('goro_index_wilayah_show', ['wilayah' => request()->backparam]);

        return Inertia::render('NewPage/GoroUmrah/Index', [
            'datas' => $result,
            'server_filter' => ['bulan' => $tanggal->format('Y-m')],
            'wilayah_show' => Session::get('goro_index_wilayah_show')
        ]);
    }


    public function requestWilayahTransaction(Request $request)
    {

        $request->validate(['wilayah' => ['required']]);

        $tanggal = Carbon::parse($request->bulan ?? Carbon::now());
        $requestFilter = new \stdClass;
        $requestFilter->wilayah = $request->wilayah;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');

        $wilayahrequest = $request->wilayah;
        $data = Cache::remember("branch_unit_goro_transaction_wilayah_$wilayahrequest", 60, function () use ($requestFilter) {
            return Branch::where('wilayah', $requestFilter->wilayah)->with(['unit_transaction' => function ($query) use ($requestFilter) {
                $query->whereHas('account', function ($sub_query) {
                    $sub_query->where('account_name', 'GORO');
                })->where('transaction_date', '<=', $requestFilter->endOfMonth);
            }])->get();
        });



        $result = $data->groupBy('id')->map(function ($unit) use ($requestFilter) {
            $sumBefore = $unit->map(function ($branch) use ($requestFilter) {
                return $branch->unit_transaction->where('transaction_date', "<", $requestFilter->startOfMonth)->sum('nominal');
            })->sum();

            $sumOn = $unit->map(function ($branch) use ($requestFilter) {
                return $branch->unit_transaction->whereBetween('transaction_date', [$requestFilter->startOfMonth, $requestFilter->endOfMonth])
                    ->sum('nominal');
            })->sum();

            return [
                'unit_id' => $unit->first()->id,
                'unit' => $unit->first()->unit,
                'sum_nominal_before' => $sumBefore,
                'sum_nominal_on' => $sumOn,
                'total_pembayaran' => $sumBefore + $sumOn,
                'sisa_goro' => 100000000 - ($sumBefore + $sumOn),
            ];
        })->values();


        return response()->json(['data' => $result]);
    }

    public function requestUnitTransaction(Request $request)
    {

        $request->validate(['branch_id' => ['required']]);

        $tanggal = Carbon::parse($request->bulan ?? Carbon::now());
        $requestFilter = new \stdClass;
        $requestFilter->branch_id = $request->branch_id;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');

        $branch_idrequest = $request->branch_id;
        $data = Cache::remember("branch_unit_goro_transaction_unit_$branch_idrequest", 60, function () use ($requestFilter) {
            return Branch::where('id', $requestFilter->branch_id)->with(['unit_transaction' => function ($query) {
                $query->whereHas('account', function ($sub_query) {
                    $sub_query->where('account_name', 'GORO');
                });
            }])->first();
        });


        $total  = 0;
        $result = $data->unit_transaction->map(function ($transaction) use (&$total) {
            $total += $transaction->nominal;
            return [
                "transaction_date" => $transaction->transaction_date,
                "nominal" => $transaction->nominal,
                'total_pembayaran' => $total
            ];
        });

        return response()->json(['data' => $result]);
    }


    public function goro_create(Request $request)
    {
        // $request->all();
        $validate = $request->validate([
            "branch_id" => ["required_if:unit_payment_id,1,3,4"],
            "unit_payment_id" => ['required'],
            "nominal" => ['required'],
            "transaction_date" => ["required"],
            "type_transaksi" => ["required"]
        ]);

        $branch = $request->branch_id ? Branch::find($request->branch_id) : null;


        $nominal = $request->nominal;
        if ($request->type_transaksi == 2) {
            $nominal *= -1;
        }

        try {
            DB::beginTransaction();
            $generateData = UnitPaymentTransaction::create([
                "unit_payment_id" => $request->unit_payment_id,
                "branch_id" => $request->branch_id,
                "employee_id" => $request->employee_id,
                "transaction_date" => $request->transaction_date,
                "nominal" => $nominal,
                "remark" => $request->remark,
            ]);

            if ($request->unit_payment_id == 1) {
                $wilayah = $branch->wilayah;
                $id = $branch->id;
                Cache::forget("branch_unit_goro_transaction_wilayah_$wilayah");
                Cache::forget("branch_unit_goro_transaction_unit_$id");
            }

            if ($request->unit_payment_id == 3) {
                $branch = Branch::find($request->branch_id);
                $wilayah = $branch->wilayah;
                $id = $branch->id;
                Cache::forget("branch_unit_goro_stordo");
                Cache::forget("branch_unit_goro_stordo_$id");
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('Data Gagal Disimpan Mohon Muat Ulang Halaman');
        }

        $previousUrl = url()->previous();
        $urlComponents = parse_url($previousUrl);
        parse_str($urlComponents['query'] ?? '', $queryParams);
        $queryParams['backparam'] = $request->unit_payment_id == 1 ? $branch->wilayah : ($request->unit_payment_id == 2 ? "" : $request->branch_id);
        $newUrl = url()->to($urlComponents['path']) . '?' . http_build_query($queryParams);


        return redirect($newUrl)->with('message', 'Data Berhasil disimpan');
    }

    public function goro_transaksi(Request $request)
    {
        $tanggal = Carbon::parse($request->bulan ?? Carbon::now());
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = true;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');


        $saldoBefore = UnitPaymentTransaction::where('transaction_date', "<", $requestFilter->startOfMonth)->whereHas('account', function ($query) {
            $query->where('account_type', "GORO");
        })->sum('nominal');

        $unitPayment = UnitPaymentTransaction::whereBetween('transaction_date', [$requestFilter->startOfMonth, $requestFilter->endOfMonth])->with('branch', 'account')->whereHas('account', function ($query) {
            $query->where('account_type', "GORO");
        })->get();



        $additional_array = [
            'id' => 0,
            'bulan' =>  $tanggal->startOfMonth()->format('M Y'),
            'transaction_date' => $requestFilter->startOfMonth,
            'keterangan' => "Saldo Sebelumnya",
            'unit' => null,
            'debit' => null,
            'kredit' => null,
            'saldo' => $saldoBefore,
        ];

        $saldo = $saldoBefore;
        $data_bulanan = $unitPayment->map(function ($item) use (&$saldo) {
            $saldo = $saldo + $item->nominal;
            $saldo_before_counting = $saldo;
            return [
                'id' => $item->id,
                'bulan' =>  Carbon::parse($item->transaction_date)->format('M Y'),
                'transaction_date' =>  Carbon::parse($item->transaction_date)->format('Y-m-d'),
                'keterangan' => $item->remark ?? null,
                'unit' => $item->branch->unit ?? null,
                'debit' => $item->nominal >= 0 ? $item->nominal : null,
                'kredit' => $item->nominal < 0 ? (-1 * $item->nominal) : null,
                'saldo' => $saldo_before_counting
            ];
        })->values();
        $data_bulanan->prepend($additional_array);


        $sessionValue = ['bulan' => $tanggal->format('Y-m')];

        Session::put('goro_transaksi_bulan', $sessionValue);

        return Inertia::render('NewPage/GoroUmrah/Transaksi', [
            'datas' => $data_bulanan,
            'server_filter' => Session::get('goro_transaksi_bulan')
        ]);
    }


    public function goro_pinjaman()
    {
        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now());
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = true;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');


        $data = UnitPaymentTransaction::with('branch', 'account')->whereHas('account', function ($acc) {
            $acc->where('account_name', 'PG');
        })->get();


        $result = $data->groupBy('branch_id')->map(function ($query) use ($requestFilter) {
            $total_pinjaman = $query->where('nominal', '<', 0)->sum('nominal') * -1;
            $bayar_on_month = $query->whereBetween('transaction_date', [$requestFilter->startOfMonth, $requestFilter->endOfMonth])->where('nominal', '>', 0)->sum('nominal') ?? 0;
            $total_bayar = $query->where('nominal', '>', 0)->sum('nominal');

            return [
                'id' => $query->first()->branch->id,
                'unit' => $query->first()->branch->unit,
                'wilayah' => $query->first()->branch->wilayah,
                'total_pinjaman' => $total_pinjaman,
                'bayar_on' => $bayar_on_month,
                'sisa' => $total_pinjaman - $total_bayar
            ];
        })->values();

        $branch = Branch::all();
        Session::put('goro_pinjaman_unit_show', ['branch' => request()->backparam]);

        return Inertia::render('NewPage/Kasbon/Index', [
            'datas' => $result,
            'server_filter' => ['bulan' => $tanggal->format('Y-m'), 'branch' => $branch],
            'unit_show' => Session::get('goro_pinjaman_unit_show')
        ]);
    }


    public function requestPinjamanUnit(Request $request)
    {
        $request->validate(['branch_id' => ['required']]);
        $tanggal = Carbon::parse($request->bulan ?? Carbon::now());
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = true;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');
        $requestFilter->branch_id =  $request->branch_id;


        $data = UnitPaymentTransaction::with('branch', 'account')
            ->where('branch_id', $request->branch_id)
            ->where('transaction_date', "<=", $requestFilter->endOfMonth)
            ->whereHas('account', function ($acc) {
                $acc->where('account_name', 'PG');
            })->get();

        $saldo = 0;
        $result = $data->map(function ($query) use (&$saldo) {
            $saldo = $saldo + $query->nominal;
            $saldo_before_counting = $saldo;
            return [
                'transaction_date' => $query->transaction_date,
                'pinjaman' => $query->nominal < 0 ? $query->nominal * -1 : null,
                'bayar' =>  $query->nominal > 0 ? $query->nominal : null,
                'sisa' => $saldo_before_counting * -1
            ];
        })->values();

        return response()->json(['data' => $result]);
    }

    public function goro_do()
    {
        $tanggal = Carbon::parse(request()->bulan ?? Carbon::now());
        $requestFilter = new \stdClass;
        $requestFilter->isWilayanNeeded = true;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');

        $data = Branch::whereIn('id', [15, 16, 51])->with(['unit_transaction' => function ($query) use ($requestFilter) {
            $query->whereHas('account', function ($sub_query) {
                $sub_query->where('account_name', 'STOR DO');
            })->where('transaction_date', '<=', $requestFilter->endOfMonth);
        }])->get();


        $result = $data->groupBy('id')->map(function ($unit) use ($requestFilter) {
            $sumBefore = $unit->map(function ($branch) use ($requestFilter) {
                return $branch->unit_transaction->where('transaction_date', "<", $requestFilter->startOfMonth)->sum('nominal');
            })->sum();

            $sumOn = $unit->map(function ($branch) use ($requestFilter) {
                return $branch->unit_transaction->whereBetween('transaction_date', [$requestFilter->startOfMonth, $requestFilter->endOfMonth])
                    ->sum('nominal');
            })->sum();

            return [
                'id' => $unit->first()->id,
                'unit' => $unit->first()->unit,
                'wilayah' => $unit->first()->wilayah,
                'sum_nominal_before' => $sumBefore,
                'sum_nominal_on' => $sumOn,
                'total_pembayaran' => $sumBefore + $sumOn,
            ];
        })->values();



        $branch = Branch::whereIn('id', [15, 16, 51])->get();
        Session::put('goro_stordo_unit_show', ['branch' => request()->backparam]);

        return Inertia::render('NewPage/GoroUmrahDo/Index', [
            'datas' => $result,
            'server_filter' => ['bulan' => $tanggal->format('Y-m'), 'branch' => $branch],
            'unit_show' => Session::get('goro_stordo_unit_show')
        ]);
    }


    public function requestDoUnit(Request $request)
    {

        $request->validate(['branch_id' => ['required']]);

        $tanggal = Carbon::parse($request->bulan ?? Carbon::now());
        $requestFilter = new \stdClass;
        $requestFilter->branch_id = $request->branch_id;
        $requestFilter->endOfMonth = $tanggal->endOfMonth()->format('Y-m-d');
        $requestFilter->startOfMonth = $tanggal->startOfMonth()->format('Y-m-d');

        $branch_idrequest = $request->branch_id;
        $data = Cache::remember("branch_unit_goro_stordo_$branch_idrequest", 60, function () use ($requestFilter) {
            return Branch::where('id', $requestFilter->branch_id)->with(['unit_transaction' => function ($query) {
                $query->whereHas('account', function ($sub_query) {
                    $sub_query->where('account_name', 'STOR DO');
                });
            }])->first();
        });


        $total  = 0;
        $result = $data->unit_transaction->map(function ($transaction) use (&$total) {
            $total += $transaction->nominal;
            return [
                "transaction_date" => $transaction->transaction_date,
                "nominal" => $transaction->nominal,
                'total_pembayaran' => $total
            ];
        });

        return response()->json(['data' => $result]);
    }
}
