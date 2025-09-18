<?php

namespace App\Notifications;

use App\Enums\ParticipatedStatusEnum;
use App\Models\Participant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ParticipantNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Participant $participant,
        public ParticipatedStatusEnum $enum
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
            case ParticipatedStatusEnum::PENDING:
                $mail->subject('Participation en attente')
                    ->greeting('Bonjour ' . $this->participant->candidate->name . ',')
                    ->line('Nous avons bien enregistré votre demande de participation à l’activité **"' . $this->participant->activity->title . '"**.')
                    ->line('Votre inscription est actuellement **en cours de validation**. Vous serez notifié dès qu’une décision sera prise.')
                    ->line('Merci de votre patience.');
                break;

            case ParticipatedStatusEnum::ACCEPTED:
                $mail->subject('Participation acceptée 🎉')
                    ->greeting('Félicitations ' . $this->participant->candidate->name . ' !')
                    ->line('Votre participation à l’activité **"' . $this->participant->activity->title . '"** a été **confirmée**.')
                    ->action('Voir les détails', url('/activities/' . $this->participant->activity->id))
                    ->line('Nous avons hâte de vous y voir 👏.');
                break;

            case ParticipatedStatusEnum::REFUSED:
                $mail->subject('Participation refusée')
                    ->greeting('Bonjour ' . $this->participant->candidate->name . ',')
                    ->line('Nous vous remercions pour votre intérêt à participer à l’activité **"' . $this->participant->activity->title . '"**.')
                    ->line('Après examen, nous avons le regret de vous informer que votre participation a été **refusée**.')
                    ->line('Nous espérons vous retrouver dans une prochaine activité.');
                break;
        }

        return $mail->salutation('Cordialement, L’équipe Organisation');
    }

    public function toArray(object $notifiable): array
    {
        return [];
    }
}
