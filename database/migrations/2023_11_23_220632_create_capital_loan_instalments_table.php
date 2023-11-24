<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('capital_loan_instalments', function (Blueprint $table) {
            $table->id();
            $table->integer('capital_loan_id')->nullable();
            $table->integer('one_mil_deposite_id')->nullable();
            $table->integer('tanggal_angsuran')->nullable();
            $table->bigInteger('saldo_sebelum')->nullable();
            $table->bigInteger('debit')->nullable();
            $table->bigInteger('kredit')->nullable();
            $table->bigInteger('saldo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('capital_loan_instalments');
    }
};
