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
        Schema::create('msps', function (Blueprint $table) {
            $table->id();
            $table->string('mspId')->nullable();
            $table->string('mspName')->nullable();
            $table->unsignedBigInteger('state')->nullable();
            $table->unsignedBigInteger('lga')->nullable();
            $table->string('communityName')->nullable();
            $table->unsignedBigInteger('position')->nullable();
            $table->unsignedBigInteger('membership')->nullable();
            $table->string('services')->nullable();
            
            $table->timestamps();
            $table->foreign('position')->references('positionId')->on('positions')->onDelete('cascade');
            $table->foreign('membership')->references('membershipPlanId')->on('membership_plans')->onDelete('cascade');
            $table->foreign('state')->references('stateId')->on('state')->onDelete('cascade');
            $table->foreign('lga')->references('lgaId')->on('lga')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
