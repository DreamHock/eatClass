<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CategoryController extends Controller
{
    function categories()
    {
        // $allCategories = Category::with('restaurants')->get();
        // $allRestaurants = Restaurant::with('category')->get();
        // $allRestaurants = DB::select('select * from restaurants r inner join categories c on c.id = r.category_id');
        $allCategories = Category::with('restaurants')->get();
        return Inertia::render('Home', ['categories' => $allCategories]);
    }
}
