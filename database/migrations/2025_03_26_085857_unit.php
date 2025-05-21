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
        Schema::create('unit', function (Blueprint $table) {
            $table->id('unitId');
            $table->string('unitName')->nullable();
            $table->string('unitType')->nullable();
            $table->string('status')->nullable();
            $table->unsignedBigInteger('dba')->nullable();
            $table->timestamps();

            $table->foreign('dba')->references('dbaId')->on('dba')->onDelete('cascade');
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
