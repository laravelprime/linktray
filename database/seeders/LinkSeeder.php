<?php

namespace Database\Seeders;

use App\Models\Link;
use App\Models\LinkList;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $linkLists = LinkList::all();

        // Loop through each tray and create 20 links for each tray
        foreach ($linkLists as $linkList) {
            Link::factory(20)->create([
                'link_list_id' => $linkList->id,
            ]);   
        }
    }
}
