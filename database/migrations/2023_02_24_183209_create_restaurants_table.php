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
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->foreignId('user_id')->constrained('users');
            $table->string('phone');
            $table->string('name');
            $table->string('address');
            $table->string('city');
            $table->text('location');
            $table->string('logoPath')->default('');
            $table->double('latitude')->nullable();
            $table->double('longitude')->nullable();
            $table->decimal('average_rating', 3, 2)->default(0.00); // Stores rating from 0.00 to 5.00
            $table->integer('rating_count')->default(0); // Stores the number of ratings
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};
