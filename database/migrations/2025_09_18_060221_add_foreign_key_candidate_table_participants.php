<?php

use App\Enums\GenderEnum;
use App\Enums\ProfessionEnum;
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
            $table->dropColumn('name');
            $table->dropColumn('firstname');
            $table->dropColumn('email');
            $table->dropColumn('profession');
            $table->dropColumn('gender');
            
            $table->uuid('candidate_id');
            $table->foreign('candidate_id')
                ->references('id')
                ->on('candidates')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->dateTime('participant_at')->nullable();
        
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('participants', function (Blueprint $table) {
            $table->string('name');
            $table->string('firstname');
            $table->string('email');
            $table->enum('profession', ProfessionEnum::values());
            $table->enum('gender', GenderEnum::values());
        });
    }
};
