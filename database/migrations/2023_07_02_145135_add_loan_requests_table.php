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
        if (!Schema::hasColumn('loan_requests', 'status')) {
            Schema::table('loan_requests', function (Blueprint $table) {
                $table->string('status', 255)->nullable()->after('approved_by');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('loan_requests', function (Blueprint $table) {
            //
        });
    }
};
