<?php

namespace App\Http\Controllers;

use App\Models\LinkList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
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
        $validated = $request->validate([
            'title' => [
                'unique:link_lists,title',
                'required',
                'string',
                'max:100',
                'min:2',
            ],
            'description' => [
                'required',
                'nullable',
                'string',
                'min:2',
                'max:1000',
            ],
            'visibility' => [
                'required',
                Rule::in(['public', 'private']), // Allow only predefined values
            ],
        ]);

        $linkList = new LinkList([]);
        $linkList->title = $validated['title'];
        $linkList->description = $validated['description'];
        $linkList->visibility = $validated['visibility'];
        $linkList->created_by = Auth::user()->id;

        $linkList->save();

        $request->session()->flash('success', $linkList->title . ' link list created successfully');
        return to_route('link-lists.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(LinkList $linkList)
    {
        if(Auth::user()->id !== $linkList->created_by){
            abort('403', "You're not authorized to view this list");
        }

        $linkList->load(['links' => function($query) {
            $query->orderBy('created_at', 'desc');
        }]);
        return Inertia::render('link-lists/show/index',[
            'linkList' => $linkList
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
        if(Auth::user()->id !== $linkList->created_by){
            abort('403', "You're not authorized to edit this list");
        }

        $validated = $request->validate([
            'title' => [
                Rule::unique('link_lists')->ignore($linkList->id),
                'required',
                'string',
                'max:100',
                'min:2',
            ],
            'description' => [
                'required',
                'nullable',
                'string',
                'min:2',
                'max:1000',
            ],
            'visibility' => [
                'required',
                Rule::in(['public', 'private']), // Allow only predefined values
            ],
        ]);

        $linkList->title = $validated['title'];
        $linkList->description = $validated['description'];
        $linkList->visibility = $validated['visibility'];
        $linkList->save();
        
        $request->session()->flash('success', $linkList->title . ' link list updated successfully');

        $routeName = url()->previous();

        if ($routeName === route('link-lists.show', $linkList->id)) {
            return to_route('link-lists.show', $linkList->id);
        } else if ($routeName === route('public.link-lists.index', $linkList->id)) {
            return to_route('public.link-lists.index', $linkList->id);
        } else {
            return to_route('link-lists.index');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LinkList $linkList)
    {
        if(Auth::user()->id !== $linkList->created_by){
            abort('403', "You're not authorized to delete this list");
        }

        $linkList->delete();

        request()->session()->flash('success', $linkList->title . ' link list deleted successfully');
        return to_route('link-lists.index');
    }
}
