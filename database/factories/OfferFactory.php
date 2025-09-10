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
        return [
            'image' => fake()->imageUrl(),
            'name' => fake()->sentence(1),
            'bio' => fake()->sentence(),
            'description' => fake()->text(),
            'start_at' => fake()->date(),
            'end_at' => fake()->date(),
        ];
    }
}
