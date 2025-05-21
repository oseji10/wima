<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Staff;
use App\Models\Cadre;
use App\Models\DBAs;
use App\Models\HIP;
use App\Models\Bank;
use App\Models\PFA;
use Inertia\Inertia;
class StaffController extends Controller
{
    // public function index()
    // {
    //     // Fetch all staff, cadres, and dbas
    //     // $staff = Staff::with('his', 'bank', 'pfa')->get();
    //     $staff = Staff::with(['his', 'bank', 'pfa'])->get()->toArray();
    //     $cadres = Cadre::all();
    //     $his = HIP::all();
    //     $pfa = PFA::all();
    //     $bank = Bank::all();
    //     $dbas = DBAs::all(['dbaId', 'dbaName']);
    
    //     return Inertia::render('staff', [
    //         'staff' => $staff,
    //         'cadres' => $cadres,
    //         'dbas' => $dbas,
    //         'his' => $his,
    //         'bank' => $bank,
    //         'pfa' => $pfa,
    //     ]);
    // }

    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10); // Default to 10 items per page
        $search = $request->input('search', '');

        $query = Staff::query();

        // Apply search filter if provided
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('fileNumber', 'like', "%{$search}%")
                  ->orWhere('surname', 'like', "%{$search}%")
                  ->orWhere('firstName', 'like', "%{$search}%")
                //   ->orWhere('lastName', 'like', "%{$search}%")
                  ->orWhere('otherNames', 'like', "%{$search}%");
            });
        }

        $staff = $query->with(['his', 'bank', 'pfa'])->paginate($perPage)->appends(['search' => $search, 'per_page' => $perPage]);

        return Inertia::render('staff', [
            'staff' => $staff,
            'cadres' => Cadre::all(['cadreId', 'cadreName']),
            'dbas' => DBAs::all(['dbaId', 'dbaName']),
            'his' => HIP::all(['HISId', 'hisName']),
            'bank' => Bank::all(['bankId', 'bankName']),
            'pfa' => PFA::all(['PFAId', 'pfaName']),
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
            ],
        ]);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
    'surname' => 'required|string|max:255',
    'fileNumber' => 'nullable',
    'firstName' => 'nullable',
    'otherNames' => 'nullable',
    'dateOfBirth' => 'nullable',
    'gender' => 'nullable',
    'stateOfOrigin' => 'nullable',
    'lgaOfOrigin' => 'nullable',
    'dateOfFirstAppointment' => 'nullable',
    'dateOfPresentAppointment' => 'nullable',
    'dateOfConfirmation' => 'nullable',
    'cadre' => 'nullable',
    'accountNumber' => 'nullable',
    'bankId' => 'nullable',
    'PFANumber' => 'nullable',
    'PFA' => 'nullable',
    'NHFNumber' => 'nullable',
    'HISNumber' => 'nullable',
    "HIS" => 'nullable',
    'dba' => 'nullable',
    'status' => 'nullable',
    // 'userId',
        ]);

        Staff::create($validated);

        return redirect()->route('staff.index');
    }


    public function update(Request $request, Staff $staff)
    {
        $validated = $request->validate([
            'surname' => 'required|string|max:255',
    'fileNumber' => 'nullable',
    'firstName' => 'nullable',
    'otherNames' => 'nullable',
    'dateOfBirth' => 'nullable',
    'gender' => 'nullable',
    'stateOfOrigin' => 'nullable',
    'lgaOfOrigin' => 'nullable',
    'dateOfFirstAppointment' => 'nullable',
    'dateOfPresentAppointment' => 'nullable',
    'dateOfConfirmation' => 'nullable',
    'cadre' => 'nullable',
    'accountNumber' => 'nullable',
    'bankId' => 'nullable',
    'PFANumber' => 'nullable',
    'PFA' => 'nullable',
    'NHFNumber' => 'nullable',
    'HISNumber' => 'nullable',
    "HIS" => 'nullable',
    'dba' => 'nullable',
    'status' => 'nullable',

        ]);

        $staff->update($validated);

        return redirect()->route('staff.index');
    }

    public function destroy(Staff $staff)
    {
        $staff->delete();
        return redirect()->route('staff.index');
    }


    public function transfer(Request $request, Staff $staff)
{
    $request->validate(['dba' => 'required', 'currentDba' => 'nullable',]);
    $staff->update(['dba' => $request->dba]);
    // Log the transfer
    $staff->transfers()->create([
        'transferFrom' => $request->currentDba,
        'transferTo' => $request->dba,
        'comment' => $request->comment,
        'initiatedBy' => auth()->user()->id,
        'staffId' => $staff->staffId,  
        'status'  => 'Pending',
    ]);
    return redirect()->route('staff.index')->with('success', 'Staff transferred successfully');
}
}
