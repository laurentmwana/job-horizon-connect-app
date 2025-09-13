<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $startAt = now();

        return [
            'image' => null,
            'name' => fake()->sentence(1),
            'bio' => fake()->sentence(),
            'description' => fake()->text(),
            'start_at' => $startAt,
            'end_at' => $startAt->addMonths(fake()->randomDigit() + 1),
        ];
    }
}
