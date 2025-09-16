<?php

namespace App\Repositories;

use App\Models\JobPosition;

class JobPositionRepository
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
     * @return JobPosition
     */
    public function findById(string $id, bool $withRelation = false)
    {
        $builder = $this->getBaseQuery();

        return $withRelation ? $builder->findOrFail($id) : JobPosition::findOrFail($id);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder<JobPosition>
     */
    private function getBaseQuery()
    {
        return JobPosition::query()
            ->with(['skills', 'offers']);
    }
}
