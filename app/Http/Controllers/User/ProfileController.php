<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;


class ProfileController
{
    public function index()
    {
        return Inertia::render('profile/index');
    }


    public function edit(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required'],
            'email' => ['required'],
        ]);

         $request->user()->fill($validated);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return redirect()->route('profile.index')->with('success', 'vos informations ont été modifiées');
    }


     public function password(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'current_password' => ['required', 'current_password'],
        ]);

        $password = $request->input('password');

        $user->update([
            'password' => Hash::make($password),
        ]);

        return redirect()->route('profile.index')->with('success', 'mot de passe modifié');
    }

     public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('profile.index')->with('success', 'au revoir');
    }

}
