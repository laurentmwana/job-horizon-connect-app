<?php

namespace App\Http\Controllers\Candidate;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\CandidateService;
use App\Http\Controllers\Controller;
use App\Http\Requests\CandidateCompletedRequest;

class CandidateController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('candidate/index');
    }

    
    /**
     * @param \App\Http\Requests\CandidateCompletedRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CandidateCompletedRequest $request)
    {
        $user = $request->user();

        app(CandidateService::class)->completed($user, $request->toDto());

        return redirect()->route('home')
            ->with('info', 'vos informations ont été enregistrées avec succès.');
    }
}
