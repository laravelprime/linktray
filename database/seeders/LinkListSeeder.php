<?php

namespace Database\Seeders;

use App\Models\LinkList;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LinkListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LinkList::factory()->count(5)->create();
    }
}
