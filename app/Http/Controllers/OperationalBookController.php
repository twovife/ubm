<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Employee;
use App\Models\OperationalBook;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OperationalBookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function index_bonpriv()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create_bop()
    {
    }


    public function create_bonpriv()
    {
        $branches = Branch::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('id', auth()->user()->employee->branch_id))->get();
        $employee = Employee::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('branch_id', auth()->user()->employee->branch_id))->get();
        return Inertia::render('Bonprive/Create', [
            'branch' => $branches,
            'employees' => $employee
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    public function store_bonpriv(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OperationalBook  $operationalBook
     * @return \Illuminate\Http\Response
     */
    public function show(OperationalBook $operationalBook)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\OperationalBook  $operationalBook
     * @return \Illuminate\Http\Response
     */
    public function edit(OperationalBook $operationalBook)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\OperationalBook  $operationalBook
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OperationalBook $operationalBook)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OperationalBook  $operationalBook
     * @return \Illuminate\Http\Response
     */
    public function destroy(OperationalBook $operationalBook)
    {
        //
    }
}
