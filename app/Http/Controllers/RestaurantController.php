<?php

namespace App\Http\Controllers;

use App\Models\DefaultDay;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurants = Restaurant::with('category')->get();

        return Inertia::render('Admin/Restaurants', [
            'user' => fn() => Auth::user(),
            'restaurants' => fn() => $restaurants
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        $res = Restaurant::with(['services', 'category'])->find($restaurant->id);
        $defaultDays = DefaultDay::with('defaultServices')->where('restaurant_id', $restaurant->id)->get();
        return Inertia::render('Restaurant/Restaurant', ['restaurant' => $res, 'defaultDays' => $defaultDays]);
    }

    public function showAdmin(Restaurant $restaurant)
    {
        $res = Restaurant::with(['services', 'category'])->find($restaurant->id);
        $defaultDays = DefaultDay::with('defaultServices')->where('restaurant_id', $restaurant->id)->get();
        return Inertia::render('Admin/Restaurant', ['restaurant' => $res, 'defaultDays' => $defaultDays]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Restaurant $restaurant)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Restaurant $restaurant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        $restaurant->delete();
    }
}
