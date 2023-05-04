<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class ApiHandlerController extends Controller
{
    public function cekCustomerByNik()
    {
        // return response()->json('halo', 200);
        $nik = request()->nik;
        $data = Customer::with('loan_request', 'employee', 'branch', 'loan')->where('nik', $nik)->first();
        if ($data) {
            return response()->json([
                'data' => $data,
            ], 200);
        } else {
            return response()->json('', 204);
        }
    }
}
