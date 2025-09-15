<?php

namespace App\Dto;

use App\Helpers\Hydrate;
use Illuminate\Http\UploadedFile;
 
class OfferDto
{
    public string $id;
    public string $name;
    public string $description;
    public string $bio;
    public string $startAt;
    public string $endAt;
    public array $jobPositions = [];
    public ?UploadedFile $image = null;

    /**
     * @param array $data
     */
    public function __construct(public array $data)
    {
        Hydrate::hydrate($data, $this);
    }
}
