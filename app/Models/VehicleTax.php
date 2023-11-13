<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleTax extends Model
{
    use HasFactory;

    protected $fillable = [
        "id",
        "vehicle_detail_id",
        "tax_payment",
        "tax_expired",
        "tax_type",
    ];

    public function vehicle_detail()
    {
        return $this->belongsTo('vehicle_detail_id', 'id');
    }
}
