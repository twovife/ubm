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
        Schema::create('operational_accounts', function (Blueprint $table) {
            $table->id();
            $table->integer('branch_id')->nullable();
            $table->integer('employee_id')->nullable();
            $table->integer('account_type')->nullable();
            $table->date('note')->nullable();
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
        Schema::dropIfExists('operational_accounts');
    }
};
