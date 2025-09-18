<?php

namespace App\Http\Controllers\Participant;

use App\Enums\ParticipatedStatusEnum;
use App\Services\ParticipantService;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminParticipantController extends Controller
{
    /**
     * @param \App\Services\ParticipantService $participantService
     */
    public function __construct(private ParticipantService $participantService)
    {
    }

    /**
     * @return \Inertia\Response
     */
    public function index()
    {
        $participants = $this->participantService->findPaginatedAndFiltered();

        return Inertia::render('admin/participant/index', [
            'participants' => $participants,
        ]);
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function show(string $id)
    {
        $participant = $this->participantService->findById($id);

        return Inertia::render('admin/participant/show', [
            'participant' => $participant,
        ]);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function changeStatus(Request $request, string $id)
    {
        $request->validate([
            'status' => ['required', new Enum(ParticipatedStatusEnum::class)],
        ]);

        $enum = ParticipatedStatusEnum::from($request->input('status'));

        $participant = $this->participantService->findById($id);

        if ($participant->status->value === ParticipatedStatusEnum::PENDING) {
            abort(403);
        }

        if ($participant->participant_at !== null) {
            abort(403, "cette candidature a été cloturée, vous ne pouvez plus");
        }

        $this->participantService->changeStatus($enum, $participant);

        return redirect()->route('admin.participant.index')
            ->with('success', 'status de la participation modifiée');
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

        $participant = $this->participantService->findById($id, false);

        $this->participantService->delete($participant);

        return redirect()->route('admin.participant.index')
            ->with('success', 'participant supprimée');
    }
}
