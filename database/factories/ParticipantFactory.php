<?php

namespace Database\Factories;

use App\Enums\GenderEnum;
use App\Enums\ProfessionEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Participant>
 */
class ParticipantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name,
            'firstname' => fake()->firstname,
            'email' => fake()->email,
            'gender' => fake()->randomElement(GenderEnum::cases())->value,
            'profession' => fake()->randomElement(ProfessionEnum::cases())->value,
        ];
    }
}
