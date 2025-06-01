<?php

namespace App\Http\Controllers;

use App\Models\Link;
use App\Models\LinkList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Pdp\Rules;
use Pdp\Domain;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    private function getFavicon($url)
    {
        if (!str_starts_with($url, 'http://') && !str_starts_with($url, 'https://')) {
            $url = 'http://' . $url;
        }

        $parsedUrl = parse_url($url);
        $scheme = $parsedUrl['scheme'];
        $host = $parsedUrl['host'];
        return "https://www.google.com/s2/favicons?domain=$scheme://$host";
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {   
        $validated = $request->validate([
            'linkListId' => 'required|integer|exists:link_lists,id',
            'url' => 'required|max:2048|url'
        ]);

        $userOwnsLinkList = Auth::user()->linkLists()->where('id', $validated['linkListId'])
            ->exists();

        if(!$userOwnsLinkList){
            abort(403, "You do not have permission to add a link to this list.");
        }

        $link = new Link();
        $link->link_list_id = $validated['linkListId'];
        $link->url = $validated['url'];
        $link->favicon = $this->getFavicon($validated['url']);
        $link->anchor_text = $validated['url'];
        $link->save();

        $request->session()->flash('success', 'Successfully added new link to ' . LinkList::find($validated['linkListId'])->title);
        return to_route('link-lists.show', $validated['linkListId']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Link $link){}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Link $link)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Link $link)
    {
        $validated = $request->validate([
            'url' => 'required|max:2048|url',
            'anchor_text' => 'required|max:2048'
        ]);

        $userOwnsLinkList = Auth::user()->linkLists()->where('id', $link->link_list_id)
            ->exists();

        if(!$userOwnsLinkList){
            abort(403, "You do not have permission to edit this link.");
        }

        $link->url = $validated['url'];
        $link->anchor_text = $validated['anchor_text'];
        $link->save();

        $request->session()->flash('success', 'Successfully updated the link');
        return to_route('link-lists.show', $link->link_list_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Link $link)
    {
        $userOwnsLinkList = Auth::user()->linkLists()->where('id', $link->link_list_id)
            ->exists();

        if(!$userOwnsLinkList){
            abort(403, "You do not have permission to delete this link.");
        }

        $link->delete();
        session()->flash('success', 'Successfully deleted the link');
        return to_route('link-lists.show', $link->link_list_id);
    }
}
