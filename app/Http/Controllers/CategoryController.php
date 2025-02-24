<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Restaurant;
use Inertia\Inertia;

class CategoryController extends Controller
{
    function categories()
    {
        $allCategories = Category::all();
        $allRestaurants = Restaurant::all()->load('category');
        return Inertia::render('Home', [
            'categories' => $allCategories,
            'restaurants' => $allRestaurants
        ]);
    }
}
