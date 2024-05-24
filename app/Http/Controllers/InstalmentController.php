<?php

namespace App\Http\Controllers;

use App\Helpers\AppHelper;
use App\Models\Instalment;
use App\Http\Requests\StoreInstalmentRequest;
use App\Http\Requests\UpdateInstalmentRequest;
use App\Models\Employee;
use App\Models\Loan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class InstalmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }
}
