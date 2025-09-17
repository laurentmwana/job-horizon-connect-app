<?php

namespace App\Notifications;

use App\Enums\CandidacyStatusEnum;
use App\Models\Candidacy;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CandidacyNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Candidacy $candidacy,
        public CandidacyStatusEnum $enum
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $mail = new MailMessage()->replyTo($notifiable->email, $this->candidacy->candidate->name);

        switch ($this->enum) {
            case CandidacyStatusEnum::PENDING:
                $mail->subject('Votre candidature est en attente')
                    ->greeting('Bonjour ' . $this->candidacy->candidate->name . ',')
                    ->line('Nous avons bien reçu votre candidature pour l\'offre  **"' . $this->candidacy->offre->name . '"**.')
                    ->line('Votre dossier est actuellement **en cours d\'examen**. Vous recevrez une notification dès qu\'une décision sera prise.')
                    ->line('Merci pour votre patience.');
                break;

            case CandidacyStatusEnum::ACCEPTED:
                $mail->subject('Votre candidature a été acceptée 🎉')
                    ->greeting('Félicitations ' . $this->candidacy->candidate->name . ' !')
                    ->line('Nous sommes heureux de vous informer que votre candidature pour l\'offre **"' . $this->candidacy->offer->name . '"** a été **acceptée**.')
                    ->action('Voir les détails', url('/candidacies/' . $this->candidacy->id))
                    ->line('Notre équipe vous contactera prochainement pour la suite du processus.');
                break;

            case CandidacyStatusEnum::REFUSED:
                $mail->subject('Votre candidature a été refusée')
                    ->greeting('Bonjour ' . $this->candidacy->candidate->name . ',')
                    ->line('Nous vous remercions pour l\'intérêt que vous avez manifesté pour l\'offre de **"' . $this->candidacy->offer->name . '"**.')
                    ->line('Après étude attentive de votre dossier, nous avons le regret de vous informer que votre candidature a été **refusée**.')
                    ->line('Nous vous encourageons à postuler à d\'autres opportunités à l\'avenir.');
                break;
        }

        return $mail->salutation('Cordialement, L\'équipe Recrutement');
    }

    public function toArray(object $notifiable): array
    {
        return [
        ];
    }
}
