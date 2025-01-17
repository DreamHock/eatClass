<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();

        return Inertia::render('Admin/Category/Categories', [
            'categories' => fn() => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render('Admin/Category/CategoryCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, CategoryService $categoryService)
    {

        $categoryService->createCategory($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return redirect()->route('categories.show', $category->id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        $category->load('menu');

        return Inertia::render('Admin/Category/CategoryCreate', ['categories' => Category::all(), 'category' => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category, CategoryService $categoryService)
    {
        $categoryService->updateCategory($request, $category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category, CategoryService $categoryService)
    {
        $categoryService->deleteCategory($category);
    }
}
