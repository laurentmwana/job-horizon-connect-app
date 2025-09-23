import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { isDateExpired } from '@/lib/utils';
import { Offer } from '@/types/model';
import { useForm } from '@inertiajs/react';
import React, { FormEventHandler, useState } from 'react';

type Props = {
    offer: Offer;
    className?: string;
};

type OfferCandidacyForm = {
    cv_path: File | null;
};

export const OfferCandidacy: React.FC<Props> = ({ offer, className }) => {
    const isExpired = isDateExpired(offer.end_at);
    const [open, setOpen] = useState(false);

    const { post, processing, reset, clearErrors, setData, errors } = useForm<OfferCandidacyForm>({
        cv_path: null,
    });

    if (isExpired) return null;

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) setData('cv_path', file);
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(`/offer/${offer.id}/applied`, {
            preserveScroll: true,
            onSuccess: closeModal,
            onFinish: () => reset(),
            forceFormData: true,
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
                <Button className={className} variant="ghost" disabled={isExpired || offer.is_applied} aria-disabled={isExpired || offer.is_applied}>
                    {offer.is_applied ? 'Postulé' : 'Postuler'}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Confirmer votre candidature</DialogTitle>
                <DialogDescription>Cette action est irréversible. Veuillez téléverser votre CV pour confirmer votre candidature.</DialogDescription>

                <form className="space-y-6" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
                    <div className="grid gap-2">
                        <Label htmlFor="cv_path">CV</Label>
                        <Input id="cv_path" type="file" onChange={onChangeFile} required aria-invalid={!!errors.cv_path} />
                        <InputError message={errors.cv_path} />
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Annuler
                            </Button>
                        </DialogClose>

                        <Button variant="default" type="submit" disabled={processing} aria-disabled={processing}>
                            {processing ? 'Envoi en cours...' : 'Confirmer'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
