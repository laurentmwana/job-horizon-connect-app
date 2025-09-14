<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Services\UserService;

class ForgotPasswordController
{

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email']
        ]) ;

        app(UserService::class)->forgotPassword($data);

        return redirect()->back()
            ->with('info', 'lien de réinitialisation envoyé');
    }
}
