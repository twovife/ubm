<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetCategory extends Model
{
    use HasFactory;
    protected $fillable = [
        "category",
        "asset_type_id",
    ];

    public function asset_type()
    {
        return $this->belongsTo(AssetType::class, 'asset_type_id', 'id');
    }

    public function asset_master()
    {
        return $this->hasMany(AssetMaster::class, 'asset_category_id', 'id');
    }
}
