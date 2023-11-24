<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Inventory;
use App\Models\VehicleDetail;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;



class InventorySeeder extends Seeder
{

    // InactiveInventarisSeeder
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $inventaris = json_decode(file_get_contents(storage_path('active.json')), true);
        try {
            DB::beginTransaction();
            collect($inventaris)->each(function ($invent) {


                // Mengonversi tanggal dari string ke objek Carbon
                $tanggal_stnk = Carbon::parse($invent['tanggal_stnk']);
                $tanggal_her = Carbon::parse($invent['tanggal_stnk']);
                $tanggal_her->setYear(Carbon::now()->year);

                // Mendapatkan tanggal dan waktu saat ini
                $now = Carbon::now();
                $today = Carbon::today()->format('Y-m-d');
                $is_exist = VehicleDetail::where('plat_nomor', $invent['plat_nomor'])->first();
                $branch = Branch::find($invent['branch_id']);
                // dd($branch->unit);


                if ($is_exist) {
                    $old_branch = $is_exist->inventory->aset_placement->branch_id;
                    $is_exist->inventory->aset_placement()->update([
                        "keterangan_keluar" => $branch->unit ?? $invent['branch_id'],
                        "tanggal_keluar" =>  $today,
                    ]);


                    $is_exist->inventory->aset_placement()->create([
                        "branch_id" => $invent['branch_id'],
                        "tanggal_masuk" =>  $today,
                        "pengguna" => $invent['pengguna'],
                        'keterangan_keluar' => 'pindah ke' . $old_branch
                    ]);
                } else {
                    $inv =  Inventory::create([
                        "nama_aset" => $invent['nama_aset'],
                        "type_aset" => $invent['type_aset'],
                        "status_kepemilikan" => $invent['status_kepemilikan'],
                        "isactive" => $invent['status'],
                    ]);

                    $detail =   $inv->vehicle_detail()->create([
                        "plat_nomor" => $invent['plat_nomor'],
                        "nama_stnk" => $invent['nama_stnk'],
                        "tanggal_stnk" => $tanggal_stnk
                    ]);



                    if ($tanggal_her->isPast()) {
                        $detail->tax()->create([
                            "tax_payment" => $tanggal_her,
                            "tax_expired" =>  $tanggal_her->addYear(),
                            "tax_type" => '1 Tahunan',
                        ]);
                    } else {
                        $detail->tax()->create([
                            'tax_payment' => $tanggal_her->subYear(),
                            'tax_expired' => $tanggal_her,
                            "tax_type" => '1 Tahunan',
                        ]);
                    }


                    $inv->aset_placement()->create([
                        "branch_id" => $invent['branch_id'],
                        "tanggal_masuk" =>  $today,
                        "pengguna" => $invent['pengguna'],
                    ]);
                }
            });
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }
}
