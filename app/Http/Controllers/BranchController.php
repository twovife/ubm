<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Http\Requests\StoreBranchRequest;
use App\Http\Requests\UpdateBranchRequest;
use Inertia\Inertia;

class BranchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
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
    // public function index()
    // {
    //     return Inertia::render('Administrator/Branches/Branches', [
    //         'branch' => Branch::paginate(20)
    //     ]);
    // }

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
     * @param  \App\Http\Requests\StoreBranchRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBranchRequest $request)
    {
        $request['wilayah'] = 'Wilayah ' . $request->wilayah;
        $request['isactive'] = 1;
        $branch = Branch::create($request->all());

        return redirect()->route('administrator.branches.index')->with('message', 'data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function show(Branch $branch)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function edit(Branch $branch)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBranchRequest  $request
     * @param  \App\Models\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBranchRequest $request, Branch $branch)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Branch  $branch
     * @return \Illuminate\Http\Response
     */
    public function destroy(Branch $branch)
    {
        //
    }
}
