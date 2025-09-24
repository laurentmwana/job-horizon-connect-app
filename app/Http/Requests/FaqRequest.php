<?php

namespace App\Http\Requests;

use App\Dto\FaqDto;
use App\Dto\OfferDto;
use App\Models\Faq;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Unique;

class FaqRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->input('id');

        return  [
            'question' => [
                'required',
                'string',
                'min:2',
                'max:255',
                (new Unique(Faq::class))->ignore($id),
            ],
            'answer' => [
                'string',
                'min:30',
                'max:5000',
            ],
            'is_star' => ['boolean'],
        ];
    }

    /**
     * @return FaqDto
     */
    public function toDto()
    {
        return new FaqDto($this->validated());
    }
}
