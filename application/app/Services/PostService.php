<?php

namespace App\Services;

use App\Http\Requests\StorePostRequest;
use App\Models\Post;

class PostService {
    protected $file_service;

    public function __construct(FileService $service)
    {
        $this->file_service = $service;
    }

    public function getPosts()
    {
        return Post::without(['contents', 'files'])
            ->orderBy("created_at", "desc")
            ->limit(15)
            ->get();
    }

    public function deletePost(Post $post)
    {
        $post->delete();
    }

    public function createPost(StorePostRequest $request)
    {
        $input = $request->only(["title", "description", "gist"]);
        $post = Post::create($input);
        $file = $request->file("files");
        if($file) $this->file_service->uploadPostsFile($post->id, $file);
        return $post;
    }
}