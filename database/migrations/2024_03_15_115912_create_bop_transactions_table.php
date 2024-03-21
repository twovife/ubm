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
        Schema::create('bop_transactions', function (Blueprint $table) {
            $table->id();
            $table->integer('bop_account_transaction_id')->nullable();
            $table->date('transaction_date')->nullable();
            $table->string('transaction')->nullable();
            $table->string('trasaction_type')->nullable();
            $table->integer('nominal')->nullable();
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
        Schema::dropIfExists('bop_transactions');
    }
};
