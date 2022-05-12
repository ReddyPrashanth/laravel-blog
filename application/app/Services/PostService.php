<?php

namespace App\Services;

use App\Models\Post;

class PostService {
    public function getPosts()
    {
        return Post::all();
    }

    public function deletePost(Post $post)
    {
        $post->delete();
    }

    public function createPost($input)
    {
        return Post::create($input);
    }
}