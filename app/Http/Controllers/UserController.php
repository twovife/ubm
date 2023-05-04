<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('User/Index', [
            'users' => User::query()->with('employee', 'employee.branch')->paginate(),
            'employees' => Employee::select('id', 'nip', 'nama_karyawan', 'jabatan', 'area', 'branch_id')->get(),
            'unit' => Branch::select('id', 'unit')->get()
        ]);
    }
}
