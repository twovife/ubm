<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetVehicle extends Model
{
    use HasFactory;
    protected $fillable = [
        "asset_master_id",
        "plat_nomor",
        "tanggal_stnk",
        "tanggal_pajak_tahunan",
        "nama_stnk",
    ];


    public function asset_master()
    {
        return $this->belongsTo(AssetMaster::class);
    }
}
