<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        "id",
        "nama_aset",
        "type_aset",
        "status_kepemilikan",
        "isactive",
        "status_aset",
        "tanggal_pembelian",
    ];

    public function vehicle_detail()
    {
        return $this->hasOne(VehicleDetail::class, 'inventory_id', 'id');
    }

    public function aset_placements()
    {
        return $this->hasMany(AssetPlacement::class, 'inventory_id', 'id');
    }
    public function aset_placement()
    {
        return $this->hasOne(AssetPlacement::class, 'inventory_id', 'id')->latestOfMany();
    }

    public function scopeWithFilter($query, $getFilter)
    {
        return $query->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('branch_id', auth()->user()->employee->branch_id);
        })->when($getFilter->branch_id >= 0, function ($q) use ($getFilter) {
            $q->whereHas('aset_placement.branch', fn ($q) => $q->where('branch_id', $getFilter->branch_id));
        });
    }
}
