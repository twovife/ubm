<?php

namespace App\Http\Controllers;

use App\Models\AssetMaster;
use App\Models\Branch;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AssetMasterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index_kendaraan()
    {
        $wilayah = request()->wilayah ?? 1;
        $branches = Branch::with(['asset_master' => function ($qq) {
            $qq->distinct('asset_masters.id')
                ->with(["asset_location" => function ($qw) {
                    $qw->with('branch_before', 'branch');
                }]);
        }, 'asset_master.asset_vehicle'])->whereHas('asset_master')->where('wilayah', $wilayah)->get();

        // dd($branches);

        $result = $branches->map(function ($branch) use ($wilayah) {
            $total_asset = 0;
            $total_non = 0;
            return [
                'branch_id' => $branch->id,
                'branch' => $branch->unit,

                'datas' => $branch->asset_master->map(function ($aset) use ($branch, &$total_asset, &$total_non, $wilayah) {
                    $latestPlace = $aset->asset_location->first();
                    $branch_before = $latestPlace->branch_before?->unit;
                    $isactive = $aset->isactive == "yes" ? ($latestPlace->branch->id == $branch->id ? 1 : 2) : 3;
                    $keterangan = $isactive == 1 ? ($branch_before !== null ? "pindahan dari $branch_before" : "") : ($isactive == 2 ? "dipindahkan ke" . $latestPlace->branch->unit : $aset->nonactive_reason);
                    $total_asset = $total_asset + ($isactive == 1 ? 1 : 0);
                    $total_non = $total_non + ($isactive != 1 ? 1 : 0);
                    return [
                        'branch_id' => $branch->id,
                        'wilayah' => $wilayah,
                        'id' => $aset->id,
                        'is_active' => $isactive,
                        'keterangan' => $keterangan,
                        'before' => $branch_before,
                        'asset_name' => $aset->asset_name,
                        'plat_nomor' => $aset->asset_vehicle->plat_nomor,
                        'tanggal_stnk' => $aset->asset_vehicle->tanggal_stnk,
                        'tanggal_pajak_tahunan' => $aset->asset_vehicle->tanggal_pajak_tahunan,
                        'nama_stnk' => $aset->asset_vehicle->nama_stnk,
                        'pengguna' => $latestPlace->pengguna

                    ];
                })->values(),
                'total_asset_aktif' => $total_asset,
                'total_asset_non_aktif' => $total_non,
            ];
        })->values();

        // dd($result);
        return Inertia::render('DataAsset/Index', [
            'datas' => $result,
            "server_filter" => ['wilayah' => $wilayah, 'branch' => Branch::all()]
        ]);
    }

    public function her_kendaraan()
    {
        $bulan =  Carbon::parse(request()->bulan) ?? Carbon::now()->endOfMonth();
        $bulanTambahsatu = $bulan->copy()->addMonthNoOverflow(1);

        $asset = AssetMaster::with([
            'asset_vehicle',
            'asset_location' => function ($locate) {
                $locate->with('branch');
            }
        ])->whereHas(
            'asset_vehicle',
            function ($vehicle) use ($bulanTambahsatu, $bulan) {
                $vehicle
                    ->whereMonth('tanggal_pajak_tahunan', $bulan->format('m'))
                    ->orWhereMonth('tanggal_pajak_tahunan', $bulanTambahsatu->format('m'))
                    ->orWhere('tanggal_pajak_tahunan', "<=", $bulanTambahsatu->format('Y-m-d'));
            }
        )->where('isactive', 'yes')->get();

        // dd($asset);

        $asetmaping = $asset->map(function ($asset) {
            $lokasi_sekarang = $asset->asset_location->first();
            $jenis_pajak = Carbon::parse($asset->asset_vehicle->tanggal_stnk)->format('Y-m') == Carbon::parse($asset->asset_vehicle->tanggal_pajak_tahunan)->format('Y-m') ? "5 Tahunan" : "1 Tahunan";
            return [
                'asset_id' => $asset->id,
                'branch_id' => $lokasi_sekarang->id,
                'branch' => $lokasi_sekarang->branch->unit,
                'wilayah' => $lokasi_sekarang->branch->wilayah,
                'asset_name' => $asset->asset_name,
                'plat_nomor' => $asset->asset_vehicle->plat_nomor,
                'tanggal_stnk' => $asset->asset_vehicle->tanggal_stnk,
                'tanggal_pajak_tahunan' => $asset->asset_vehicle->tanggal_pajak_tahunan,
                'nama_stnk' => $asset->asset_vehicle->nama_stnk,
                'pengguna' => $lokasi_sekarang->pengguna,
                "jenis_pajak" => $jenis_pajak,
                'bulan_pajak' => Carbon::parse($asset->asset_vehicle->tanggal_pajak_tahunan)->format('M')

            ];
        })->values();



        $result = $asetmaping->groupBy('bulan_pajak')->map(function ($items) use ($bulan, $bulanTambahsatu) {
            $total_asset = 0;
            return [
                "bulan" => $items->first()["bulan_pajak"],
                "id" => Carbon::parse($items->first()["bulan_pajak"])->format('m'),
                "datas" => $items->map(function ($pajak) use ($bulanTambahsatu, &$total_asset) {
                    $is_finish = Carbon::parse($pajak["tanggal_pajak_tahunan"])->format('Y-m') > $bulanTambahsatu->format('Y-m') ? 1 : 0;
                    $total_asset = $total_asset + $is_finish;
                    return [
                        'id' => $pajak["asset_id"],
                        'branch_id' => $pajak["branch_id"],
                        'wilayah' => $pajak["wilayah"],
                        'branch' => $pajak["branch"],
                        'asset_name' => $pajak["asset_name"],
                        'plat_nomor' => $pajak["plat_nomor"],
                        'tanggal_stnk' => $pajak["tanggal_stnk"],
                        'tanggal_pajak_tahunan' => $pajak["tanggal_pajak_tahunan"],
                        'is_finish' => $is_finish,
                        'nama_stnk' => $pajak["nama_stnk"],
                        'pengguna' => $pajak["pengguna"],
                        "jenis_pajak" => $pajak["jenis_pajak"],
                        'bulan_pajak' => $pajak["bulan_pajak"],

                    ];
                })->sortBy('branch')->sortBy('wilayah')->values(),
                'total_asset_aktif' => $items->count('branch_id'),
                'total_asset_her' => $total_asset,
            ];
        })->values();

        // dd($result);
        return Inertia::render('DataAsset/Her', [
            'datas' => $result,
            "server_filter" => ['bulan' => $bulan->format("Y-m")]
        ]);
    }

    public function herpayment_kendaraan(AssetMaster $assetMaster, Request $request)
    {
        $data_motor = $assetMaster->load("asset_vehicle", "asset_vehicle_payment");

        try {
            DB::beginTransaction();

            $tanggalHerSebelumnya = Carbon::parse($data_motor->asset_vehicle->tanggal_pajak_tahunan);
            $tanggalHerStnkSebelumnya = Carbon::parse($data_motor->asset_vehicle->tanggal_stnk);


            $jenis_her = $tanggalHerSebelumnya->format('Y-m') == $tanggalHerStnkSebelumnya->format('Y-m') ? "lustrum" : "tahunan";

            $tanggalHerDepan = $tanggalHerSebelumnya->addYearNoOverflow(1);
            $tanggalHer5TahunDepan = $jenis_her == "lustrum" ? $tanggalHerSebelumnya->addYearNoOverflow(5) : Carbon::parse($data_motor->asset_vehicle->tanggal_stnk);

            $data_motor->asset_vehicle_payment()->create([
                'tanggal_pembayaran_her' => Carbon::now()->format('Y-m-d'),
                'jenis_her' => $jenis_her
            ]);


            $data_motor->asset_vehicle()->update([
                'tanggal_pajak_tahunan' => $tanggalHerDepan->format('Y-m-d'),
                'tanggal_stnk' => $tanggalHer5TahunDepan->format('Y-m-d')
            ]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);
            return redirect()->back()->withErrors('ada kesalahan input, refresh / hubungi IT');
        }
        return redirect()->back()->with('message', 'data berhasil diubah');
    }

    public function getasset(Request $request)
    {
    }

    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store_kendaraan(Request $request)
    {



        $data =  $request->validate([
            "asset_name" => ["required", "string"],
            "asset_type_id" => ["nullable", "integer"],
            "asset_category_id" => ["nullable", "integer"],
            "asset_detail" => ['nullable', 'string'],
            "isactive" => ["required", "in:yes,no"],
            "plat_nomor" => ["required", "string"],
            "tanggal_stnk" => ["required", "date"],
            "tanggal_pajak_tahunan" => ["required", "date"],
            "nama_stnk" => ["required", "string"],
            "branch_id" => ["required", "integer"],
            "before_branch_id" => ["nullable", "integer"],
            "asset_place_id" => ["nullable", "integer"],
            "pengguna" => ["required", "string"],
            "keterangan" => ["nullable", "string"],
        ]);

        try {
            DB::beginTransaction();
            // generate asset master
            $master_asset = AssetMaster::create([
                "asset_name" => $request->asset_name,
                "asset_type_id" => $request->asset_type_id,
                "asset_category_id" => $request->asset_category_id,
                "asset_detail" => $request->asset_detail,
                "isactive" => $request->isactive,
                "purchase_date" => $request->purchase_date,
                // "nonactive_date" => $request->nonactive_date,
                // "nonactive_reason" => $request->nonactive_reason,
                // "batch_pembelian" => $request->batch_pembelian,
            ]);

            // generating Kendaraan Detail
            $kendaraan = $master_asset->asset_vehicle()->create([
                "plat_nomor" => $request->plat_nomor,
                "tanggal_stnk" => $request->tanggal_stnk,
                "tanggal_pajak_tahunan" => $request->tanggal_pajak_tahunan,
                "nama_stnk" => $request->nama_stnk,
            ]);

            // penempatan kendaraan
            $penempatan = $master_asset->asset_location()->create([
                "branch_id" => $request->branch_id,
                "before_branch_id" => $request->before_branch_id,
                "asset_place_id" => $request->asset_place_id,
                "pengguna" => $request->pengguna,
                "keterangan" => $request->keterangan,
            ]);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd('rusah cok');
            return redirect()->back()->withErrors('ada kesalahan input, refresh / hubungi IT');
        }
        return redirect()->back()->with('message', 'data berhasil diubah');
    }

    /**
     * Display the specified resource.
     */

    /**
     * Show the form for editing the specified resource.
     */

    /**
     * Update the specified resource in storage.
     */
    public function update_kendaraan(AssetMaster $assetMaster, Request $request)
    {
        $data =  $request->validate([
            "asset_name" => ["required", "string"],
            "asset_detail" => ['nullable', 'string'],
            "edit" => ["required", "in:edit,pindah,jual,hilang"],
            "plat_nomor" => ["required", "string"],
            "tanggal_stnk" => ["required", "date"],
            "tanggal_pajak_tahunan" => ["required", "date"],
            "nama_stnk" => ["required", "string"],
            "branch_id" => ["required", "integer"],
            "pengguna" => ["required", "string"],
            "keterangan" => ["nullable", "string"],
        ]);


        $paramsOut = ($request->edit == "edit" || $request->edit == "pindah") ? "yes" : "no";
        try {
            DB::beginTransaction();

            $assetMaster->update([
                "asset_name" => $request->asset_name,
                "asset_detail" => $request->asset_detail,
                "isactive" => $paramsOut,
                "purchase_date" => $request->purchase_date,
            ]);

            $assetMaster->asset_vehicle()->update([
                "plat_nomor" => $request->plat_nomor,
                "tanggal_stnk" => $request->tanggal_stnk,
                "tanggal_pajak_tahunan" => $request->tanggal_pajak_tahunan,
                "nama_stnk" => $request->nama_stnk,
            ]);


            if ($request->edit == "edit") {
                $assetMaster->asset_location()->update([
                    "branch_id" => $request->branch_id,
                    "asset_place_id" => $request->asset_place_id,
                    "pengguna" => $request->pengguna,
                    "keterangan" => $request->keterangan,
                ]);
            }

            if ($request->edit == "pindah") {
                $assetMaster->asset_location()->create([
                    "branch_id" => $request->branch_id,
                    "before_branch_id" => $assetMaster->asset_location->first()->branch_id,
                    "pengguna" => $request->pengguna,
                    "keterangan" => $request->keterangan,
                ]);
            }

            if ($request->edit == "jual") {
                $assetMaster->update([
                    "nonactive_date" => $request->nonactive_date,
                    "nonactive_reason" => $request->nonactive_reason,
                ]);

                $assetMaster->asset_location()->create([
                    "branch_id" => $assetMaster->asset_location->first()->branch_id,
                    "before_branch_id" => $assetMaster->asset_location->first()->before_branch_id,
                    "pengguna" => $assetMaster->asset_location->first()->pengguna,
                    "keterangan" => "Aset Dijual",
                ]);
            }


            if ($request->edit == "hilang") {
                // dd($request->id);
                $assetMaster->update([
                    "nonactive_date" => $request->nonactive_date,
                    "nonactive_reason" => $request->nonactive_reason,
                ]);
                $assetMaster->asset_location()->create([
                    "branch_id" => $assetMaster->asset_location->first()->branch_id,
                    "before_branch_id" => $assetMaster->asset_location->first()->before_branch_id,
                    "pengguna" => $assetMaster->asset_location->first()->pengguna,
                    "asset_place_id" => 3,
                    "keterangan" => "Aset Hilang",
                ]);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->back()->withErrors('ada kesalahan input, refresh / hubungi IT');
        }
        return redirect()->back()->with('message', 'data berhasil diubah');

        // dd($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AssetMaster $assetMaster)
    {
        //
    }
}
