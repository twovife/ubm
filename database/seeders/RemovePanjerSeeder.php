<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemovePanjerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::dropIfExists('one_mil_deposits');
        Schema::dropIfExists('panjer_loans');
        Schema::dropIfExists('panjer_instalments');
        Schema::dropIfExists('capital_loans');
        Schema::dropIfExists('capital_loan_instalments');
    }
}
