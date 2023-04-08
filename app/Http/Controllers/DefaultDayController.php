<?php

namespace App\Http\Controllers;

use App\Models\DefaultDay;
use App\Models\DefaultService;
use App\Rules\validateInterval;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class DefaultDayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $defaultDays = DefaultDay::with('defaultServices')->get();
        return Inertia::render('AddWeek', ['defaultDays' => $defaultDays, 'auth' => Auth::user()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $defaultDays = DefaultDay::with('defaultServices')->get();
        return Inertia::render('AddWeek', ['defaultDays' => $defaultDays]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeValidation($request, $edit = false)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'restaurant_id' => 'required|integer',
                'day' => [
                    'required', 'in:monday,tuesday,wednesday,thursday,friday,saturday,sunday',
                    function ($attribute, $value, $fail) use($edit) {
                        $daysObject = DB::table('default_days')->distinct('dayName')->get('dayName');
                        $daysObject = json_decode($daysObject, true);

                        $days = array_map(function ($item) {
                            return $item['dayName'];
                        }, $daysObject);
                        if($edit == true) {
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
                    function ($attribute, $value, $fail) use ($request) {
                        $to = Carbon::parse(DateTime::createFromFormat('H:i', $request->input(str_replace('interval', 'to', $attribute))));
                        $from = Carbon::parse(DateTime::createFromFormat('H:i', $request->input(str_replace('interval', 'from', $attribute))));
                        $diffToFrom = $to->diffInMinutes($from);
                        if ($diffToFrom % $value != 0) {
                            $fail("");
                        }
                    }
                ],
            ],
            [
                'day' => 'The day must be a valid week day and should not be repeated',
                'services' => 'The services information must be filled',
                'services.*.service' => 'The service must be valid',
                'services.*.from' => 'From must be a valid time',
                'services.*.to' => 'To must be a valid and greater than from',
                'services.*.interval' => 'duration(from-to) should be devided by interval',
            ]
        );

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    public function store(Request $request)
    {
        // $daysObject = DB::table('default_days')->distinct('dayName')->get('dayName');
        // $daysObject = json_decode($daysObject, true);
        // $days = array_map(function ($item) {
        //     return $item['dayName'];
        // }, $daysObject);
        // return $days;
        $this->storeValidation($request);
        $ds = new DefaultDay();
        $ds->create([
            'restaurant_id' => $request['restaurant_id'],
            'dayName' => $request['day']
        ]);

        $idLastItem = DefaultDay::all()->last()->id;
        DefaultServiceController::store($request, $idLastItem);
    }

    /**
     * Display the specified resource.
     */
    public function show(DefaultDay $defaultDay)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DefaultDay $defaultDay)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DefaultDay $defaultDay)
    {
        $this->storeValidation($request, true);

        $defaultDay->delete();
        $ds = new DefaultDay();
        $ds->create([
            'restaurant_id' => $request['restaurant_id'],
            'dayName' => $request['day']
        ]);

        $idLastItem = DefaultDay::all()->last()->id;
        DefaultServiceController::store($request, $idLastItem);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DefaultDay $defaultDay)
    {
        $defaultDay->delete();
    }
}
