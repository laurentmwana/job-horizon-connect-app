<?php

namespace Database\Seeders;

use App\Enums\UserRoleEnum;
use App\Models\User;
use App\Models\Offer;
use App\Models\Skill;
use App\Models\Activity;
use App\Models\Candidacy;
use App\Models\Candidate;
use App\Models\Recruiter;
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

        $recruiterUsers = User::factory(20)->create([
            'role' => UserRoleEnum::ANONYMOUS->value,
        ]);

        foreach ($recruiterUsers as $user) {
            Recruiter::factory()->create([
                'user_id' => $user->id
            ]);
        }

        $candidateUsers = User::factory(20)->create([
            'role' => UserRoleEnum::ANONYMOUS->value,
        ]);

        foreach ($candidateUsers as $user) {
            Candidate::factory()->create([
                'user_id' => $user->id
            ]);
        }

        foreach (Recruiter::all() as $recruiter) {
            Offer::factory(2)->create([
                'recruiter_id' => $recruiter->id
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

        foreach (Offer::all() as $offer) {
            foreach (Candidate::all() as $candidate) {
                Candidacy::factory()->create([
                    'offer_id' => $offer->id,
                    'candidate_id' => $candidate->id
                ]);
            }
        }
        $activities = Activity::factory(20)->create();

        foreach ($activities as $activity) {
            Participant::factory(30)->create([
                'activity_id' => $activity->id,
            ]);
        }
    }
}
