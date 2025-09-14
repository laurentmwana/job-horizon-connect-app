<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Services\ContactService;
use App\Http\Controllers\Controller;
use App\Http\Requests\ContactRequest;

class ContactController extends Controller
{

    public function index()
    {
        return Inertia::render('contact/index');
    }

    public function sendMessage(ContactRequest $request)
    {
        app(ContactService::class)->sendMessage($request->validated());

        return redirect()
            ->route('contact.index')
            ->with('success','message envoyé');
    }
}
