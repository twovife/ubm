<?php

namespace Database\Seeders;

use App\Models\AssetMaster;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KendaraanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $vehicles = json_decode(file_get_contents(storage_path('kendaraan.json')), true);

        try {
            DB::beginTransaction();
            $counter = 1;
            $platnomor = "";

            collect($vehicles)->each(function ($vehicle) use (&$counter, &$platnomor) {
                $platnomor = str_replace(' ', '', $vehicle['plat_nomor']);
                $currentDate = Carbon::now();
                $vehicleDate = Carbon::parse($vehicle['tanggal']);
                $year = $vehicleDate->month >= $currentDate->month ? $currentDate->year : $currentDate->year + 1;
                $formattedDate = Carbon::create($year, $vehicleDate->month, $vehicleDate->day)->toDateString();



                $master_asset = AssetMaster::create([
                    "asset_name" =>  $vehicle['asset_name'],
                    "asset_type_id" => 1,
                    "asset_category_id" => 1,
                    "asset_detail" => null,
                    "isactive" => $vehicle['keterangan'] == "jual" ? "no" : "yes",
                    "purchase_date" => null,
                    "nonactive_date" => $vehicle['keterangan'] == "jual" ? $currentDate->format('Y-m-d') : null,
                    "nonactive_reason" => $vehicle['keterangan'] == "jual" ? "Dijual" : null,
                    // "batch_pembelian" => $request->batch_pembelian,
                ]);
                // generating Kendaraan Detail
                $kendaraan = $master_asset->asset_vehicle()->create([
                    "plat_nomor" => $platnomor,
                    "tanggal_stnk" => $vehicle['tanggal'],
                    "tanggal_pajak_tahunan" => $formattedDate,
                    "nama_stnk" => $vehicle['nama_stnk'],
                ]);

                $penempatan = $master_asset->asset_location()->create([
                    "branch_id" => $vehicle['branch_id'],
                    "before_branch_id" => null,
                    "asset_place_id" => 1,
                    "pengguna" => $vehicle['pengguna'],
                    "keterangan" => null,
                ]);

                if ($vehicle['move_to']) {
                    $master_asset->asset_location()->create([
                        "branch_id" => $vehicle['move_to'],
                        "before_branch_id" => $vehicle['branch_id'],
                        "asset_place_id" => 1,
                        "pengguna" => $vehicle['pindah_pengguna'],
                        "keterangan" => null,
                    ]);
                }

                $eol = PHP_EOL;
                echo "Plat nomor =>" . $platnomor . $eol;
                $counter++;
            });

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);
        }

        // $data =  $request->validate([
        //     "asset_name" => ["required", "string"],
        //     "asset_type_id" => ["nullable", "integer"],
        //     "asset_category_id" => ["nullable", "integer"],
        //     "asset_detail" => ['nullable', 'string'],
        //     "isactive" => ["required", "in:yes,no"],
        //     "plat_nomor" => ["required", "string"],
        //     "tanggal_stnk" => ["required", "date"],
        //     "tanggal_pajak_tahunan" => ["required", "date"],
        //     "nama_stnk" => ["required", "string"],
        //     "branch_id" => ["required", "integer"],
        //     "before_branch_id" => ["nullable", "integer"],
        //     "asset_place_id" => ["nullable", "integer"],
        //     "pengguna" => ["required", "string"],
        //     "keterangan" => ["nullable", "string"],
        // ]);

        // try {
        //     DB::beginTransaction();
        //     // generate asset master
        //     $master_asset = AssetMaster::create([
        //         "asset_name" => $request->asset_name,
        //         "asset_type_id" => $request->asset_type_id,
        //         "asset_category_id" => $request->asset_category_id,
        //         "asset_detail" => $request->asset_detail,
        //         "isactive" => $request->isactive,
        //         "purchase_date" => $request->purchase_date,
        //         // "nonactive_date" => $request->nonactive_date,
        //         // "nonactive_reason" => $request->nonactive_reason,
        //         // "batch_pembelian" => $request->batch_pembelian,
        //     ]);

        //     // generating Kendaraan Detail
        //     $kendaraan = $master_asset->asset_vehicle()->create([
        //         "plat_nomor" => $request->plat_nomor,
        //         "tanggal_stnk" => $request->tanggal_stnk,
        //         "tanggal_pajak_tahunan" => $request->tanggal_pajak_tahunan,
        //         "nama_stnk" => $request->nama_stnk,
        //     ]);

        //     // penempatan kendaraan
        //     $penempatan = $master_asset->asset_location()->create([
        //         "branch_id" => $request->branch_id,
        //         "before_branch_id" => $request->before_branch_id,
        //         "asset_place_id" => $request->asset_place_id,
        //         "pengguna" => $request->pengguna,
        //         "keterangan" => $request->keterangan,
        //     ]);
    }
}
