<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ServiceRequestMail;
use Inertia\Inertia;

class ServiceRequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone_number' => 'required|string|max:20',
            'state' => 'required|string|max:255',
            'lga' => 'required|string|max:255',
            // 'service' => 'required|string|max:255',
            'service' => ['required', 'array'],
'service.*' => ['in:Solar Treshers,Solar Dryers,Solar Knapsack Sprayers,Solar Water Pumps'],
        ]);

        $adminEmails = [
            'vctroseji@gmail.com',
            'f.nasiru@wimanigeria.com',
            'a.bunkure@wimanigeria.com',
            'a.leonard@wimanigeria.com',
            'u.umar@wimanigeria.com', 
        ];

        // Send email to each admin
        foreach ($adminEmails as $email) {
            Mail::to($email)->send(new ServiceRequestMail($validated));
        }

        return redirect()->back()->with('success', 'Service request submitted successfully!');
    }
}