<?php

namespace Database\Factories;

use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $numbers = [15, 30, 45, 60];
        $randomNumber = $numbers[array_rand($numbers)];
        return [
            'restaurant_id' => Restaurant::all()->random(),
            'service' => fake()->name(),
            'date' => fake()->dateTime(),
            'duration' => rand(60, 180),
            'interval' => $randomNumber
            // $table->dateTime('date');
            // $table->float('duration',2,2);
            // $table->float('interval');
        ];
    }
}
