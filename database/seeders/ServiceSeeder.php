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
            // Restaurant 1 (Burger Palace) - Special Weekend Brunch and Late Night Burger Fest
            [
                'restaurant_id' => 1,
                'service' => 'Weekend Brunch Special',
                'from' => '10:00',
                'to' => '14:00',
                'interval' => 45,
                'date' => Carbon::now()->next('Saturday')
            ],
            [
                'restaurant_id' => 1,
                'service' => 'Burger Festival',
                'from' => '18:00',
                'to' => '23:00',
                'interval' => 60,
                'date' => Carbon::now()->next('Friday')
            ],
            [
                'restaurant_id' => 1,
                'service' => 'Late Night Bites',
                'from' => '23:00',
                'to' => '02:00',
                'interval' => 30,
                'date' => Carbon::now()->next('Saturday')
            ],
            // Restaurant 2 (Pizza Heaven) - Pizza Making Workshop and Family Sunday
            [
                'restaurant_id' => 2,
                'service' => 'Pizza Making Workshop',
                'from' => '14:00',
                'to' => '16:00',
                'interval' => 120,
                'date' => Carbon::now()->next('Sunday')
            ],
            [
                'restaurant_id' => 2,
                'service' => 'Family Sunday Feast',
                'from' => '17:00',
                'to' => '21:00',
                'interval' => 90,
                'date' => Carbon::now()->next('Sunday')
            ],
            [
                'restaurant_id' => 2,
                'service' => 'Date Night Special',
                'from' => '19:00',
                'to' => '23:00',
                'interval' => 60,
                'date' => Carbon::now()->next('Saturday')
            ],
            // Restaurant 3 (Sushi Master) - Special Tasting Events
            [
                'restaurant_id' => 3,
                'service' => 'Sushi Master Class',
                'from' => '11:00',
                'to' => '13:00',
                'interval' => 120,
                'date' => Carbon::now()->next('Saturday')
            ],
            [
                'restaurant_id' => 3,
                'service' => 'Omakase Experience',
                'from' => '18:00',
                'to' => '22:00',
                'interval' => 90,
                'date' => Carbon::now()->next('Friday')
            ],
            [
                'restaurant_id' => 3,
                'service' => 'Sake Tasting & Sushi',
                'from' => '20:00',
                'to' => '23:00',
                'interval' => 60,
                'date' => Carbon::now()->next('Saturday')
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
