<?php

namespace Database\Seeders;

use App\Models\DefaultDay;
use App\Models\DefaultService;
use App\Models\Restaurant;
use Illuminate\Database\Seeder;

class DefaultDaySeeder extends Seeder
{
    public function run(): void
    {
        $restaurants = Restaurant::all();
        $days = ['monday', 'tuesday', 'wednesday', 'thursday', 'saturday'];
        
        foreach ($restaurants as $restaurant) {
            foreach ($days as $day) {
                $defaultDay = DefaultDay::create([
                    'dayName' => $day,
                    'restaurant_id' => $restaurant->id,
                ]);

                // Add default services for each day
                $services = [
                    [
                        'service' => 'Breakfast',
                        'from' => '08:00',
                        'to' => '11:00',
                        'interval' => 30
                    ],
                    [
                        'service' => 'Lunch',
                        'from' => '12:00',
                        'to' => '15:00',
                        'interval' => 30
                    ],
                    [
                        'service' => 'Dinner',
                        'from' => '18:00',
                        'to' => '22:00',
                        'interval' => 30
                    ]
                ];

                // Create services for each day
                foreach ($services as $service) {
                    DefaultService::create([
                        'default_day_id' => $defaultDay->id,
                        'service' => $service['service'],
                        'from' => $service['from'],
                        'to' => $service['to'],
                        'interval' => $service['interval'],
                        'active' => true
                    ]);
                }
            }
        }
    }
}
