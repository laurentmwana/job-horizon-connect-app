<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Faq\AdminFaqController;
use App\Http\Controllers\User\AdminUserController;
use App\Http\Controllers\Offer\AdminOfferController;
use App\Http\Controllers\Skill\AdminSkillController;
use App\Http\Controllers\Activity\AdminActivityController;
use App\Http\Controllers\Candidacy\AdminCandidacyController;
use App\Http\Controllers\Candidate\AdminCandidateController;
use App\Http\Controllers\JobPosition\AdminJobPositionController;
use App\Http\Controllers\Participant\AdminParticipantController;
use App\Http\Controllers\Candidacy\AdminGenerateCandidateController;
use App\Http\Controllers\Participant\AdminGenerateParticipantController;

$MIDDLEWARE_ARRAY = ['auth', 'verified', 'admin'];

Route::middleware($MIDDLEWARE_ARRAY)->group(function () {
    // ADMIN
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
    // END ADMIN
});

Route::middleware($MIDDLEWARE_ARRAY)
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::resource('activity', AdminActivityController::class)
            ->parameter('activity', 'id');
        Route::resource('offer', AdminOfferController::class)
            ->parameter('offer', 'id');
        Route::resource('job-position', AdminJobPositionController::class)
            ->parameter('job-position', 'id');
        Route::resource('skill', AdminSkillController::class)
            ->parameter('skill', 'id');
        Route::resource('candidate', AdminCandidateController::class)
            ->parameter('candidate', 'id');

        Route::get('/candidacy', [AdminCandidacyController::class, 'index'])->name('candidacy.index');
        Route::get('/candidacy/{id}', [AdminCandidacyController::class, 'show'])->name('candidacy.show');
        Route::post('/candidacy/{id}/status', [AdminCandidacyController::class, 'changeStatus'])->name('candidacy.status');
        Route::delete('/candidacy/{id}', [AdminCandidacyController::class, 'destroy'])->name('candidacy.destroy');

         Route::get('/participant', [AdminParticipantController::class, 'index'])->name('participant.index');
        Route::get('/participant/{id}', [AdminParticipantController::class, 'show'])->name('participant.show');
        Route::post('/participant/{id}/status', [AdminParticipantController::class, 'changeStatus'])->name('participant.status');
        Route::delete('/participant/{id}', [AdminParticipantController::class, 'destroy'])->name('participant.destroy');

    Route::get('/generate/candidacies', [AdminGenerateCandidateController::class, 'index'])
        ->name('generate.candidacy.index');
    Route::get('/generate/candidacies/offer/{id}', [AdminGenerateCandidateController::class, 'download'])
        ->name('generate.candidacy.download');

    Route::get('/generate/participants', [AdminGenerateParticipantController::class, 'index'])
        ->name('generate.participant.index');
    Route::get('/generate/participants/activity/{id}', [AdminGenerateParticipantController::class, 'download'])
        ->name('generate.participant.download');

    Route::resource('faq', AdminFaqController::class)
        ->parameter('faq', 'id');
    Route::resource('user', AdminUserController::class)
        ->parameter('user', 'id');
    Route::post('user/{id}/password', [AdminUserController::class, 'updatePassword'])
        ->name('user.password');
});
