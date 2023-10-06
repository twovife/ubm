<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deposit extends Model
{
    protected $fillable = [
        'employee_id',
        'branch_id',
        'nomor_rekening',
        'tgl_tabugan',
        'sw_balance',
        'sk_balance',
    ];



    public function optionaltrasactions()
    {
        return $this->hasMany(OptionalDepositTransaction::class, 'deposit_id', 'id');
    }

    public function mandatorytrasactions()
    {
        return $this->hasMany(MandatoryDepositTransaction::class, 'deposit_id', 'id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'id');
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id', 'id');
    }

    public function scopeWithFilter($query)
    {
        return $query->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('branch_id', auth()->user()->employee->branch_id);
        })->when(request()->input('branch_id', []), function ($q) {
            $q->where('branch_id', request()->input('branch_id', []));
        });
    }
}
