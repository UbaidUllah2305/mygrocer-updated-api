<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CustomerSeeder::class,
            ShopkeeperSeeder::class,
        ]);

        $this->command->info('All seeders completed successfully!');
    }
}
