<?php

namespace Database\Factories;

use App\Models\LinkList;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Link>
 */
class LinkFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'link_list_id' => LinkList::inRandomOrder()->first()->id,  // Random link list
            'url' => $this->faker->url,
            'favicon' => 'https://www.youtube.com/s/desktop/8da5389f/img/logos/favicon_144x144.png',
            'anchor_text' => $this->faker->sentence,
        ];
    }
}
