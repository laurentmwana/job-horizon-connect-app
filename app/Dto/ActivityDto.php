<?php

namespace App\Dto;

use App\Enums\ActivityTypeEnum;
use App\Helpers\Hydrate;
use Illuminate\Http\UploadedFile;
 
class ActivityDto
{
    public string $id;
    public string $title;
    public string $content;
    public string $description;
    public string $startAt;
    public string $endAt;
    public string $type;
    public ?UploadedFile $image = null;

    /**
     * @param array $data
     */
    public function __construct(public array $data)
    {
        Hydrate::hydrate($data, $this);
    }
}
