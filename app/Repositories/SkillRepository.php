<?php

namespace App\Repositories;

use App\Models\Skill;

class SkillRepository
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
     * @return Skill
     */
    public function findById(string $id, bool $withRelation = false)
    {
        $builder = $this->getBaseQuery();

        return $withRelation ? $builder->findOrFail($id) : Skill::findOrFail($id);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder<Skill>
     */
    private function getBaseQuery()
    {
        return Skill::query()->with(['jobPosition']);
    }
}
