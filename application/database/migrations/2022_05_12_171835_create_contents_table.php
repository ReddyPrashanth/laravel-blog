<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
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
        Schema::create("contents", function (Blueprint $table) {
            $table->id();
            $table->bigInteger("post_id");
            $table->string("sub_title", 255);
            $table->string("annotation", 255)->nullable();
            $table->jsonb("body")->default(new Expression("'[]'::jsonb"));
            $table->timestamps();
            $table
                ->foreign("post_id")
                ->references("id")
                ->on("posts")
                ->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists("contents");
    }
};
