import React, { FormEvent } from 'react';

import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';

type Props = { open: boolean; setOpen: (v: boolean) => void };

export const ForgotPasswordUserModal: React.FC<Props> = ({ open, setOpen }) => {
    const { post, processing, data, setData, errors, reset, clearErrors } = useForm({
        email: '',
    });

    const onRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/forgot-password', {
            showProgress: false,
            onSuccess: () => {
                onClose();
            },
        });
    };

    const onClose = () => {
        setOpen(false);
        clearErrors();
        reset();
    };

    return (
        <div>
            <Dialog open={open} onOpenChange={() => onClose()}>
                <DialogContent>
                    <DialogTitle>Mot de passe oublié</DialogTitle>
                    <DialogDescription>Entrez votre email pour recevoir un lien de réinitialisation du mot de passe</DialogDescription>
                    <form action="" method="post" className="flex flex-col gap-6" onSubmit={onRegister}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Adresse e-mail</Label>
                            <Input
                                placeholder="johndoe@gmail.com"
                                id="email"
                                type="email"
                                value={data.email}
                                disabled={processing}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <Button disabled={processing} type="submit">
                            Trouver mon compte
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
