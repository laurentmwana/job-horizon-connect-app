<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Unique;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $id = $this->input('id');

        return  [
            'name' => [
                'required',
                'string',
                'min:2',
                'max:15',
                (new Unique(User::class))->ignore($id),
            ],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                (new Unique(User::class))->ignore($id),
            ],
        ];
    }

    /**
     * @return \App\Dto\UserDto
     */
    public function toDto()
    {
        return new \App\Dto\UserDto($this->validated());
    }
}
