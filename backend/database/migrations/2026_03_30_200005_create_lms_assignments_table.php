<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lms_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lms_course_id')->constrained()->cascadeOnDelete();
            $table->json('title');
            $table->json('description')->nullable();
            $table->string('assignment_type');
            $table->decimal('max_score', 5, 2)->default(100);
            $table->decimal('weight_percentage', 5, 2)->nullable();
            $table->timestamp('due_date')->nullable();
            $table->boolean('allow_late')->default(false);
            $table->decimal('late_penalty_percent', 5, 2)->default(0);
            $table->integer('max_attempts')->default(1);
            $table->boolean('is_published')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lms_assignments');
    }
};
