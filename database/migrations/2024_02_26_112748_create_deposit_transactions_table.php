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
        Schema::create('deposit_transactions', function (Blueprint $table) {
            $table->id();
            $table->integer('deposit_id')->nullable();
            $table->integer('branch_id')->nullable();
            $table->date('transaction_date')->nullable();
            $table->string('sw_transaction', 255)->nullable();
            $table->string('sw_transaction_type', 255)->nullable();
            $table->bigInteger('sw_debit')->nullable();
            $table->bigInteger('sw_kredit')->nullable();

            $table->string('sk_transaction', 255)->nullable();
            $table->string('sk_transaction_type', 255)->nullable();
            $table->bigInteger('sk_debit')->nullable();
            $table->bigInteger('sk_kredit')->nullable();


            $table->integer('transaction_input_user_id')->nullable();
            $table->bigInteger('idx_transaction')->nullable();
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
        Schema::dropIfExists('deposit_transactions');
    }
};
