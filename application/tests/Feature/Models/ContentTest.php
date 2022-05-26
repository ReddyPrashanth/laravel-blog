<?php

namespace Tests\Feature\Models;

use App\Models\Content;
use App\Models\Post;
use Illuminate\Http\Response;
use Tests\TestCase;

class ContentTest extends TestCase
{
    private $post;

    private $contents;

    public function setUp(): void
    {
        parent::setUp();
        $this->post = Post::factory()->create()->toArray();
        $this->contents = Content::factory()->create(["post_id" => $this->post["id"]])->toArray();
    }

    public function test_get_content()
    {
        $response = $this->get(
            route(
                "contents.show",
                [
                    "content" => $this->contents["id"]
                ]
            )
        );

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJson([
                "data" => $this->contents
            ]);
    }

    public function test_get_content_404()
    {
        $response = $this->get(
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
        $response = $this->delete(
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
        $response = $this->delete(
            route(
                "contents.destroy",
                [
                    "content" => $this->contents["id"]
                ]
            )
        );

        $response->assertStatus(Response::HTTP_NO_CONTENT);
    }
}
