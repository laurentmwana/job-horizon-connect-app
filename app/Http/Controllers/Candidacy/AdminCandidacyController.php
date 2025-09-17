<?php

namespace App\Http\Controllers\Candidacy;

use App\Enums\CandidacyStatusEnum;
use App\Services\CandidacyService;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminCandidacyController extends Controller
{
    /**
     * @param \App\Services\CandidacyService $candidacyService
     */
    public function __construct(private CandidacyService $candidacyService)
    {
    }

    /**
     * @return \Inertia\Response
     */
    public function index()
    {
        $candidacies = $this->candidacyService->findPaginatedAndFiltered();

        return Inertia::render('admin/candidacy/index', [
            'candidacies' => $candidacies,
        ]);
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function show(string $id)
    {
        $candidacy = $this->candidacyService->findById($id);

        return Inertia::render('admin/candidacy/show', [
            'candidacy' => $candidacy,
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
            'status' => ['required', new Enum(CandidacyStatusEnum::class)],
        ]);

        $enum = CandidacyStatusEnum::from($request->input('status'));

        $candidacy = $this->candidacyService->findById($id);

        if ($candidacy->status->value === CandidacyStatusEnum::PENDING) {
            abort(403);
        }

        if ($candidacy->candidacy_at !== null) {
            abort(403, "cette candidature a été cloturée, vous ne pouvez plus");
        }

        $this->candidacyService->changeStatus($enum, $candidacy);

        return redirect()->route('admin.candidacy.index')
            ->with('success', 'status de la candidature modifiée');
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

        $candidacy = $this->candidacyService->findById($id, false);

        $this->candidacyService->delete($candidacy);

        return redirect()->route('admin.candidacy.index')
            ->with('success', 'candidature supprimée');
    }
}
