'use client';

import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { type FormEventHandler, useRef } from 'react';
import { Input } from './ui/input';

type ConfirmationPasswordDialogProps = {
    url: string;
    open?: boolean;
    setOpen?: (v: boolean) => void;
    onSuccess?: () => void;
    onError?: () => void;
};

export const ConfirmationPasswordDialog = ({ url, open, setOpen, onSuccess, onError }: ConfirmationPasswordDialogProps) => {
    const passwordInput = useRef<HTMLInputElement>(null);
    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm<Required<{ password: string }>>({ password: '' });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(url, {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                onSuccess?.();
            },
            onError: () => {
                passwordInput.current?.focus();
                onError?.();
            },
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
        setOpen?.(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogTitle>Êtes-vous sûr de vouloir continuer ?</DialogTitle>
                <DialogDescription>Cette action est irréversible. Veuillez entrer votre mot de passe pour confirmer.</DialogDescription>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="sr-only">
                            Entrez votre mot de passe
                        </Label>
                        <Input
                            disabled={processing}
                            id="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Entrez votre mot de passe"
                            autoComplete="current-password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Annuler
                            </Button>
                        </DialogClose>

                        <Button variant="destructive" disabled={processing} type="submit">
                            {processing ? 'Traitement...' : 'Effectuer'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
