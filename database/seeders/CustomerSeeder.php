<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $customers = [
            [
                'name' => 'Test Customer',
                'email' => 'customer@example.com',
                'password' => Hash::make('password'),
                'phone' => '+92-300-1234567',
                'address' => '123 Main Street, Islamabad, Pakistan',
                'is_active' => true,
            ],
        ];

        foreach ($customers as $customerData) {
            Customer::firstOrCreate(
                ['email' => $customerData['email']],
                $customerData 
            );
        }
    }
}