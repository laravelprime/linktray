<?php

namespace Database\Factories;

use App\Models\Tray;
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
            'tray_id' => Tray::inRandomOrder()->first()->id,  // Random tray
            'url' => $this->faker->url,
            'favicon' => $this->faker->url,
            'anchor_text' => $this->faker->sentence,
        ];
    }
}
