'use client';

import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler, useRef } from 'react';

type UserFormProps = {
    user?: User;
};

export const UserForm: React.FC<UserFormProps> = ({ user }) => {
    const { processing, setData, data, errors, post, put } = useForm({
        id: user?.id ?? null,
        name: user?.name ?? '',
        email: user?.email ?? '',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        user ? put(`/admin/user/${user.id}`) : post('/admin/user');
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        aria-invalid={!!errors.name}
                        required
                        autoFocus
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Adresse e-mail</Label>
                    <Input
                        type="email"
                        id="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        aria-invalid={!!errors.email}
                        required
                    />
                    <InputError message={errors.email} />
                </div>

                <div>
                    <Button type="submit" className="mt-4 flex items-center justify-center gap-2" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {processing ? (user ? 'Mise à jour...' : 'Enregistrement...') : user ? 'Mettre à jour l’utilisateur' : 'Créer un utilisateur'}
                    </Button>
                </div>
            </div>
        </form>
    );
};

type UserFormChangePasswordProps = {
    user: User;
    open: boolean;
    setOpen: (v: boolean) => void;
};

export const UserFormChangePassword: React.FC<UserFormChangePasswordProps> = ({ user, open, setOpen }) => {
    const passwordInput = useRef<HTMLInputElement>(null);
    const confirmPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        password: '',
        password_confirmation: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(`/admin/user/${user.id}/password`, {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            },
            onError: () => {
                passwordInput.current?.focus();
            },
            onFinish: () => {
                reset();
            },
        });
    };

    const closeModal = () => {
        clearErrors();
        reset();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={closeModal}>
            <DialogContent>
                <DialogTitle>Changer le mot de passe</DialogTitle>
                <DialogDescription>
                    En modifiant le mot de passe de l’utilisateur <strong>{user.name}</strong>, il devra utiliser ce nouveau mot de passe pour se
                    connecter.
                </DialogDescription>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Nouveau mot de passe</Label>
                        <Input
                            type="password"
                            disabled={processing}
                            id="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Entrez le nouveau mot de passe"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirmez le mot de passe</Label>
                        <Input
                            type="password"
                            disabled={processing}
                            id="password_confirmation"
                            name="password_confirmation"
                            ref={confirmPasswordInput}
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="Confirmez le mot de passe"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                                Annuler
                            </Button>
                        </DialogClose>

                        <Button disabled={processing} type="submit">
                            {processing ? 'Modification...' : 'Modifier'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
