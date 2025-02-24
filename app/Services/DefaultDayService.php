<?php

namespace App\Services;

use App\Models\DefaultDay;
use App\Models\DefaultService;
use App\Models\Restaurant;

class DefaultDayService
{

    public function DefaultDayCreate(Restaurant $restaurant, array $validated)
    {
        $lastCreated = DefaultDay::create([
            'restaurant_id' => $restaurant->id,
            'dayName' => $validated['day']
        ]);

        $services = $validated['services'];
        foreach ($services as $service) {
            DefaultService::create([
                'service' => $service['service'],
                'from' => $service['from'],
                'to' => $service['to'],
                'interval' => $service['interval'],
                'default_day_id' => $lastCreated->id,
            ]);
        }
    }

    public function DefaultDayUpdate(Restaurant $restaurant, DefaultDay $defaultDay, array $validated)
    {
        $defaultDay->delete();

        $lastCreated = DefaultDay::create([
            'restaurant_id' => $restaurant->id,
            'dayName' => $validated['day']
        ]);

        $services = $validated['services'];
        foreach ($services as $service) {
            DefaultService::create([
                'service' => $service['service'],
                'from' => $service['from'],
                'to' => $service['to'],
                'interval' => $service['interval'],
                'default_day_id' => $lastCreated->id,
            ]);
        }
    }
}
