<?php

namespace App\Notifications;

use App\Models\Candidate;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CandidateNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public Candidate $candidate)
    {
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Votre profil a été complété avec succès 🎉')
            ->greeting('Bonjour ' . $this->candidate->name . ',')
            ->line('Merci d’avoir complété vos informations sur notre plateforme.')
            ->line('Votre profil est désormais à jour et prêt pour vos futures candidatures.')
            ->action('Accéder à mon espace', url('/profile'))
            ->line('Nous vous souhaitons beaucoup de succès dans vos démarches.')
            ->salutation('Cordialement, L’équipe Recrutement');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
        ];
    }
}
