<?php

namespace App\Http\Admin\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\DefaultDay;
use App\Models\Menu;
use App\Models\Restaurant;
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

        return Inertia::render('Admin/Restaurant/RestaurantCreate', ['categories' => Category::all()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {


        /**
         * @var \Illuminate\Http\UploadedFile $logo
         */
        $logo = $request->file('logo')[0];

        $menu = $request->file('menu');

        $validatedData = $request->validate([
            'name' => 'required',
            'category_id' => ['required', 'exists:categories,id'],
            'city' => 'required',
            'location' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'logo' => 'max:1',
            'menu' => 'max:5',
            'logo.*' => [
                'required',
                File::types(['webp', 'png', 'jpg', 'jpeg'])
                    ->max(4 * 1024),
            ],
            'menu.*' => [
                'required',
                File::types(['webp', 'png', 'jpg', 'jpeg'])
                    ->max(4 * 1024),
            ],
        ]);

        $newRestaurant = Restaurant::create([
            ...$validatedData,
            'user_id' => Auth::id(),
        ]);

        $logoPath = $logo->store('uploads/restaurants/' . $newRestaurant['id'] . '/logo', ['disk' => 'public']);
        $newRestaurant->update(['logoPath' => $logoPath]);

        /**
         * @var \Illuminate\Http\UploadedFile $file
         */
        foreach ($menu as $file) {
            $newMenu = Menu::create([
                'restaurant_id' => $newRestaurant['id'],
                'menuPath' => 'temporal',
            ]);
            $menuPath = $file->store('uploads/restaurants/' . $newRestaurant['id'] . '/menu', ['disk' => 'public']);
            $newMenu->update(['menuPath' => $menuPath]);
        }
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
