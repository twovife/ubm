<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $fillable  = [
        'nip',
        'nama_karyawan',
        'nik',
        'alamat',
        'kota',
        'hire_date',
        'jabatan',
        'area',
        'branch_id',
        'janis_jaminan',
        'date_resign',
        'resign_status',
        'resign_reson',
        'pencairan_simpanan_date',
        'pencairan_simpanan_by',
        'pencairan_simpanan_w_date',
        'pencairan_simpanan_w_by',
        'handover_jaminan',
        'handover_jaminan_by',
    ];

    public function histories()
    {
        return $this->hasMany(EmployeeHistory::class, 'employee_id', 'id');
    }
    public function history()
    {
        return $this->hasOne(EmployeeHistory::class, 'employee_id', 'id')->latestOfMany();
    }
    public function branch()
    {
        return $this->belongsTo(Branch::class);
    }
    public function ttdss()
    {
        return $this->belongsTo(Employee::class, 'pencairan_simpanan_by', 'id');
    }
    public function ttdsw()
    {
        return $this->belongsTo(Employee::class, 'pencairan_simpanan_w_by', 'id');
    }
    public function ttdjaminan()
    {
        return $this->belongsTo(Employee::class, 'handover_jaminan_by', 'id');
    }

    public function scopeFilterData($query)
    {
        return $query->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('branch_id', auth()->user()->employee->branch_id);
        })->when(request()->input('branch_id', []), function ($q) {
            $q->where('branch_id', request()->input('branch_id', []));
        });


        // ->when(request()->input('data.is_active', []), function ($q) {
        //     $q->when(request()->data['is_active'] == 1, function ($q) {
        //         $q->whereNull('date_resign');
        //     });

        //     $q->when(request()->data['is_active'] == 2, function ($q) {
        //         $q->whereNotNull('date_resign');
        //     });
        // })->when(request()->input('data.search', []), function ($q) {
        //     $searchTerm = request()->data['search'];
        //     $q->whereRaw('LOWER(`nama_karyawan`) like ?',  ["%{$searchTerm}%"])->orWhere('nik', request()->data['search']);
        // });
    }
}
