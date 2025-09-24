<?php

namespace App\Repositories;

use App\Models\Faq;

class FaqRepository
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
     * @return Faq
     */
    public function findById(string $id)
    {
      return $this->getBaseQuery()->findOrFail($id);
    }

    /**
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection<int, Faq>
     */
    public function findLimit(int $limit)
    {
      return $this->getBaseQuery()
        ->orderByDesc('updated_at')
        ->orderBy('is_star')
        ->get();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder<Faq>
     */
    private function getBaseQuery()
    {
        return Faq::query();
    }
}
