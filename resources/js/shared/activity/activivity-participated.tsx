import { Button } from '@/components/ui/button';
import { isDateExpired } from '@/lib/utils';
import { Activity } from '@/types/model';
import React, { useState } from 'react';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { type FormEventHandler } from 'react';

type Props = { activity: Activity; className?: string };

export const ActivityParticipatedButton: React.FC<Props> = ({ activity, className }) => {
    const isExpired = isDateExpired(activity.end_at);

    const [open, setOpen] = useState<boolean>(false);
    const { post, processing, reset, clearErrors } = useForm<Required<{ password: string }>>({ password: '' });

    if (isExpired) return null;

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(`/activity/${activity.id}/participated`, {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            },
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={className} variant="link" disabled={isExpired || activity.is_participated}>
                    {activity.is_participated ? 'Participé' : 'Participer'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Êtes-vous sûr de vouloir continuer ?</DialogTitle>
                <DialogDescription>Cette action est irréversible. Veuillez entrer votre mot de passe pour confirmer.</DialogDescription>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Annuler
                            </Button>
                        </DialogClose>

                        <Button variant="default" disabled={processing} type="submit">
                            {processing ? 'Mise à jour...' : 'Effectuer'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
