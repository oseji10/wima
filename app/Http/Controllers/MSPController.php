<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MSPs;
use App\Models\MembershipPlan;
use App\Models\Position;
use App\Models\Members;
use Inertia\Inertia;
class MSPController extends Controller
{
    // public function index()
    // {
    //     $dbas = DBAs::all();
        
    //     return Inertia::render('msps', [
    //         'dbas' => $dbas
    //     ]);
    // }

    public function adamawa()
    {
        
        $memberships = MembershipPlan::all();
        $position = Position::all();
        $msps = MSPs::where('state', '=', 15)->with(['state', 'lga', 'position', 'membership_plan'])->get()->toArray();
        // return $msps;
        return Inertia::render('adamawa', [
            'msps' => $msps,
            'memberships' => $memberships,
            'position' => $position,
        ]);
    }

  
    public function gombe()
    {
        
        $memberships = MembershipPlan::all();
        $position = Position::all();
        $msps = MSPs::where('state', '=', 18)->with(['state', 'lga', 'position', 'membership_plan'])->get()->toArray();
        // return $msps;
        return Inertia::render('adamawa', [
            'msps' => $msps,
            'memberships' => $memberships,
            'position' => $position,
        ]);
    }

    public function kaduna()
    {
        
        $memberships = MembershipPlan::all();
        $position = Position::all();
        $msps = MSPs::where('state', '=', 9)->with(['state', 'lga', 'position', 'membership_plan'])->get()->toArray();
        // return $msps;
        return Inertia::render('adamawa', [
            'msps' => $msps,
            'memberships' => $memberships,
            'position' => $position,
        ]);
    }

    public function kano()
    {
        
        $memberships = MembershipPlan::all();
        $position = Position::all();
        $msps = MSPs::where('state', '=', 10)->with(['state', 'lga', 'position', 'membership_plan'])->get()->toArray();
        // return $msps;
        return Inertia::render('adamawa', [
            'msps' => $msps,
            'memberships' => $memberships,
            'position' => $position,
        ]);
    }

    public function members()
    {
        
        $memberships = MembershipPlan::all();
        $position = Position::all();
        $msps = Members::with(['state', 'lga', 'position', 'membership_plan'])->get()->toArray();
        // return $msps;
        return Inertia::render('members', [
            'msps' => $msps,
            'memberships' => $memberships,
            'position' => $position,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'dbaName' => 'required|string|max:255',
            'dbaType' => 'required|in:Department,Board,Agency',
            'status' => 'required|in:Active,Inactive',
        ]);

        DBAs::create($validated);

        return redirect()->route('dbas.index');
    }


    public function update(Request $request, DBAs $dbas)
    {
        $validated = $request->validate([
            'dbaName' => 'required|string|max:255',
            'dbaType' => 'required|in:Department,Board,Agency',
            'status' => 'required|in:Active,Inactive',
        ]);

        $dbas->update($validated);

        return redirect()->route('dbas.index');
    }

    public function destroy(DBAs $dbas)
    {
        $dbas->delete();
        return redirect()->route('dbas.index');
    }
}
