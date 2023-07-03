<?php

namespace App\Models;

use App\Helpers\AppHelper;
use Carbon\Carbon;
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
        'pinjaman_ke',
        'tanggal_drop',
        'approved_date',
        'approved_by',
        'status',
        'loan_notes',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id', 'id');
    }

    public function loan()
    {
        return $this->hasOne(Loan::class, 'loan_request_id', 'id');
    }

    public function approvedby()
    {
        return $this->belongsTo(Employee::class, 'approved_by', 'id');
    }

    public function mantri()
    {
        return $this->belongsTo(Employee::class, 'mantri', 'id');
    }

    public function scopeWithFilter($query)
    {
        return $query->when(request()->input('data.kelompok', []), function ($q) {
            $q->where('kelompok', request()->data['kelompok']);
        }, function ($q) {
            $q->where('kelompok', 1);
        })->when(request()->input('data.hari', []), function ($q) {
            $q->where('hari', request()->data['hari']);
        }, function ($q) {
            $q->where('hari', AppHelper::dateName(Carbon::now()->format('Y-m-d')));
        });
    }
}
