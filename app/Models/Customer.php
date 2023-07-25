<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Customer extends Model
{
    use HasFactory;
    protected $fillable = [
        'nama',
        'nik',
        'no_kk',
        'alamat',
        'unit_id',
        'mantri',
        'area',
    ];

    public function loan_request()
    {
        return $this->hasMany(LoanRequest::class, 'customer_id', 'id');
    }
    public function loan()
    {
        return $this->hasMany(Loan::class, 'customer_id', 'id')->orderBy('created_at', 'asc');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, "mantri", 'id');
    }

    public function branch()
    {
        return $this->belongsTo(Branch::class, 'unit_id', 'id');
    }

    public function scopeWhereLower($query, $columnName, $value)
    {
        return $query->whereRaw('LOWER(' . DB::getTablePrefix() . $query->getModel()->getTable() . '.' . $columnName . ') = ?', [strtolower($value)]);
    }

    public function scopeOrWhereLower($query, $columnName, $value)
    {
        return $query->orWhereRaw('LOWER(' . DB::getTablePrefix() . $query->getModel()->getTable() . '.' . $columnName . ') = ?', [strtolower($value)]);
    }

    public function scopeLikeLower($query, $columnName, $value)
    {
        return $query->whereRaw('LOWER(' . DB::getTablePrefix() . $query->getModel()->getTable() . '.' . $columnName . ') LIKE ?', ['%' . strtolower($value) . '%']);
    }

    public function scopeOrLikeLower($query, $columnName, $value)
    {
        return $query->orWhereRaw('LOWER(' . DB::getTablePrefix() . $query->getModel()->getTable() . '.' . $columnName . ') LIKE ?', ['%' . strtolower($value) . '%']);
    }

    public function scopeWhereDateBetween($query, $columnName, $value)
    {
        $startfrom = $value['startfrom'] ?? false;
        $thru = $value['thru'] ?? false;

        return $query
            ->when($startfrom, fn ($que) => $que->whereDate(DB::getTablePrefix() . $query->getModel()->getTable() . '.' . $columnName, '>=', $startfrom))
            ->when($thru, fn ($que) => $que->whereDate(DB::getTablePrefix() . $query->getModel()->getTable() . '.' . $columnName, '<=', $thru));
    }

    public function scopeWithFilter($query)
    {
        return $query->when(request()->input('data.search', []), function ($q) {
            $searchTerm = request()->data['search'];
            $q->where('nik', request()->data['search'])->orWhere('no_kk', $searchTerm)
                ->orWhereRaw('LOWER(`nama`) LIKE ? ', ['%' . strtolower($searchTerm) . '%']);
        })
            ->when(request()->input('nama', []), fn ($que) => $que->likeLower('nama', request()->input('nama')))
            ->when(request()->input('nik', []), fn ($que) => $que->where('nik', request()->input('nik')));;
    }
}
