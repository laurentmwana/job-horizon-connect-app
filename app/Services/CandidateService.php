<?php

namespace App\Services;

use App\Dto\CandidateDto;
use App\Models\Candidate;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Repositories\CandidateRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CandidateService
{
    /**
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedAndFiltered(int $perPage = 15)
    {
        return app(CandidateRepository::class)->findPaginatedAndFiltered($perPage);
    }


    /**
     * @param string $id
     * @param bool $withRelation
     * @return \App\Models\Candidate
     */
    public function findById(string $id, bool $withRelation = true)
    {
        return app(CandidateRepository::class)
            ->findById($id, $withRelation);
    }

    /**
     * @param \App\Dto\CandidateDto $dto
     * @return \App\Models\JobPosition
     */
    public function create(CandidateDto $dto): Candidate
    {
        return DB::transaction(function () use ($dto) {
            $user = User::create([
                'name' => Str::random(10),
                'email' => $dto->email,
                'password' => Hash::make("12345789")
            ]);

            $candidate = Candidate::create([
                'name'       => $dto->name,
                'firstname' => $dto->firstname,
                'phone' => $dto->phone,
                'gender' => $dto->gender,
                'user_id' => $user->id,
            ]);

            return $candidate;
        });
    }


    /**
     * @param \App\Models\Candidate $candidate
     * @param \App\Dto\CandidateDto $dto
     * @return \App\Models\Candidate
     */
    public function update(Candidate $candidate, CandidateDto $dto): Candidate
    {
        return DB::transaction(function () use ($candidate, $dto) {
            $newData = [
                'name'       => $dto->name,
                'firstname' => $dto->firstname,
                'phone' => $dto->phone,
                'gender' => $dto->gender,
            ];

            $candidate->update($newData);

            return $candidate;
        });
    }

    /**
     * @param \App\Models\Candidate $candidate
     * @return bool
     */
    public function delete(Candidate $candidate): bool
    {
        return DB::transaction(fn() => $candidate->delete());
    }
}
