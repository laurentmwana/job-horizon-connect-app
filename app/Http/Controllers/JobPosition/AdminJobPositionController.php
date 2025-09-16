<?php

namespace App\Http\Controllers\JobPosition;

use App\Http\Requests\JobPositionRequest;
use App\Services\JobPositionService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminJobPositionController extends Controller
{
    /**
     * @param \App\Services\JobPositionService $jobPositionService
     */
    public function __construct(private JobPositionService $jobPositionService)
    {
    }

    /**
     * @return \Inertia\Response
     */
    public function index()
    {
        $jobPositions = $this->jobPositionService->findPaginatedAndFiltered();

        return Inertia::render('admin/job-position/index', [
            'jobPositions' => $jobPositions,
        ]);
    }


    /**
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('admin/job-position/create');
    }


    /**
     * @param \App\Http\Requests\JobPositionRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(JobPositionRequest $request)
    {
        $this->jobPositionService->create($request->toDto());

        return redirect()->route('admin.job-position.index')
            ->with('success', 'poste créé');
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function show(string $id)
    {
        $jobPosition = $this->jobPositionService->findById($id);

        return Inertia::render('admin/job-position/show', [
            'jobPosition' => $jobPosition,
        ]);
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function edit(string $id)
    {
        $jobPosition = $this->jobPositionService->findById($id);

        return Inertia::render('admin/job-position/edit', [
            'jobPosition' => $jobPosition,
        ]);
    }

    /**
     * @param \App\Http\Requests\JobPositionRequest $request
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(JobPositionRequest $request, string $id)
    {
        $jobPosition = $this->jobPositionService->findById($id, false);

        $this->jobPositionService->update($jobPosition, $request->toDto());

        return redirect()->route('admin.job-position.index')
            ->with('success', 'poste editié');
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

        $jobPosition = $this->jobPositionService->findById($id, false);

        $this->jobPositionService->delete($jobPosition);

        return redirect()->route('admin.job-position.index')
            ->with('success', 'poste supprimé');
    }
}
