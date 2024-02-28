<?php

namespace Database\Seeders;

use App\Models\DepositTransaction;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SkswJanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sksw = json_decode(file_get_contents(storage_path('sksw2.json')), true);
        // dd($sksw);
        try {
            DB::beginTransaction();
            $counter = 1;
            collect($sksw)->each(function ($item) use (&$counter) {
                if ($item['balance_before'] > 0 || $item['sk_balance_before'] > 0) {
                    DepositTransaction::create([
                        "deposit_id" => $item['deposit_id'],
                        "branch_id" => $item['branch_id'],
                        "transaction_date" => '2023-12-01',
                        "sw_transaction" => 'D',
                        "sw_transaction_type" => 'D',
                        "sw_debit" => +$item['balance_before'],
                        "sw_kredit" => +0,

                        "sk_transaction" => 'D',
                        "sk_transaction_type" => 'D',
                        "sk_debit" => +$item['sk_balance_before'],
                        "sk_kredit" => +0,
                        "transaction_input_user_id" => 1,
                    ]);

                    DepositTransaction::create([
                        "deposit_id" => $item['deposit_id'],
                        "branch_id" => $item['branch_id'],
                        "transaction_date" => Carbon::createFromFormat('d/m/Y', $item['transaction_date'])->format('Y-m-d'),
                        "sw_transaction" => $item['transaction'],
                        "sw_transaction_type" => $item['transaction_type'],
                        "sw_debit" => +$item['debit'],
                        "sw_kredit" => +$item['kredit'],


                        "sk_transaction" => $item['sk_transaction'],
                        "sk_transaction_type" => $item['sk_transaction_type'],
                        "sk_debit" => +$item['sk_debit'],
                        "sk_kredit" => +$item['sk_kredit'],
                        "transaction_input_user_id" => 1,
                    ]);
                } else {
                    DepositTransaction::create([
                        "deposit_id" => $item['deposit_id'],
                        "branch_id" => $item['branch_id'],
                        "transaction_date" => Carbon::createFromFormat('d/m/Y', $item['transaction_date'])->format('Y-m-d'),
                        "sw_transaction" => $item['transaction'],
                        "sw_transaction_type" => $item['transaction_type'],
                        "sw_debit" => +$item['debit'],
                        "sw_kredit" => +$item['kredit'],


                        "sk_transaction" => $item['sk_transaction'],
                        "sk_transaction_type" => $item['sk_transaction_type'],
                        "sk_debit" => +$item['sk_debit'],
                        "sk_kredit" => +$item['sk_kredit'],
                        "transaction_input_user_id" => 1,
                    ]);
                }
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
