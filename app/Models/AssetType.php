<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetType extends Model
{
    use HasFactory;
    protected $fillable = [
        "type",
    ];

    public function asset_category()
    {
        return $this->hasMany(AssetCategory::class, 'asset_type_id', 'id');
    }

    public function asset_master()
    {
        return $this->hasMany(AssetMaster::class, 'asset_type_id', 'id');
    }
}
