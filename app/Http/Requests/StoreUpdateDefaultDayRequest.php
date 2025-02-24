<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use DateTime;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\DB;

class StoreUpdateDefaultDayRequest extends FormRequest
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
            'restaurant_id' => 'required|integer',
            'day' => [
                'required',
                'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
                function ($attribute, $value, $fail) {
                    $daysObject = DB::table('default_days')->distinct('dayName')->get('dayName');
                    $daysObject = json_decode($daysObject, true);

                    $days = array_map(function ($item) {
                        return $item['dayName'];
                    }, $daysObject);
                    if ($this->method() == "PUT") {
                        $key = array_search($value, $days);
                        if ($key) {
                            array_splice($days, $key, 1);
                        }
                    }

                    if (in_array($value, $days)) {
                        $fail('');
                    }
                }
            ],
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
    }

    public function messages()
    {
        return [
            'day' => 'The day must be a valid week day and should not be repeated',
            'services' => 'The services information must be filled',
            'services.*.service' => 'The service must be valid',
            'services.*.from' => 'From must be a valid time',
            'services.*.to' => 'To must be a valid and greater than from',
            'services.*.interval' => 'duration(from-to) should be devided by interval',
        ];
    }
}
