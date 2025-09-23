import { Button } from '@/components/ui/button';
import { isDateExpired } from '@/lib/utils';
import { Activity } from '@/types/model';
import React, { FormEventHandler, useState } from 'react';

import { InputError } from '@/components/input-error';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';

type Props = {
    activity: Activity;
    className?: string;
};

export const ActivityParticipatedButton: React.FC<Props> = ({ activity, className }) => {
    const isExpired = isDateExpired(activity.end_at);
    const [open, setOpen] = useState<boolean>(false);

    const { data, setData, post, processing, reset, clearErrors, errors } = useForm<{ password: string }>({
        password: '',
    });

    if (isExpired) return null;

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(`/activity/${activity.id}/participated`, {
            preserveScroll: true,
            onSuccess: () => closeModal(),
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
                <Button
                    className={className}
                    variant="link"
                    disabled={isExpired || activity.is_participated}
                    aria-disabled={isExpired || activity.is_participated}
                >
                    {activity.is_participated ? 'Participé' : 'Participer'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Êtes-vous sûr de vouloir continuer ?</DialogTitle>
                <DialogDescription>Cette action est irréversible. Veuillez entrer votre mot de passe pour confirmer.</DialogDescription>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            aria-invalid={!!errors.password}
                        />
                        <InputError message={errors.password} />
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Annuler
                            </Button>
                        </DialogClose>

                        <Button variant="default" type="submit" disabled={processing} aria-disabled={processing}>
                            {processing ? 'Mise à jour...' : 'Effectuer'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
