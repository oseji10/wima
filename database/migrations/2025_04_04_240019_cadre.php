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
        Schema::create('cadre', function (Blueprint $table) {
            $table->id('cadreId');
            $table->string('cadreName')->nullable();
            $table->unsignedBigInteger('cadreGroupId');
            $table->unsignedBigInteger('cadreSubGroupId');
            $table->string('maximumGradeLevel')->nullable();
            
            $table->string('maximumStep')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();

            $table->foreign('cadreGroupId')->references('cadreGroupId')->on('cadre_group')->onDelete('cascade');
            $table->foreign('cadreSubGroupId')->references('cadreSubGroupId')->on('cadre_subgroup')->onDelete('cascade');
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
