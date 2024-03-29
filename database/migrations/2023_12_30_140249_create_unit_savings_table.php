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
        Schema::create('unit_savings', function (Blueprint $table) {
            $table->id();
            $table->date('transaction_date')->nullable();
            $table->integer('unit_saving_account_id')->nullable();
            $table->bigInteger('nominal')->nullable();
            $table->bigInteger('jasa_modal')->nullable();
            $table->string('transaction')->nullable();
            $table->string('transaction_type')->nullable();
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
        Schema::dropIfExists('unit_savings');
    }
};
