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
        Schema::create('lga', function (Blueprint $table) {
            $table->id('lgaId');
            
            $table->string('lgaName');
            $table->unsignedBigInteger('state')->nullable();
            $table->timestamps();

           
            $table->foreign('state')->references('stateId')->on('state')->onDelete('cascade');
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
