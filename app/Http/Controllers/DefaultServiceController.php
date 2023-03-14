<?php

namespace App\Http\Controllers;

use App\Models\DefaultService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DefaultServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $defaultServices = DefaultService::all();
        return Inertia::render('AddWeek', ['defaultServices' => $defaultServices]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(DefaultService $defaultService)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DefaultService $defaultService)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DefaultService $defaultService)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DefaultService $defaultService)
    {
        //
    }
}