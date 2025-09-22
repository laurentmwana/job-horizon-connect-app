<?php

namespace App\Services;

use App\Models\User;
use App\Models\Offer;
use App\Models\Candidacy;
use App\Models\Candidate;
use App\Dto\CandidacyAppliedDto;
use App\Enums\CandidacyStatusEnum;
use Illuminate\Support\Facades\DB;
use App\Repositories\CandidacyRepository;
use App\Notifications\CandidacyNotification;

class CandidacyService
{
    private const DIRECTORY_IMAGE_PATH = "candidacy/cv";

    /**
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedAndFiltered(int $perPage = 15)
    {
        return app(CandidacyRepository::class)
            ->findPaginatedAndFiltered($perPage);
    }

    /**
     * @param string $candidateId
     * @param string $pageName
     * @param int $perPage
     * @return \Illuminate\Pagination\LengthAwarePaginator
     */
    public function findPaginatedByCandidate(string $candidateId, string $year, string $month, string $pageName = 'page', int $perPage = 15)
    {
        return app(CandidacyRepository::class)
            ->findPaginatedByCandidate($candidateId, $year, $month, $pageName, $perPage);
    }


    /**
     * @param string $id
     * @param bool $withRelation
     * @return \App\Models\Candidacy
     */
    public function findById(string $id, bool $withRelation = true)
    {
        return app(CandidacyRepository::class)
            ->findById($id, $withRelation);
    }

    /**
     * @param \App\Models\Candidate $candidate
     * @param string $year
     * @param string $month
     * @return \Illuminate\Database\Eloquent\Collection<int, Candidacy>
     */
    public function findByDate(Candidate $candidate, string $year, string $month)
    {
        return app(CandidacyRepository::class)
            ->findByDate($candidate, $year, $month);
    }

    /**
     * @param \App\Enums\CandidacyStatusEnum $enum
     * @param \App\Models\Candidacy $candidacy
     * @return \App\Models\Candidacy
     */
    public function changeStatus(CandidacyStatusEnum $enum, Candidacy $candidacy): Candidacy
    {
        return DB::transaction(function () use ($enum, $candidacy) {
            $candidacy->update([
                'status'  => $enum->value,
                'candidacy_at' => now()
            ]);

            $notification = new CandidacyNotification(
                $candidacy, 
                $candidacy->candidate, 
                $candidacy->offer, 
                $enum
            );

            $candidacy->candidate->user->notify($notification);

            return $candidacy;
        });
    }

    /**
     * @param \App\Models\Offer $offer
     * @param \App\Models\User $user
     * @param \App\Dto\CandidacyAppliedDto $dto
     */
    public function create(Offer $offer, User $user, CandidacyAppliedDto $dto)
    {
        return DB::transaction(function () use ($offer, $user, $dto) {
            $enum =  CandidacyStatusEnum::PENDING;
            $candidate = $user->candidate;

            $candidacy = Candidacy::where('offer_id', $offer->id)
                ->where('status', $enum)
                ->where('candidate_id', $candidate->id)
                ->first();

            if ($candidacy) return $candidacy;

            $newFile =  app(FileUploadService::class)
                ->create($dto->cvPath, self::DIRECTORY_IMAGE_PATH);

            $candidacy = $offer->candidacies()->create([
                'status'  => $enum,
                'candidate_id' => $candidate->id,
                'cv_path' => $newFile
            ]);

            $notification = new CandidacyNotification(
                $candidacy, 
                $candidate, 
                $offer, 
                $enum
            );

            $user->notify($notification);

            return $candidacy;
        });
    }


    /**
     * @param \App\Models\Candidacy $candidacy
     * @return bool
     */
    public function delete(Candidacy $candidacy): bool
    {
        return DB::transaction(fn() => $candidacy->delete());
    }
}
