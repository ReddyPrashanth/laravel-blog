<?php

namespace Database\Factories;

use App\Models\Content;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Content>
 */
class ContentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model
     * 
     * @var string
     */
    protected $model = Content::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            "sub_title" => $this->faker->sentence(7),
            "annotation" => $this->faker->sentences(4, true),
            "body" => [
                [
                    "content" => $this->faker->paragraph(10),
                    "list_items" => [$this->faker->sentence(6), $this->faker->sentence(6)]
                ]
            ]
        ];
    }
}
