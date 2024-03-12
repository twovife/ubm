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
        Schema::create('operational_books', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal_transaksi')->nullable();
            $table->string('keterangan', 255)->nullable();
            $table->integer('bonpriv_id')->nullable();
            $table->string('transaction')->nullable();
            $table->string('transaction_type')->nullable();
            $table->bigInteger('nominal')->nullable();
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
        Schema::dropIfExists('operational_books');
    }
};
