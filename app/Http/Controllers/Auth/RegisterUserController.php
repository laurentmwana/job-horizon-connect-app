<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules;

class RegisterUserController
{

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'between:4,10', 'unique:users,id'],
            'email' => ['required', 'email', 'lowercase', 'max:255', 'unique:users,id'],
            'password' => ['required', Rules\Password::defaults()],
        ]) ;

        $user = app(UserService::class)->register($data);

        Auth::login($user);

        return redirect()->route('home')
            ->with('info', 'compte créé avec succès');
    }
}
