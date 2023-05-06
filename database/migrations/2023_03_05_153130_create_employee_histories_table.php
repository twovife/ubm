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
        Schema::create('employee_histories', function (Blueprint $table) {
            $table->id();
            $table->integer('employee_id')->nullable();
            $table->date('history_date')->nullable();
            $table->string('keterangan', 255)->nullable();
            $table->string('record', 400)->nullable();
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
        Schema::dropIfExists('employee_histories');
    }
};
