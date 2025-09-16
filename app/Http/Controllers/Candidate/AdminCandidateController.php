<?php

namespace App\Http\Controllers\Candidate;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\CandidateService;
use App\Http\Requests\CandidateRequest;
use App\Http\Controllers\Controller;

class AdminCandidateController extends Controller
{
    /**
     * @param \App\Services\CandidateService $candidateService
     */
    public function __construct(private CandidateService $candidateService)
    {
    }

    /**
     * @return \Inertia\Response
     */
    public function index()
    {
        $candidates = $this->candidateService->findPaginatedAndFiltered();

        return Inertia::render('admin/candidate/index', [
            'candidates' => $candidates,
        ]);
    }


    /**
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('admin/candidate/create');
    }


    /**
     * @param \App\Http\Requests\CandidateRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CandidateRequest $request)
    {
        $this->candidateService->create($request->toDto());

        return redirect()->route('admin.candidate.index')
            ->with('success', 'candidat créé');
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function show(string $id)
    {
        $candidate = $this->candidateService->findById($id);

        return Inertia::render('admin/candidate/show', [
            'candidate' => $candidate,
        ]);
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function edit(string $id)
    {
        $candidate = $this->candidateService->findById($id);

        return Inertia::render('admin/candidate/edit', [
            'candidate' => $candidate,
        ]);
    }

    /**
     * @param \App\Http\Requests\CandidateRequest $request
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(CandidateRequest $request, string $id)
    {
        $candidate = $this->candidateService->findById($id, false);

        $this->candidateService->update($candidate, $request->toDto());

        return redirect()->route('admin.candidate.index')
            ->with('success', 'candidat editié');
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

        $candidate = $this->candidateService->findById($id, false);

        $this->candidateService->delete($candidate);

        return redirect()->route('admin.candidate.index')
            ->with('success', 'candidat supprimé');
    }
}
