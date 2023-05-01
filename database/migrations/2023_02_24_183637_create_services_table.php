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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_id')->constrained('restaurants')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->string('service');
            $table->date('date');
            $table->string('from');
            $table->string('to');
            $table->integer('interval');
            $table->boolean('active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * 
     */

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
