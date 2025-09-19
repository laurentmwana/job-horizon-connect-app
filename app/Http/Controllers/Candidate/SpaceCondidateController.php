<?php

namespace App\Http\Controllers\Candidate;

use Inertia\Inertia;
use App\Models\Candidate;
use Illuminate\Http\Request;
use App\Enums\CandidacyStatusEnum;
use App\Enums\ParticipatedStatusEnum;
use App\Services\CandidacyService;
use App\Services\ParticipantService;
use App\Http\Controllers\Controller;

class SpaceCondidateController extends Controller
{
    /**
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        [$year, $month] = $this->getFilters($request);

        $user = $request->user();

        return Inertia::render('my-space/index', [
            'filters'  => ['year' => $year, 'month' => $month],
            'stats' => [
                'participants' => $this->getStatParticipants($user->candidate, $year, $month),
                'candidacies'  => $this->getStatCandidacies($user->candidate, $year, $month),
            ],
        ]);
    }

    private function getStatCandidacies(Candidate $candidate, string $year, string $month): array
    {
        return $this->countStatuses(
            app(CandidacyService::class)->findByDate($candidate, $year, $month),
            CandidacyStatusEnum::class
        );
    }

    private function getStatParticipants(Candidate $candidate, string $year, string $month): array
    {
        return $this->countStatuses(
            app(ParticipantService::class)->findByDate($candidate, $year, $month),
            ParticipatedStatusEnum::class
        );
    }


    private function countStatuses(iterable $items, string $enumClass): array
    {
        $accepted = $refused = $pending = 0;

        foreach ($items as $item) {
            if ($item->status === $enumClass::ACCEPTED) {
                $accepted++;
            } elseif ($item->status === $enumClass::REFUSED) {
                $refused++;
            } elseif ($item->status === $enumClass::PENDING) {
                $pending++;
            }
        }

        return compact('pending', 'refused', 'accepted');
    }

  
    private function getFilters(Request $request): array
    {
        $year = (string) $request->query('year', now()->format('Y'));
        $month = (string) $request->query('month', now()->format('m'));

        if (!preg_match('/^\d{4}$/', $year)) {
            $year = now()->format('Y');
        }

        if (!preg_match('/^(0[1-9]|1[0-2])$/', $month)) {
            $month = now()->format('m');
        }

        return [$year, $month];
    }
}
