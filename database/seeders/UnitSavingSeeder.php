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
        $tabungan = json_decode(file_get_contents(storage_path('tabunganunit.json')), true);

        try {
            DB::beginTransaction();
            $counter = 1;
            collect($tabungan)->each(function($item) use (&$counter) {
                $account = UnitSavingAccount::firstOrCreate([
                    'branch_id' => $item['unit_saving_account_id'],
                    'account_type' => 'TB'
                ],
                [
                    'branch_id' => $item['unit_saving_account_id'],
                    'account_type' => 'TB'
                ]);

                $account->unitssaving()->create([
                     "transaction_date"=>$item['transaction_date'],
                     "nominal"=>$item['nominal'],
                     "transaction"=>"D",
                     "transaction_type"=>"TB",
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
