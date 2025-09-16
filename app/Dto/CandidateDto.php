<?php

namespace App\Dto;

use App\Helpers\Hydrate;
 
class CandidateDto
{
    public string $id;
    public string $name;
    public string $firstname;
    public string $gender;
    public string $phone;
    public string $email;

    /**
     * @param array $data
     */
    public function __construct(public array $data)
    {
        Hydrate::hydrate($data, $this);
    }
}
