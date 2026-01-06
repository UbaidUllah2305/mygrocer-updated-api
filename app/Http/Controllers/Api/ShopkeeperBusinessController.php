<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShopkeeperBusiness;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ShopkeeperBusinessController extends Controller
{
    /**
     * Show the profile setup page
     */
    public function show(Request $request)
    {
        $shopkeeper = Auth::guard('shopkeeper')->user();
        $business = $shopkeeper->business;
        
        // Create business record if doesn't exist
        if (!$business) {
            $business = ShopkeeperBusiness::create([
                'shopkeeper_id' => $shopkeeper->id,
                'email' => $shopkeeper->email,
                'profile_step' => 0,
                'profile_completed' => false,
            ]);
        }
        
        $step = $request->query('step', max(1, $business->profile_step));
        $step = max(1, min(5, (int)$step));
        
        return Inertia::render('Shopkeeper/Profile/Setup', [
            'currentStep' => $step,
            'business' => $business,
        ]);
    }

    /**
     * Save profile step data
     */
    public function saveStep(Request $request)
    {
        $shopkeeper = Auth::guard('shopkeeper')->user();
        $business = $shopkeeper->business;
        
        if (!$business) {
            // Create business record if it doesn't exist
            $business = ShopkeeperBusiness::create([
                'shopkeeper_id' => $shopkeeper->id,
                'email' => $shopkeeper->email,
                'profile_step' => 0,
                'profile_completed' => false,
            ]);
        }
        
        $step = $request->input('step');
        $validated = $this->validateStep($request, $step);
        
        // Handle file uploads for step 4
        if ($step == 4) {
            $validated = $this->handleFileUploads($request, $validated, $business);
        }
        
        // Update business with step data
        $business->update($validated);
        
        // Update profile step (only move forward, never backward)
        if ($step > $business->profile_step) {
            $business->profile_step = $step;
            $business->save();
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Step saved successfully',
            'nextStep' => $step + 1,
        ]);
    }
    
    /**
     * Complete profile setup
     */
    public function complete(Request $request)
    {
        $shopkeeper = Auth::guard('shopkeeper')->user();
        $business = $shopkeeper->business;
        
        if (!$business) {
            // Create business record if it doesn't exist
            $business = ShopkeeperBusiness::create([
                'shopkeeper_id' => $shopkeeper->id,
                'email' => $shopkeeper->email,
                'profile_step' => 0,
                'profile_completed' => false,
            ]);
        }
        
        $validated = $this->validateStep($request, 5);
        
        $business->update($validated);
        $business->profile_step = 5;
        $business->profile_completed = true;
        $business->profile_completed_at = now();
        $business->save();
        
        return response()->json([
            'success' => true,
            'message' => 'Profile setup completed successfully!',
            'redirect' => route('dashboard'),
        ]);
    }
    
    /**
     * Handle file uploads
     */
    private function handleFileUploads(Request $request, array $validated, $business): array
    {
        // Delete old files if new ones are uploaded
        if ($request->hasFile('business_logo')) {
            if ($business->business_logo) {
                Storage::disk('public')->delete($business->business_logo);
            }
            $validated['business_logo'] = $request->file('business_logo')->store('businesses/logos', 'public');
        }
        
        if ($request->hasFile('shop_signage_picture')) {
            if ($business->shop_signage_picture) {
                Storage::disk('public')->delete($business->shop_signage_picture);
            }
            $validated['shop_signage_picture'] = $request->file('shop_signage_picture')->store('businesses/signage', 'public');
        }
        
        if ($request->hasFile('shop_pictures')) {
            if ($business->shop_pictures) {
                Storage::disk('public')->delete($business->shop_pictures);
            }
            $validated['shop_pictures'] = $request->file('shop_pictures')->store('businesses/shop', 'public');
        }
        
        if ($request->hasFile('promo_pictures')) {
            // Delete old promo pictures
            if ($business->promo_pictures && is_array($business->promo_pictures)) {
                foreach ($business->promo_pictures as $oldPic) {
                    Storage::disk('public')->delete($oldPic);
                }
            }
            
            $promoPaths = [];
            foreach ($request->file('promo_pictures') as $file) {
                $promoPaths[] = $file->store('businesses/promo', 'public');
            }
            $validated['promo_pictures'] = $promoPaths;
        }
        
        return $validated;
    }
    
    /**
     * Validate step data
     */
    private function validateStep(Request $request, int $step): array
    {
        return match($step) {
            1 => $request->validate([
                'owner_name' => 'required|string|max:255',
                'country_code' => 'required|string|max:10',
                'phone_number' => 'required|string|max:20',
                'email' => 'required|email|max:255',
                'whatsapp_number' => 'nullable|string|max:20',
            ]),
            
            2 => $request->validate([
                'store_name' => 'required|string|max:255',
                'branch_name' => 'nullable|string|max:255',
                'business_category' => 'required|string|max:255',
                'business_sub_category' => 'nullable|string|max:255',
                'special_type' => 'nullable|string|max:255',
                'business_license_number' => 'nullable|string|max:100',
                'tax_id' => 'nullable|string|max:100',
                'cr_number' => 'nullable|string|max:100',
                'bank_name' => 'nullable|string|max:255',
                'iban' => 'nullable|string|max:100',
                'region' => 'nullable|string|max:255',
                'shop_country' => 'nullable|string|max:255',
                'shop_city' => 'nullable|string|max:255',
                'location_coordinates' => 'nullable|string|max:255',
                'shop_address' => 'nullable|string|max:500',
                'store_size' => 'nullable|string|max:100',
                'municipality_number' => 'nullable|string|max:100',
            ]),
            
            3 => $request->validate([
                'operating_days' => 'required|array',
                'operating_days.*' => 'string|in:Mon,Tue,Wed,Thu,Fri,Sat,Sun',
                'opening_time' => 'required|date_format:H:i',
                'closing_time' => 'required|date_format:H:i',
                'break_start' => 'nullable|date_format:H:i',
                'break_end' => 'nullable|date_format:H:i',
                'delivery_fee' => 'nullable|numeric|min:0',
                'free_delivery_price_range' => 'nullable|numeric|min:0',
                'average_delivery_time' => 'nullable|string|max:100',
                'minimum_order_value' => 'nullable|numeric|min:0',
                'delivery_radius' => 'nullable|numeric|min:0',
            ]),
            
            4 => $request->validate([
                'business_logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
                'shop_signage_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
                'shop_pictures' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
                'promo_pictures' => 'nullable|array',
                'promo_pictures.*' => 'image|mimes:jpeg,png,jpg,gif|max:5120',
            ]),
            
            5 => $request->validate([
                'home_delivery' => 'nullable|in:yes,no',
                'online_payment' => 'nullable|in:yes,no',
                'exchange_policy' => 'nullable|in:yes,no',
                'mobile_pos' => 'nullable|in:yes,no',
                'cash_on_delivery' => 'nullable|in:yes,no',
                'return_policy' => 'nullable|in:yes,no',
                'pickup' => 'nullable|in:yes,no',
            ]),
            
            default => [],
        };
    }
}
