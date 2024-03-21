<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BopAccountTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        "branch_id",
        "employee_id",
        "mark",
        "transaction_type",
        "paid_on",
    ];


    public function transaksi()
    {
        return $this->hasMany(BopTransaction::class, "bop_account_transaction_id", 'id')->orderBy('transaction_date')->orderBy('id');
    }


    public function employee()
    {
        return $this->belongsTo(Employee::class, "employee_id", 'id');
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class, "branch_id", 'id');
    }
}
