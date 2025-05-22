<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ServiceRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        // $this->data = $data;
        // Convert service array to comma-separated string
        $data['service'] = is_array($data['service'])
            ? implode(', ', array_map(function ($service) {
                return htmlspecialchars($service, ENT_QUOTES, 'UTF-8');
            }, $data['service']))
            : htmlspecialchars($data['service'] ?? '', ENT_QUOTES, 'UTF-8');

        $this->data = $data;
    }

    public function build()
    {
        return $this->subject('New Service Request')
                    ->view('emails.service_request')
                    ->with([
                        'name' => $this->data['name'],
                        'email' => $this->data['email'],
                        'phone_number' => $this->data['phone_number'],
                        'state' => $this->data['state'],
                        'lga' => $this->data['lga'],
                        'service' => $this->data['service'],
                    ]);
    }
}