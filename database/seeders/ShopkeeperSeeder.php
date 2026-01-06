<?php

namespace Database\Seeders;

use App\Models\Shopkeeper;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ShopkeeperSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shopkeepers = [
            [
                'name' => 'John Doe',
                'email' => 'shopkeeper@example.com',
                'password' => Hash::make('password'),
                'phone' => '+92-300-1234567',
                'address' => 'Test Grocery Store, Main Market, Islamabad',
                'is_active' => true,
            ],
        ];

        foreach ($shopkeepers as $data) {
            Shopkeeper::firstOrCreate(
                ['email' => $data['email']],
                $data                         
            );
        }
    }
}