<?php

namespace App\Models;

use App\Notifications\ShopkeeperResetPasswordNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Shopkeeper extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'shopkeepers';

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'address',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    /**
     * Get the Shopkeeper Business profile for the shopkeeper
     */
    public function business()
    {
        return $this->hasOne(ShopkeeperBusiness::class);
    }

    /**
     * Check if profile is completed
     */
    public function hasCompletedProfile(): bool
    {
        return $this->business && $this->business->profile_completed;
    }

    /**
     * Get current profile step
     */
    public function getCurrentProfileStep(): int
    {
        return $this->business ? $this->business->profile_step : 0;
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ShopkeeperResetPasswordNotification($token));
    }
}
