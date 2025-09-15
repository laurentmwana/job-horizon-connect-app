<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Offer;
use App\Models\Activity;
use App\Models\Candidacy;
use App\Models\Candidate;
use Illuminate\Http\Request;
use App\Enums\CandidacyStatusEnum;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{

    public function index(Request $request)
    {
        return Inertia::render("dashboard", [
            'countOffers' => Offer::query()->count('id'),
            'countCandidates' => Candidate::query()->count('id'),
            'countActivities' => Activity::query()->count('id'),
            'stats' => $this->getStats(),
        ]);
    }

    private function getStats()
    {
        $offerLast = Offer::query()
            ->orderByDesc('created_at')->first();

        if (!($offerLast instanceof Offer)) {
            return [
                'total' => 0,
                'validated' => 0,
                'novalidated' => 0,
            ];
        }

        $total = Candidacy::query()->count();
        $novalided = Candidacy::query()->where('status', CandidacyStatusEnum::REFUSED->value)->count();
        $validated = Candidacy::query()->where('status', CandidacyStatusEnum::ACCEPTED->value)->count();

        return compact('total', 'novalided', 'validated');
    }
}
