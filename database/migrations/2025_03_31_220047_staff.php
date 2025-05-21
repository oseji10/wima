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
        Schema::create('staff', function (Blueprint $table) {
            $table->id('staffId');
            $table->string('fileNumber')->nullable();
            $table->string('surname')->nullable();
            $table->string('firstName')->nullable();
            $table->string('otherNames')->nullable();
            $table->string('dateOfBirth')->nullable();
            $table->string('gender')->nullable();
            $table->string('stateOfOrigin')->nullable();
            $table->string('lgaOfOrigin')->nullable();
            $table->string('dateOfFirstAppointment')->nullable();
            $table->string('dateOfPresentAppointment')->nullable();
            $table->string('dateOfConfirmation')->nullable();
            $table->unsignedBigInteger('cadre')->nullable();
            $table->string('accountNumber')->nullable();
            $table->unsignedBigInteger('bankId')->nullable();
            $table->string('PFANumber')->nullable();
            $table->unsignedBigInteger('PFA')->nullable();
            $table->string('NHFNumber')->nullable();
            $table->string('HISNumber')->nullable();
            $table->unsignedBigInteger('HIS')->nullable();
            $table->unsignedBigInteger('userId')->nullable();
            $table->string('status')->nullable();
            $table->unsignedBigInteger('dba')->nullable();
            $table->timestamps();

            $table->foreign('dba')->references('dbaId')->on('dba')->onDelete('cascade');
            $table->foreign('bankId')->references('bankId')->on('bank')->onDelete('cascade');
            $table->foreign('PFA')->references('PFAId')->on('pfa')->onDelete('cascade');
            $table->foreign('HIS')->references('HISId')->on('his')->onDelete('cascade');
            $table->foreign('cadre')->references('cadreId')->on('cadre')->onDelete('cascade');
            $table->foreign('userId')->references('id')->on('users')->onDelete('cascade');
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
