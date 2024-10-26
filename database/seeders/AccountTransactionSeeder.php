<?php

namespace Database\Seeders;

use App\Models\UnitSavingAccount;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AccountTransactionSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    $tabungan = json_decode(file_get_contents(storage_path('pmpobp.json')), true);

    try {
      DB::beginTransaction();
      $counter = 1;
      collect($tabungan)->each(function ($item) use (&$counter) {
        if ($item['branch_id'] == "") {
          $account = UnitSavingAccount::firstOrCreate(
            [
              'employee_id' => $item['employee_id'],
              'account_type' => $item['transaction_type']
            ],
            [
              'branch_id' => null,
              'employee_id' => $item['employee_id'],
              'account_type' =>  $item['transaction_type']
            ]
          );

          $account->unitssaving()->create([
            "transaction_date" => $item['transaction_date'],
            "nominal" => $item['nominal'],
            "transaction" => $item['transaction'],
            "transaction_type" => $item['transaction_type'],
          ]);
          echo $counter . PHP_EOL;
          $counter++;
        }

        if ($item['employee_id'] == "") {
          $account = UnitSavingAccount::firstOrCreate(
            [
              'branch_id' => $item['branch_id'],
              'account_type' => $item['transaction_type']
            ],
            [
              'branch_id' => $item['branch_id'],
              'employee_id' => null,
              'account_type' =>  $item['transaction_type']
            ]
          );

          $account->unitssaving()->create([
            "transaction_date" => $item['transaction_date'],
            "nominal" => $item['nominal'],
            "transaction" => $item['transaction'],
            "transaction_type" => $item['transaction_type'],
          ]);
          echo $counter . PHP_EOL;
          $counter++;
        }
      });
      DB::commit();
    } catch (Exception $e) {
      DB::rollBack();
    }
  }
}
