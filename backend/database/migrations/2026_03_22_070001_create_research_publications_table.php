<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('research_publications', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->json('title');                        // translatable
            $table->json('abstract')->nullable();         // translatable
            $table->json('authors')->nullable();          // array of author names
            $table->json('journal_name')->nullable();     // translatable
            $table->date('publication_date')->nullable();
            $table->string('doi')->nullable();
            $table->integer('citation_count')->default(0);
            $table->string('research_area')->nullable();  // islamic_studies, science, medicine, engineering, humanities, law, education, agriculture
            $table->string('publication_type')->nullable(); // journal_article, conference_paper, book, thesis, report
            $table->string('pdf_url')->nullable();
            $table->string('external_url')->nullable();
            $table->foreignId('faculty_id')->nullable()->constrained()->nullOnDelete();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('research_publications');
    }
};
