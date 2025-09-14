<?php

use App\Http\Controllers\Auth\AuthenticatedController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get("/login",[AuthenticatedController::class, 'index'])
        ->name("login");
    Route::post("/login",[AuthenticatedController::class, 'store']);
});

Route::middleware(['auth'])->group(function () {
    Route::post("/logout",[AuthenticatedController::class, 'logout']);
});

