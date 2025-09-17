<?php

namespace App\Dto;

use App\Helpers\Hydrate;
 
class SkillDto
{
    public string $id;
    public string $name;
    public string $description;
    public string $jobPositionId;

    /**
     * @param array $data
     */
    public function __construct(public array $data)
    {
        Hydrate::hydrate($data, $this);
    }
}
