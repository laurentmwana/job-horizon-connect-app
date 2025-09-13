<?php

namespace Database\Factories;

use App\Enums\CandidacyStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Candidacy>
 */
class CandidacyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'status' => fake()->randomElement(CandidacyStatusEnum::cases())->value,
            'cv_path' => fake()->url(),
        ];
    }
}
