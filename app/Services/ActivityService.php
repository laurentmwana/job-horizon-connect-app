<?php

namespace App\Services;

use App\Repositories\ActivityRepository;

class ActivityService
{
    /**
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedAndFiltered(int $perPage = 15)
    {
        return app(ActivityRepository::class)->findPaginatedAndFiltered($perPage);
    }

    /**
     * @param string $id
     * @param bool $withRelation
     * @return \App\Models\Activity
     */
    public function findById(string $id, bool $withRelation = true)
    {
        return app(ActivityRepository::class)
            ->findById($id, $withRelation);
    }

    /**
     * @param bool $withRelation
     */
    public function all(bool $withRelation = false)
    {
        return app(ActivityRepository::class)->all($withRelation);
    }

    /**
     * @param int $limit
     * @param bool $withRelation
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\Activity>
     */
    public function findLimit(int $limit, bool $withRelation = false)
    {
        return app(ActivityRepository::class)
            ->findLimit($limit, $withRelation);
    }
}
