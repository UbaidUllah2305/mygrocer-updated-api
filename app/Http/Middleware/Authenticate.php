<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        if (empty($guards)) {
            $guards = [null];
        }

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {
                return $next($request);
            }
        }

        // Redirect based on guard
        if (in_array('customer', $guards)) {
            return redirect()->guest(route('customer.login'));
        }

        if (in_array('shopkeeper', $guards)) {
            return redirect()->guest(route('shopkeeper.login'));
        }

        return redirect()->guest(route('login'));
    }
}
