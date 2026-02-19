<?php

namespace Database\Seeders;

use App\Models\Deposit;
use Illuminate\Database\Seeder;

class SkswBalancerSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    Deposit::withSum('deposit_transactions as sw_debit_sum', 'sw_debit')
      ->withSum('deposit_transactions as sw_kredit_sum', 'sw_kredit')
      ->withSum('deposit_transactions as sk_debit_sum', 'sk_debit')
      ->withSum('deposit_transactions as sk_kredit_sum', 'sk_kredit')
      ->chunkById(500, function ($deposits) {
        foreach ($deposits as $deposit) {
          echo "Updating deposit ID: {$deposit->id}\n";
          $deposit->updateQuietly([
            'sw_balance' => ($deposit->sw_debit_sum ?? 0) - ($deposit->sw_kredit_sum ?? 0),
            'sk_balance' => ($deposit->sk_debit_sum ?? 0) - ($deposit->sk_kredit_sum ?? 0),
          ]);
        }
      });
  }
}
