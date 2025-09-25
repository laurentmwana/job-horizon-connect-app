<?php

namespace Database\Seeders;

use App\Enums\UserRoleEnum;
use App\Models\Faq;
use App\Models\User;
use App\Models\Offer;
use App\Models\Skill;
use App\Models\Activity;
use App\Models\Candidacy;
use App\Models\Candidate;
use App\Models\JobPosition;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Participant;
use App\Models\ActivityForm;
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
            'role' => UserRoleEnum::ADMIN->value,
        ]);

        Offer::factory(20)->create();

        User::factory(5)->create([
            'role' => UserRoleEnum::ANONYMOUS->value,
        ]);

        $candidateUsers = User::factory(20)->create([
            'role' => UserRoleEnum::CANDIDATE->value,
        ]);

        foreach ($candidateUsers as $user) {
            Candidate::factory()->create([
                'user_id' => $user->id
            ]);
        }

        JobPosition::factory(10)->create();

        foreach (Offer::all() as $offer) {
            $randomMaxJobPositions = random_int(2, 3);
            $jobsIds = [];
            for ($i=0; $i < $randomMaxJobPositions; $i++) {
                $jobsIds[] = JobPosition::all()->random()->id;
            }
            $offer->jobPositions()->sync($jobsIds);
        }

        foreach (JobPosition::all() as $job) {
            $randomMaxJSkills = random_int(2, 5);

            Skill::factory($randomMaxJSkills)->create([
                'job_position_id' => $job->id
            ]);
        }

       
        $activities = Activity::factory(20)->create();

        foreach (Candidate::all() as $candidate) {
            foreach ($activities as $activity) {
                Participant::factory()->create([
                    'activity_id' => $activity->id,
                    'candidate_id' => $candidate->id,
                ]);
            }
        }

        // Faq is_star = true
        Faq::factory(5)->create(['is_star' => true]);
        // Faq is_star = false
        Faq::factory(10)->create(['is_star' => false]);
    }
}
