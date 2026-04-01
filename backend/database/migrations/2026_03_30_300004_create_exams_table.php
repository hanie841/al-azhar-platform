<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->json('title');
            $table->string('slug')->unique();
            $table->json('description')->nullable();
            $table->unsignedBigInteger('course_section_id')->nullable();
            $table->unsignedBigInteger('lms_course_id')->nullable();
            $table->string('exam_type');
            $table->string('creation_method')->default('manual');
            $table->decimal('total_marks', 6, 2);
            $table->decimal('pass_marks', 6, 2)->nullable();
            $table->integer('duration_minutes');
            $table->integer('max_attempts')->default(1);
            $table->boolean('shuffle_questions')->default(false);
            $table->boolean('shuffle_options')->default(false);
            $table->string('show_results')->default('after_submission');
            $table->timestamp('results_available_at')->nullable();
            $table->timestamp('starts_at')->nullable();
            $table->timestamp('ends_at')->nullable();
            $table->json('instructions')->nullable();
            $table->boolean('is_proctored')->default(false);
            $table->boolean('allow_backtrack')->default(true);
            $table->boolean('is_published')->default(false);
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};
