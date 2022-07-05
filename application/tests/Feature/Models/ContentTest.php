<?php

namespace Tests\Feature\Models;

use App\Models\Content;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Response;
use Tests\TestCase;

class ContentTest extends TestCase
{
    private $user;

    private $post;

    private $content;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::first();
        $this->post = Post::without(['contents', 'files'])->first()->toArray();
        $this->content = Content::first()->toArray();
    }

    public function test_get_content()
    {
        $response = $this
            ->actingAs($this->user, 'sanctum')
            ->get(
                route(
                    "contents.show",
                    [
                        "content" => $this->content["id"]
                    ]
                )
            );

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJson([
                "data" => $this->content
            ]);
    }

    public function test_get_content_404()
    {
        $response = $this
            ->actingAs($this->user, 'sanctum')
            ->get(
                route(
                    "contents.show",
                    [
                        "content" => 0
                    ]
                )
            );

        $response
            ->assertStatus(Response::HTTP_NOT_FOUND)
            ->assertJson([
                "message" => "Resource not found."
            ]);
    }

    public function test_create_content()
    {
        $content = Content::factory()->make(["post_id" => $this->post["id"]])->toArray();
        $payload = [
            "data" => [$content]
        ];

        $response = $this
            ->actingAs($this->user, 'sanctum')
            ->post(
                route(
                    "posts.contents.store",
                    [
                        "post" => $this->post["id"]
                    ]
                ),
                $payload
            );

        $response->assertStatus(Response::HTTP_CREATED);
    }

    public function test_content_delete_404()
    {
        $response = $this
            ->actingAs($this->user, 'sanctum')    
            ->delete(
                route(
                    "contents.destroy",
                    [
                        "content" => 0
                    ]
                )
            );

        $response
            ->assertStatus(Response::HTTP_NOT_FOUND)
            ->assertJson(
                [
                    "message" => "Resource not found."
                ]
            );
    }

    public function test_content_delete()
    {
        $content = Content::select('id')
            ->orderBy('id', 'desc')
            ->first()
            ->toArray();
        $response = $this
            ->actingAs($this->user, 'sanctum')
            ->delete(
                route(
                    "contents.destroy",
                    [
                        "content" => $content['id']
                    ]
                )
            );

        $response->assertStatus(Response::HTTP_NO_CONTENT);
        $this->assertDatabaseMissing("contents", $content);
    }
}
