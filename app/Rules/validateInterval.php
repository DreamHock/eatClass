<?php

namespace App\Rules;

use Closure;
use DateTime;
use Illuminate\Contracts\Validation\ValidationRule;

class validateInterval implements ValidationRule
{
    protected $request;
    function __construct($request)
    {
        $this->request = $request;
    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $to = DateTime::createFromFormat('HH:mm', $this->request->input('services.*.to'));
        $from = Datetime::createFromFormat('HH:mm', $this->request->input('services.*.from'));
        $interval = Datetime::createFromFormat('HH:mm', $this->request->input('services.*.interval'));
        $differenceFromTo = date_diff($to, $from);
        $fail('hello there');
        // $differenceWithInterval = date_diff($differenceFromTo, $interval);

        // if ($differenceWithInterval) {
        //     $fail("difference between 'to' and 'from' must be Divisible by the 'interval'");
        // }
    }
}
