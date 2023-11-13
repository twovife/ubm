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
        Schema::create('vehicle_taxes', function (Blueprint $table) {
            $table->id();
            $table->integer('vehicle_detail_id')->nullable();
            $table->date('tax_payment')->nullable();
            $table->date('tax_expired')->nullable();
            $table->string('tax_type')->nullable();
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
        Schema::dropIfExists('vehicle_taxes');
    }
};
