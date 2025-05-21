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
        Schema::create('databank', function (Blueprint $table) {
            $table->id();
            $table->string('userId')->nullable();
            $table->string('name')->nullable();
            $table->string('phone')->nullable();
            $table->string('age')->nullable();
            $table->string('gender')->nullable();
            $table->unsignedBigInteger('state')->nullable();
            $table->unsignedBigInteger('lga')->nullable();
            $table->string('community')->nullable();
            $table->string('limited')->nullable();
            $table->string('religion')->nullable();
            $table->string('disability')->nullable();
            $table->string('physicalChallenge')->nullable();
            $table->string('operator')->nullable();
            $table->string('district')->nullable();
            $table->string('mspType')->nullable();
            $table->string('qualification')->nullable();
            $table->string('languages')->nullable();
            $table->string('idType')->nullable();
            $table->string('idNumber')->nullable();
            $table->string('availability')->nullable();
            $table->string('preExistingHealthMatter')->nullable();
            $table->string('nursingMother')->nullable();
            $table->string('birthCertificate')->nullable();

           
            
            
            $table->timestamps();
            
            $table->foreign('state')->references('stateId')->on('state')->onDelete('cascade');
            $table->foreign('lga')->references('lgaId')->on('lga')->onDelete('cascade');
           
        });

        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
        Schema::dropIfExists('job_batches');
        Schema::dropIfExists('failed_jobs');
    }
};
