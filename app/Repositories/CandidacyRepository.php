<?php

namespace App\Repositories;

use App\Models\Candidacy;
use App\Models\Candidate;

class CandidacyRepository
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
        $builder = Candidacy::query()->with(['offer']);

        return $builder->orderByDesc('updated_at')
            ->where('candidate_id', $candidateId)
            ->whereLike("created_at", "%$year-$month%")
            ->paginate($perPage, pageName: $pageName);
    }

    /**
     * @param Candidate $candidate
     * @param string $year
     * @param string $month
     * @return \Illuminate\Database\Eloquent\Collection<int, Candidacy>
     */
    public function findByDate(Candidate $candidate, string $year, string $month)
    {
        return Candidacy::query()
            ->where('candidate_id', $candidate->id)
            ->whereLike("created_at", "%$year-$month%")
            ->get();
    }

    /**
     * @param string $id
     * @param bool $withRelation
     * @return Candidacy
     */
    public function findById(string $id, bool $withRelation = false)
    {
        $builder = $this->getBaseQuery();

        return $withRelation ? $builder->findOrFail($id) : Candidacy::findOrFail($id);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder<Candidacy>
     */
    private function getBaseQuery()
    {
        return Candidacy::query()->with(['offer', 'candidate', 'candidate.user']);
    }
}
