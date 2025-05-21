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
        Schema::create('transfers', function (Blueprint $table) {
            $table->id('transferId');
            
            $table->unsignedBigInteger('staffId');
            $table->unsignedBigInteger('initiatedBy')->nullable();
            $table->unsignedBigInteger('approvedBy')->nullable();
            $table->unsignedBigInteger('transferFrom')->nullable();
            $table->unsignedBigInteger('transferTo')->nullable();
            // $table->foreignId('transferFrom')->nullable()->constrained('dba')->onDelete('set null');
            // $table->foreignId('transferTo')->constrained('dba')->onDelete('set null');
            $table->text('comment')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();

            $table->foreign('staffId')->references('staffId')->on('staff')->onDelete('cascade');
            $table->foreign('transferFrom')->references('dbaId')->on('dba')->onDelete('cascade');
            $table->foreign('transferTo')->references('dbaId')->on('dba')->onDelete('cascade');
            $table->foreign('initiatedBy')->references('id')->on('users')->onDelete('cascade');
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
