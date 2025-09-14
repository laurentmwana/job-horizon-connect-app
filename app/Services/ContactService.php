<?php

namespace App\Services;

use App\Events\ContactUsEvent;

class ContactService
{
    public function sendMessage(array $data)
    {
        event(new ContactUsEvent($data));
    }
}
