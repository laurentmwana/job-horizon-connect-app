<?php

namespace Database\Factories;

use App\Enums\ActivityTypeEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Activity>
 */
class ActivityFactory extends Factory
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
            'title' => fake()->unique()->sentence(1),
            'content' => fake()->paragraph(5),
            'description' => fake()->text(),
            'start_at' => fake()->date(),
            'end_at' => fake()->date(),
            'type' => fake()->randomElement(ActivityTypeEnum::cases())->value,
        ];
    }
}
