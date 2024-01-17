<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitSaving extends Model
{
    use HasFactory;
    protected $fillable = [
        "transaction_date",
        "unit_saving_account_id",
        "transaction_month",
        "transaction_year",
        "debit",
        "kredit",
        "saldo",
        "transaction",
        "transaction_type"
    ];

    public function savingaccount()
    {
        return $this->belongsTo(UnitSavingAccount::class, 'unit_saving_account_id', 'id');
    }
}
