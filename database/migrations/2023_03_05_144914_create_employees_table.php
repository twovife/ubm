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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('nip', 255)->nullable();
            $table->string('nama_karyawan', 255)->nullable();
            $table->string('nik', 255)->nullable();
            $table->string('alamat', 255)->nullable();
            $table->string('kota', 255)->nullable();
            $table->date('hire_date')->nullable();
            $table->string('jabatan', 255)->nullable();
            $table->string('area')->nullable();
            $table->integer('branch_id')->nullable();
            $table->string('janis_jaminan')->nullable();
            $table->date('date_resign')->nullable();
            $table->string('resign_status')->nullable();
            $table->string('resign_reson')->nullable();
            $table->date('pencairan_simpanan_date')->nullable();
            $table->integer('pencairan_simpanan_by')->nullable();
            $table->date('handover_jaminan')->nullable();
            $table->integer('handover_jaminan_by')->nullable();
            $table->date('pencairan_simpanan_w_date')->nullable();
            $table->integer('pencairan_simpanan_w_by')->nullable();
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
        Schema::dropIfExists('employees');
    }
};
