import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { isDateExpired } from '@/lib/utils';
import { Offer } from '@/types/model';
import { useForm } from '@inertiajs/react';
import React, { FormEventHandler, useState } from 'react';

type Props = { offer: Offer; className?: string };

type OfferCandidacyForm = {
    cv_path: File | null;
};

export const OfferCandidacy: React.FC<Props> = ({ offer, className }) => {
    const isExpired = isDateExpired(offer.end_at);
    const [open, setOpen] = useState<boolean>(false);

    const { post, processing, reset, clearErrors, setData, errors } = useForm<OfferCandidacyForm>({
        cv_path: null,
    });

    if (isExpired) return null;

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setData('cv_path', file);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(`/offer/${offer.id}/applied`, {
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
                <Button className={className} variant="link" disabled={isExpired || offer.is_applied}>
                    {offer.is_applied ? 'Postulé' : 'Postuler'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Êtes-vous sûr de vouloir continuer ?</DialogTitle>
                <DialogDescription>Cette action est irréversible. Veuillez entrer votre mot de passe pour confirmer.</DialogDescription>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label> CV</Label>
                        <Input type="file" onChange={onChangeFile} placeholder="Téléversever votre cv" />
                        <InputError message={errors.cv_path} />
                    </div>
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
