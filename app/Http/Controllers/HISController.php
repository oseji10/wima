<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HIP;
use Inertia\Inertia;
class HISController extends Controller
{

    public function hubs()
    {
       return Inertia::render('hubs');
    }

    public function analytics()
    {
       return Inertia::render('analytics');
    }

    public function index()
    {
        $hip = HIP::all();
        
        return Inertia::render('hip', [
            'hip' => $hip
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'hisName' => 'required|string|max:255',
            'status' => 'required|in:Active,Inactive',
        ]);

        HIS::create($validated);

        return redirect()->route('hip.index');
    }


    public function update(Request $request, HIS $his)
    {
        $validated = $request->validate([
            'hisName' => 'required|string|max:255',
            'status' => 'required|in:Active,Inactive',
        ]);

        $his->update($validated);

        return redirect()->route('hip.index');
    }

    public function destroy(HIS $his)
    {
        $his->delete();
        return redirect()->route('hip.index');
    }
}
