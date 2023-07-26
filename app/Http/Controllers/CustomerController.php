<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Models\Branch;
use App\Models\Employee;
use App\Models\Loan;
use App\Models\LoanRequest;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
    $customer = Customer::with('branch', 'employee')->where('unit_id', $branch)->withFilter()->paginate(20)->withQueryString();

    $data['data'] = collect($customer->items())->map(fn ($que) => [
      'id' => $que->id,
      'nama' => $que->nama,
      'nik' => $que->nik,
      'no_kk' => $que->no_kk,
      'alamat' => $que->alamat,
      'unit' => $que->branch->unit,
      'mantri' => $que->employee->nama_karyawan,
      'area' => $que->area,
    ]);

    $data['link'] = [
      'first_page' => $customer->url(1),
      'last' => $customer->url($customer->lastPage()),
      'previous_page' => $customer->previousPageUrl(),
      'next_page' => $customer->nextPageUrl(),
      'total_data' => $customer->total()
    ];

    // dd($data);
    return Inertia::render('Customer/CustomerGlobal', [
      'customers' => $data,
      'filters' => request()->all()
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
    return Inertia::render('Customer/EditCustomer', [
      'customer' => $customer,
    ]);
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
    $request->validate([
      'nama' => ['required'],
      'nik' => ['required'],
      'alamat' => ['required'],
    ]);

    try {
      DB::beginTransaction();
      $customer->nama = $request->nama;
      $customer->nik = $request->nik;
      $customer->no_kk = $request->no_kk;
      $customer->alamat = $request->alamat;


      if ($customer->isDirty('nik')) {
        $isExistCustomer = Customer::where('nik', $request->nik)->first();
        if ($isExistCustomer) {
          $LoanReqeust = LoanRequest::where('customer_id', $customer->id)->get();
          foreach ($LoanReqeust as $loanreq) {
            // $loanreq->update(['customer_id' => $isExistCustomer->id], ['pinjaman_ke' => LoanRequest::where('customer_id', $isExistCustomer->id)->count('id') + 1]);
            $loanreq->customer_id =  $isExistCustomer->id;
            $loanreq->pinjaman_ke = LoanRequest::where('customer_id', $isExistCustomer->id)->count('id') + 1;
            $loanreq->save();
          }
          $loans =  Loan::where('customer_id', $customer->id)->get();
          foreach ($loans as $loan) {
            // $loanreq->update(['customer_id' => $isExistCustomer->id], ['pinjaman_ke' => Loan::where('customer_id', $isExistCustomer->id)->count('id') + 1]);
            $loan->customer_id = $isExistCustomer->id;
            $loan->pinjaman_ke = Loan::where('customer_id', $isExistCustomer->id)->count('id') + 1;
            $loan->save();
          }
          $customer->delete();
          DB::commit();
          return redirect()->route('unit.customer.index')->with('message', 'Data berhasil diubah');
        }
        // dd($isExistCustomer);

      }
      $customer->save();
      DB::commit();
    } catch (Exception $e) {
      ddd($e);
      return redirect()->back()->withErrors('Data gagal diubah');
    }

    return redirect()->route('unit.customer.index')->with('message', 'Data berhasil diubah');
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
