<?php

namespace Database\Seeders;

use App\Models\Candidate;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Recruiter;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $recruiterUsers = User::factory(20)->create();

        foreach ($recruiterUsers as $user) {
            Recruiter::factory()->create([
                'user_id' => $user->id
            ]);
        }

        $candidateUsers = User::factory(20)->create();

        foreach ($candidateUsers as $user) {
            Candidate::factory()->create([
                'user_id' => $user->id
            ]);
        }
    }
}
