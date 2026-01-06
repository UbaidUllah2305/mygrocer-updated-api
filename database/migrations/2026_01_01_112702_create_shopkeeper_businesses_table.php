<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('shopkeeper_businesses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shopkeeper_id')->constrained('shopkeepers')->onDelete('cascade');
            
            // Step 1: Basic Info
            $table->string('owner_name')->nullable();
            $table->string('country_code', 10)->default('+92');
            $table->string('phone_number', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('whatsapp_number', 20)->nullable();
            
            // Step 2: Business Registration
            $table->string('store_name')->nullable();
            $table->string('branch_name')->nullable();
            $table->string('business_category')->nullable();
            $table->string('business_sub_category')->nullable();
            $table->string('special_type')->nullable();
            $table->string('business_license_number')->nullable();
            $table->string('tax_id')->nullable();
            $table->string('cr_number')->nullable();
            $table->string('bank_name')->nullable();
            $table->string('iban')->nullable();
            $table->string('region')->nullable();
            $table->string('shop_country')->nullable();
            $table->string('shop_city')->nullable();
            $table->string('location_coordinates')->nullable();
            $table->text('shop_address')->nullable();
            $table->string('store_size')->nullable();
            $table->string('municipality_number')->nullable();
            
            // Step 3: Operating Details
            $table->json('operating_days')->nullable();
            $table->time('opening_time')->nullable();
            $table->time('closing_time')->nullable();
            $table->time('break_start')->nullable();
            $table->time('break_end')->nullable();
            $table->decimal('delivery_fee', 10, 2)->nullable();
            $table->decimal('free_delivery_price_range', 10, 2)->nullable();
            $table->string('average_delivery_time')->nullable();
            $table->decimal('minimum_order_value', 10, 2)->nullable();
            $table->decimal('delivery_radius', 10, 2)->nullable();
            
            // Step 4: Promo/Info Graphics
            $table->string('business_logo')->nullable();
            $table->string('shop_signage_picture')->nullable();
            $table->string('shop_pictures')->nullable();
            $table->json('promo_pictures')->nullable();
            
            // Step 5: Services & Policies (yes/no values)
            $table->enum('home_delivery', ['yes', 'no'])->default('no');
            $table->enum('online_payment', ['yes', 'no'])->default('no');
            $table->enum('exchange_policy', ['yes', 'no'])->default('no');
            $table->enum('mobile_pos', ['yes', 'no'])->default('no');
            $table->enum('cash_on_delivery', ['yes', 'no'])->default('no');
            $table->enum('return_policy', ['yes', 'no'])->default('no');
            $table->enum('pickup', ['yes', 'no'])->default('no');
            
            // Profile tracking
            $table->integer('profile_step')->default(0)->comment('0-5: steps completed');
            $table->boolean('profile_completed')->default(false);
            $table->timestamp('profile_completed_at')->nullable();
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('shopkeeper_id');
            $table->index('store_name');
            $table->index('profile_completed');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shopkeeper_businesses');
    }
};
