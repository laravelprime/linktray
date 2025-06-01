<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\LinkList;
use Inertia\Inertia;

class LinkListController extends Controller{
    public function index (LinkList $linkList) {
        return Inertia::render('public/link-lists.index',[
                'linkList' => $linkList->load('links'),
            ]
        );
    }
}