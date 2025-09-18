<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Enums\GenderEnum;
use App\Models\Candidate;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Unique;
use Illuminate\Foundation\Http\FormRequest;

class CandidateCompletedRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->input('id');
        
      return    [
            'name' => [
                'required',
                'string',
                'min:2',
                'max:30',
            ],
            'firstname' => [
                'required',
                'string',
                'min:2',
                'max:30',
            ],
            'gender' => [
                'required',
                (new Enum(GenderEnum::class))
            ],
            'phone' => [
                'required',
                (new Unique(Candidate::class))->ignore($id)
            ],
        ];
    }

    /**
     * @return \App\Dto\CandidateDto
     */
    public function toDto()
    {
        return new \App\Dto\CandidateDto($this->validated());
    }
}
