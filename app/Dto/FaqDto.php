<?php

namespace App\Dto;

use App\Helpers\Hydrate;

class FaqDto
{
     public string $question;

     public string $answer;

     public bool $isStar = false;

    /**
     * @param array $data
     */
    public function __construct(public array $data)
    {
        Hydrate::hydrate($data, $this);
    }
}
