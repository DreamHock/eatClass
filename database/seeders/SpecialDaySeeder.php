<?php

namespace Database\Seeders;

use App\Models\Restaurant;
use App\Models\Service;
use App\Models\SpecialDay;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class SpecialDaySeeder extends Seeder
{
    public function run(): void
    {
        $restaurants = Restaurant::all();

        // Special dates (holidays, events, etc.)
        $specialDates = [
            Carbon::now()->addDays(random_int(1, 14))->toDateString(),
            Carbon::now()->addDays(random_int(1, 14))->toDateString(),
            Carbon::now()->addMonth(random_int(1, 14))->toDateString(),
        ];

        foreach ($restaurants as $restaurant) {
            foreach ($specialDates as $date) {
                $specialDay = SpecialDay::create([
                    'restaurant_id' => $restaurant->id,
                    'specialDate' => $date,
                ]);

                // Add special services for each day
                $services = [
                    [
                        'service' => fake()->name(),
                        'from' => '10:00',
                        'to' => '14:00',
                        'interval' => 45
                    ],
                    [
                        'service' => fake()->name(),
                        'from' => '17:00',
                        'to' => '23:00',
                        'interval' => 60
                    ],
                    [
                        'service' => fake()->name(),
                        'from' => '7:00',
                        'to' => '13:00',
                        'interval' => 60
                    ]
                ];

                // Create services for each special day
                foreach ($services as $service) {
                    Service::create([
                        'restaurant_id' => $restaurant->id,
                        'special_day_id' => $specialDay->id,
                        'service' => $service['service'],
                        'from' => $service['from'],
                        'to' => $service['to'],
                        'interval' => $service['interval'],
                        'date' => $date,
                    ]);
                }
            }
        }
    }
}
