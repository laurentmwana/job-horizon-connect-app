<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobPositionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
       return  [
            'name' => [
                'required',
                'string',
                'min:2',
                'max:255',
            ],
            'description' => [
                'string',
                'min:30',
                'max:1000',
            ],
        ];
    }

    /**
     * @return \App\Dto\JobPositionDto
     */
    public function toDto()
    {
        return new \App\Dto\JobPositionDto($this->validated());
    }
}
