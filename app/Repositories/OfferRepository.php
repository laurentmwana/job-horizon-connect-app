<?php

namespace App\Repositories;

use App\Models\Offer;
use App\Models\Candidate;
use Illuminate\Database\Eloquent\Builder;


class OfferRepository
{

    public function findPaginatedAndFiltered(int $perPage, ?Candidate $candidate = null)
    {
        $builder = $this->getBaseQuery($candidate);

        return $builder->orderByDesc('updated_at')
            ->paginate($perPage);
    }


    /**
     * @param string $id
     * @param bool $withRelation
     * @param mixed $candidate
     * @return Offer
     */
    public function findById(string $id, bool $withRelation = false, ?Candidate $candidate = null)
    {
        $builder = $this->getBaseQuery($candidate);

        if ($withRelation) {
            return $builder->findOrFail($id);
        }

        $newBuilder = Offer::query();

        $this->isApplied($newBuilder, $candidate);

        return $newBuilder->findOrFail($id);
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


    public function findLimit (int $limit, bool $withRelation = false, ?Candidate $candidate = null)
    {
        $builder = $this->getBaseQuery($candidate);

        if ($withRelation) {
            return $builder->limit($limit)->get();
        }

        $newBuilder = Offer::query()->limit($limit);

        $this->isApplied($newBuilder, $candidate);

        return $newBuilder->get();
    }


    /**
     * @param mixed $candidate
     * @return Builder<Offer>
     */
    private function getBaseQuery(?Candidate $candidate = null)
    {
        $builder =  Offer::query()->with(['jobPositions', 'jobPositions.skills']);

        $this->isApplied($builder, $candidate);

        return $builder;
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder $builder
     * @param mixed $candidate
     * @return void
     */
    private function isApplied(Builder $builder, ?Candidate $candidate = null)
    {
        if ($candidate) {
            $builder->withExists([
                'candidacies as is_applied' => function ($query) use ($candidate) {
                    $query->where('candidate_id', $candidate->id);
                }
            ]);
        }
    }
}
