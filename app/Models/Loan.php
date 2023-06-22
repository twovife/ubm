<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'branch_id',
        'mantri',
        'kelompok',
        'hari',
        'drop',
        'pinjaman',
        'pinjaman_ke',
        'saldo',
        'lunas',
        'status',
        'loan_request_id',
        'tanggal_drop',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id', 'id');
    }

    public function angsuran()
    {
        return $this->hasMany(Instalment::class, 'loan_id', 'id');
    }

    public function lastAngsuran()
    {
        return $this->hasOne(Instalment::class, 'loan_id', 'id')->latest();
    }

    public function mantri()
    {
        return $this->belongsTo(Employee::class, 'mantri', 'id');
    }
}
