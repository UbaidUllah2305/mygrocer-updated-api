<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureCustomerProfileCompleted
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth('customer')->check()) {
            $customer = auth('customer')->user();
            
            // Load the business relationship if not already loaded
            if (!$customer->relationLoaded('business')) {
                $customer->load('business');
            }
            
            // Check if business profile is completed
            if (!$customer->hasCompletedProfile()) {
                // Allow access to profile setup page and related API routes
                $allowedRoutes = [
                    'profile*',
                    'api/v1/customer/logout',
                    'api/v1/customer/profile/*',
                    'api/v1/customer/user'
                ];
                
                foreach ($allowedRoutes as $route) {
                    if ($request->is($route)) {
                        return $next($request);
                    }
                }
                
                // For AJAX requests, return JSON response
                if ($request->expectsJson()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Please complete your profile setup first.',
                        'redirect' => route('profile')
                    ], 302);
                }
                
                // For regular requests, redirect to profile setup
                return redirect()->route('profile')->with('message', 'Please complete your profile setup first.');
            }
        }
        
        return $next($request);
    }
}
