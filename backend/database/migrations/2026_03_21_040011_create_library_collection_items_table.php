<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('library_collection_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('collection_id')->constrained('library_collections')->cascadeOnDelete();
            $table->foreignId('library_item_id')->constrained('library_items')->cascadeOnDelete();
            $table->integer('order')->default(0);
            $table->timestamps();

            $table->unique(['collection_id', 'library_item_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('library_collection_items');
    }
};
