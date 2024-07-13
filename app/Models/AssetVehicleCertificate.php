<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetVehicleCertificate extends Model
{
    use HasFactory;
    protected $fillable = [
        "asset_master_id",
        "nomor_bpkb",
        "asset_place_id",
        "keterangan",
    ];
}
