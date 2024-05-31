<?php

namespace Database\Seeders;

use App\Models\UnitSaving;
use App\Models\UnitSavingAccount;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitSavingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tabungan = json_decode(file_get_contents(storage_path('tb1jt.json')), true);

        try {
            DB::beginTransaction();
            $counter = 1;
            collect($tabungan)->each(function ($item) use (&$counter) {
                $account = UnitSavingAccount::firstOrCreate(
                    [
                        'branch_id' => $item['branch_id'],
                        'account_type' => 'TB'
                    ],
                    [
                        'branch_id' => $item['branch_id'],
                        'account_type' => 'TB'
                    ]
                );

                $account->unitssaving()->create([
                    "transaction_date" => "2024-04-01",
                    "nominal" => $item['nominal'],
                    "transaction" => "D",
                    "transaction_type" => "TB",
                ]);
                echo $counter . PHP_EOL;
                $counter++;
            });
            DB::commit();
        } catch (Exception $e) {
            dd($e);
            DB::rollBack();
        }
    }
}
