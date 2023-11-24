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
        Schema::create('mandatory_deposit_transactions', function (Blueprint $table) {
            $table->id();
            $table->integer('deposit_id')->nullable();
            $table->integer('branch_id')->nullable();
            $table->date('transaction_date')->nullable();
            $table->integer('transaction_month')->nullable();
            $table->integer('transaction_year')->nullable();

            $table->string('transaction', 255)->nullable();

            $table->bigInteger('balance_before')->nullable();
            $table->bigInteger('debit')->nullable();
            $table->bigInteger('kredit')->nullable();
            $table->bigInteger('balance')->nullable();

            $table->string('transaction_type', 255)->nullable();

            $table->integer('transaction_input_user_id')->nullable();
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
        Schema::dropIfExists('mandatory_deposit_transactions');
    }
};
