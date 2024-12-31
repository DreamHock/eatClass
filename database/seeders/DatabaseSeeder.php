<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Restaurant;
use App\Models\Service;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Category::factory(1)->create([
            'category' => 'burger',
        ]);
        Category::factory(1)->create([
            'category' => 'pizza',
        ]);
        User::factory(1)->create([
            'name' => 'harakat',
            'email' => 'yahya@harakat.dev',
            'password' => Hash::make('harakat.dev123'),
        ]);

        for ($i = 1; $i <= 10; $i++) {
            Restaurant::factory(1)->create([
                'category_id' => random_int(1, 2),
                'user_id' => 1,
                'name' => fake()->company,
                'city' => fake()->city,
                'location' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47122292.41537385!2d-137.977294921875!3d43.87413818147481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25852b45519a9%3A0x7c17fba9feac45c4!2sBURGER%20WORLD!5e0!3m2!1sen!2sma!4v1684848562007!5m2!1sen!2sma',
                'adresse' => '120 Lot Al Amane Mhamid',
                'logoPath' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/2024px-Burger_King_logo_%281999%29.svg.png',
                'phone' => fake()->phoneNumber,
            ]);
        }
        Service::factory(1)->create([
            'restaurant_id' => 1,
            'service' => 'breakfest',
            'date' => Carbon::now(),
            'from' => '08:00',
            'to' => '11:00',
            'interval' => 30
        ]);
        Service::factory(1)->create([
            'restaurant_id' => 1,
            'service' => 'lunch',
            'date' => Carbon::now(),
            'from' => '01:00',
            'to' => '04:00',
            'interval' => 30
        ]);
    }
}
