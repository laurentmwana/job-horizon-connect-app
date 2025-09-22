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
     * @param string $candidateId
     * @param string $year
     * @param string $month
     * @param string $pageName
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedByCandidate(string $candidateId, string $year, string $month, string $pageName = 'page', int $perPage = 10)
    {
        $builder = Participant::query()->with(['activity']);

        return $builder->orderByDesc('updated_at')
            ->where('candidate_id', $candidateId)
            ->whereLike("created_at", "%$year-$month%")
            ->paginate($perPage, pageName: $pageName);
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
