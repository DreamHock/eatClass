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
            'category' => 'pizza',
        ]);
        Category::factory(1)->create([
            'category' => 'burger',
        ]);
        User::factory(1)->create([
            'name' => 'yahya',
            'email' => 'yahya@gmail.com',
            'password' => Hash::make('yahya123'), //yahya123
        ]);
        Restaurant::factory(1)->create([
            'category_id' => 1,
            'name' => 'burger world',
            'city' => 'marrakech'
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
