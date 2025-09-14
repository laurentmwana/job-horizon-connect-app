<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EmailVerificationPromptController
{

        public function __invoke(Request $request)
    {
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended(route('dashboard', absolute: false))
                    : Inertia::render('auth/verify-email', ['status' => $request->session()->get('status')]);
    }
}
