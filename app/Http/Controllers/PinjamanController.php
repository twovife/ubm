<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PinjamanController extends Controller
{
    public function requestLoan()
    {
        return Inertia::render('Pinjaman/RequestPinjaman');
    }
}