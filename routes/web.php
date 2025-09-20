<?php

use Illuminate\Support\Facades\Route;

$MIDDLEWARE_AUTH = ['auth'];
$MIDDLEWARE_AUTH_VERIFIED = ['auth', 'verified'];
$MIDDLEWARE_CANDIDATE_EXCEPT = ['auth', 'verified', 'candidate:except'];
$MIDDLEWARE_CANDIDATE_REQUIRED = ['auth', 'verified', 'candidate:required'];

Route::get('/', \App\Http\Controllers\WelcomeController::class)->name('home');

// OFFER
Route::get('/offers', [\App\Http\Controllers\Offer\OfferController::class, 'index'])
    ->name('offer.index');
Route::get('/offer/{id}', [\App\Http\Controllers\Offer\OfferController::class, 'show'])
    ->name('offer.show');
// END OFFER

// ACTIVITY
Route::get('/activities', [\App\Http\Controllers\Activity\ActivityController::class, 'index'])
    ->name('activity.index');
Route::get('/activity/{id}', [\App\Http\Controllers\Activity\ActivityController::class, 'show'])
    ->name('activity.show');

Route::post('/activity/{id}/participated', [\App\Http\Controllers\Activity\ActivityController::class, 'participated'])
    ->middleware($MIDDLEWARE_CANDIDATE_REQUIRED)
    ->name('activity.participated');
// END ACTIVITY

// CONTACT
Route::get('/contact', [\App\Http\Controllers\ContactController::class, 'index'])
    ->name('contact.index');
Route::post('/contact/send-message', [\App\Http\Controllers\ContactController::class, 'sendMessage'])
    ->name('contact.send');
// END CONTACT

// PROFILE
Route::middleware($MIDDLEWARE_AUTH)->group(function () {
    Route::get('/profile', [\App\Http\Controllers\User\ProfileController::class, 'index'])
        ->name('profile.index');
    Route::put('/profile/edit', [\App\Http\Controllers\User\ProfileController::class, 'edit'])
        ->name('profile.edit');
    Route::put('/profile/password', [\App\Http\Controllers\User\ProfileController::class, 'password'])
        ->name('profile.password');
    Route::delete('/profile/destroy', [\App\Http\Controllers\User\ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});
// END PROFILE

// CANDIDATE
Route::middleware($MIDDLEWARE_CANDIDATE_EXCEPT)->group(function () {
    Route::get('/candidate', [\App\Http\Controllers\Candidate\CandidateController::class, 'index'])
    ->name('candidate.index');
    Route::post('/candidate', [\App\Http\Controllers\Candidate\CandidateController::class, 'store'])
        ->name('candidate.store'); 
});
// END CANDIDATE


// MY SPACE
Route::middleware($MIDDLEWARE_CANDIDATE_REQUIRED)->group(function () {
    Route::get('/my-space', [\App\Http\Controllers\Candidate\SpaceCondidateController::class, 'index'])
    ->name('myspace.index');
});
// END MY SPACE


// PAGE
Route::get('/about', [\App\Http\Controllers\PageController::class, 'about'])
    ->name('page.about');
// END PAGE



require 'auth.php';
require 'admin.php';
