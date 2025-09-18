<?php

namespace App\Services;

use App\Models\Participant;
use App\Notifications\ParticipantNotification;
use App\Enums\ParticipatedStatusEnum;
use Illuminate\Support\Facades\DB;
use App\Repositories\ParticipantRepository;

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
     * @param \App\Models\Participant $participant
     * @return bool
     */
    public function delete(Participant $participant): bool
    {
        return DB::transaction(fn() => $participant->delete());
    }
}
