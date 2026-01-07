<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\CustomerBusiness;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class CustomerAuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:customers,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $customer = Customer::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Create business profile - ensure it's created
        $business = CustomerBusiness::create([
            'customer_id' => $customer->id,
            'email' => $customer->email,
            'profile_step' => 0,
            'profile_completed' => false,
        ]);

        Auth::guard('customer')->login($customer);
        $request->session()->regenerate();

        return response()->json([
            'success' => true,
            'message' => 'Registration successful! Please complete your profile.',
            'user' => $customer,
            'redirect' => route('profile'),
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::guard('customer')->attempt($credentials, $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $request->session()->regenerate();
        
        $customer = Auth::guard('customer')->user();
        
        // Check if profile is completed
        if (!$customer->hasCompletedProfile()) {
            return response()->json([
                'success' => true,
                'message' => 'Please complete your profile setup.',
                'user' => $customer,
                'redirect' => route('profile'),
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Login successful!',
            'user' => $customer,
            'redirect' => route('customer.dashboard'),
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('customer')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully!',
            'redirect' => route('customer.home'),
        ]);
    }

    public function user(Request $request)
    {
        $customer = Auth::guard('customer')->user();
        $customer->load('business');
        
        return response()->json([
            'success' => true,
            'user' => $customer,
        ]);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:customers,email',
        ]);

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer) {
            throw ValidationException::withMessages([
                'email' => ['The provided email does not exist.'],
            ]);
        }

        try {
            $status = Password::broker('customers')->sendResetLink(
                $request->only('email')
            );

            if ($status === Password::RESET_LINK_SENT) {
                DB::table('password_reset_tokens')
                    ->where('email', $request->email)
                    ->where(function($query) {
                        $query->whereNull('guard_type')
                              ->orWhere('guard_type', '');
                    })
                    ->update(['guard_type' => 'customer']);
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
            'email' => 'required|email|exists:customers,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $tokenRecord = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', hash('sha256', $request->token))
            ->where('guard_type', 'customer')
            ->first();

        if (!$tokenRecord) {
            throw ValidationException::withMessages([
                'email' => ['Invalid or expired reset token.'],
            ]);
        }

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer) {
            throw ValidationException::withMessages([
                'email' => ['User not found.'],
            ]);
        }

        $customer->forceFill([
            'password' => Hash::make($request->password)
        ])->save();

        DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('guard_type', 'customer')
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
