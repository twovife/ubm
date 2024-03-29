<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;


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
    public function latest_optionaltrasaction()
    {
        return $this->hasOne(OptionalDepositTransaction::class, 'deposit_id', 'id')->ofMany('transaction_month', 'max');
    }

    public function mandatorytrasactions()
    {
        return $this->hasMany(MandatoryDepositTransaction::class, 'deposit_id', 'id');
    }

    public function latest_mandatorytrasactions()
    {
        return $this->hasOne(MandatoryDepositTransaction::class, 'deposit_id', 'id')->latestOfMany();
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'id');
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id', 'id');
    }

    public function deposit_transactions()
    {
        return $this->hasMany(DepositTransaction::class, 'deposit_id', 'id');
    }

    public function scopeWithFilter($query, $getFilter)
    {
        return $query->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('branch_id', auth()->user()->employee->branch_id);
        })->when($getFilter->branch_id >= 0, function ($q) use ($getFilter) {
            $q->whereHas('branch', fn ($qq) => $qq->where('id', $getFilter->branch_id));
        })->when($getFilter->wilayah >= 0, function ($q) use ($getFilter) {
            $q->whereHas('branch', fn ($qq) => $qq->where('wilayah', $getFilter->wilayah));
        });
    }
}
