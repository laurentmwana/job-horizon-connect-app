<?php

namespace App\Repositories;

use App\Models\Offer;

class OfferRepository
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
     * @return Offer
     */
    public function findById(string $id, bool $withRelation = false)
    {
        $builder = $this->getBaseQuery();

        return $withRelation ? $builder->findOrFail($id) : Offer::findOrFail($id);
    }

    /**
     * @param bool $withRelation
     * @return \Illuminate\Database\Eloquent\Collection<int, Offer>
     */
    public function all(bool $withRelation = false)
    {
        $builder = $this->getBaseQuery();

        return $withRelation ? $builder->get() : Offer::all();
    }


    public function findLimit (int $limit, bool $withRelation = false)
    {
        $builder = $this->getBaseQuery();
 
        return $withRelation
            ? $builder->limit($limit)->get()
            : Offer::query()->limit($limit)->get();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder<Offer>
     */
    private function getBaseQuery()
    {
        return Offer::query();
    }
}
