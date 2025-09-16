<?php

namespace App\Repositories;

use App\Models\Candidate;

class CandidateRepository
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
     * @return Candidate
     */
    public function findById(string $id, bool $withRelation = false)
    {
        $builder = $this->getBaseQuery();

        return $withRelation ? $builder->findOrFail($id) : Candidate::findOrFail($id);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder<Candidate>
     */
    private function getBaseQuery()
    {
        return Candidate::query()->with(['user']);
    }
}
