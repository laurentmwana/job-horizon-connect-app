<?php

namespace App\Http\Controllers\Activity;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\ActivityService;
use App\Http\Controllers\Controller;
use App\Http\Requests\ActivityRequest;

class AdminActivityController extends Controller
{
    /**
     * @param \App\Services\ActivityService $activityService
     */
    public function __construct(private ActivityService $activityService)
    {
    }

    /**
     * @return \Inertia\Response
     */
    public function index()
    {
        $activities = $this->activityService->findPaginatedAndFiltered();

        return Inertia::render('admin/activity/index', [
            'activities' => $activities,
        ]);
    }


    /**
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('admin/activity/create');
    }

    /**
     * @param \App\Http\Requests\ActivityRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(ActivityRequest $request)
    {
        $this->activityService->create($request->toDto());

        return redirect()->route('admin.activity.index')->with('success', 'acivité créée');
    }

    public function show(string $id)
    {
        $activity = $this->activityService->findById($id);
        
        return Inertia::render('admin/activity/show', [
            'activity' => $activity,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $activity = $this->activityService->findById($id, false);
        
        return Inertia::render('admin/activity/edit', [
            'activity' => $activity,
        ]);
    }

    /**
     * @param \App\Http\Requests\ActivityRequest $request
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(ActivityRequest $request, string $id)
    {
        $activity = $this->activityService->findById($id, false);

        $this->activityService->update($activity, $request->toDto());

        return redirect()->route('admin.activity.index')
            ->with('success', 'activité editiée');
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

        $activity = $this->activityService->findById($id, false);

        $this->activityService->delete($activity);

        return redirect()->route('admin.activity.index')
            ->with('success', 'activité supprimée');
    }
}
