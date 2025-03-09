<?php

namespace App\Services;

use App\Models\Restaurant;
use App\Models\Service;
use App\Models\SpecialDay;

class SpecialDayService
{
    /**
     * Create special days with services
     */
    public function createSpecialDay(Restaurant $restaurant, array $validated)
    {
        foreach ($validated['selectedDates'] as $date) {
            // Create a special day for each selected date
            $specialDay = SpecialDay::create([
                'restaurant_id' => $restaurant->id,
                'specialDate' => $date,
            ]);

            // Create services for this special day
            $this->createServices($restaurant, $specialDay, $validated['services'], $date);
        }
    }

    /**
     * Update a special day and its services
     */
    public function updateSpecialDay(Restaurant $restaurant, SpecialDay $specialDay, array $validated)
    {
        // Delete the existing special day (this will cascade delete related services)
        $specialDay->delete();
        
        // Create a new special day with the updated date
        $newSpecialDay = SpecialDay::create([
            'restaurant_id' => $restaurant->id,
            'specialDate' => $validated['specialDate'],
        ]);
        
        // Create services for this special day
        $this->createServices($restaurant, $newSpecialDay, $validated['services'], $validated['specialDate']);
    }

    /**
     * Delete a special day and its services
     */
    public function deleteSpecialDay(SpecialDay $specialDay)
    {
        // This will also delete related services due to cascading
        $specialDay->delete();
    }

    /**
     * Create multiple services for a special day
     */
    private function createServices(Restaurant $restaurant, SpecialDay $specialDay, array $services, string $date)
    {
        foreach ($services as $service) {
            $this->createService($restaurant, $specialDay, $service, $date);
        }
    }

    /**
     * Create a single service for a special day
     */
    private function createService(Restaurant $restaurant, SpecialDay $specialDay, array $serviceData, string $date)
    {
        Service::create([
            'restaurant_id' => $restaurant->id,
            'special_day_id' => $specialDay->id,
            'service' => $serviceData['service'],
            'from' => $serviceData['from'],
            'to' => $serviceData['to'],
            'interval' => $serviceData['interval'],
            'date' => $date,
        ]);
    }
}