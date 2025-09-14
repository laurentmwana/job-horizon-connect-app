<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'message' => [
                'required',
                'string',
                'between:10,1000'
            ],

            'email' => [
                'required',
                'string',
                'email',
                'max:255',
            ],

            'subject' => [
                'required',
                'string',
                'between:3,500'
            ],

            'name' => [
                'required',
                'string',
                'between:2,50'
            ],
        ];
    }
}
