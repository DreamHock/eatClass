<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CategoryController extends Controller
{
    function index(Request $request)
    {
        $allCategories = Category::with('restaurants')->get();
        return Inertia::render('Home', ['categories' => $allCategories]);

        return Inertia::render('Home', [
            'categories' => Category::query()->when(
                $search,
                fn($query) =>
                $query->where('category', 'LIKE', "%{$search}%")
                    ->orWhere('category.restaurant.name', 'LIKE', "%{$search}%")
                    ->orWhere('category.restaurant.adresse', 'LIKE', "%{$search}%")
            )->orderByDesc('created_at')->paginate(10)->withQueryString()
        ]);
    }
}

