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
        Schema::create('unit_payment_transactions', function (Blueprint $table) {
            $table->id();
            $table->integer('unit_payment_id')->nullable();
            $table->integer('branch_id')->nullable();
            $table->integer('employee_id')->nullable();
            $table->date('transaction_date')->nullable();
            $table->integer('nominal')->nullable();
            $table->integer('jasa_modal')->nullable();
            $table->string('remark', 4500)->nullable();
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
        Schema::dropIfExists('unit_payment_transactions');
    }
};
