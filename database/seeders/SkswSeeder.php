<?php

namespace Database\Seeders;

use App\Models\Deposit;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Ramsey\Uuid\Type\Decimal;

class SkswSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sksw = json_decode(file_get_contents(storage_path('sksw.json')), true);
        try {
            $tanggal_masuk = Carbon::now()->startOfMonth()->subMonth();
            DB::beginTransaction();
            collect($sksw)->each(function ($item) use ($tanggal_masuk) {
                $depo = Deposit::create([
                    "employee_id" => $item['employee_id'],
                    "branch_id" => $item['branch_id'],
                    "nomor_rekening" => null,
                    "tgl_tabugan" => $tanggal_masuk,
                    "sw_balance" => $item['sw_balance'],
                    "sk_balance" => $item['sk_balance'],
                ]);

                $depo->mandatorytrasactions()->create([
                    "branch_id" => $item['branch_id'],
                    "transaction_date" => $tanggal_masuk,
                    'transaction_month' => $tanggal_masuk->month,
                    'transaction_year' => $tanggal_masuk->year,

                    "transaction" => "D",
                    "balance_before" => 0,
                    "debit" => $item['sw_balance'],
                    "kredit" => 0,
                    "balance" => $item['sw_balance'],
                    'transaction_type' => 'D',
                    "transaction_input_user_id" => 1,
                ]);

                $depo->optionaltrasactions()->create([
                    "branch_id" => $item['branch_id'],
                    "transaction_date" => $tanggal_masuk,
                    'transaction_month' => $tanggal_masuk->month,
                    'transaction_year' => $tanggal_masuk->year,

                    "transaction" => "D",
                    "balance_before" => 0,
                    "debit" => $item['sk_balance'],
                    "kredit" => 0,
                    "balance" => $item['sk_balance'],
                    'transaction_type' => 'D',
                    "transaction_input_user_id" => 1,
                ]);
            });

            // dd('sukses');
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);
        }
    }
}
