<?php

namespace App\Repositories;

use App\Models\Candidate;
use App\Models\Participant;

class ParticipantRepository
{
    /**
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedAndFiltered(int $perPage)
    {
        $builder = $this->getBaseQuery();

        return $builder->orderByDesc('updated_at')
            ->paginate($perPage);
    }

    /**
     * @param string $id
     * @param bool $withRelation
     * @return Participant
     */
    public function findById(string $id, bool $withRelation = false)
    {
        $builder = $this->getBaseQuery();

        return $withRelation ? $builder->findOrFail($id) : Participant::findOrFail($id);
    }


    /**
     * @param \App\Models\Candidate $candidate
     * @param string $year
     * @param string $month
     * @return \Illuminate\Database\Eloquent\Collection<int, Participant>
     */
    public function findByDate(Candidate $candidate, string $year, string $month)
    {
        return Participant::query()
            ->where('candidate_id', $candidate->id)
            ->whereLike("created_at", "%$year-$month%")
            ->get();
    }


    /**
     * @return \Illuminate\Database\Eloquent\Builder<Participant>
     */
    private function getBaseQuery()
    {
        return Participant::query()->with(['activity', 'candidate', 'candidate.user']);
    }
}
