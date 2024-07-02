<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitPaymentTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        "unit_payment_id",
        "branch_id",
        "employee_id",
        "transaction_date",
        "nominal",
        "jasa_modal",
        "remark",
    ];

    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id', 'id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'id');
    }

    public function account()
    {
        return $this->belongsTo(UnitPayment::class, 'unit_payment_id', 'id');
    }
}
