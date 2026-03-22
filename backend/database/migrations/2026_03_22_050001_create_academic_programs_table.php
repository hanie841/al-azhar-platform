<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('academic_programs', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->json('name');                    // translatable
            $table->json('description')->nullable(); // translatable
            $table->string('degree_level');          // bachelor, master, doctorate, diploma
            $table->string('duration')->nullable();  // e.g. "4 years", "2 years"
            $table->integer('credit_hours')->nullable();
            $table->json('requirements')->nullable(); // translatable
            $table->json('career_prospects')->nullable(); // translatable
            $table->foreignId('faculty_id')->constrained()->cascadeOnDelete();
            $table->foreignId('department_id')->nullable()->constrained()->nullOnDelete();
            $table->integer('order')->default(0);
            $table->boolean('is_published')->default(true);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('academic_programs');
    }
};
