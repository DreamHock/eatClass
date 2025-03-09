<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\DefaultServiceController;
use App\Http\Requests\StoreUpdateDefaultDayRequest;
use App\Http\Requests\StoreUpdateRestaurantRequest;
use App\Http\Requests\StoreUpdateSpecialDayRequest;
use App\Models\Category;
use App\Models\DefaultDay;
use App\Models\Menu;
use App\Models\Restaurant;
use App\Models\Service;
use App\Models\SpecialDay;
use App\Services\DefaultDayService;
use App\Services\RestaurantService;
use App\Services\SpecialDayService;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\File;
use Inertia\Inertia;

class RestaurantController extends Controller
{

    public function __construct(
        private DefaultDayService $defaultDayService,
        private SpecialDayService $specialDayService
    ) {}


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

    public function defaultDayCreate(Restaurant $restaurant)
    {
        $defaultDays = DefaultDay::with('defaultServices')->where('restaurant_id', '=', $restaurant->id)->get();
        // $defaultDays = DefaultDay::with('defaultServices')->get();
        return Inertia::render('AddWeek', [
            'defaultDays' => $defaultDays,
            'restaurant' => $restaurant->only('id')
        ]);
    }

    public function defaultDayStore(
        Restaurant $restaurant,
        StoreUpdateDefaultDayRequest $request
    ) {
        $validated = $request->validated();

        $this->defaultDayService->DefaultDayCreate($restaurant, $validated);
    }

    /**
     * Update the specified resource in storage.
     */
    public function defaultDayUpdate(
        Restaurant $restaurant,
        DefaultDay $defaultDay,
        StoreUpdateDefaultDayRequest $request,
        DefaultDayService $defaultDayService
    ) {
        $validated = $request->validated();

        $defaultDayService->DefaultDayUpdate($restaurant, $defaultDay, $validated);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function defaultDayDestroy(Restaurant $restaurant, DefaultDay $defaultDay)
    {
        $defaultDay->delete();
    }

    public function specialDayCreate(Restaurant $restaurant)
    {
        $specialDay = SpecialDay::with('services')->where('restaurant_id', '=', $restaurant->id)->get();

        return Inertia::render('Admin/Restaurant/SpecialDay', [
            'specialDay' => $specialDay,
            'restaurant' => $restaurant->only(['id', 'name'])
        ]);
    }

    public function specialDayStore(
        Restaurant $restaurant,
        StoreUpdateSpecialDayRequest $request
    ) {
        $validated = $request->validated();

        $this->specialDayService->createSpecialDay($restaurant, $validated);

        return redirect()->back()->with('success', 'Special days created successfully');
    }

    public function specialDayUpdate(
        StoreUpdateSpecialDayRequest $request, 
        Restaurant $restaurant, 
        SpecialDay $specialDay
    ) {
        $validated = $request->validated();

        $this->specialDayService->updateSpecialDay($restaurant, $specialDay, $validated);

        return redirect()->back()->with('success', 'Special day updated successfully');
    }

    public function specialDayDestroy(Restaurant $restaurant, SpecialDay $specialDay)
    {
        $this->specialDayService->deleteSpecialDay($specialDay);

        return redirect()->back()->with('success', 'Special day deleted successfully');
    }
}
