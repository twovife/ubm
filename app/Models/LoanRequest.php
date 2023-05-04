<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LoanRequest extends Model
{
    use HasFactory;
    protected $fillable = [
        'customer_id',
        'branch_id',
        'mantri',
        'kelompok',
        'hari',
        'pinjaman',
        'tanggal_drop',
        'mantri_approved',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
