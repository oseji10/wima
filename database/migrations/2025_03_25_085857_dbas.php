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
        Schema::create('dba', function (Blueprint $table) {
            $table->id('dbaId');
            $table->string('dbaName')->nullable();
            $table->string('dbaType')->nullable();
            $table->string('status')->nullable();
            $table->unsignedBigInteger('secretariat')->nullable();
            $table->timestamps();

            $table->foreign('secretariat')->references('secretariatId')->on('secretariat')->onDelete('cascade');
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
