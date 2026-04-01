<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('study_plan_courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('study_plan_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->integer('semester_number');
            $table->boolean('is_elective')->default(false);
            $table->timestamps();

            $table->unique(['study_plan_id', 'course_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('study_plan_courses');
    }
};
