<?php

namespace App\Http\Controllers\Api;

use App\Models\Candidate;
use App\Models\JobPosition;
use App\Models\Offer;

class ApiDataController
{

    /**
     * @return \Illuminate\Database\Eloquent\Collection<int, JobPosition>
     */
    public function jobPositions()
    {
        return JobPosition::with('skills')
            ->orderByDesc('updated_at')
            ->get();
    }


    /**
     * @return \Illuminate\Database\Eloquent\Collection<int, Offer>
     */
    public function offers()
    {
        return Offer::query()
            ->orderByDesc('updated_at')
            ->get();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection<int, Candidate>
     */
    public function candidates()
    {
        return Candidate::query()
            ->orderByDesc('updated_at')
            ->get();
    }
}
