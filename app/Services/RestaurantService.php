<?php

namespace App\Services;


use App\Models\Menu;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class RestaurantService
{


    public function createRestaurant(array $validated)
    {

        $newRestaurant = Restaurant::create([
            ...[
                ...$validated,
                'logoPath' => 'temporal'
            ],
            'user_id' => Auth::id(),
        ]);

        $newRestaurant->update([
            'logoPath' => $validated['logo'][0]->store('uploads/restaurants/' . $newRestaurant['id'] . '/logo', ['disk' => 'public'])
        ]);

        /**
         * @var \Illuminate\Http\UploadedFile $file
         */
        foreach ($validated['menu'] as $file) {
            Menu::create([
                'restaurant_id' => $newRestaurant['id'],
                'menuPath' => $file->store('uploads/restaurants/' . $newRestaurant['id'] . '/menu', ['disk' => 'public']),
            ]);
        }
    }

    public function updateRestaurant(array $validated, Restaurant $restaurant)
    {
        File::deleteDirectory(public_path() . '/uploads/restaurants/' . $restaurant['id']);

        DB::table('menus')->where(['restaurant_id' => $restaurant['id']])->delete();

        $restaurant->update([
            ...$validated,
            'logoPath' => $validated['logo'][0]->store('uploads/restaurants/' . $restaurant['id'] . '/logo', ['disk' => 'public'])
        ]);

        /**
         * @var \Illuminate\Http\UploadedFile $file
         */
        foreach ($validated['menu'] as $file) {
            Menu::create([
                'restaurant_id' => $restaurant['id'],
                'menuPath' => $file->store('uploads/restaurants/' . $restaurant['id'] . '/menu', ['disk' => 'public']),
            ]);
        }
    }

    public function deleteRestaurant(Restaurant $restaurant)
    {
        $deleteRestaurant = $restaurant;

        $restaurant->delete();
        
        File::deleteDirectory(public_path() . '/uploads/restaurants/' . $restaurant['id']);

        return $deleteRestaurant;
    }

    public function getNextId()
    {

        $statement = DB::select("show table status like 'restaurants'");

        return $statement[0]->Auto_increment;
    }
}
