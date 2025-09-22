<?php

namespace App\Notifications;

use App\Models\Offer;
use App\Models\Candidacy;
use App\Models\Candidate;
use Illuminate\Bus\Queueable;
use App\Enums\CandidacyStatusEnum;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class CandidacyNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Candidacy $candidacy,
        public Candidate $candidate,
        public Offer $offer,
        public CandidacyStatusEnum $enum
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $mail = new MailMessage();

        switch ($this->enum) {
            case CandidacyStatusEnum::PENDING:
                $mail->subject('Votre candidature est en attente')
                    ->greeting('Bonjour ' . $this->candidate->name . ',')
                    ->line('Nous avons bien reçu votre candidature pour l\'offre  **"' . $this->offer->name . '"**.')
                    ->line('Votre dossier est actuellement **en cours d\'examen**. Vous recevrez une notification dès qu\'une décision sera prise.')
                    ->line('Merci pour votre patience.');
                break;

            case CandidacyStatusEnum::ACCEPTED:
                $mail->subject('Votre candidature a été acceptée 🎉')
                    ->greeting('Félicitations ' . $this->candidate->name . ' !')
                    ->line('Nous sommes heureux de vous informer que votre candidature pour l\'offre **"' . $this->offer->name . '"** a été **acceptée**.')
                    ->action('Voir les détails', url('/candidacies/' . $this->candidacy->id))
                    ->line('Notre équipe vous contactera prochainement pour la suite du processus.');
                break;

            case CandidacyStatusEnum::REFUSED:
                $mail->subject('Votre candidature a été refusée')
                    ->greeting('Bonjour ' . $this->candidate->name . ',')
                    ->line('Nous vous remercions pour l\'intérêt que vous avez manifesté pour l\'offre de **"' . $this->offer->name . '"**.')
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
