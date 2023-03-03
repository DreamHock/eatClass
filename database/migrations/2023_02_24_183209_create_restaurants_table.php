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
            $table->foreignId('category_id')->constrained('categories');
            $table->string('name');
            $table->string('city');
            $table->string('logoPath')->default(fake()->text());
            $table->double('latitude')->default(8.12345);
            $table->double('longitude')->default(7.12345);
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
