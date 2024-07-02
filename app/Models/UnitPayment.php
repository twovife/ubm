<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        "account_name",
        "account_type",
        "remark",
    ];

    public function transactions()
    {
        return $this->hasMany(UnitPaymentTransaction::class, 'unit_payment_id', 'id');
    }
}
