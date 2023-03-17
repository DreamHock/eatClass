<?php

namespace App\Http\Controllers;

use App\Models\DefaultDay;
use App\Models\DefaultService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DefaultDayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $defaultDays = DefaultDay::with('defaultServices')->get();
        return Inertia::render('AddWeek', ['defaultDays' => $defaultDays]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $defaultDays = DefaultDay::with('defaultServices')->get();
        return Inertia::render('AddWeek', ['defaultDays' => $defaultDays]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // return dd($request->input());
        $request->validate(
            [
                'restaurant_id' => 'required|integer',
                'day' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
                'services.*' => 'required|string',

            ],
            [
                'day' => 'the day must be a valid week day',
                'services.*' => 'the service must be a valid service'
            ]
        );

        $ds = new DefaultDay();
        $ds->create([
            'restaurant_id' => $request['restaurant_id'],
            'dayName' => $request['day']
        ]);

        $idLastItem = DefaultDay::all()->last()->id;
        DefaultServiceController::store($request, $idLastItem);
    }

    /**
     * Display the specified resource.
     */
    public function show(DefaultDay $defaultDay)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DefaultDay $defaultDay)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DefaultDay $defaultDay)
    {
        
        $defaultDay->delete();
        // return dd($request->input());
        $request->validate(
            [
                'restaurant_id' => 'required|integer',
                'day' => 'required|in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',

            ],
            [
                'day' => 'the day must be a valid week day',
                'restaurant_id' => 'the idRestaurant must be an integer'
            ]
        );

        $ds = new DefaultDay();
        $ds->create([
            'restaurant_id' => $request['restaurant_id'],
            'dayName' => $request['day']
        ]);

        $idLastItem = DefaultDay::all()->last()->id;
        DefaultServiceController::store($request, $idLastItem);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DefaultDay $defaultDay)
    {
        $defaultDay->delete();
    }
}
