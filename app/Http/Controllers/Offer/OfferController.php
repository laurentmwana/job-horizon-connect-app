<?php

namespace App\Http\Controllers\Offer;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\OfferService;
use App\Services\CandidacyService;
use App\Http\Controllers\Controller;
use App\Services\ParticipantService;
use App\Http\Requests\CandidacyAppliedRequest;

class OfferController extends Controller
{
    /**
     * @return \Inertia\Response
     */
    public function index()
    {
        $offers = app(OfferService::class)->findPaginatedAndFiltered();

        return Inertia::render('offer/index', [
            'offers' => $offers,
        ]);
    }


    /**
     * Summary of show
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Inertia\Response
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();

        $offer = app(OfferService::class)
            ->findById($id, candidate: $user->candidate);

        return Inertia::render('offer/show', [
            'offer' => $offer,
        ]);
    }

    public function applied(CandidacyAppliedRequest $request, string $id)
    {
        $user = $request->user();

        $offer = app(OfferService::class)->findById($id, false);

        app(CandidacyService::class)
            ->create($offer, $user, $request->toDto());

        return redirect()->route('offer.show', ['id' => $offer->id])
            ->with('success', "votre candidature a  été envoyé avec succès.");
    }
}
