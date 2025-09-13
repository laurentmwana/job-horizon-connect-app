<?php

use App\Enums\ParticipatedStatusEnum;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('participants', function (Blueprint $table) {
            $table->uuid('activity_id');
            $table->foreign('activity_id')
                ->references('id')
                ->on('activities')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->enum('status', ParticipatedStatusEnum::values());
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('participants', function (Blueprint $table) {
            $table->dropForeign('activity_id');
            $table->dropColumn('status');
        });
    }
};
