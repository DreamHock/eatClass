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
        return [
            // 'restaurant_id' => Restaurant::all()->random(),
            // 'service' => fake()->name(),
            // 'date' => fake()->dateTime(),
            // 'from' => fake()->time('H:i'),
            // 'to' => fake()->time('H:i'),
            // 'interval' => fake()->randomElement([15, 30, 60])
            // $table->dateTime('date');
            // $table->float('duration',2,2);
            // $table->float('interval');
        ];
    }
}
