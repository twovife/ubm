<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetVehiclePayment extends Model
{
    use HasFactory;
    protected $fillable = [
        "asset_master_id",
        "tanggal_pembayaran_her",
        "jenis_her",
    ];
}
