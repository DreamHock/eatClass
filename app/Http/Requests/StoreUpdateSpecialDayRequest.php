<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use DateTime;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class StoreUpdateSpecialDayRequest extends FormRequest
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
        $rules = [
            'services' => 'required|array',
            'services.*.service' => 'required|string',
            'services.*.from' => 'required|date_format:"H:i"',
            'services.*.to' => 'required|date_format:"H:i"|after:services.*.from',
            'services.*.interval' => [
                'required',
                function ($attribute, $value, $fail) {
                    $to = Carbon::parse(DateTime::createFromFormat('H:i', $this->input(str_replace('interval', 'to', $attribute))));
                    $from = Carbon::parse(DateTime::createFromFormat('H:i', $this->input(str_replace('interval', 'from', $attribute))));
                    $diffToFrom = $to->diffInMinutes($from);
                    if ($diffToFrom % $value != 0) {
                        $fail("");
                    }
                }
            ],
        ];

        // For create operation
        if ($this->isMethod('post')) {
            $rules['selectedDates'] = 'required|array';
            $rules['selectedDates.*'] = 'required|date_format:"Y-m-d"';
        }

        // For update operation
        if ($this->isMethod('put')) {
            $rules['specialDate'] = 'required|date_format:"Y-m-d"';
            $rules['services.*.id'] = 'sometimes|exists:services,id';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'selectedDates' => 'Please select at least one date',
            'selectedDates.*' => 'The selected date must be valid',
            'specialDate' => 'The special date must be valid',
            'services' => 'The services information must be filled',
            'services.*.service' => 'The service must be valid',
            'services.*.from' => 'From must be a valid time',
            'services.*.to' => 'To must be a valid and greater than from',
            'services.*.interval' => 'Duration (from-to) should be divisible by interval',
        ];
    }
}
