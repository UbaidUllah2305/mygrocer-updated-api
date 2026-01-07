<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomerBusiness extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'customer_id',
        'customer_name',
        'country_code',
        'phone_number',
        'email',
        'country',
        'city',
        'zip_code',
        'profile_step',
        'profile_completed',
        'profile_completed_at',
    ];

    protected $casts = [
        'profile_step' => 'integer',
        'profile_completed' => 'boolean',
        'profile_completed_at' => 'datetime',
    ];

    /**
     * Get the customer that owns the business
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     * Check if profile is completed
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
        return $this->profile_step > 0 ? 100 : 0;
    }
    
    /**
     * Get full phone number with country code
     */
    public function getFullPhoneNumberAttribute(): string
    {
        return $this->country_code . $this->phone_number;
    }
}
