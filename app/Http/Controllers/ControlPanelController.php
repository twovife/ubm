<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ControlPanelController extends Controller
{
    public function syncronize_sksw_with_employee()
    {
        //
    }

    public function daftar_unit()
    {
        $requestWilayah = request()->wilayah ?? 0;
        $branches = Branch::with("karyawan")->where('wilayah', $requestWilayah)->orderBy('unit', 'asc')->get();
        $branch = $branches->map(function ($item) {
            return [
                'id' => $item->id,
                'wilayah' => $item->wilayah,
                'unit' => $item->unit,
                'isactive' => $item->isactive == 1 ? "Active" : "Tutup",
                "resign_employee" => $item->karyawan->whereNotNull('date_resign')->count('id'),
                "active_employee" => $item->karyawan->whereNull('date_resign')->count('id'),
            ];
        });


        return Inertia::render("Administrasi/Branch/Index", [
            'datas' => $branch,
            'server_filter' => ['wilayah' => $requestWilayah]
        ]);
    }
}
