<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UnitSavingAccount extends Model
{
    use HasFactory;
    protected $fillable = [
        "branch_id",
        "employee_id",
        "account_type",
        "note",
    ];

    public function unitsaving()
    {
        return $this->hasOne(UnitSaving::class, 'unit_saving_account_id', 'id');
    }
    public function unitssaving()
    {
        return $this->hasMany(UnitSaving::class, 'unit_saving_account_id', 'id');
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'employee_id', 'id');
    }

    public function Branch()
    {
        return $this->belongsTo(Branch::class, 'branch_id', 'id');
    }
}
