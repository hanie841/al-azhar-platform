<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('faculty_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->foreignId('faculty_id')->nullable()->nullOnDelete();
            $table->foreignId('department_id')->nullable()->nullOnDelete();
            $table->string('employee_id')->nullable()->unique();
            $table->json('title')->nullable();
            $table->string('academic_rank')->nullable();
            $table->json('specialization')->nullable();
            $table->json('bio')->nullable();
            $table->string('phone')->nullable();
            $table->string('office_location')->nullable();
            $table->json('office_hours')->nullable();
            $table->json('research_interests')->nullable();
            $table->json('qualifications')->nullable();
            $table->integer('publications_count')->default(0);
            $table->string('cv_file_path')->nullable();
            $table->string('website_url')->nullable();
            $table->string('google_scholar_url')->nullable();
            $table->string('orcid')->nullable();
            $table->string('scopus_id')->nullable();
            $table->string('photo')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_public')->default(true);
            $table->date('joined_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('faculty_profiles');
    }
};
