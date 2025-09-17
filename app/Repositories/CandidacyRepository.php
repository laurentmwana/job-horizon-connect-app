<?php

namespace App\Repositories;

use App\Models\Candidacy;

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
