<?php

namespace App\Models;

use Carbon\Carbon;
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
            $q->whereHas('branch', fn ($qq) => $qq->where('branch_id', $getFilter->wilayah));
        })->when($getFilter->transaction_month >= 0, function ($q) use ($getFilter) {
            $q->where('transaction_month', "<=", $getFilter->transaction_month);
        })->when($getFilter->transaction_year >= 0, function ($q) use ($getFilter) {
            $q->where('transaction_year', "<=", $getFilter->transaction_year);
        });
    }

    public static function queryBuilder($getFilter)
    {


        $queryBuilder = self::query();
        $queryBuilder->selectRaw('*, RANK() OVER (PARTITION BY deposit_id, branch_id ORDER BY transaction_date DESC) AS ranking')
            ->where('transaction_date', '<=', $getFilter->tanggal)
            ->when($getFilter->isWilayanNeeded, function ($queries) use ($getFilter) {
                $getBranch = Branch::where('wilayah', $getFilter->wilayah)->pluck('id');
                $queries->whereIn('branch_id', $getBranch);
            });

        $queryId = $queryBuilder->getQuery()
            ->fromSub($queryBuilder, 'a')
            ->where('a.ranking', '=', 1)
            ->pluck('id');


        $simpenan = self::with('deposit.branch', 'deposit.employee', 'branch')->whereIn('id', $queryId)->orderBy('branch_id')->get();
        return $simpenan;
    }
}
