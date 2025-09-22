<?php

namespace App\Services;

use App\Models\Candidate;
use App\Models\Candidacy;
use App\Notifications\CandidacyNotification;
use App\Enums\CandidacyStatusEnum;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Repositories\CandidacyRepository;

class CandidacyService
{
    /**
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedAndFiltered(int $perPage = 15)
    {
        return app(CandidacyRepository::class)
            ->findPaginatedAndFiltered($perPage);
    }


    /**
     * @param string $id
     * @param bool $withRelation
     * @return \App\Models\Candidacy
     */
    public function findById(string $id, bool $withRelation = true)
    {
        return app(CandidacyRepository::class)
            ->findById($id, $withRelation);
    }

    /**
     * @param \App\Models\Candidate $candidate
     * @param string $year
     * @param string $month
     * @return \Illuminate\Database\Eloquent\Collection<int, Candidacy>
     */
    public function findByDate(Candidate $candidate, string $year, string $month)
    {
        return app(CandidacyRepository::class)
            ->findByDate($candidate, $year, $month);
    }
  
    /**
     * @param \App\Enums\CandidacyStatusEnum $enum
     * @param \App\Models\Candidacy $candidacy
     * @return \App\Models\Candidacy
     */
    public function changeStatus(CandidacyStatusEnum $enum, Candidacy $candidacy): Candidacy
    {
        return DB::transaction(function () use ($enum, $candidacy) {
            $candidacy->update([
                'status'  => $enum->value,
                'candidacy_at' => now()
            ]);

            $candidacy->candidate->user->notify(
                new CandidacyNotification($candidacy, $enum)
            );

            return $candidacy;
        });
    }


    /**
     * @param \App\Models\Candidacy $candidacy
     * @return bool
     */
    public function delete(Candidacy $candidacy): bool
    {
        return DB::transaction(fn() => $candidacy->delete());
    }
}
