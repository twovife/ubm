<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        "inventory_id",
        "detail_aset",
        "plat_nomor",
        "nama_stnk",
        "tanggal_stnk",
        "tanggal_terakhir_her",
    ];


    public function inventory()
    {
        return $this->belongsTo(Inventory::class, 'inventory_id', 'id');
    }


    public function taxes()
    {
        return $this->hasMany(VehicleTax::class, 'vehicle_detail_id', 'id')->orderBy('tax_payment', 'desc');
    }

    public function tax()
    {
        return $this->hasOne(VehicleTax::class, 'vehicle_detail_id', 'id')->ofMany('tax_payment', 'max');
    }
}
