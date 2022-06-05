<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Post;
use App\Services\CommentService;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Validation\UnauthorizedException;

class CommentController extends Controller
{
    /**
     * @var CommentService
     */
    protected $service;

    /**
     * Create an instance
     * 
     * @param CommentService $service
     */
    public function __construct(CommentService $service)
    {
        $this->service = $service;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $comments = $this->service->getComments($id);
        return JsonResource::collection($comments);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreCommentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCommentRequest $request, Post $post)
    {
        $comment = $this->service->createComment($request, $post);
        return new JsonResource($comment);        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        $user = auth()->user();
        if ($user->id !== $comment->user_id)
            throw new UnauthorizedException("Unauthorized action.");
        return response()->json(
            $this->service->deleteComment($comment),
            204
        );
    }
}
