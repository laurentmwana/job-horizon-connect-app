<?php

namespace App\Dto;

use App\Helpers\Hydrate;

class UserDto
{
    public string $name;
    public string $email;
    public string $password = '';

    /**
     * @param array $data
     */
    public function __construct(public array $data)
    {
        Hydrate::hydrate($data, $this);
    }
}
