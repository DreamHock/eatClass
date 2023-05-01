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
        $allCategories = Category::with('restaurants')->get();
        return Inertia::render('Home', ['categories' => $allCategories]);
    }
}
