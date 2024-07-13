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
        Schema::create('asset_placements', function (Blueprint $table) {
            $table->id();
            $table->integer('asset_master_id')->nullable();
            $table->integer('asset_place_id_before')->nullable();
            $table->integer('asset_place_id')->nullable();
            $table->string('pengguna', 255)->nullable();
            $table->string('keterangan', 255)->nullable();
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
        Schema::dropIfExists('asset_placements');
    }
};
