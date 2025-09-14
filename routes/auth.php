<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\RegisterUserController;
use App\Http\Controllers\Auth\AuthenticatedController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;

Route::middleware('guest')->group(function () {
    Route::get("/login",[AuthenticatedController::class, 'index'])
        ->name("login");
    Route::post("/login",[AuthenticatedController::class, 'store']);

    Route::post('/register', RegisterUserController::class)->name('register');
    Route::post('forgot-password', ForgotPasswordController::class)
        ->name('forgot.request');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware(['auth'])->group(function () {
    Route::post("/logout",[AuthenticatedController::class, 'logout']);
    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');
    Route::post('email/verification-notification', EmailVerificationNotificationController::class)
        ->middleware('throttle:6,1')
        ->name('verification.send');

        Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');
});

