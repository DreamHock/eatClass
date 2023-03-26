<?php

namespace App\Http\Controllers;

use App\Models\DefaultService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
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
        // $defaultServices = DB::table('default_Services')
        //     ->select('*')
        //     ->orderBy('weekDayName')
        //     ->get()
        //     ->groupBy('weekDayName')
        //     ->map(function ($items) {
        //         return $items;
        //     });
        // return Inertia::render('AddWeek', ['defaultServices' => $defaultServices]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public static function store($request, $idLastItem)
    {

        $services = $request['services'];
        foreach ($services as $service) {
            $ds = new DefaultService;
            $ds->create([
                'service' => $service['service'],
                'from' => $service['from'],
                'to' => $service['to'],
                'interval' => $service['interval'],
                'default_day_id' => $idLastItem,
            ]);
        }
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
    }
}
