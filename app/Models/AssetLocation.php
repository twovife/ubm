<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetLocation extends Model
{
    use HasFactory;
    protected $fillable = [
        "asset_master_id",
        "branch_id",
        "before_branch_id",
        "asset_place_id",
        "pengguna",
        "keterangan"
    ];

    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id', 'id');
    }
    public function branch_before()
    {
        return $this->belongsTo(Branch::class, 'before_branch_id', 'id');
    }

    public function asset_master()
    {
        return $this->belongsTo(AssetMaster::class, 'asset_master_id', 'id');
    }
}
