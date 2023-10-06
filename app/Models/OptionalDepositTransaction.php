<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OptionalDepositTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'deposit_id',
        'branch_id',
        'transaction_date',
        'transaction_month',
        'transaction_year',
        'transaction',
        'balance_before',
        'debit',
        'kredit',
        'balance',
        'transaction_type',
        'outcome_input_user_id',
    ];


    public function deposit()
    {
        return $this->belongsTo(Deposit::class, 'deposit_id', 'id');
    }
    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id', 'id');
    }

    public function scopeWithFilter($query, $getFilter)
    {
        // dd($getFilter->wilayah);

        return $query->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('branch_id', auth()->user()->employee->branch_id);
        })->when($getFilter->wilayah >= 0, function ($q) use ($getFilter) {
            $q->whereHas('branch', fn ($qq) => $qq->where('wilayah', $getFilter->wilayah));
        })->when($getFilter->transaction_month >= 0, function ($q) use ($getFilter) {
            $q->where('transaction_month', $getFilter->transaction_month);
        })->when($getFilter->transaction_year >= 0, function ($q) use ($getFilter) {
            $q->where('transaction_year', $getFilter->transaction_year);
        });
    }
}
