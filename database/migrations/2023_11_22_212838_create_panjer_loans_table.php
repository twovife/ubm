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
        Schema::create('panjer_loans', function (Blueprint $table) {
            $table->id();
            $table->integer('employee_id');
            $table->integer('branch_id');
            $table->integer('pinjaman');
            $table->integer('saldo_pinjaman');
            $table->date('tanggal_pinjaman');
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
        Schema::dropIfExists('panjer_loans');
    }
};
