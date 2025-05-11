<?php

namespace App\Http\Controllers;

use App\Models\Tray;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TrayController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $trays = Auth::user()->trays->toArray();
        return Inertia::render('trays/index/index', [
            'trays' => $trays
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
    public function show(Tray $linkTray)
    {
        $linkTray->load('links');
        return Inertia::render('trays/show/show',[
            'tray' => $linkTray
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tray $tray)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tray $tray)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tray $tray)
    {
        //
    }
}
