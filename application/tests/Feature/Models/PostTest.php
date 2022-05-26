<?php

namespace Tests\Feature\Models;

use App\Models\Content;
use App\Models\Post;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PostTest extends TestCase
{
    private $post;

    private $contents;

    public function setUp(): void
    {
        parent::setUp();
        $this->post = Post::factory()->create()->toArray();
        $this->contents = Content::factory()->create(["post_id" => $this->post["id"]])->toArray();
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
        $this->post["contents"] = [$this->contents];

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
        Storage::fake("photos");

        $post = Post::factory()->make();
        $payload = [
            "title" => $post->title,
            "description" => $post->description,
            "gist" => $post->gist,
            "files" => UploadedFile::fake()->image("photo1.jpg")
        ];

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
                    "created_at",
                    "updated_at"
                ]
            ]);
        $this->assertDatabaseHas("posts", $post->toArray());
    }

    public function test_create_post_422()
    {
        $payload = [
            "title" => ""
        ];

        $response = $this
            ->withHeaders($this->headers)
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
