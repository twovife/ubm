<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = [
        'wilayah',
        'unit',
        'isactive',
        'code',
    ];

    public function unit_saving_accounts()
    {
        return $this->hasMany(UnitSavingAccount::class, 'branch_id', 'id');
    }

    public function unit_saving_account()
    {
        return $this->hasOne(UnitSavingAccount::class, 'branch_id', 'id');
    }

    public function bop_accounts()
    {
        return $this->hasMany(BopAccountTransaction::class, 'branch_id', 'id');
    }

    public function karyawan()
    {
        return $this->hasMany(Employee::class, 'branch_id', 'id');
    }

    public function unit_transaction()
    {
        return $this->hasMany(UnitPaymentTransaction::class, 'branch_id', 'id')->orderBy('transaction_date', 'asc');
    }
}
