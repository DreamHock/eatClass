<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Restaurant;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->input('query');
        $categoryId = $request->input('category');
        $rating = $request->input('rating');
    
        $allCategories = Category::all();
        $allRestaurants = Restaurant::query()
            ->when($query, function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('address', 'like', "%{$query}%");
            })
            ->when($categoryId, function ($q) use ($categoryId) {
                $q->where('category_id', $categoryId);
            })
            ->when($rating, function ($q) use ($rating) {
                $q->where('average_rating', '>=', $rating);
            })
            ->with('category')
            ->get();
    
        return Inertia::render('Home', [
            'categories' => $allCategories,
            'restaurants' => $allRestaurants
        ]);
    }
}


