<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\OfferService;

class WelcomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $offers = app(OfferService::class)->findLimit(6);

        return Inertia::render('welcome', [
            'offers' => $offers,
        ]);
    }
}
