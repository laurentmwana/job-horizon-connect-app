<?php

namespace App\Http\Middleware;

use App\Models\User;
use Inertia\Middleware;
use Illuminate\Http\Request;
use Illuminate\Foundation\Inspiring;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');
        $user = $request->user();

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $user,
                'guard' => $this->getGuard($request->user()),
            ],
            'baseUrl' => $request->getBaseUrl(),
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'danger' => $request->session()->get('danger'),
                'warning' => $request->session()->get('warning'),
                'info' => $request->session()->get('info'),
            ],
        ];
    }

    private function getGuard(?User $user): array
    {
        if (null === $user) {
            return [
                'is_admin' => false,
                'is_anonymous' => false,
                'is_candidate' => false,
            ];
        }

        $isAdmin = $user->isAdmin();
        $isAnonymous = $user->isAnonymous();
        $isCandidate = $user->isCandidate();

        return [
                'is_admin' => $isAdmin,
                'is_anonymous' => $isAnonymous,
                'is_candidate' => $isCandidate,
        ];
    }
}
