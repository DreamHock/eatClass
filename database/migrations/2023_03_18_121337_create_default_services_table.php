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
            $table->foreignId('default_day_id')->constrained('default_days')->cascadeOnDelete();
            $table->string('service');
            $table->string('from');
            $table->string('to');
            $table->integer('interval');
            $table->boolean('active')->default(true);
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
