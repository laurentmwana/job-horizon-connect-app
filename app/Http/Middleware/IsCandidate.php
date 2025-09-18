<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsCandidate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  $state
     */
    public function handle(Request $request, Closure $next, string $state): Response
    {
        $user = $request->user();

        if ($user instanceof User) {
            if ($state === 'required' && !$user->isCandidate()) {
                return redirect()->route('candidate.index')
                    ->with('warning', 'vous devez complèter vos informations');
            }

            if ($state === 'except' && $user->isCandidate()) {
                return redirect()->route('home');
            }
        }

        return $next($request);
    }
}
