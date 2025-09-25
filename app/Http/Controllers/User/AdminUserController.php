<?php

namespace App\Http\Controllers\User;

use App\Services\UserService;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Controller;

class AdminUserController extends Controller
{
    /**
     * @param \App\Services\UserService $userService
     */
    public function __construct(private UserService $userService)
    {
    }

    /**
     * @return \Inertia\Response
     */
    public function index()
    {
        $users = $this->userService->findPaginatedAndFiltered();

        return Inertia::render('admin/user/index', [
            'users' => $users,
        ]);
    }

     /**
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('admin/user/create');
    }


    /**
     * @param \App\Http\Requests\UserRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(UserRequest $request)
    {
        $this->userService->create($request->toDto());

        return redirect()->route('admin.user.index')
            ->with('success', 'utilisateur créé');
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function show(string $id)
    {
        $user = $this->userService->findById($id);

        return Inertia::render('admin/user/show', [
            'user' => $user,
        ]);
    }

    /**
     * @param string $id
     * @return \Inertia\Response
     */
    public function edit(string $id)
    {
        $user = $this->userService->findById($id);

        return Inertia::render('admin/user/edit', [
            'user' => $user,
        ]);
    }

    /**
     * @param \App\Http\Requests\UserRequest $request
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UserRequest $request, string $id)
    {
        $user = $this->userService->findById($id);

        $this->userService->update($user, $request->toDto());

        return redirect()->route('admin.user.index')
            ->with('success', 'utilisateur editié');
    }

    public function updatePassword(Request $request, string $id)
    {

        $service = app(UserService::class);
       

        $request->validate([
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $password = $request->input('password');

        $user = $service->findById($id, false);

        $service->password($user, $password);

        return back()->with('success', 'mot de passe modifié');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, string $id)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $this->userService->findById($id);

        $this->userService->delete($user);

        return redirect()->route('admin.user.index')
            ->with('success', 'utilisateur supprimé');
    }
}
