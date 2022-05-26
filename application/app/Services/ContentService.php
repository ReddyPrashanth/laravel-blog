<?php

namespace App\Services;

use App\Models\Content;
use App\Models\Post;

class ContentService {

    public function createContent(Post $post, $payload)
    {   
        $contents = collect($payload)->map(function($item) use ($post) {
            $item["post_id"] = $post->id;
            $item["body"] = json_encode($item["body"]);
            return $item;
        })->all();
        Content::insert($contents);
        return $payload;
    }
}