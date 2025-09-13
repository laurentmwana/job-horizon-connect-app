<?php

use App\Enums\CandidacyStatusEnum;
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
        Schema::create('candidacies', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('offer_id');
            $table->uuid('candidate_id');
            $table->foreign('offer_id')
                ->references('id')
                ->on('offers')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreign('candidate_id')
                ->references('id')
                ->on('candidates')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->enum('status', CandidacyStatusEnum::values());
            $table->string('cv_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('candidacies');
    }
};
