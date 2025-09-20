<?php

namespace App\Services;

use App\Dto\ActivityDto;
use App\Models\Activity;
use App\Models\Candidate;
use Illuminate\Support\Str;
use App\Helpers\StringHelper;
use Illuminate\Support\Facades\DB;
use App\Repositories\ActivityRepository;

class ActivityService
{
    private const DIRECTORY_IMAGE = "activities";

    /**
     * @param \App\Services\FileUploadService $uploader
     */
    public function __construct(private FileUploadService $uploader)
    {
    }


    /**
     * @param int $perPage
     * @param mixed $candidate
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedAndFiltered(int $perPage = 15, ?Candidate $candidate = null)
    {
        return app(ActivityRepository::class)
            ->findPaginatedAndFiltered($perPage, $candidate);
    }


    /**
     * Summary of findById
     * @param string $id
     * @param bool $withRelation
     * @param Candidate|null $candidate
     * @return Activity
     */
    public function findById(string $id, bool $withRelation = true, ?Candidate $candidate = null)
    {
        return app(ActivityRepository::class)
            ->findById($id, $withRelation, $candidate);
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
     * @param mixed $candidate
     * @return \Illuminate\Database\Eloquent\Collection<int, Activity>
     */
    public function findLimit(int $limit, bool $withRelation = false, ?Candidate $candidate = null)
    {
        return app(ActivityRepository::class)
            ->findLimit($limit, $withRelation, $candidate);
    }

    /**
     * @param \App\Dto\ActivityDto $dto
     * @return \App\Models\Activity
     */
    public function create(ActivityDto $dto): Activity
    {
        return DB::transaction(function () use ($dto) {
            $newImage = null;

            if ($dto->image) {
                $newImage = $this->uploader->create($dto->image, self::DIRECTORY_IMAGE);
            }

            $activity = Activity::create([
                'title'       => $dto->title,
                'description' => $dto->description,
                'type'        => $dto->type,
                'start_at'    => $dto->startAt,
                'end_at'      => $dto->endAt,
                'content'     =>  StringHelper::markdown($dto->content),
                'image'       => $newImage,
            ]);

            return $activity;
        });
    }

    /**
     *
     * @param \App\Models\Activity $activity
     * @param \App\Dto\ActivityDto $dto
     * @return \App\Models\Activity
     */
    public function update(Activity $activity, ActivityDto $dto): Activity
    {
        return DB::transaction(function () use ($activity, $dto) {
            $newImage = $this->uploader->update(
                $dto->image,
                self::DIRECTORY_IMAGE,
                $activity->image,
            );

            $newData = [
                'title'       => $dto->title,
                'description' => $dto->description,
                'type'        => $dto->type,
                'start_at'    => $dto->startAt,
                'end_at'      => $dto->endAt,
                'content'     =>  StringHelper::markdown($dto->content),
                'image'       => $newImage,
            ];

            $activity->update($newData);

            return $activity;
        });
    }

    /**
     *
     * @param \App\Models\Activity $activity
     * @return bool
     */
    public function delete(Activity $activity): bool
    {
        return DB::transaction(function () use ($activity) {
            $isDeleted = $activity->delete();

            if ($isDeleted) {
                $this->uploader->delete($activity->image);
            }

            return $isDeleted;
        });
    }
}
