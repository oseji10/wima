<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transfers;
use App\Models\DBAs;
use Inertia\Inertia;
class TransfersController extends Controller
{
    public function index()
    {
        $transfers = Transfers::with('toDba', 'fromDba', 'staff')->get();
        
        return Inertia::render('transfers', [
            'transfers' => $transfers,
            'dbas' => DBAs::all(['dbaId', 'dbaName']),
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

    public function respond(Request $request, Transfers $transfer)
{
    $request->validate([
        'status' => 'nullable',
    ]);

    $transfer->update([
        'status' => $request->status,
        'approvedBy' => auth()->id(), // Optional: track who approved/rejected
        'updated_at' => now(),
    ]);

    return redirect()->route('transfers.index')->with('success', 'Transfer request ' . $request->status);
}
}
