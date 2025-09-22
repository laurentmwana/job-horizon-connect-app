<?php

namespace App\Http\Requests;

use App\Dto\ActivityDto;
use App\Enums\ActivityTypeEnum;
use App\Dto\CandidacyAppliedDto;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class CandidacyAppliedRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'cv_path' =>  ['required', 'mimes:pdf']
        ];
    }

    public function toDto()
    {
        return new CandidacyAppliedDto($this->validated());
    }
}
