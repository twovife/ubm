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

    public function asset_location()
    {
        return $this->hasMany(AssetLocation::class, 'branch_id', 'id');
    }

    public function lastLocation()
    {
        return $this->hasMany(AssetLocation::class, 'branch_id', 'id');
    }

    public function asset_master()
    {
        return $this->hasManyThrough(
            AssetMaster::class,
            AssetLocation::class,
            'branch_id', // Foreign key on the environments table...
            'id', // Local key on the projects table...

            'id', // Local key on the environments table...
            'asset_master_id',
        );
    }
}

// projects
//     id - integer
//     name - string

// environments
//     id - integer
//     project_id - integer
//     name - string

// deployments
//     id - integer
//     environment_id - integer
//     commit_hash - string


// Branch
// id
// unit

// location
// id
// branch_id

// master
// id
// nama
