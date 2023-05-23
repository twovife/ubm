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
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->integer('customer_id')->nullable();
            $table->integer('branch_id')->nullable();
            $table->integer('mantri')->nullable();
            $table->integer('kelompok')->nullable();
            $table->string('hari', 255)->nullable();
            $table->integer('pinjaman')->nullable();
            $table->integer('saldo')->nullable();
            $table->string('status', 255)->nullable();
            $table->integer('loan_request_id')->nullable();
            $table->date('tanggal_drop')->nullable();
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
        Schema::dropIfExists('loans');
    }
};
