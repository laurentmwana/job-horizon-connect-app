<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\RegisterUserController;
use App\Http\Controllers\Auth\AuthenticatedController;

Route::middleware('guest')->group(function () {
    Route::get("/login",[AuthenticatedController::class, 'index'])
        ->name("login");
    Route::post("/login",[AuthenticatedController::class, 'store']);

    Route::post('/register', RegisterUserController::class)->name('register');
});

Route::middleware(['auth'])->group(function () {
    Route::post("/logout",[AuthenticatedController::class, 'logout']);
        Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');
});

