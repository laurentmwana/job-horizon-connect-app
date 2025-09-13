<?php

namespace App\Http\Controllers\Offer;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\OfferService;
use App\Http\Controllers\Controller;

class OfferController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $perPage = $request->query->getInt('per_page', 15);

        $offers = app(OfferService::class)
            ->findPaginatedAndFiltered($perPage <= 0 ? 15 : $perPage);

        return Inertia::render('offer/index', [
            'offers' => $offers,
        ]);
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function show(string $id)
    {
        $offer = app(OfferService::class)->findById($id);

        return Inertia::render('offer/show', [
            'offer' => $offer,
        ]);
    }
}
