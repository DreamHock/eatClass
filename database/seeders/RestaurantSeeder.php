<?php

namespace Database\Seeders;

use App\Models\Restaurant;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    public function run(): void
    {
        $restaurants = [
            [
                'name' => 'Burger Palace',
                'category_id' => 1, // burger
                'city' => 'New York',
                'address' => '123 Burger Street',
                'average_rating' => 4.5,
                'rating_count' => 128,
            ],
            [
                'name' => 'Pizza Heaven',
                'category_id' => 2, // pizza
                'city' => 'Chicago',
                'address' => '456 Pizza Avenue',
                'average_rating' => 4.7,
                'rating_count' => 256,
            ],
            [
                'name' => 'Sushi Master',
                'category_id' => 3, // japanese
                'city' => 'Los Angeles',
                'address' => '789 Sushi Boulevard',
                'average_rating' => 1.8,
                'rating_count' => 312,
            ]
        ];

        foreach ($restaurants as $restaurant) {
            Restaurant::create([
                ...$restaurant,
                'user_id' => 1,
                'phone' => fake()->phoneNumber(),
                'location' => 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d47122292.41537385!2d-137.977294921875!3d43.87413818147481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25852b45519a9%3A0x7c17fba9feac45c4!2sBURGER%20WORLD!5e0!3m2!1sen!2sma!4v1684848562007!5m2!1sen!2sma',
                'logoPath' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/2024px-Burger_King_logo_%281999%29.svg.png',
            ]);
        }
    }
}