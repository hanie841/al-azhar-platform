<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->json('name');
            $table->json('title')->nullable();
            $table->json('bio')->nullable();
            $table->string('photo')->nullable();
            $table->string('position')->nullable();
            $table->string('organization_unit')->nullable();
            $table->string('era')->nullable(); // fatimid, mamluk, ottoman, modern, contemporary
            $table->integer('birth_year')->nullable();
            $table->integer('death_year')->nullable();
            $table->boolean('is_historical')->default(false);
            $table->boolean('is_current_leadership')->default(false);
            $table->integer('order')->default(0);
            $table->boolean('is_published')->default(false);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('people');
    }
};
