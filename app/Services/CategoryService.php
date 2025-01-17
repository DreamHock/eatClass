<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryService
{


    public function createCategory(Request $request): ?Category
    {
        $validatedData = $request->validate(
            [
                'category' => ['required'],
                'image' => ['array', 'size:1'], // Ensures exactly one file
                'image.*' => 'required|mimes:jpg,webp,png,jpeg|max:4096',
            ],
            [
                'image.*.required' => 'A image file is required.',
                'image.*.mimes' => "The image must be a valid file ('webp', 'png', 'jpg', 'jpeg')",
            ]
        );


        $newCategory = Category::create([
            ...$validatedData,
            'imagePath' => $request->file('image')[0]->store('uploads/categories/' . $this->getNextId() . '/image', ['disk' => 'public'])
        ]);

        return $newCategory;
    }

    public function updateCategory(Request $request, Category $category)
    {
        $updatedCategory = $this->deleteCategory($category);

        $newCategory = $this->createCategory($request);

        $newCategory->update([
            'id' => $updatedCategory->id,
            'created_at' => $updatedCategory->created_at,
        ]);
    }

    public function deleteCategory(Category $category)
    {
        $updatedCategory = $category;
        $category->delete();

        return $updatedCategory;
    }

    public function getNextId()
    {

        $statement = DB::select("show table status like 'categories'");

        return $statement[0]->Auto_increment;
    }
}
