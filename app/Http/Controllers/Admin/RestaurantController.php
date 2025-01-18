<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUpdateRestaurantRequest;
use App\Models\Category;
use App\Models\DefaultDay;
use App\Models\Menu;
use App\Models\Restaurant;
use App\Services\RestaurantService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $restaurants = Restaurant::with('category')->get();

        return Inertia::render('Admin/Restaurant/Restaurants', [
            'restaurants' => fn() => $restaurants
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('Admin/Restaurant/RestaurantCreate', ['categories' => Category::all()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdateRestaurantRequest $request, RestaurantService $restaurantService)
    {
        $validated = $request->validated();
        
        $restaurantService->createRestaurant($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        return redirect()->route('restaurants.show', $restaurant->id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Restaurant $restaurant)
    {
        $restaurant->load('menu');

        return Inertia::render('Admin/Restaurant/RestaurantCreate', ['categories' => Category::all(), 'restaurant' => $restaurant]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateRestaurantRequest $request, Restaurant $restaurant, RestaurantService $restaurantService)
    {
        $validated = $request->validated();

        $restaurantService->updateRestaurant($validated, $restaurant);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant, RestaurantService $restaurantService)
    {
        $restaurantService->deleteRestaurant($restaurant);
    }
}
