<?php

namespace App\Http\Controllers;

use App\Models\AssetPlacement;
use App\Models\Branch;
use App\Models\Employee;
use App\Models\Inventory;
use App\Models\Title;
use App\Models\VehicleDetail;
use App\Models\VehicleTax;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->transaction_year = request()->transaction_year ??  Carbon::now()->year;
        $getFilter->transaction_month = request()->transaction_month ??  Carbon::now()->month;
        $getFilter->branch_id = auth()->user()->hasPermissionTo('unit') ? auth()->user()->employee->branch_id : (request()->branch_id ?? -1);


        $branch = Branch::query()->select('id', 'unit')->when(auth()->user()->hasPermissionTo('unit'), function ($q) {
            $q->where('id', auth()->user()->employee->branch_id);
        })->get();

        $unitaset = AssetPlacement::with('inventory.vehicle_detail.tax', 'branch')->withFilter($getFilter)->get();
        $data = collect($unitaset)->map(fn ($que) => [
            'id' => $que->id,
            'inventory_id' => $que->inventory->id,
            'wilayah' => $que->branch->wilayah ?? '-',
            'unit' => $que->branch->unit ?? '-',
            'nama_aset' => $que->inventory->nama_aset ?? '-',
            'type_aset' => $que->inventory->type_aset ?? '-',
            'status_aset' => $que->inventory->isactive ?? '-',
            'plat_nomor' => $que->inventory->vehicle_detail->plat_nomor ?? '-',
            'nama_stnk' => $que->inventory->vehicle_detail->nama_stnk ?? '-',
            'tanggal_stnk' => $que->inventory->vehicle_detail->tanggal_stnk ?? '-',
            'tax_expired' => $que->inventory->vehicle_detail->tax->tax_expired ?? '-',
            'tanggal_masuk' => $que->tanggal_masuk ?? "-",
            'tanggal_keluar' => $que->tanggal_keluar ?? "-",
            'pengguna' => $que->pengguna ?? "-",
            'keterangan_keluar' => $que->keterangan_keluar ?? "-",
            'is_inplace' => $que->tanggal_keluar ? 'inactive' : 'active',
        ])->sortBy([['wilayah', 'asc'], ['unit', 'asc'], ['isactive', 'asc']])->values();

        return Inertia::render('Inventory/Index', [
            'datas' => $data,
            'branch' => $branch,
            'server_filters' => $getFilter ?? null
        ]);
    }

    public function taxalert()
    {

        $getFilter = new \stdClass;
        $getFilter = (object) request()->all();
        $getFilter->branch_id = auth()->user()->hasPermissionTo('unit') ? auth()->user()->employee->branch_id : (request()->branch_id ?? -1);

        $nowTime = Carbon::now()->addMonths(1);
        $unitaset = Inventory::with('vehicle_detail.tax', 'aset_placement.branch')
            ->whereHas('vehicle_detail.tax', function ($query) use ($nowTime) {
                $query->whereYear('tax_expired', '<=', $nowTime->year)
                    ->whereMonth('tax_expired', '<=', $nowTime->month);
            })
            ->get();

        $data = collect($unitaset)->map(fn ($que) => [

            'id' => $que->id,
            'unit' => $que->aset_placement->branch->unit,
            'wilayah' => $que->aset_placement->branch->wilayah,
            'pengguna' => $que->aset_placement->pengguna,

            'nama_aset' => $que->nama_aset,
            'type_aset' => $que->type_aset,
            'plat_nomor' => $que->vehicle_detail->plat_nomor,
            'nama_stnk' => $que->vehicle_detail->nama_stnk,

            'expired_date' => $que->vehicle_detail->tax->tax_expired,
            'tanggal_stnk' => $que->vehicle_detail->tanggal_stnk,
            'type_pajak' => Carbon::parse($que->vehicle_detail->tanggal_stnk)->format('Y-m') == Carbon::parse($que->vehicle_detail->tax->expired_date)->format('Y-m') ? "5 Tahunan" : "Tahunan",
        ])->sortBy('id')->sortBy('unit')->values();

        // dd($data);

        return Inertia::render('Inventory/AlertKendaraan', [
            'datas' => $data,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $branch = Branch::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('id', auth()->user()->employee->branch_id))->get();
        $employee = Employee::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('branch_id', auth()->user()->employee->branch_id))->get();
        return Inertia::render('Inventory/Create', [
            'branch' => $branch,
            'employees' => $employee,
            'title' => Title::all()
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
        // dd($request->all());

        $request->validate([
            'nama_aset' => ['required', 'string'],
            'type_aset' => ['required', 'string'],
            'status_kepemilikan' => ['required', 'string'],
            'isactive' => ['required', 'string'],
            'plat_nomor' => ['required', 'string'],
            'nama_stnk' => ['required', 'string'],
            'tanggal_stnk' => ['required', 'string'],
            'tax_expired' => ['required', 'string'],
            'jabatan' => ['required', 'string'],
            'branch_id' => ['required', 'string'],
        ]);
        if ($request->jabatan === "mantri") {
            $request->validate(['area' => ['required']]);
        }

        try {
            DB::beginTransaction();

            $inventory = Inventory::create([
                "nama_aset" => $request->nama_aset,
                "type_aset" => $request->type_aset,
                "status_kepemilikan" => $request->status_kepemilikan,
                "isactive" => $request->isactive,
                "tanggal_pembelian" => $request->tanggal_pembelian,
            ]);

            $detail = $inventory->vehicle_detail()->create([
                "detail_aset" => $request->detail_aset,
                "plat_nomor" => $request->plat_nomor,
                "nama_stnk" => $request->nama_stnk,
                "tanggal_stnk" => $request->tanggal_stnk,
            ]);


            $tax = $detail->tax()->create([
                "tax_payment" =>  Carbon::parse($request->tax_expired)->subYear(),
                "tax_expired" => $request->tax_expired,
                "tax_type" => 'tahunan',
            ]);

            $placement = $inventory->aset_placement()->create([
                "branch_id" => $request->branch_id,
                "tanggal_masuk" =>  Carbon::today()->format('Y-m-d'),
                "pengguna" => $request->area ? $request->jabatan . " - " . $request->jabatan : $request->jabatan,
            ]);

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('aset.index')->withErrors('input gagal silahkan refresh page terlebih dahulu');
        }

        return redirect()->route('aset.index')->with('message', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Inventory  $inventory
     * @return \Illuminate\Http\Response
     */
    public function show(Inventory $inventory)
    {

        // dd($inventory);
        $data = $inventory->load('vehicle_detail.taxes', 'vehicle_detail.tax', 'aset_placements.branch', 'aset_placement.branch');
        $branch = Branch::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('id', auth()->user()->employee->branch_id))->get();
        $employee = Employee::when(auth()->user()->hasPermissionTo('unit'), fn ($que) => $que->where('branch_id', auth()->user()->employee->branch_id))->get();

        return Inertia::render('Inventory/Edit', [
            'aset' => $data,
            'branch' => $branch,
            'employees' => $employee,
            'title' => Title::all()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Inventory  $inventory
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Inventory $inventory)
    {
        // dd($request->all());
        $request->validate([
            "nama_aset" => ['required'],
            "type_aset" => ['required'],
            "status_kepemilikan" => ['required'],
            "isactive" => ['required'],

            "plat_nomor" => ['required'],
            "nama_stnk" => ['required'],
            "tanggal_stnk" => ['required'],

            "tax_expired" => ['required'], // if $req->tax_id is null then create

            // // area penempatan

            "jabatan" => ['required'], //if changed must update $req->area

            "branch_id" => ['required'],
            "aset_placement_id" => ['required'],
        ]);

        try {
            $jabatan = $request->jabatan . ' ' . $request->area;
            // update inventory first
            $inventory->update([
                'nama_aset' => $request->nama_aset,
                'type_aset' => $request->type_aset,
                'status_kepemilikan' => $request->status_kepemilikan,
                'isactive' => $request->isactive,
            ]);

            $inventory->vehicle_detail->update([
                "plat_nomor" => $request->plat_nomor,
                "nama_stnk" => $request->nama_stnk,
                "tanggal_stnk" => $request->tanggal_stnk,
            ]);

            $placement = AssetPlacement::find($request->aset_placement_id);
            $placement->update([
                "jabatan" => $jabatan,
                "branch_id" => $request->branch_id,
            ]);
            $placement->save();

            $inventory->vehicle_detail->tax()->updateOrCreate(
                ['id' => $request->tax_id],
                [
                    "tax_payment" => Carbon::parse($request->tax_expired)->subYear(),
                    "tax_expired" => $request->tax_expired,
                    "tax_type" => 'tahunan',
                ]
            );

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('aset.index')->withErrors('input gagal silahkan refresh page terlebih dahulu');
        }

        return redirect()->route('aset.index')->with('message', 'Data berhasil ditambahkan');
    }

    public function mutating(Request $request, Inventory $inventory)
    {
        // dd($request->all());
        $request->validate(['keterangan_keluar' => ['required'], "tanggal_keluar" => ["required", "date"], ["*.required" => "Wajib Di isi"]]);
        $branch = Branch::find($request->branch_id);
        try {
            if ($request->keterangan_keluar == "mutasi") {
                $inventory->aset_placement->update([
                    "keterangan_keluar" => "Pindah Ke " . $branch->unit,
                    "tanggal_keluar" =>  $request->tanggal_keluar,
                ]);

                $inventory->aset_placement()->create([
                    "branch_id" => $request->branch_id,
                    "tanggal_masuk" => $request->tanggal_keluar,
                    "pengguna" => $request->area ? $request->jabatan . " " . $request->area : $request->jabatan,
                ]);
            } else {
                $inventory->aset_placement->update([
                    "keterangan_keluar" => $request->keterangan_keluar,
                    "tanggal_keluar" =>  $request->tanggal_keluar
                ]);
                $inventory->update([
                    "status_aset" => $request->keterangan_keluar,
                    "isactive" => "inactive"
                ]);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return redirect()->route('aset.index')->withErrors('input gagal silahkan refresh page terlebih dahulu');
        }

        return redirect()->route('aset.index')->with('message', 'Data berhasil ditambahkan');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Inventory  $inventory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Inventory $inventory)
    {
        // dd($inventory->vehicle_detail->tax);

        $request->validate(
            ['type_pajak' => 'required'],
            [
                '*.required' => ['wajib diisi'],
            ]
        );
        $tax_expired = $inventory->vehicle_detail->tax->tax_expired;
        $tanggal_stnk = $inventory->vehicle_detail->tax->tanggal_stnk;

        try {
            DB::beginTransaction();
            if ($request->type_pajak == 1) {
                $dataSet =   $inventory->vehicle_detail->tax()->create([
                    "tax_payment" => $tax_expired,
                    "tax_expired" => Carbon::parse($tax_expired)->addYears(1)->format('Y-m-d'),
                    "tax_type" => $request->tax_type,
                ]);

                // dd($dataSet);
            }
            if ($request->type_pajak == 2) {
                $inventory->vehicle_detail->tanggal_stnk = Carbon::parse($tanggal_stnk)->addYears(5)->format('Y-m-d');
                $inventory->vehicle_detail->save(); // Simpan perubahan tanggal_stnk

                $dataSet = $inventory->vehicle_detail->tax()->create([
                    "tax_payment" => $tax_expired,
                    "tax_expired" => Carbon::parse($tax_expired)->addYears(1)->format('Y-m-d'),
                    "tax_type" => $request->tax_type,
                ]);

                // dd($dataSet);
            }
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            dd($e);
        }

        return redirect()->route('aset.taxalert');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Inventory  $inventory
     * @return \Illuminate\Http\Response
     */
    public function destroy(Inventory $inventory)
    {
        //
    }
}
