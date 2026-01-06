<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): Response
    {
        $request->authenticate();

        $request->session()->regenerate();

        return response()->noContent();
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        // Logout from all guards (customer and shopkeeper)
        if (Auth::guard('customer')->check()) {
            Auth::guard('customer')->logout();
        }
        if (Auth::guard('shopkeeper')->check()) {
            Auth::guard('shopkeeper')->logout();
        }

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
