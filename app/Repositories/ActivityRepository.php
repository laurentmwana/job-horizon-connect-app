<?php

namespace App\Repositories;

use App\Models\Activity;

class ActivityRepository
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
     * @return Activity
     */
    public function findById(string $id, bool $withRelation = false)
    {
        $builder = $this->getBaseQuery();

        return $withRelation ? $builder->findOrFail($id) : Activity::findOrFail($id);
    }

    /**
     * @param bool $withRelation
     * @return \Illuminate\Database\Eloquent\Collection<int, Activity>
     */
    public function all(bool $withRelation = false)
    {
        $builder = $this->getBaseQuery();

        return $withRelation ? $builder->get() : Activity::all();
    }

    /**
     * @param int $limit
     * @param bool $withRelation
     * @return \Illuminate\Database\Eloquent\Collection<int, Activity>
     */
    public function findLimit (int $limit, bool $withRelation = false)
    {
        $builder = $this->getBaseQuery();

        return $withRelation
            ? $builder->limit($limit)->orderByDesc('updated_at')->get()
            : Activity::query()->limit($limit)->orderByDesc('updated_at')->get();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder<Activity>
     */
    private function getBaseQuery()
    {
        return Activity::query()
            ->with(['participants']);
    }
}
