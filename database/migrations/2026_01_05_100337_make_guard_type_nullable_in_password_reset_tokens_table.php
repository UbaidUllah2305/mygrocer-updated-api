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
        Schema::table('password_reset_tokens', function (Blueprint $table) {
            // Add guard_type column if it doesn't exist
            if (!Schema::hasColumn('password_reset_tokens', 'guard_type')) {
                $table->string('guard_type')->nullable()->after('token');
                $table->index(['email', 'guard_type']);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('password_reset_tokens', function (Blueprint $table) {
            if (Schema::hasColumn('password_reset_tokens', 'guard_type')) {
                $table->dropIndex(['email', 'guard_type']);
                $table->dropColumn('guard_type');
            }
        });
    }
};
