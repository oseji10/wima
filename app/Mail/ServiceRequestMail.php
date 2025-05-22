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