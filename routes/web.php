<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MSPController;
use App\Http\Controllers\CadreController;
use App\Http\Controllers\PFAController;
use App\Http\Controllers\HISController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\ServiceRequestController;

use App\Http\Controllers\TransfersController;
Route::get('/', function () {
    return Inertia::render('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Route::get('dbas', function () {
    //     return Inertia::render('dbas');
    // })->name('dbas');

    Route::get('/dbas', [DBAController::class, 'index'])->name('dbas.index');
    Route::post('/dbas', [DBAController::class, 'store'])->name('dbas.store');
    Route::put('/dbas/{dbas}', [DBAController::class, 'update'])->name('dbas.update');
    Route::delete('/dbas/{dbas}', [DBAController::class, 'destroy'])->name('dbas.destroy');

    Route::get('/cadres', [CadreController::class, 'index'])->name('cadres.index');
    Route::post('/cadres', [CadreController::class, 'store'])->name('cadres.store');
    Route::put('/cadres/{cadres}', [CadreController::class, 'update'])->name('cadres.update');
    Route::delete('/cadres/{cadres}', [CadreController::class, 'destroy'])->name('cadres.destroy');

    Route::get('/pfas', [PFAController::class, 'index'])->name('pfas.index');
    Route::post('/pfas', [PFAController::class, 'store'])->name('pfas.store');
    Route::put('/pfas/{pfas}', [PFAController::class, 'update'])->name('pfas.update');
    Route::delete('/pfas/{pfas}', [PFAController::class, 'destroy'])->name('pfas.destroy');

    Route::get('/hip', [HISController::class, 'index'])->name('hip.index');
    Route::post('/hip', [HISController::class, 'store'])->name('hip.store');
    Route::put('/hip/{hip}', [HISController::class, 'update'])->name('hip.update');
    Route::delete('/hip/{hip}', [HISController::class, 'destroy'])->name('hip.destroy');

    Route::get('/staff', [StaffController::class, 'index'])->name('staff.index');
    Route::post('/staff', [StaffController::class, 'store'])->name('staff.store');
    Route::put('/staff/{staff}', [StaffController::class, 'update'])->name('staff.update');
    Route::delete('/staff/{staff}', [StaffController::class, 'destroy'])->name('staff.destroy');
    Route::put('/staff/{staff}/transfer', [StaffController::class, 'transfer'])->name('staff.transfer');

    Route::get('/cadre-groups', [CadreController::class, 'cadreGroups'])->name('cadre-groups.index');
    Route::post('/cadre-groups', [CadreController::class, 'storeCadreGroup'])->name('cadre-groups.store');
    Route::put('/cadre-groups/{group}', [CadreController::class, 'update'])->name('cadre-groups.update');
    Route::delete('/cadre-groups/{group}', [CadreController::class, 'destroy'])->name('cadre-groups.destroy');

    Route::get('/cadre-subgroups', [CadreController::class, 'cadreSubGroups'])->name('cadre-subgroups.index');
    Route::post('/cadre-subgroups', [CadreController::class, 'storeCadreSubGroup'])->name('cadre-subgroups.store');
    Route::put('/cadre-subgroups/{group}', [CadreController::class, 'update'])->name('cadre-subgroups.update');
    Route::delete('/cadre-subgroups/{group}', [CadreController::class, 'destroy'])->name('cadre-subgroups.destroy');
    
    Route::get('/transfers', [TransfersController::class, 'index'])->name('transfers.index');
    Route::post('/transfers', [TransfersController::class, 'store'])->name('transfers.index');
    Route::put('/transfers', [TransfersController::class, 'update'])->name('transfers.index');
    Route::delete('/transfers', [TransfersController::class, 'destroy'])->name('transfers.index');
    Route::put('/transfers/{transfer}/respond', [TransfersController::class, 'respond'])->name('transfers.respond');
    

});

Route::get('/hubs', [MSPController::class, 'index'])->name('msps.index');
Route::get('/members', [MSPController::class, 'members'])->name('members.index');
Route::post('/request-service', [ServiceRequestController::class, 'store'])->name('request-service.store');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
