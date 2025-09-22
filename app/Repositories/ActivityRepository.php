<?php

namespace App\Repositories;

use App\Models\Activity;
use App\Models\Candidate;
use Illuminate\Database\Eloquent\Builder;

class ActivityRepository
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
     * @return Activity
     */
    public function findById(string $id, bool $withRelation = false,?Candidate $candidate = null)
    {
        $builder = $this->getBaseQuery($candidate);

        if ($withRelation) {
            return  $builder->findOrFail($id);
        }

        $newBuilder = Activity::query();

        $this->getIsParticipantQuery($newBuilder, $candidate);

        return $newBuilder->findOrFail($id);
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
     * Summary of findLimit
     * @param int $limit
     * @param bool $withRelation
     * @param mixed $candidate
     * @return \Illuminate\Database\Eloquent\Collection<int, Activity>
     */
    public function findLimit (int $limit, bool $withRelation = false, ?Candidate $candidate = null)
    {
        $builder = $this->getBaseQuery($candidate);

        if ($withRelation) {
            return $builder->limit($limit)->orderByDesc('updated_at')->get();
        }
        
        $newBuilder = Activity::query()->limit($limit)->orderByDesc('updated_at');

        $this->getIsParticipantQuery($newBuilder, $candidate);

        return $newBuilder->get();
    }

    /**
     * 
     * @param mixed $candidate
     * @return \Illuminate\Database\Eloquent\Builder<Activity>
     */
    private function getBaseQuery(?Candidate $candidate = null)
    {
        $builder = Activity::query()->with(['participants']);

       $this->getIsParticipantQuery($builder, $candidate);

        return $builder;
    }

    private function getIsParticipantQuery(Builder $builder, ?Candidate $candidate = null)
    {
        if ($candidate) {
            $builder->withExists([
                'participants as is_participated' => function ($query) use ($candidate) {
                    $query->where('candidate_id', $candidate->id);
                }
            ]);
        }
    }
}
