<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepositTransaction extends Model
{


    protected $fillable = [
        'deposit_id',
        'branch_id',
        'transaction_date',
        'sw_transaction',
        'sw_transaction_type',
        'sw_debit',
        'sw_kredit',
        'sk_transaction',
        'sk_transaction_type',
        'sk_debit',
        'sk_kredit',
        'transaction_input_user_id',
    ];

    public function deposit()
    {
        return $this->belongsTo(Deposit::class, 'deposit_id', 'id');
    }
    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id', 'id');
    }


    public static function queryBuilder($getFilter)
    {


        $queryBuilder = self::query();
        $queryBuilder->selectRaw('*, RANK() OVER (PARTITION BY deposit_id ORDER BY transaction_date DESC) AS ranking')
            ->where('transaction_date', '<=', $getFilter->tanggal)
            ->when($getFilter->isWilayanNeeded, function ($queries) use ($getFilter) {
                $getBranch = Branch::where('wilayah', $getFilter->wilayah)->pluck('id');
                $queries->whereIn('branch_id', $getBranch);
            });

        $queryId = $queryBuilder->getQuery()
            ->fromSub($queryBuilder, 'a')
            ->where('a.ranking', '=', 1)
            ->pluck('id');


        $simpenan = self::whereIn('id', $queryId)->orderBy('branch_id');

        return $simpenan;
    }
}
