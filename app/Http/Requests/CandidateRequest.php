<?php

namespace App\Http\Requests;

use App\Models\User;
use App\Enums\GenderEnum;
use App\Models\Candidate;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Validation\Rules\Unique;
use Illuminate\Foundation\Http\FormRequest;

class CandidateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->input('id');
        
       $rules =   [
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

        if ($id === null) {
            $rules['email'] =  ['required', (new Unique(User::class))];
        }
        return $rules;
    }

    /**
     * @return \App\Dto\CandidateDto
     */
    public function toDto()
    {
        return new \App\Dto\CandidateDto($this->validated());
    }
}
