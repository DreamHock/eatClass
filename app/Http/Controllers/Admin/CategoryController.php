<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUpdateCategoryRequest;
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
    public function store(StoreUpdateCategoryRequest $request, CategoryService $categoryService)
    {

        $validated = $request->validated();

        $categoryService->createCategory($validated);
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

        return Inertia::render('Admin/Category/CategoryCreate', ['category' => $category]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateCategoryRequest $request, Category $category, CategoryService $categoryService)
    {
        $validated = $request->validated();

        $categoryService->updateCategory($validated, $category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category, CategoryService $categoryService)
    {
        $categoryService->deleteCategory($category);
    }
}
