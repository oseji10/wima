<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PFA;
use Inertia\Inertia;
class PFAController extends Controller
{
    public function index()
    {
        $pfas = PFA::all();
        
        return Inertia::render('pfas', [
            'pfas' => $pfas
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pfaName' => 'required|string|max:255',
            'status' => 'required|in:Active,Inactive',
        ]);

        PFA::create($validated);

        return redirect()->route('pfas.index');
    }


    public function update(Request $request, PFA $pfas)
    {
        $validated = $request->validate([
            'pfaName' => 'required|string|max:255',
            'status' => 'required|in:Active,Inactive',
        ]);

        $pfas->update($validated);

        return redirect()->route('pfas.index');
    }

    public function destroy(PFA $pfas)
    {
        $pfas->delete();
        return redirect()->route('pfas.index');
    }
}
