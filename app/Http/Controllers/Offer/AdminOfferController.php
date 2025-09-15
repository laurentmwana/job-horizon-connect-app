<?php

namespace App\Http\Controllers\Offer;

use App\Services\OfferService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\OfferRequest;

class AdminOfferController extends Controller
{
    /**
     * @param \App\Services\OfferService $OfferService
     */
    public function __construct(private OfferService $OfferService)
    {
    }

    /**
     * @return \Inertia\Response
     */
    public function index()
    {
        $offers = $this->OfferService->findPaginatedAndFiltered();

        return Inertia::render('admin/offer/index', [
            'offers' => $offers,
        ]);
    }


    /**
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('admin/offer/create');
    }

    /**
     * @param \App\Http\Requests\OfferRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(OfferRequest $request)
    {
        $this->OfferService->create($request->toDto());

        return redirect()->route('admin.offer.index')->with('success', 'offre créée');
    }

    public function show(string $id)
    {
        $offer = $this->OfferService->findById($id);
        
        return Inertia::render('admin/offer/show', [
            'offer' => $offer,
        ]);
    }


    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function edit(string $id)
    {
        $offer = $this->OfferService->findById($id);
        
        return Inertia::render('admin/offer/edit', [
            'offer' => $offer,
        ]);
    }

    /**
     * @param \App\Http\Requests\OfferRequest $request
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(OfferRequest $request, string $id)
    {
        $offer = $this->OfferService->findById($id, false);

        $this->OfferService->update($offer, $request->toDto());

        return redirect()->route('admin.offer.index')
            ->with('success', 'offre editiée');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, string $id)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]); 

        $offer = $this->OfferService->findById($id, false);

        $this->OfferService->delete($offer);

        return redirect()->route('admin.offer.index')
            ->with('success', 'offre supprimée');
    }
}
