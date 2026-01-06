<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShopkeeperBusiness;
use App\Models\Shopkeeper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class ShopkeeperAuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:shopkeepers,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $shopkeeper = Shopkeeper::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Create business profile - ensure it's created
        $business = ShopkeeperBusiness::create([
            'shopkeeper_id' => $shopkeeper->id,
            'email' => $shopkeeper->email,
            'profile_step' => 0,
            'profile_completed' => false,
        ]);

        Auth::guard('shopkeeper')->login($shopkeeper);
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => 'Registration successful! Please complete your profile.',
            'user' => $shopkeeper,
            'redirect' => route('profile.setup'),
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::guard('shopkeeper')->attempt($credentials, $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $request->session()->regenerate();
        
        $shopkeeper = Auth::guard('shopkeeper')->user();
        
        // Check if profile is completed
        if (!$shopkeeper->hasCompletedProfile()) {
            return response()->json([
                'success' => true,
                'message' => 'Please complete your profile setup.',
                'user' => $shopkeeper,
                'redirect' => route('profile.setup'),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Login successful!',
            'user' => $shopkeeper,
            'redirect' => route('dashboard'),
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('shopkeeper')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully!',
            'redirect' => route('shopkeeper.home'),
        ]);
    }

    public function user(Request $request)
    {
        $shopkeeper = Auth::guard('shopkeeper')->user();
        $shopkeeper->load('business');
        
        return response()->json([
            'success' => true,
            'user' => $shopkeeper,
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:shopkeepers,email',
        ]);

        // Find the shopkeeper
        $shopkeeper = Shopkeeper::where('email', $request->email)->first();

        if (!$shopkeeper) {
            throw ValidationException::withMessages([
                'email' => ['The provided email does not exist.'],
            ]);
        }

        try {
            // Send password reset notification
            $status = Password::broker('shopkeepers')->sendResetLink(
                $request->only('email')
            );

            // Update the token record with guard_type after Laravel creates it
            if ($status === Password::RESET_LINK_SENT) {
                // Update the most recent token for this email
                DB::table('password_reset_tokens')
                    ->where('email', $request->email)
                    ->where(function($query) {
                        $query->whereNull('guard_type')
                              ->orWhere('guard_type', '');
                    })
                    ->update(['guard_type' => 'shopkeeper']);
            }

            if ($status === Password::RESET_LINK_SENT) {
                return response()->json([
                    'success' => true,
                    'message' => 'Password reset link has been sent to your email!',
                ]);
            }

            throw ValidationException::withMessages([
                'email' => [__($status)],
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Password reset error: ' . $e->getMessage());
            
            throw ValidationException::withMessages([
                'email' => ['Failed to send password reset link. Please try again.'],
            ]);
        }
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:shopkeepers,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Find token with guard_type
        $tokenRecord = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', hash('sha256', $request->token))
            ->where('guard_type', 'shopkeeper')
            ->first();

        if (!$tokenRecord) {
            throw ValidationException::withMessages([
                'email' => ['Invalid or expired reset token.'],
            ]);
        }

        $shopkeeper = Shopkeeper::where('email', $request->email)->first();

        if (!$shopkeeper) {
            throw ValidationException::withMessages([
                'email' => ['User not found.'],
            ]);
        }

        // Update password
        $shopkeeper->forceFill([
            'password' => Hash::make($request->password)
        ])->save();

        // Delete the token
        DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('guard_type', 'shopkeeper')
            ->delete();

        $status = Password::PASSWORD_RESET;

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'success' => true,
                'message' => 'Password has been reset successfully!',
            ]);
        }

        throw ValidationException::withMessages([
            'email' => [__($status)],
        ]);
    }
}
