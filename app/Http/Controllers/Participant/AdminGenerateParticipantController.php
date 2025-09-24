<?php

namespace App\Http\Controllers\Participant;

use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Services\ActivityService;
use App\Services\CandidateService;
use App\Http\Controllers\Controller;

class AdminGenerateParticipantController extends Controller
{
    /**
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('admin/generate/participants');
    }

    /**
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function download(string $id)
    {
        $activity = app(ActivityService::class)->findById($id, false);

        $participants = app(CandidateService::class)
            ->findByActivity($activity->id);

        if ($participants->isEmpty()) {
            return redirect()->route('admin.generate.participant.index')
                ->with('info', 'Aucun participant trouvé pour cette activité.');
        }

        $pdf = Pdf::loadView('pdf.participants', [
            'activity'      => $activity,
            'participants' => $participants,
        ]);

        return $pdf->download("participants{$activity->id}.pdf");
    }
}
