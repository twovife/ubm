<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Branch;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $branch = auth()->user()->employee->branch_id;
        return Inertia::render('Customer/CustomerGlobal', [
            'customers' => Customer::with('branch')->paginate(20),
            'branch' => Branch::find($branch),
            'employees' => Employee::where('branch_id', $branch)->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCustomerRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCustomerRequest $request)
    {

        $areamantri = Employee::whereId($request->mantri)->first('area');
        $customer_input = [
            "nama" => $request->nama,
            "nik" => $request->nik,
            "no_kk" => $request->no_kk,
            "alamat" => $request->alamat,
            "unit_id" => auth()->user()->employee->branch_id,
            "mantri" => $request->mantri,
            "area" => $areamantri->area,
        ];
        $input = Customer::create($customer_input);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCustomerRequest  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        //
    }

    public function historyNasabahByKK(Request $request)
    {
        return Inertia::render('Customer/HistoryByKartuKeluarga');
    }
}
