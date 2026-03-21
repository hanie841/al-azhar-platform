<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('library_items', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->json('title');
            $table->json('subtitle')->nullable();
            $table->json('description')->nullable();
            $table->json('abstract')->nullable();
            $table->string('type'); // manuscript, book, thesis, research, journal_article
            $table->json('authors')->nullable();
            $table->string('publisher')->nullable();
            $table->integer('publication_year')->nullable();
            $table->string('edition')->nullable();
            $table->string('isbn')->nullable();
            $table->string('issn')->nullable();
            $table->string('doi')->nullable();
            $table->string('language')->default('ar');
            $table->json('subjects')->nullable();
            $table->foreignId('faculty_id')->nullable()->constrained('faculties')->nullOnDelete();
            $table->foreignId('department_id')->nullable()->constrained('departments')->nullOnDelete();
            $table->string('era')->nullable();
            $table->integer('page_count')->nullable();
            $table->string('access_level')->default('free'); // free, registered, premium
            $table->string('file_path')->nullable();
            $table->string('cover_image')->nullable();
            $table->json('manuscript_images')->nullable();
            $table->unsignedBigInteger('views_count')->default(0);
            $table->unsignedBigInteger('downloads_count')->default(0);
            $table->boolean('is_published')->default(false);
            $table->timestamp('published_at')->nullable();
            $table->longText('full_text')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('library_items');
    }
};
