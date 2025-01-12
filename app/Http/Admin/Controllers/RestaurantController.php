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

        $validatedData = $request->validate(
            [
                'name' => ['required'],
                'category_id' => ['required', 'exists:categories,id'],
                'city' => 'required',
                'location' => 'required',
                'address' => 'required',
                'phone' => 'required',
                'logo' => ['array', 'size:1'], // Ensures exactly one file
                'menu' => ['nullable', 'array', 'max:5'],  // Optional with a max of 5
                'logo.*' => 'required|mimes:jpg,webp,png,jpeg|max:4096',
                'menu.*' => 'required|mimes:jpg,webp,png,jpeg|max:4096',
            ],
            [
                'logo.*.required' => 'A logo file is required.',
                'logo.*.mimes' => "The logo must be a valid file ('webp', 'png', 'jpg', 'jpeg')",
                'menu.*.required' => 'The menu is required.',
                'menu.*.mimes' => "The menu must be a valid file ('webp', 'png', 'jpg', 'jpeg')",
            ]
        );

        $newRestaurant = Restaurant::create([
            ...$validatedData,
            'user_id' => Auth::id(),
        ]);

        /**
         * @var \Illuminate\Http\UploadedFile $logo
         */
        $logo = $request->file('logo')[0];

        $menu = $request->file('menu');

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
        $restaurant->load('menu');

        return Inertia::render('Admin/Restaurant/RestaurantCreate', ['categories' => Category::all(), 'restaurant' => $restaurant]);
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
