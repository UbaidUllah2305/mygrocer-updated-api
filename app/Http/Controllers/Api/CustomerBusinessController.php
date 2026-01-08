<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CustomerBusiness;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerBusinessController extends Controller
{
    /**
     * Save profile step data
     */
    public function saveStep(Request $request)
    {
        $customer = Auth::guard('customer')->user();
        $business = $customer->business;
        
        if (!$business) {
            $business = CustomerBusiness::create([
                'customer_id' => $customer->id,
                'email' => $customer->email,
                'profile_step' => 0,
                'profile_completed' => false,
            ]);
        }
        
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'country_code' => 'required|string|max:10',
            'phone_number' => 'required|string|max:20',
            'email' => 'required|email|max:255',
            'country' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:20',
        ]);
        
        $business->update($validated);
        $business->profile_step = 1;
        $business->profile_completed = true;
        $business->profile_completed_at = now();
        $business->save();
        
        // Refresh the customer's business relationship
        $customer->refresh();
        $customer->load('business');
        
        return response()->json([
            'success' => true,
            'message' => 'Profile setup completed successfully!',
            'redirect' => route('customer.dashboard'),
        ]);
    }
}
