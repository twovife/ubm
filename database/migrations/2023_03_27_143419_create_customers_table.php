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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('nama', 255)->nullable();
            $table->string('nik', 255)->nullable();
            $table->string('no_kk', 255)->nullable();
            $table->string('alamat', 255)->nullable();
            $table->integer('unit_id')->nullable();
            $table->integer('mantri')->nullable();
            $table->integer('area')->nullable();
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
        Schema::dropIfExists('customers');
    }
};
