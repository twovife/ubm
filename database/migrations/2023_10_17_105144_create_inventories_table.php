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
        Schema::create('inventories', function (Blueprint $table) {
            $table->id();
            $table->string('nama_aset', 255)->nullable();
            $table->string('type_aset', 255)->nullable();
            $table->string('status_kepemilikan', 255)->nullable();
            $table->string('isactive', 255)->nullable();
            $table->string('status_aset')->nullable();
            $table->date('tanggal_pembelian')->nullable();
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
        Schema::dropIfExists('inventories');
    }
};
