<?php

namespace App\Http\Requests;

use App\Dto\OfferDto;
use Illuminate\Foundation\Http\FormRequest;

class OfferRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'name' => [
                'required',
                'string',
                'min:2',
                'max:255',
            ],
            'bio' => [
                'string',
                'min:30',
                'max:1000',
            ],
            'start_at' => [
                'required',
                'date',
                'after_or_equal:today', 
            ],
            'end_at' => [
                'required',
                'date',
                'after_or_equal:start_at', 
            ],
            'description' => [
                'min:100',
                'max:9000',
            ],
            'job_positions' => [
                'required',
                'exists:job_positions,id',
                'array',
                'between:1,5'
            ],
            'image' => ['nullable']
        ];

        if ($this->hasFile('image')) {
            $rules['image'] = [
                'required',
                'image',
                'mimes:png,jpg',
                'max:1024',
            ];
        }

        return $rules;
    }

    /**
     * @return OfferDto
     */
    public function toDto()
    {
        return new OfferDto($this->validated());
    }
}
