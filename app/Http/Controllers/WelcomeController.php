<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\OfferService;
use App\Services\ActivityService;

class WelcomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = $request->user();
        $candidate = $user ? $user->candidate : null;

        $offers = app(OfferService::class)->findLimit(6, candidate: $candidate);
        $activities = app(ActivityService::class)->findLimit(8, candidate: $candidate);
 
        return Inertia::render('welcome', [
            'offers' => $offers,
            'activities' => $activities,
        ]);
    }
}
