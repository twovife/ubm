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

        if (!Schema::hasColumn('loan_requests', 'loan_notes')) {
            Schema::table('loan_requests', function (Blueprint $table) {
                $table->string('loan_notes', 255)->nullable()->after('status');
            });
        }

        if (!Schema::hasColumn('loans', 'loan_notes')) {
            Schema::table('loans', function (Blueprint $table) {
                $table->string('loan_notes', 255)->nullable()->after('tanggal_drop');
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
        //
    }
};
