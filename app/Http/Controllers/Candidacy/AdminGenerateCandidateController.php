<?php

namespace App\Http\Controllers\Candidacy;

use Illuminate\Http\Request;
use App\Services\OfferService;
use App\Services\CandidateService;
use Barryvdh\DomPDF\Facade\Pdf;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class AdminGenerateCandidateController extends Controller
{
    /**
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('admin/generate/candidacies');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function download(Request $request, string $id)
    {
        $offer = app(OfferService::class)->findById($id, false);

        $candidates = app(CandidateService::class)
            ->findByOffer($offer->id);

        if ($candidates->isEmpty()) {
            return redirect()->route('admin.generate.candidacy.index')
                ->with('info', 'Aucun candidat trouvé pour cette offre.');
        }

        $pdf = Pdf::loadView('pdf.candidates', [
            'offer'      => $offer,
            'candidates' => $candidates,
        ]);

        return $pdf->download("candidates{$offer->id}.pdf");
    }
}
