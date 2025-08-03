<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Administrator routes
    Route::middleware([\App\Http\Middleware\EnsureUserIsAdministrator::class])->group(function () {
        Route::resource('students', StudentController::class);
        Route::resource('subjects', SubjectController::class);
        Route::get('reports/attendance', [ReportController::class, 'index'])->name('reports.attendance');
    });
    
    // Teacher routes
    Route::middleware([\App\Http\Middleware\EnsureUserIsTeacher::class])->group(function () {
        Route::resource('attendances', AttendanceController::class)->except(['edit', 'update', 'destroy']);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
