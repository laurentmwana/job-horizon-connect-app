<?php

namespace App\Services;

use App\Dto\JobPositionDto;
use App\Models\JobPosition;
use Illuminate\Support\Facades\DB;
use App\Repositories\JobPositionRepository;

class JobPositionService
{

    /**
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedAndFiltered(int $perPage = 15)
    {
        return app(JobPositionRepository::class)->findPaginatedAndFiltered($perPage);
    }


    /**
     * @param string $id
     * @param bool $withRelation
     * @return \App\Models\JobPosition
     */
    public function findById(string $id, bool $withRelation = true)
    {
        return app(JobPositionRepository::class)
            ->findById($id, $withRelation);
    }

    /**
     * @param \App\Dto\JobPositionDto $dto
     * @return \App\Models\JobPosition
     */
    public function create(JobPositionDto $dto): JobPosition
    {
        return DB::transaction(function () use ($dto) {
            $job = JobPosition::create([
                'name'       => $dto->name,
                'description' => $dto->description,
            ]);

            return $job;
        });
    }


    /**
     * @param \App\Models\JobPosition $job
     * @param \App\Dto\JobPositionDto $dto
     * @return \App\Models\JobPosition
     */
    public function update(JobPosition $job, JobPositionDto $dto): JobPosition
    {
        return DB::transaction(function () use ($job, $dto) {
            $newData = [
                'name'       => $dto->name,
                'description' => $dto->description,
            ];

            $job->update($newData);

            return $job;
        });
    }

    /**
     * @param \App\Models\JobPosition $job
     * @return bool
     */
    public function delete(JobPosition $job): bool
    {
        return DB::transaction(fn() => $job->delete());
    }
}
