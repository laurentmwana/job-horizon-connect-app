<?php

namespace Database\Factories;

use App\Enums\GenderEnum;
use App\Enums\ParticipatedStatusEnum;
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
        $status =  fake()->randomElement(ParticipatedStatusEnum::cases())->value;

        return [
            'status' => $status,
            'participant_at' => $status !== ParticipatedStatusEnum::PENDING->value ? now() : null,
        ];
    }
}
