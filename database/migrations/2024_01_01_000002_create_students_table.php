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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('student_id')->unique()->comment('Student ID number');
            $table->string('name')->comment('Student full name');
            $table->string('email')->unique()->comment('Student email');
            $table->string('phone')->nullable()->comment('Student phone number');
            $table->string('class')->comment('Student class/grade');
            $table->date('birth_date')->nullable()->comment('Student birth date');
            $table->text('address')->nullable()->comment('Student address');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Student status');
            $table->timestamps();
            
            $table->index('student_id');
            $table->index('name');
            $table->index('class');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};