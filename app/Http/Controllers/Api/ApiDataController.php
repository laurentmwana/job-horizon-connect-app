<?php

namespace App\Http\Controllers\Api;

use App\Models\Offer;
use App\Models\Activity;
use App\Models\Candidate;
use App\Models\JobPosition;
use Illuminate\Http\Request;

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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Database\Eloquent\Collection<int, Offer>
     */
    public function offers(Request $request)
    {
        $withExpired = (bool) $request->query('with_expired', true);

        $builder = Offer::query()->orderByDesc('updated_at');

        if ($withExpired) {
            return $builder->orderByDesc('updated_at')->get();
        }
        
        return $builder->where('end_at', '<=', now())->get();
    }


    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Database\Eloquent\Collection<int, Activity>
     */
    public function activities(Request $request)
    {
        $withExpired = (bool) $request->query('with_expired', true);

        $builder = Activity::query()->orderByDesc('updated_at');

        if ($withExpired) {
            return $builder->orderByDesc('updated_at')->get();
        }
        
        return $builder->where('end_at', '<=', now())->get();
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
