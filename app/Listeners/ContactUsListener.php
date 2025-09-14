<?php

namespace App\Listeners;

use App\Events\ContactUsEvent;
use App\Mail\ContactUsMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailer;
use Illuminate\Queue\InteractsWithQueue;

class ContactUsListener implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct(private Mailer $mailer)
    {
    }

    /**
     * Handle the event.
     */
    public function handle(ContactUsEvent $event): void
    {
        $this->mailer->send(new ContactUsMail($event->data));
    }
}
