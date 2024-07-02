<?php

namespace Database\Seeders;

use App\Models\UnitPayment;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GoroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $goro = json_decode(file_get_contents(storage_path('goro.json')), true);
        try {
            DB::beginTransaction();
            $counter = 1;
            $accountType = UnitPayment::firstOrCreate([
                'account_name' => "GORO"
            ], [
                "account_name" => "GORO",
                "account_type" => "GORO",
                "remark" => "GORO UMROH"
            ]);

            collect($goro)->each(function ($item) use (&$counter, $accountType) {

                $accountType->transactions()->create([
                    "branch_id" => $item['branch_id'],
                    "transaction_date" => $item['transaction_date'],
                    "nominal" => $item['nominal'],
                    "remark" => "PEMBAYARAN GORO UMROH",
                ]);
                echo $counter . PHP_EOL;
                $counter++;
            });
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }
}
