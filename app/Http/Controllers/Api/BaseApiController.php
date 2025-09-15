<?php

namespace App\Http\Controllers\Api;

use App\Enums\GenderEnum;
use App\Enums\ActivityTypeEnum;
use App\Enums\CandidacyStatusEnum;
use App\Http\Controllers\Controller;
use App\Enums\ParticipatedStatusEnum;

class BaseApiController extends Controller
{
    /**
     * @return array
     */
    public function gender()
    {
        return GenderEnum::values();
    }

    /**
     * @return array
     */
    public function activityTypes()
    {
        return ActivityTypeEnum::values();
    }

    /**
     * @return array
     */
    public function candidacyStatus()
    {
        return CandidacyStatusEnum::values();
    }

    public function participatedStatus()
    {
        return ParticipatedStatusEnum::values();
    }
}
