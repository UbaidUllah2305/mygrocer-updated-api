<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureCustomerProfileCompleted
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth('customer')->check()) {
            $customer = auth('customer')->user();
            
            // Check if business profile is completed
            if (!$customer->hasCompletedProfile()) {
                // Don't redirect if already on profile setup page
                if (!$request->is('profile*')) {
                    return redirect()->route('profile');
                }
            }
        }
        
        return $next($request);
    }
}
