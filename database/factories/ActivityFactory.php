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
            'image' => null,
            'title' => fake()->unique()->sentence(1),
            'content' => fake()->paragraph(5),
            'description' => fake()->text(),
            'start_at' => now(),
            'end_at' => now(),
            'type' => fake()->randomElement(ActivityTypeEnum::cases())->value,
        ];
    }
}
