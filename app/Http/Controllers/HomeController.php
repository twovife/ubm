<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home');
    }


    public function testdump()
    {
        $inventaris = json_decode(file_get_contents(storage_path('inventaris.json')), true);
        try {
            DB::beginTransaction();
            collect($inventaris)->each(function ($invent) {
                // dd($invent);
                $requestDate = Carbon::parse($invent['tanggal_stnk']);
                $today = Carbon::now();

                $inv =  Inventory::create([
                    "nama_aset" => $invent['nama_aset'],
                    "type_aset" => $invent['type_aset'],
                    "status_kepemilikan" => $invent['status_kepemilikan'],
                    "isactive" => $invent['isactive'],
                ]);


                $detail =   $inv->vehicle_detail()->create([
                    "plat_nomor" => $invent['plat_nomor'],
                    "nama_stnk" => $invent['nama_stnk'],
                    "tanggal_stnk" => $requestDate
                ]);

                if ($requestDate->diffInDays($today) < 365) {
                    $detail->tax()->create([
                        "tax_payment" => $requestDate,
                        "tax_expired" =>  Carbon::parse($requestDate)->addYear(),
                        "tax_type" => '5 Tahunan',
                    ]);
                }

                $inv->aset_placement()->create([
                    "branch_id" => $invent['branch_id'],
                    "tanggal_masuk" =>  Carbon::today()->format('Y-m-d'),
                    "pengguna" => $invent['pengguna'],
                ]);
            });
            DB::rollBack();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }
}
