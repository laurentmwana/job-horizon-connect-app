<?php

namespace App\Services;

use App\Dto\SkillDto;
use App\Models\Skill;
use Illuminate\Support\Facades\DB;
use App\Repositories\SkillRepository;

class SkillService
{
    /**
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedAndFiltered(int $perPage = 15)
    {
        return app(SkillRepository::class)->findPaginatedAndFiltered($perPage);
    }


    /**
     * @param string $id
     * @param bool $withRelation
     * @return \App\Models\Skill
     */
    public function findById(string $id, bool $withRelation = true)
    {
        return app(SkillRepository::class)
            ->findById($id, $withRelation);
    }

    /**
     * @param \App\Dto\SkillDto $dto
     * @return \App\Models\JobPosition
     */
    public function create(SkillDto $dto): Skill
    {
        return DB::transaction(function () use ($dto) {
            $skill = Skill::create([
                'name'       => $dto->name,
                'description' => $dto->description,
                'job_position_id' => $dto->jobPositionId,
            ]);

            return $skill;
        });
    }


    /**
     * @param \App\Models\Skill $Skill
     * @param \App\Dto\SkillDto $dto
     * @return \App\Models\Skill
     */
    public function update(Skill $skill, SkillDto $dto): Skill
    {
        return DB::transaction(function () use ($skill, $dto) {
            $newData = [
                'name'       => $dto->name,
                'description' => $dto->description,
                'job_position_id' => $dto->jobPositionId,
            ];

            $skill->update($newData);

            return $skill;
        });
    }

    /**
     * @param \App\Models\Skill $skill
     * @return bool
     */
    public function delete(Skill $skill): bool
    {
        return DB::transaction(fn() => $skill->delete());
    }
}
