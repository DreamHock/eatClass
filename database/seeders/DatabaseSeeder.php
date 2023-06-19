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
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        // Category::factory(2)->create();
        // Restaurant::factory(5)
        //     ->create();
        // Service::factory(150)->create();
        Category::factory(1)->create([
            'category' => 'burger',
        ]);
        Category::factory(1)->create([
            'category' => 'pizza',
        ]);
        User::factory(1)->create([
            'name' => 'yahya',
            'email' => 'yahya@gmail.com',
            'password' => Hash::make('yahya123'), //yahya123
        ]);
        Restaurant::factory(1)->create([
            'category_id' => 1,
            'user_id' => 1,
            'name' => 'burger world',
            'city' => 'marrakech',
            'location' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47122292.41537385!2d-137.977294921875!3d43.87413818147481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25852b45519a9%3A0x7c17fba9feac45c4!2sBURGER%20WORLD!5e0!3m2!1sen!2sma!4v1684848562007!5m2!1sen!2sma',
            'adresse' => '120 Lot Al Amane Mhamid',
            'logoPath' => 'https://media-cdn.grubhub.com/image/upload/d_search:browse-images:default.jpg/w_300,q_100,fl_lossy,dpr_2.0,c_fit,f_auto,h_300/vqba5rtrkn87zuxvabfe',
            'phone' => '0524203040'
        ]);
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
