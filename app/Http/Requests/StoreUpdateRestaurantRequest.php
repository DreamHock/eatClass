<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUpdateRestaurantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required'],
            'category_id' => ['required', 'exists:categories,id'],
            'city' => 'required',
            'location' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'logo' => ['array', 'size:1'], // Ensures exactly one file
            'menu' => ['nullable', 'array', 'max:5'],  // Optional with a max of 5
            'logo.*' => 'required|mimes:jpg,webp,png,jpeg|max:4096',
            'menu.*' => 'required|mimes:jpg,webp,png,jpeg|max:4096',
        ];
    }

    public function messages()
    {
        return [
            'logo.*.required' => 'A logo file is required.',
            'logo.*.mimes' => "The logo must be a valid file ('webp', 'png', 'jpg', 'jpeg')",
            'menu.*.required' => 'The menu is required.',
            'menu.*.mimes' => "The menu must be a valid file ('webp', 'png', 'jpg', 'jpeg')",
        ];
    }
}
