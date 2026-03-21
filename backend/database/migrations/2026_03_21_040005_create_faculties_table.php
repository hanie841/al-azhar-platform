<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('faculties', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('type'); // faculty, institute, center, hospital
            $table->json('name');
            $table->json('description')->nullable();
            $table->json('dean_message')->nullable();
            $table->string('logo')->nullable();
            $table->string('cover_image')->nullable();
            $table->integer('established_year')->nullable();
            $table->string('website_url')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->decimal('location_lat', 10, 7)->nullable();
            $table->decimal('location_lng', 10, 7)->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_published')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('faculties');
    }
};
