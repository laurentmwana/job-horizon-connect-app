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
        $offers = app(OfferService::class)->findLimit(6);
        $activities = app(ActivityService::class)->findLimit(8);

        return Inertia::render('welcome', [
            'offers' => $offers,
            'activities' => $activities,
        ]);
    }
}
