<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Content;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::factory()->create();
        $post = Post::factory()->create();
        Content::factory()->create(["post_id" => $post->id]);
        Comment::factory()->create(["post_id" => $post->id, "user_id" => $user->id]);
    }
}
