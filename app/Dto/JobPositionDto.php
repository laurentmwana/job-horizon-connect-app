<?php

namespace App\Dto;

use App\Helpers\Hydrate;
 
class JobPositionDto
{
    public string $id;
    public string $name;
    public string $description;

    /**
     * @param array $data
     */
    public function __construct(public array $data)
    {
        Hydrate::hydrate($data, $this);
    }
}
