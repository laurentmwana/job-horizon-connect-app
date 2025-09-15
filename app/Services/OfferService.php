<?php

namespace App\Services;

use App\Dto\OfferDto;
use App\Models\Offer;
use App\Helpers\StringHelper;
use Illuminate\Support\Facades\DB;
use App\Repositories\OfferRepository;

class OfferService
{
    private const DIRECTORY_IMAGE = "offers";

    /**
     * @param \App\Services\FileUploadService $uploader
     */
    public function __construct(private FileUploadService $uploader) {}

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

    
    /**
     * @param \App\Dto\OfferDto $dto
     * @return \App\Models\Offer
     */
    public function create(OfferDto $dto): Offer
    {
        return DB::transaction(function () use ($dto) {
            $newImage = null;

            if ($dto->image) {
                $newImage = $this->uploader->create($dto->image, self::DIRECTORY_IMAGE);
            }

            $offer = Offer::create([
                'name'       => $dto->name,
                'bio' => $dto->bio,
                'start_at'    => $dto->startAt,
                'end_at'      => $dto->endAt,
                'description'     =>  StringHelper::markdown($dto->description),
                'image'       => $newImage,
            ]);

            $offer->jobPositions()->sync($dto->jobPositions);

            return $offer;
        });
    }

    /**
     *
     * @param \App\Models\Offer $offer
     * @param \App\Dto\OfferDto $dto
     * @return \App\Models\Offer
     */
    public function update(Offer $offer, OfferDto $dto): Offer
    {
        return DB::transaction(function () use ($offer, $dto) {
            $newImage = $this->uploader->update(
                $dto->image,
                self::DIRECTORY_IMAGE,
                $offer->image,
            );

            $newData = [
                'name'       => $dto->name,
                'bio' => $dto->bio,
                'start_at'    => $dto->startAt,
                'end_at'      => $dto->endAt,
                'description'     =>  StringHelper::markdown($dto->description),
                'image'       => $newImage,
            ];

            $offer->update($newData);

            $offer->jobPositions()->sync($dto->jobPositions);

            return $offer;
        });
    }

    /**
     *
     * @param \App\Models\Offer $offer
     * @return bool
     */
    public function delete(Offer $offer): bool
    {
        return DB::transaction(function () use ($offer) {
            $isDeleted = $offer->delete();

            if ($isDeleted) {
                $this->uploader->delete($offer->image);
            }

            return $isDeleted;
        });
    }
}
