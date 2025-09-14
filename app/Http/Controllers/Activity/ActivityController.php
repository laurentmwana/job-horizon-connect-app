<?php

namespace App\Http\Controllers\Activity;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\ActivityService;
use App\Http\Controllers\Controller;

class ActivityController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $perPage = $request->query->getInt('per_page', 15);

        $activities = app(ActivityService::class)
            ->findPaginatedAndFiltered($perPage <= 0 ? 15 : $perPage);

        return Inertia::render('activity/index', [
            'activities' => $activities,
        ]);
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function show(string $id)
    {
        $activity = app(ActivityService::class)->findById($id);

        return Inertia::render('activity/show', [
            'activity' => $activity,
        ]);
    }
}
