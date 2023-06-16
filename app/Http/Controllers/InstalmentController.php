<?php

namespace App\Http\Controllers;

use App\Helpers\AppHelper;
use App\Models\Instalment;
use App\Http\Requests\StoreInstalmentRequest;
use App\Http\Requests\UpdateInstalmentRequest;
use App\Models\Employee;
use App\Models\Loan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class InstalmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $date = [];
        $kelompok = request()->data['kelompok'] ?? 1;
        $hari = request()->data['hari'] ?? AppHelper::dateName(Carbon::now()->format('Y-m-d'));
        $pinjaman = Loan::where('kelompok', $kelompok)->where('hari', $hari)->whereIn('status', ['normal', 'cm'])->with('customer', 'angsuran')->orderBy('tanggal_drop', 'asc');

        $startDate = date('Y-m-d', strtotime($pinjaman->min('tanggal_drop') . ' +1 week'));
        $endDate =  Carbon::now()->format('Y-m-d');
        $dateArray = array();

        while (strtotime($startDate) <= strtotime($endDate)) {
            if (date('D', strtotime($startDate)) == date('D', strtotime($endDate))) {
                $dateArray[] = date('Y-m-d', strtotime($startDate));
            }
            $startDate = date('Y-m-d', strtotime($startDate . ' + 1 day'));
        }

        $kelompok = Employee::when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('branch_id', auth()->user()->employee->branch_id);
        })->where('area', '!=', "0");

        return Inertia::render('Pinjaman/Angsuran', [
            'display_tanggal' => $dateArray,
            'pinjaman' => $pinjaman->get(),
            'kelompok' => $kelompok->distinct('area')->get('area'),
            'mantri' => $kelompok->get(),
            'dataFilters' => request()->data ?? null
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function bayar(Request $request, Loan $loan)
    {
        $isPaid = Instalment::where('loan_id', $loan->id)->where('pembayaran_date', $request->pembayaran_date)->first() ? true : false;
        if ($isPaid) {
            throw ValidationException::withMessages([
                'pembayaran_date' => 'Data Tanggal Ini Sudah Di isi',
            ]);
        }
        try {
            DB::beginTransaction();
            $sumAngsuran = Instalment::where('loan_id', $loan->id)->sum('jumlah');

            $loan->saldo = $loan->saldo - $request->jumlah;
            $loan->status = $request->status;
            $loan->save();
            $loan->angsuran()->create([
                "pembayaran_date" => $request->pembayaran_date,
                "jumlah" => $request->jumlah,
                "status" => $request->status,
                "mantri" => $loan->mantri,
                'total_angsuran' => $sumAngsuran + $request->jumlah,
                'saldo_terakhir' => $loan->saldo - $request->jumlah,
                'danatitipan' => $request->danatitipan ? 'true' : 'false'

            ]);
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('unit.pinjaman.angsuran.index')->withErrors('Terjadi Kesalahan Silahkan Refresh Browser');
        }
        return redirect()->route('unit.pinjaman.angsuran.index')->with('message', 'Data Berhasil Diubah');
    }
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreInstalmentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreInstalmentRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Instalment  $instalment
     * @return \Illuminate\Http\Response
     */
    public function show(Instalment $instalment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Instalment  $instalment
     * @return \Illuminate\Http\Response
     */
    public function edit(Instalment $instalment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateInstalmentRequest  $request
     * @param  \App\Models\Instalment  $instalment
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateInstalmentRequest $request, Instalment $instalment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Instalment  $instalment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Instalment $instalment)
    {
        //
    }
}
