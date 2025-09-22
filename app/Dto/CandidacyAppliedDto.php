<?php

namespace App\Dto;

use App\Helpers\Hydrate;
use Illuminate\Http\UploadedFile;

class CandidacyAppliedDto
{
    public ?UploadedFile $cvPath = null;

    /**
     * @param array $data
     */
    public function __construct(public array $data)
    {
        Hydrate::hydrate($data, $this);
    }

}
