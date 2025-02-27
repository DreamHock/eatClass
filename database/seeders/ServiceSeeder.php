<?php

namespace Database\Seeders;

use App\Models\Service;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            // Restaurant 1 services
            [
                'restaurant_id' => 1,
                'service' => 'breakfast',
                'from' => '08:00',
                'to' => '11:00',
            ],
            [
                'restaurant_id' => 1,
                'service' => 'lunch',
                'from' => '12:00',
                'to' => '15:00',
            ],
            [
                'restaurant_id' => 1,
                'service' => 'dinner',
                'from' => '18:00',
                'to' => '22:00',
            ],
            // Restaurant 2 services
            [
                'restaurant_id' => 2,
                'service' => 'lunch',
                'from' => '11:00',
                'to' => '16:00',
            ],
            [
                'restaurant_id' => 2,
                'service' => 'dinner',
                'from' => '17:00',
                'to' => '23:00',
            ],
            [
                'restaurant_id' => 2,
                'service' => 'late night',
                'from' => '23:00',
                'to' => '02:00',
            ],
            // Restaurant 3 services
            [
                'restaurant_id' => 3,
                'service' => 'lunch',
                'from' => '11:30',
                'to' => '15:30',
            ],
            [
                'restaurant_id' => 3,
                'service' => 'dinner',
                'from' => '17:30',
                'to' => '22:30',
            ],
            [
                'restaurant_id' => 3,
                'service' => 'happy hour',
                'from' => '15:30',
                'to' => '17:30',
            ],
        ];

        foreach ($services as $service) {
            Service::create([
                ...$service,
                'date' => Carbon::now(),
                'interval' => 30
            ]);
        }
    }
}
