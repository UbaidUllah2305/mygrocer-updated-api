<?php

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Website Routes
|--------------------------------------------------------------------------
*/

// Customer Home Page
Route::get('/', function () {
    return Inertia::render('Website/Customer/Home');
})->name('customer.home');

// Shopkeeper Home Page
Route::get('/shopkeeper', function () {
    return Inertia::render('Website/Shopkeeper/Home');
})->name('shopkeeper.home');

/*
|--------------------------------------------------------------------------
| Customer Authentication Pages
|--------------------------------------------------------------------------
*/

Route::middleware('guest:customer')->group(function () {
    Route::get('/customer/login', function() {
        return Inertia::render('Auth/Customer/Login');
    })->name('customer.login');

    Route::get('/customer/register', function() {
        return Inertia::render('Auth/Customer/Register');
    })->name('customer.register');

    Route::get('/customer/forgot-password', function() {
        return Inertia::render('Auth/Customer/ForgotPassword');
    })->name('customer.password.request');

    Route::get('/customer/reset-password/{token}', function($token) {
        return Inertia::render('Auth/Customer/ResetPassword', [
            'token' => $token,
            'email' => request()->query('email'),
        ]);
    })->name('customer.password.reset');
});

/*
|--------------------------------------------------------------------------
| Shopkeeper Authentication Pages
|--------------------------------------------------------------------------
*/

Route::middleware('guest:shopkeeper')->group(function () {
    Route::get('/shopkeeper/login', function() {
        return Inertia::render('Auth/Shopkeeper/Login');
    })->name('shopkeeper.login');
    
    Route::get('/shopkeeper/register', function() {
        return Inertia::render('Auth/Shopkeeper/Register');
    })->name('shopkeeper.register');

    Route::get('/shopkeeper/forgot-password', function() {
        return Inertia::render('Auth/Shopkeeper/ForgotPassword');
    })->name('shopkeeper.password.request');

    Route::get('/shopkeeper/reset-password/{token}', function($token) {
        return Inertia::render('Auth/Shopkeeper/ResetPassword', [
            'token' => $token,
            'email' => request()->query('email'),
        ]);
    })->name('shopkeeper.password.reset');
});

/*
|--------------------------------------------------------------------------
| Customer Profile Setup
|--------------------------------------------------------------------------
*/

Route::middleware('auth:customer')->group(function () {
    Route::get('/profile', function () {
        return Inertia::render('Customer/Profile/ProfileSetup');
    })->name('profile');
});

/*
|--------------------------------------------------------------------------
| Customer Dashboard & Protected Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:customer', \App\Http\Middleware\EnsureCustomerProfileCompleted::class])->prefix('customer')->name('customer.')->group(function () {
    // Customer Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Customer/Dashboard/CustomerDashboard');
    })->name('dashboard');
    
    // Individual Store Preview
    Route::get('/stores/{id}', function ($id) {
        return Inertia::render('Customer/Dashboard/Stores/StoreDetails', ['storeId' => $id]);
    })->name('store.preview');

    // Checkout Page
    Route::get('/checkout', function () {
        return Inertia::render('Customer/Dashboard/Checkout/Checkout');
    })->name('checkout');
    
    // Customer Profile Page (different from setup)
    Route::get('/profile', function () {
        return Inertia::render('Customer/Dashboard/Profile/ProfilePage');
    })->name('profile');
    
    Route::get('/ordering-reordering', function () {
        return Inertia::render('Customer/Dashboard/Orders/OrdersPage');
    })->name('ordering-reordering');
    
    Route::get('/addresses', function () {
        return Inertia::render('Customer/Dashboard/Addresses/AddressesPage');
    })->name('addresses');
    
    Route::get('/currency', function () {
        return Inertia::render('Customer/Dashboard/Currency/CurrencyPage');
    })->name('currency');

    Route::get('/wallet', function () {
        return Inertia::render('Customer/Dashboard/Wallet/WalletPage');
    })->name('wallet');
    
    Route::get('/help', function () {
        return Inertia::render('Customer/HelpCenterPage');
    })->name('help');
    
    Route::get('/my-list', function () {
        return Inertia::render('Customer/Dashboard/Lists/MyListsPage');
    })->name('my.list');
  
    Route::get('/notifications', function () {
        return Inertia::render('Customer/NotificationsPage');
    })->name('notifications');

    Route::get('/reminder', function () {
        return Inertia::render('Customer/Dashboard/Reminders/ReminderPage');
    })->name('reminder');

    Route::get('/user-manual', function () {
        return Inertia::render('Customer/Dashboard/UserManual/UserManualPage');
    })->name('user_manual');

    Route::get('/offers-alerts', function () {
        return Inertia::render('Customer/OffersAlertsPage');
    })->name('offers.alerts');

    // Order Tracking
    Route::get('/order-tracking', function () {
        return Inertia::render('Customer/OrderTracking');
    })->name('order.tracking');
    
    // Favourites Page
    Route::get('/favourites', function () {
        return Inertia::render('Customer/FavouritesPage');
    })->name('favourites');
    
    // Vouchers and Offers
    Route::get('/vouchers-and-offers', function () {
        return Inertia::render('Customer/Dashboard/Vouchers/VouchersAndOffersPage');
    })->name('vouchers');
});

/*
|--------------------------------------------------------------------------
| Shopkeeper Profile Setup
|--------------------------------------------------------------------------
*/

Route::middleware('auth:shopkeeper')->group(function () {
    Route::get('/profile/setup', function () {
        return Inertia::render('Shopkeeper/Profile/Setup');
    })->name('profile.setup');
});

/*
|--------------------------------------------------------------------------
| Shopkeeper Dashboard Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:shopkeeper', 'shopkeeper.profile.completed'])->group(function () {
    // Dashboard Home
    Route::get('/dashboard', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Dashboard']);
    })->name('dashboard');
    
    // Inventory Management
    Route::get('/inventory', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Inventory']);
    })->name('inventory');
    
    // Add Products
    Route::get('/add-products', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'AddProducts']);
    })->name('add-products');
    
    // Edit Products
    Route::get('/edit-products/{id}', function($id) {
        return Inertia::render('Shopkeeper/Dashboard', [
            'page' => 'AddProducts',
            'productId' => $id
        ]);
    })->name('edit-products');

    // Orders
    Route::get('/orders-received', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Orders']);
    })->name('orders-received');
    
    // Adjustments
    Route::get('/adjustments', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Adjustments']);
    })->name('adjustments');
    
    // Analytics & Reports
    Route::get('/analytics', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Analytics']);
    })->name('analytics');
    
    Route::get('/trends', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Trends']);
    })->name('trends');
    
    // Financial Management
    Route::get('/overheads', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Overheads']);
    })->name('overheads');
    
    Route::get('/accounts', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Accounts']);
    })->name('accounts');
    
    // Marketing & Promotions
    Route::get('/events', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Events']);
    })->name('events');
    
    Route::get('/add-events', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'AddEvents']);
    })->name('add-events');
    
    Route::get('/offers', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Offers']);
    })->name('offers');
    
    Route::get('/create-offers', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'CreateOffers']);
    })->name('create-offers');
    
    Route::get('/messages', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Messages']);
    })->name('messages');

    Route::get('/notifications', function () {
        return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Notifications']);
    })->name('notifications');

    // Settings
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('/subscription', function () {
            return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Settings/Subscription']);
        })->name('subscription');
        
        Route::get('/delivery-settings', function () {
            return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Settings/DeliverySettings']);
        })->name('delivery-settings');

        Route::get('/vouchers', function () {
            return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Settings/Vouchers']);
        })->name('vouchers');
        
        Route::get('/vendor-dashboard', function () {
            return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Settings/VendorDashboard']);
        })->name('vendor-dashboard');

        Route::get('/help-center', function () {
            return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Settings/HelpCenter']);
        })->name('help-center');

        Route::get('/reminder', function () {
            return Inertia::render('Shopkeeper/Dashboard', ['page' => 'Settings/Reminder']);
        })->name('reminder');
    });
});

/*
|--------------------------------------------------------------------------
| Common Pages
|--------------------------------------------------------------------------
*/

Route::get('/privacy-policy', function () {
    return Inertia::render('Common/PrivacyPolicy');
})->name('privacy-policy');

Route::get('/terms-of-service', function () {
    return Inertia::render('Common/TermsOfService');
})->name('terms-of-service');

Route::get('/cookie-policy', function () {
    return Inertia::render('Common/CookiePolicy');
})->name('cookie-policy');

Route::get('/contact', function () {
    return Inertia::render('Common/Contact');
})->name('contact');
