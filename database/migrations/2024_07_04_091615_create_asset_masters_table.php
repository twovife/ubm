<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        try {
            Schema::create('asset_masters', function (Blueprint $table) {
                $table->id();
                $table->string('asset_name', 255)->nullable();
                $table->integer('asset_type_id')->nullable();
                $table->integer('asset_category_id')->nullable();
                $table->string('asset_detail', 255)->nullable();
                $table->string('isactive', 255)->nullable();
                $table->date('purchase_date')->nullable();
                $table->date('nonactive_date')->nullable();
                $table->string('nonactive_reason', 255)->nullable();
                $table->string('batch_pembelian', 255)->nullable();
                $table->timestamps();
            });

            Schema::create('asset_types', function (Blueprint $table) {
                $table->id();
                $table->string('type', 255);
                $table->timestamps();
            });

            Schema::create('asset_categories', function (Blueprint $table) {
                $table->id();
                $table->string('category', 255);
                $table->integer('asset_type_id');
                $table->timestamps();
            });

            Schema::create('asset_vehicles', function (Blueprint $table) {
                $table->id();
                $table->integer('asset_master_id');
                $table->string('plat_nomor')->nullable();
                $table->string('nama_stnk')->nullable();
                $table->date('tanggal_stnk')->nullable();
                $table->date('tanggal_pajak_tahunan')->nullable();
                $table->timestamps();
            });

            Schema::create('asset_vehicle_payments', function (Blueprint $table) {
                $table->id();
                $table->integer('asset_master_id');
                $table->date('tanggal_pembayaran_her')->nullable();
                $table->string('jenis_her')->nullable();
                $table->timestamps();
            });

            Schema::create('asset_vehicle_certificates', function (Blueprint $table) {
                $table->id();
                $table->integer('asset_master_id')->nullable();
                $table->string('nomor_bpkb')->nullable();
                $table->integer('asset_place_id')->nullable();
                $table->string('keterangan')->nullable();
                $table->timestamps();
            });

            Schema::create('asset_locations', function (Blueprint $table) {
                $table->id();
                $table->integer('asset_master_id')->nullable();
                $table->integer('branch_id')->nullable();
                $table->integer('before_branch_id')->nullable();
                $table->integer('asset_place_id')->nullable();
                $table->string('pengguna', 255)->nullable();
                $table->string('keterangan', 255)->nullable();
                $table->timestamps();
            });

            Schema::create('asset_places', function (Blueprint $table) {
                $table->id();
                $table->string('place')->nullable();
                $table->timestamps();
            });
        } catch (\Throwable $th) {
            echo "errors";
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asset_masters');
        Schema::dropIfExists('asset_types');
        Schema::dropIfExists('asset_categories');
        Schema::dropIfExists('asset_vehicles');
        Schema::dropIfExists('asset_vehicle_payments');
        Schema::dropIfExists('asset_vehicle_certificates');
        Schema::dropIfExists('asset_locations');
        Schema::dropIfExists('asset_places');
    }
};
