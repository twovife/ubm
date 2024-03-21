<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BopTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        "bop_account_transaction_id",
        "transaction_date",
        "transaction",
        "transaction_type",
        "nominal",
        "keterangan"
    ];

    public function akun()
    {
        return $this->belongsTo(BopAccountTransaction::class, 'bop_account_transaction_id', 'id');
    }
}
