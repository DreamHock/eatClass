<?php

namespace App\Services;


use App\Models\Menu;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RestaurantService
{


    public function createRestaurant(Request $request): ?Restaurant
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
            ...[
                ...$validatedData,
                'logoPath' => $request->file('logo')[0]->store('uploads/restaurants/' . $this->getNextId() . '/logo', ['disk' => 'public'])
            ],
            'user_id' => Auth::id(),
        ]);

        /**
         * @var \Illuminate\Http\UploadedFile $file
         */
        foreach ($request->file('menu') as $file) {
            Menu::create([
                'restaurant_id' => $newRestaurant['id'],
                'menuPath' => $file->store('uploads/restaurants/' . $newRestaurant['id'] . '/menu', ['disk' => 'public']),
            ]);
        }

        return $newRestaurant;
    }

    public function updateRestaurant(Request $request, Restaurant $restaurant)
    {
        $updatedRestaurant = $this->deleteRestaurant($restaurant);

        $newRestaurant = $this->createRestaurant($request);

        $newRestaurant->update([
            'id' => $updatedRestaurant->id,
            'created_at' => $updatedRestaurant->created_at,
        ]);
    }

    public function deleteRestaurant(Restaurant $restaurant)
    {
        $updatedRestaurant = $restaurant;
        $restaurant->delete();

        return $updatedRestaurant;
    }

    public function getNextId()
    {

        $statement = DB::select("show table status like 'restaurants'");

        return $statement[0]->Auto_increment;
    }
}
