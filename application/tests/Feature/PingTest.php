<?php

namespace Tests\Feature;

use Tests\TestCase;

class PingTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_ping()
    {
        $expected = array(
            'message' => 'Welcome to blog API 2022. Visit us again.',
            'status' => 'OK'
        );  
        $response = $this->get('/');
        $response
            ->assertStatus(200)
            ->assertJson($expected);
    }
}
