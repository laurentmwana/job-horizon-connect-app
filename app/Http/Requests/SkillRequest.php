<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SkillRequest extends FormRequest
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
            'job_position_id' => ['required', 'exists:job_positions,id']
        ];
    }

    /**
     * @return \App\Dto\SkillDto
     */
    public function toDto()
    {
        return new \App\Dto\SkillDto($this->validated());
    }
}
