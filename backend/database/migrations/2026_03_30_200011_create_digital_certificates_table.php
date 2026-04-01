<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('digital_certificates', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id')->index();
            $table->foreignId('lms_course_id')->nullable()->constrained()->nullOnDelete();
            $table->string('certificate_type');
            $table->json('title');
            $table->text('description')->nullable();
            $table->string('certificate_number')->unique();
            $table->string('qr_code')->nullable();
            $table->string('verification_url')->nullable();
            $table->date('issued_at');
            $table->date('expires_at')->nullable();
            $table->json('template_data')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('digital_certificates');
    }
};
