<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class CategoryService
{


    public function createCategory(array $validated): ?Category
    {
        $newCategory = Category::create([
            ...$validated,
            'imagePath' => 'temporal'
        ]);

        $newCategory->update([
            'imagePath' => $validated['image'][0]->store('uploads/restaurants/' . $newCategory['id'] . '/image', ['disk' => 'public'])
        ]);

        return $newCategory;
    }

    public function updateCategory(array $validated, Category $category)
    {
        File::deleteDirectory(public_path() . '/uploads/categories/' . $category['id']);

        $category->update([
            ...$validated,
            'imagePath' => $validated['image'][0]->store('uploads/categories/' . $category['id'] . '/image', ['disk' => 'public'])
        ]);
    }

    public function deleteCategory(Category $category): Category
    {
        $deletedCategory = $category;

        $category->delete();

        File::deleteDirectory(public_path() . '/uploads/categories/' . $category['id']);

        return $deletedCategory;
    }

    public function getNextId()
    {

        $statement = DB::select("show table status like 'categories'");

        return $statement[0]->Auto_increment;
    }
}
