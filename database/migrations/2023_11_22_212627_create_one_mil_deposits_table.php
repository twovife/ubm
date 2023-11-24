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
        Schema::create('one_mil_deposits', function (Blueprint $table) {
            $table->id();
            $table->integer('no_akun')->nullable();
            $table->date('tanggal')->nullable();
            $table->string('keterangan', 255)->nullable();
            $table->integer('debit')->nullable();
            $table->integer('kredit')->nullable();
            $table->integer('saldo')->nullable();
            $table->integer('cumulative')->nullable();
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
        Schema::dropIfExists('one_mil_deposits');
    }
};
