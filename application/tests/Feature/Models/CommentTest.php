<?php

namespace Tests\Feature\Models;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Response;
use Tests\TestCase;

class CommentTest extends TestCase {

    private $user;

    private $post;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::first();
        $this->post = Post::first()->toArray();
    }

    public function test_get_comments()
    {
        $comments = Comment::where("post_id")->get()->toArray();
        $response = $this
            ->actingAs($this->user, 'sanctum')
            ->get(
                route(
                    "posts.comments.index",
                    [
                        "post" => $this->post["id"]
                    ]
                )
            );
        $response->assertStatus(Response::HTTP_OK);
        $response->assertJson([
            "data" => $comments
        ]);
    }

    public function test_create_comment_422()
    {
        $payload = [
            "description" => null
        ];

        $response = $this
            ->actingAs($this->user, 'sanctum')
            ->withHeaders($this->headers)
            ->post(
                route(
                    "posts.comments.store",
                    [
                        "post" => $this->post["id"]
                    ]
                ),
                $payload
            );

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJsonStructure([
                "message",
                "errors" => [
                    "description",
                ]
            ]);
    }

    public function test_create_comment()
    {
        $content = Comment::factory()->make();
        $payload = [
            "description" => $content->description
        ];

        $response = $this
            ->actingAs($this->user, 'sanctum')
            ->post(
                route(
                    "posts.comments.store",
                    [
                        "post" => $this->post["id"]
                    ]
                ),
                $payload
            );

        $response->assertStatus(Response::HTTP_CREATED);
    }

    public function test_delete_comment()
    {
        $comment = Comment::select('id')->orderBy('id', 'desc')->first()->toArray();
        $response = $this
            ->actingAs($this->user, 'sanctum')
            ->delete(
                route(
                    "comments.destroy",
                    [
                        "comment" => $comment["id"]
                    ]
                )
            );
        $response->assertStatus(Response::HTTP_NO_CONTENT);
        $this->assertDatabaseMissing("comments", $comment);
    }
}