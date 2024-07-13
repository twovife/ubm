<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetMaster extends Model
{
    use HasFactory;
    protected $fillable = [
        "asset_name",
        "asset_type_id",
        "asset_category_id",
        "asset_detail",
        "isactive",
        "purchase_date",
        "nonactive_date",
        "nonactive_reason",
        "batch_pembelian",
    ];

    public function asset_category()
    {
        return $this->belongsTo(AssetCategory::class, 'asset_category_id', 'id');
    }

    public function asset_type()
    {
        return $this->belongsTo(AssetType::class, 'asset_type', 'id');
    }

    public function asset_vehicle()
    {
        return $this->hasOne(AssetVehicle::class, 'asset_master_id', 'id');
    }

    public function asset_vehicle_payment()
    {
        return $this->hasOne(AssetVehiclePayment::class, 'asset_master_id', 'id');
    }
    public function asset_vehicle_certf()
    {
        return $this->hasOne(AssetVehicleCertificate::class, 'asset_master_id', 'id');
    }
    public function asset_location()
    {
        return $this->hasMany(AssetLocation::class, 'asset_master_id', 'id')->orderByDesc('id');
    }
}
