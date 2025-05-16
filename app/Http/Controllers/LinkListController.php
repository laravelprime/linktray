<?php

namespace App\Http\Controllers;

use App\Models\LinkList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LinkListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $linkLists = Auth::user()->linkLists->toArray();
        return Inertia::render('link-lists/index/index', [
            'linkLists' => $linkLists
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(LinkList $linkList)
    {
        $linkList->load('links');
        return Inertia::render('trays/show/show',[
            'tray' => $linkList
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LinkList $linkList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LinkList $linkList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LinkList $linkList)
    {
        //
    }
}
