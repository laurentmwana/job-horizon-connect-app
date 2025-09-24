<?php

namespace App\Services;

use App\Dto\FaqDto;
use App\Models\Faq;
use Illuminate\Support\Facades\DB;
use App\Repositories\FaqRepository;

class FaqService
{
    /**
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedAndFiltered(int $perPage = 15)
    {
        return app(FaqRepository::class)->findPaginatedAndFiltered($perPage);
    }

    /**
     * @param string $id
     * @return \App\Models\Faq
     */
    public function findById(string $id)
    {
        return app(FaqRepository::class)->findById($id);
    }

    /**
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection<int, Faq>
     */
    public function findLimit(int $limit = 10)
    {
        return app(FaqRepository::class)->findLimit($limit);
    }

    /**
     * @param \App\Dto\FaqDto $dto
     * @return \App\Models\Faq
     */
    public function create(FaqDto $dto): Faq
    {
        return DB::transaction(function () use ($dto) {
            $faq = Faq::create([
                'question'       => $dto->question,
                'answer' => $dto->answer,
                'is_star' => $dto->isStar,
            ]);

            return $faq;
        });
    }


    /**
     * @param \App\Models\Faq $faq
     * @param \App\Dto\FaqDto $dto
     * @return \App\Models\Faq
     */
    public function update(Faq $faq, FaqDto $dto): Faq
    {
        return DB::transaction(function () use ($faq, $dto) {
            $newData = [
                'question'       => $dto->question,
                'answer' => $dto->answer,
                'is_star' => $dto->isStar,
            ];

            $faq->update($newData);

            return $faq;
        });
    }

    /**
     * @param \App\Models\Faq $faq
     * @return bool
     */
    public function delete(Faq $faq): bool
    {
        return DB::transaction(fn() => $faq->delete());
    }
}
