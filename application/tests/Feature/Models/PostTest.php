<?php

namespace Tests\Feature\Models;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PostTest extends TestCase
{    
    private $user;

    private $posts;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::first();
        $this->posts = Post::without(['contents', 'files'])->get()->toArray();
    }

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_get_posts()
    {
        $response = $this
            ->get(route("posts.index"));

        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJson([
                "data" => $this->posts
            ]);
    }

    public function test_get_single_post()
    {   
        $post = Post::first()->toArray();
        $response = $this
            ->actingAs($this->user, 'sanctum')
            ->get(
                route(
                    "posts.show", 
                    $post['id']
                )
            );
        $response
            ->assertStatus(Response::HTTP_OK)
            ->assertJson([
                "data" => $post
            ]);
    }

    public function test_create_post_422()
    {
        $payload = [
            "title" => ""
        ];

        $response = $this
            ->actingAs($this->user, 'sanctum')
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


    public function test_create_post()
    {
        Storage::fake("photos");

        $post = Post::factory()->make()->toArray();
        $payload = [
            "title" => $post['title'],
            "description" => $post['description'],
            "gist" => $post['gist'],
            "files" => UploadedFile::fake()->image("photo1.jpg")
        ];

        $response = $this
            ->actingAs($this->user, 'sanctum')
            ->post(
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
        $this->assertDatabaseHas("posts", $post);
    }

    public function test_delete_post_404()
    {
        $response = $this
            ->actingAs($this->user, 'sanctum')
            ->withHeaders($this->headers)
            ->delete(
                route(
                    "posts.destroy",
                    0
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
        $post = Post::without(['contents', 'files'])->orderBy('id', 'desc')->first()->toArray();
        $response = $this
            ->actingAs($this->user, 'sanctum')
            ->delete(
                route(
                    "posts.destroy",
                    [
                        "post" => $post['id']
                    ]
                )
            );

        $response
            ->assertStatus(Response::HTTP_NO_CONTENT);
        $this->assertDatabaseMissing("posts", $post);
    }
}
