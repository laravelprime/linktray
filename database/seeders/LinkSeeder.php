<?php

namespace Database\Seeders;

use App\Models\Link;
use App\Models\Tray;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $trays = Tray::all();

        // Loop through each tray and create 20 links for each tray
        foreach ($trays as $tray) {
            Link::factory(20)->create([
                'tray_id' => $tray->id,
            ]);
        }
    }
}
