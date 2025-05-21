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
        Schema::create('staff_leave', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('leaveId');
            $table->unsignedBigInteger('staffId');
            $table->string('startDate')->nullable();
            $table->string('endDate')->nullable();
            $table->unsignedBigInteger('approvedBy');
            $table->timestamps();

            $table->foreign('leaveId')->references('leaveId')->on('leave')->onDelete('cascade');
            $table->foreign('staffId')->references('staffId')->on('staff')->onDelete('cascade');
            $table->foreign('approvedBy')->references('id')->on('users')->onDelete('cascade');
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
