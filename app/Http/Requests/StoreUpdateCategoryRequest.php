<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUpdateCategoryRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'category' => 'required',
            'image' => ['array', 'size:1'], // Ensures exactly one file
            'image.*' => 'required|mimes:jpg,webp,png,jpeg|max:4096',
        ];
    }

    public function messages()
    {
        return [
            'logo.*.required' => 'The image file is required.',
            'logo.*.mimes' => "The Image must be a valid file ('webp', 'png', 'jpg', 'jpeg')",
        ];
    }
}
