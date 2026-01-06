<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ShopkeeperBusiness extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'shopkeeper_id',
        
        // Step 1: Basic Info
        'owner_name',
        'country_code',
        'phone_number',
        'email',
        'whatsapp_number',
        
        // Step 2: Business Registration
        'store_name',
        'branch_name',
        'business_category',
        'business_sub_category',
        'special_type',
        'business_license_number',
        'tax_id',
        'cr_number',
        'bank_name',
        'iban',
        'region',
        'shop_country',
        'shop_city',
        'location_coordinates',
        'shop_address',
        'store_size',
        'municipality_number',
        
        // Step 3: Operating Details
        'operating_days',
        'opening_time',
        'closing_time',
        'break_start',
        'break_end',
        'delivery_fee',
        'free_delivery_price_range',
        'average_delivery_time',
        'minimum_order_value',
        'delivery_radius',
        
        // Step 4: Promo/Info Graphics
        'business_logo',
        'shop_signage_picture',
        'shop_pictures',
        'promo_pictures',
        
        // Step 5: Services & Policies
        'home_delivery',
        'online_payment',
        'exchange_policy',
        'mobile_pos',
        'cash_on_delivery',
        'return_policy',
        'pickup',
        
        // Tracking
        'profile_step',
        'profile_completed',
        'profile_completed_at',
    ];

    protected $casts = [
        'operating_days' => 'array',
        'promo_pictures' => 'array',
        'opening_time' => 'datetime:H:i',
        'closing_time' => 'datetime:H:i',
        'break_start' => 'datetime:H:i',
        'break_end' => 'datetime:H:i',
        'minimum_order_value' => 'decimal:2',
        'delivery_fee' => 'decimal:2',
        'delivery_radius' => 'decimal:2',
        'free_delivery_price_range' => 'decimal:2',
        'profile_step' => 'integer',
        'profile_completed' => 'boolean',
        'profile_completed_at' => 'datetime',
    ];

    /**
     * Get the shopkeeper that owns the business
     */
    public function shopkeeper()
    {
        return $this->belongsTo(Shopkeeper::class);
    }

    /**
     * Check if a specific step is completed
     */
    public function isStepCompleted(int $step): bool
    {
        return $this->profile_step >= $step;
    }

    /**
     * Get completion percentage
     */
    public function getCompletionPercentage(): int
    {
        return ($this->profile_step / 5) * 100;
    }
    
    /**
     * Get full phone number with country code
     */
    public function getFullPhoneNumberAttribute(): string
    {
        return $this->country_code . $this->phone_number;
    }
}
