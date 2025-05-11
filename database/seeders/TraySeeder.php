<?php

namespace Database\Seeders;

use App\Models\Tray;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TraySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Tray::factory()->count(5)->create();
    }
}
