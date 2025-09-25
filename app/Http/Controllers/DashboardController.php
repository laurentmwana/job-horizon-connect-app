<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Offer;
use App\Models\Activity;
use App\Models\Candidate;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $year = $request->query('year', now()->year);

        // Vérification : année valide (entier, 4 chiffres, pas dans le futur)
        if (!ctype_digit((string) $year) || strlen($year) !== 4 || $year > now()->year) {
            $year = now()->year;
        }

        return Inertia::render('dashboard', [
            'counter' => $this->getCounters(),
            'stats'   => $this->getStats((int) $year),
        ]);
    }

    private function getCounters(): array
    {
        return [
            'countOffers'     => Offer::query()->count('id'),
            'countCandidates' => Candidate::query()->count('id'),
            'countActivities' => Activity::query()->count('id'),
        ];
    }

    private function getStats(int $year): array
    {
        return [
            'years'     => $this->getIntervalYears(),
            'chartData' => $this->getStatYears($year),
        ];
    }

    private function getStatYears(int $year = null)
    {
        $year = $year ?? now()->year;
        $stats = [];

        for ($month = 1; $month <= 12; $month++) {
            $date = sprintf('%04d-%02d', $year, $month);
            $stats[$date] = [
                'month'       => $date,
                'candidacies' => 0,
                'participants'=> 0,
            ];
        }

        // Stats des offres groupées par mois
        $offerStats = Offer::query()
            ->selectRaw('DATE_FORMAT(offers.created_at, "%Y-%m") as month, COUNT(candidacies.id) as candidacies_count')
            ->leftJoin('candidacies', 'offers.id', '=', 'candidacies.offer_id')
            ->whereYear('offers.created_at', $year)
            ->groupBy('month')
            ->pluck('candidacies_count', 'month');

        $activityStats = Activity::query()
            ->selectRaw('DATE_FORMAT(activities.created_at, "%Y-%m") as month, COUNT(participants.id) as participants_count')
            ->leftJoin('participants', 'activities.id', '=', 'participants.activity_id')
            ->whereYear('activities.created_at', $year)
            ->groupBy('month')
            ->pluck('participants_count', 'month');

        foreach ($offerStats as $month => $count) {
            $stats[$month]['candidacies'] = $count;
        }

        foreach ($activityStats as $month => $count) {
            $stats[$month]['participants'] = $count;
        }

        return collect($stats)->values();
    }

    private function getIntervalYears(): array
    {
        $years = [];
        $currentYear = (int) date('Y');

        for ($i = 0; $i < 4; $i++) {
            $years[] = $currentYear - $i;
        }

        return $years;
    }
}
