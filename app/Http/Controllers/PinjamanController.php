<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PinjamanController extends Controller
{
    public function pinjaman()
    {
        return Inertia::render('Pinjaman/Pinjaman');
    }

    public function create()
    {
        return Inertia::render('Pinjaman/CreatePinjaman');
    }
}
