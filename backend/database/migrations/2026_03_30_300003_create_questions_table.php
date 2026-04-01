<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_bank_id')->constrained('question_banks')->cascadeOnDelete();
            $table->unsignedBigInteger('question_category_id')->nullable();
            $table->string('question_type');
            $table->string('difficulty')->default('medium');
            $table->json('content');
            $table->json('options')->nullable();
            $table->json('correct_answer')->nullable();
            $table->json('explanation')->nullable();
            $table->decimal('points', 5, 2)->default(1);
            $table->integer('time_limit_seconds')->nullable();
            $table->json('tags')->nullable();
            $table->string('learning_outcome')->nullable();
            $table->foreignId('created_by')->constrained('users');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('question_category_id')->references('id')->on('question_categories')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
