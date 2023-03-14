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
        Schema::create('default_services', function (Blueprint $table) {
            $table->id();
            $table->string('service');
            $table->foreignId('restaurant_id');
            $table->string('typeDay')->default('regular');
            $table->string('weekDayName');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('default_services');
    }
};
