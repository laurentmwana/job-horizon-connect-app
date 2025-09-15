<?php

namespace App\Http\Controllers\Api;

use App\Models\JobPosition;

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
}
