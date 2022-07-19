<?php

namespace App\Services;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Post;

class CommentService {

    public function getComments($post_id)
    {
        return Comment::with('user:id,name')->where('post_id', $post_id)->get();
    }

    public function createComment(StoreCommentRequest $request, Post $post)
    {
        $payload = $request->safe()->toArray();
        $user = $request->user();
        $comment = new Comment($payload);
        $comment->user_id = $user->id;
        $comment = $post->comments()->save($comment);
        $comment['user'] = array(
            'id' => $user->id,
            'name' => $user->name
        );
        return $comment;
    }

    public function deleteComment(Comment $comment)
    {
        $comment->delete();
    }
}