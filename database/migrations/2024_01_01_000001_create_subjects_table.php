<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Subject name');
            $table->string('code')->unique()->comment('Subject code');
            $table->text('description')->nullable()->comment('Subject description');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Subject status');
            $table->timestamps();
            
            $table->index('name');
            $table->index('code');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};