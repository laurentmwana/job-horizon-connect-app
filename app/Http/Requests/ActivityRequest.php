<?php

namespace App\Http\Requests;

use App\Dto\ActivityDto;
use App\Enums\ActivityTypeEnum;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class ActivityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'title' => [
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
            'type' => [
                'required',
                new Enum(ActivityTypeEnum::class),
            ],
            'content' => [
                'min:100',
                'max:9000',
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
     * Summary of toDto
     * @return ActivityDto
     */
    public function toDto()
    {
        return new ActivityDto($this->validated());
    }
}
