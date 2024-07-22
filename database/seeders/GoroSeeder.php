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

            $data = [
                [
                    "account_name" => "LAIN",
                    "account_type" => "GORO",
                    "remark" => "TRANSACTION"
                ],
                [
                    "account_name" => "STOR DO",
                    "account_type" => "GORO",
                    "remark" => NULL
                ],
                [
                    "account_name" => "PG",
                    "account_type" => "GORO",
                    "remark" => "PINJAMAN MODAL"
                ],
            ];
            collect($data)->each(function ($item) {
                $accountType = UnitPayment::firstOrCreate([
                    'account_name' => $item['account_name']
                ], [
                    "account_name" => $item['account_name'],
                    "account_type" => $item['account_type'],
                    "remark" => $item['remark']
                ]);
            });
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }
}
