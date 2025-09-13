<?php

namespace App\Services;

use App\Repositories\OfferRepository;

class OfferService
{
    /**
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedAndFiltered(int $perPage = 15)
    {
        return app(OfferRepository::class)->findPaginatedAndFiltered($perPage);
    }

    /**
     * @param string $id
     * @param bool $withRelation
     * @return \App\Models\Offer
     */
    public function findById(string $id, bool $withRelation = true)
    {
        return app(OfferRepository::class)
            ->findById($id, $withRelation);
    }

    /**
     * @param bool $withRelation
     */
    public function all(bool $withRelation = false)
    {
        return app(OfferRepository::class)->all($withRelation);
    }

    /**
     * @param int $limit
     * @param bool $withRelation
     * @return \Illuminate\Database\Eloquent\Collection<int, \App\Models\Offer>
     */
    public function findLimit(int $limit, bool $withRelation = false)
    {
        return app(OfferRepository::class)
            ->findLimit($limit, $withRelation);
    }
}
