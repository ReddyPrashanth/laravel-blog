<?php

namespace Tests\Feature\Models;

use App\Models\Post;
use Illuminate\Http\Response;
use Tests\TestCase;

class PostTest extends TestCase
{
    private $post;

    public function setUp(): void
    {
        parent::setUp();
        $this->post = Post::factory()->create()->toArray();
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_get_posts()
    {
        $response = $this->get(route("posts.index"));

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJson([
                "data" => [
                    $this->post
                ]
            ]);
    }

    public function test_get_post()
    {
        $response = $this->get(
            route(
                "posts.show", 
                [
                    "post" => $this->post["id"]
                ]
            )
        );

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJson([
                "data" => $this->post
            ]);
    }

    public function test_create_post()
    {
        $payload = Post::factory()->make()->getAttributes();

        $response = $this->post(
            route("posts.store"),
            $payload
        );

        $response
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJsonStructure([
                "data" => [
                    "title",
                    "description",
                    "img_url",
                    "created_at",
                    "updated_at"
                ]
            ]);
        $this->assertDatabaseHas("posts", $payload);
    }

    public function test_create_post_422()
    {
        $payload = [
            "title" => ""
        ];

        $response = $this
            ->withHeaders([
                "Accept" => "application/json",
                "Content-Type" => "application/json"
            ])
            ->post(
                route("posts.store"),
                $payload
            );

        $response
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJsonStructure([
                "message",
                "errors" => [
                    "title",
                ]
            ]);
    }

    public function test_delete_post_404()
    {
        $response = $this->delete(
            route(
                "posts.destroy",
                [
                    "post" => 0
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

    public function test_delete_post()
    {
        $response = $this->delete(
            route(
                "posts.destroy",
                [
                    "post" => $this->post['id']
                ]
            )
        );

        $response
            ->assertStatus(Response::HTTP_NO_CONTENT);
        $this->assertDatabaseMissing("posts", $this->post);
    }
}
