<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lesson_progresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lms_lesson_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('student_id')->index();
            $table->string('status')->default('not_started');
            $table->integer('progress_percentage')->default(0);
            $table->integer('last_position')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->unique(['lms_lesson_id', 'student_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_progresses');
    }
};
