<?php

namespace App\Http\Controllers\Activity;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\ActivityService;
use App\Http\Controllers\Controller;
use App\Services\ParticipantService;

class ActivityController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $candidate = $user ? $user->candidate : null;

        $activities = app(ActivityService::class)
            ->findPaginatedAndFiltered(15, $candidate);

        return Inertia::render('activity/index', [
            'activities' => $activities,
        ]);
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function show(Request $request, string $id)
    {
        $user = $request->user();
        $candidate = $user ? $user->candidate : null;

        $activity = app(ActivityService::class)->findById($id, candidate: $candidate);

        return Inertia::render('activity/show', [
            'activity' => $activity,
        ]);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function participated(Request $request, string $id)
    {
        $user = $request->user();

        $activity = app(ActivityService::class)->findById($id, false);

        app(ParticipantService::class)
            ->create($activity, $user->candidate);

        return redirect()->route('activity.show', ['id' => $activity->id])
            ->with('success', "votre participation à cette activité a été mis à jour.");
    }
}
