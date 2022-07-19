<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('ext');
            $table->string('path');
            $table->bigInteger('post_id')->nullable();
            $table->bigInteger('content_id')->nullable();
            $table->timestamps();
            $table
                ->foreign('post_id')
                ->references('id')
                ->on('posts')
                ->onDelete('cascade');
            $table
                ->foreign('content_id')
                ->references('id')
                ->on('contents')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('files');
    }
};
