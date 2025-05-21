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
        Schema::create('cadre_subgroup', function (Blueprint $table) {
            $table->id('cadreSubGroupId');
            $table->unsignedBigInteger('cadreGroupId');
            $table->string('cadreSubGroupName')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();

            $table->foreign('cadreGroupId')->references('cadreGroupId')->on('cadre_group')->onDelete('cascade');
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
