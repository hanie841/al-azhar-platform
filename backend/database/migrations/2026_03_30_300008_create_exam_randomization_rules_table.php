<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exam_randomization_rules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained('exams')->cascadeOnDelete();
            $table->foreignId('question_bank_id')->constrained('question_banks')->cascadeOnDelete();
            $table->unsignedBigInteger('question_category_id')->nullable();
            $table->string('question_type')->nullable();
            $table->string('difficulty')->nullable();
            $table->integer('count');
            $table->decimal('points_per_question', 5, 2);
            $table->timestamps();

            $table->foreign('question_category_id')->references('id')->on('question_categories')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exam_randomization_rules');
    }
};
