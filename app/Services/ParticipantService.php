<?php

namespace App\Services;

use App\Models\Activity;
use App\Models\Candidate;
use App\Models\Participant;
use Illuminate\Support\Facades\DB;
use App\Enums\ParticipatedStatusEnum;
use App\Repositories\ParticipantRepository;
use App\Notifications\ParticipantNotification;

class ParticipantService
{
    /**
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedAndFiltered(int $perPage = 15)
    {
        return app(ParticipantRepository::class)->findPaginatedAndFiltered($perPage);
    }

    /**
     * @param string $id
     * @param bool $withRelation
     * @return \App\Models\Participant
     */
    public function findById(string $id, bool $withRelation = true)
    {
        return app(ParticipantRepository::class)
            ->findById($id, $withRelation);
    }

    public function findByDate(Candidate $candidate, string $year, string $month)
    {
        return app(ParticipantRepository::class)
            ->findByDate($candidate, $year, $month);
    }
  
    /**
     * @param \App\Enums\ParticipatedStatusEnum $enum
     * @param \App\Models\Participant $participant
     * @return \App\Models\Participant
     */
    public function changeStatus(ParticipatedStatusEnum $enum, Participant $participant): Participant
    {
        return DB::transaction(function () use ($enum, $participant) {
            $participant->update([
                'status'  => $enum->value,
                'participant_at' => now()
            ]);

            $participant->candidate->user->notify(
                new ParticipantNotification($participant, $enum)
            );

            return $participant;
        });
    }

    /**
     * @param \App\Models\Activity $activity
     * @param \App\Models\Candidate $candidate
     */
    public function create(Activity $activity, Candidate $candidate)
    {
        return DB::transaction(function () use ($activity, $candidate) {
            $enum =  ParticipatedStatusEnum::PENDING;


            $participant = Participant::where('activity_id', $activity->id)
                ->where('status', $enum)
                ->where('candidate_id', $candidate->id)
                ->first();  

            if ($participant) {
                return $participant;
            }

            $participant = $activity->participants()->create([
                'status'  => $enum,
                'candidate_id' => $candidate->id
            ]);

            $participant->candidate->user->notify(
                new ParticipantNotification($participant, $enum)
            );

            return $participant;
        });
    }


    /**
     * @param \App\Models\Participant $participant
     * @return bool
     */
    public function delete(Participant $participant): bool
    {
        return DB::transaction(fn() => $participant->delete());
    }
}
