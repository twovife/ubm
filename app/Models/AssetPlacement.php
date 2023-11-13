<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetPlacement extends Model
{
    use HasFactory;

    protected $fillable = [
        "inventory_id",
        "branch_id",
        "tanggal_masuk",
        "tanggal_keluar",
        "keterangan_keluar",
        "pengguna",
    ];

    public function inventory()
    {
        return $this->belongsTo(Inventory::class, 'inventory_id', 'id');
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id', 'id');
    }

    public function scopeWithFilter($query, $getFilter)
    {
        return $query->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('branch_id', auth()->user()->employee->branch_id);
        })->when($getFilter->branch_id >= 0, function ($q) use ($getFilter) {
            $q->where('branch_id',  $getFilter->branch_id);
        });
    }
}
