<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Burger',
            'Pizza',
            'Japanese',
            'Italian',
            'Mexican',
            'Indian',
            'Chinese'
        ];

        foreach ($categories as $category) {
            Category::create(['category' => strtolower($category)]);
        }
    }
}
