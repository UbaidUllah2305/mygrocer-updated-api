<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureShopkeeperProfileCompleted
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth('shopkeeper')->check()) {
            $shopkeeper = auth('shopkeeper')->user();
            
            // Check if business profile is completed
            if (!$shopkeeper->hasCompletedProfile()) {
                // Don't redirect if already on profile setup page
                if (!$request->is('profile*')) {
                    return redirect()->route('profile.setup');
                }
            }
        }
        
        return $next($request);
    }
}
