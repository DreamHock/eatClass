<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        User::factory(1)->create([
            'name' => 'harakat',
            'email' => 'yahya@harakat.dev',
            'password' => Hash::make('harakat.dev123'),
            'role' => 'admin'
        ]);

        // Run other seeders
        $this->call([
            CategorySeeder::class,
            RestaurantSeeder::class,
            DefaultDaySeeder::class,
            ServiceSeeder::class
        ]);
    }
}
