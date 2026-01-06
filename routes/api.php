<?php

use App\Http\Controllers\Api\CustomerAuthController;
use App\Http\Controllers\Api\ShopkeeperAuthController;
use App\Http\Controllers\Api\ShopkeeperBusinessController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Version 1 Routes
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->middleware(['web'])->group(function () {
    
    /*
    |--------------------------------------------------------------------------
    | Customer API Routes
    |--------------------------------------------------------------------------
    */
    
    Route::prefix('customer')->name('customer.')->group(function () {
        // Public routes
        Route::post('/register', [CustomerAuthController::class, 'register']);
        Route::post('/login', [CustomerAuthController::class, 'login']);
        Route::post('/logout', [CustomerAuthController::class, 'logout']);
        Route::post('/forgot-password', [CustomerAuthController::class, 'forgotPassword']);
        Route::post('/reset-password', [CustomerAuthController::class, 'resetPassword']);
        
        // Protected routes
        Route::middleware('auth:customer')->group(function () {
            Route::get('/user', [CustomerAuthController::class, 'user']);
        });
    });
    
    /*
    |--------------------------------------------------------------------------
    | Shopkeeper API Routes
    |--------------------------------------------------------------------------
    */
    
    Route::prefix('shopkeeper')->name('shopkeeper.')->group(function () {
        // Public routes
        Route::post('/register', [ShopkeeperAuthController::class, 'register']);
        Route::post('/login', [ShopkeeperAuthController::class, 'login']);
        Route::post('/logout', [ShopkeeperAuthController::class, 'logout']);
        Route::post('/forgot-password', [ShopkeeperAuthController::class, 'forgotPassword']);
        Route::post('/reset-password', [ShopkeeperAuthController::class, 'resetPassword']);
        
        // Protected routes
        Route::middleware('auth:shopkeeper')->group(function () {
            Route::get('/user', [ShopkeeperAuthController::class, 'user']);
            
            // Business Profile Setup
            Route::post('/profile/save-step', [ShopkeeperBusinessController::class, 'saveStep']);
            Route::post('/profile/complete', [ShopkeeperBusinessController::class, 'complete']);
        });
    });
});

/*
|--------------------------------------------------------------------------
| Protected API Routes for Shopkeeper Dashboard
|--------------------------------------------------------------------------
*/

Route::middleware(['web', 'auth:shopkeeper'])->group(function () {
    Route::get('/inventory', function () {
        return response()->json([
            [
                'main' => 'Beauty',
                'sub' => 'Skin care',
                'code' => '12245',
                'name' => 'Soap',
                'bp' => '200',
                'sp' => '290',
                'qty' => '1890',
                'unit' => 'Pieces',
            ],
            [
                'main' => 'Cleaning',
                'sub' => 'Cloth Cleaning',
                'code' => '2344',
                'name' => 'Washing Powder',
                'bp' => '300',
                'sp' => '400',
                'qty' => '1974',
                'unit' => '1 Kg',
            ],
            [
                'main' => 'Beauty',
                'sub' => 'Skin care',
                'code' => '4435',
                'name' => 'Lipstick',
                'bp' => '500',
                'sp' => '600',
                'qty' => '456',
                'unit' => 'Pieces',
            ],
            [
                'main' => 'Beauty',
                'sub' => 'Skin care',
                'code' => '3455',
                'name' => 'Mascara',
                'bp' => '200',
                'sp' => '290',
                'qty' => '987',
                'unit' => 'Pieces',
            ],
            [
                'main' => 'Beauty',
                'sub' => 'Skin care',
                'code' => '12245',
                'name' => 'Face powder',
                'bp' => '200',
                'sp' => '290',
                'qty' => '234',
                'unit' => 'Pieces',
            ],
            [
                'main' => 'Beauty',
                'sub' => 'Skin care',
                'code' => '12245',
                'name' => 'Base',
                'bp' => '2,000',
                'sp' => '2500',
                'qty' => '678',
                'unit' => 'Pieces',
            ],
        ]);
    });

    Route::get('/adjustments', function () {
        return response()->json([
            [
                'main' => 'Beauty',
                'sub' => 'Skin care',
                'code' => '12245',
                'name' => 'Soap',
                'bp' => '200',
                'sp' => '290',
                'qty' => '1890',
                'unit' => 'Pieces',
            ],
        ]);
    });
});
