import React, { FormEvent } from 'react';

import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';

type Props = { open: boolean; setOpen: (v: boolean) => void };

export const RegisterUserModal: React.FC<Props> = ({ open, setOpen }) => {
    const { post, processing, data, setData, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
    });

    const onRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/register', {
            showProgress: false,
            onFinish: () => reset('password'),
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
                    <DialogTitle>Créer un compte</DialogTitle>
                    <DialogDescription>Entrez vos informations ci-dessous pour créer votre compte</DialogDescription>
                    <form action="" method="post" className="flex flex-col gap-6" onSubmit={onRegister}>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nom d'utilisateur</Label>
                            <Input
                                placeholder="johndoe"
                                id="name"
                                value={data.name}
                                disabled={processing}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} />
                        </div>

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

                        <div className="grid gap-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                placeholder="******"
                                id="password"
                                type="password"
                                value={data.password}
                                disabled={processing}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <Button disabled={processing} type="submit">
                            S'enregistrer
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
