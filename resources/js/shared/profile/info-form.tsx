import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react';

type Props = { user: User };

export const ProfileUserInfoForm: React.FC<Props> = ({ user }) => {
    const { errors, setData, data, processing, put } = useForm({
        name: user.name,
        email: user.email,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        put('/profile/edit', {
            preserveScroll: true,
        });
    };

    return (
        <div className="rounded-xl border px-4 py-6">
            <div className="max-w-4xl space-y-6">
                <div className="grid gap-3">
                    <h2 className="text-base font-medium">Informations sur le profil</h2>
                    <p className="text-muted-foreground">Mettez à jour les informations de profil et l'adresse e-mail de votre compte.</p>
                </div>
                <form onSubmit={onSubmit} method="post" className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Nom d'utilisateur</Label>
                        <Input disabled={processing} id="username" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError message={errors.name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Adresse e-mail</Label>
                        <Input disabled={processing} type="email" id="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <Button disabled={processing} size="sm" variant="secondary" type="submit">
                            Mettre à jour
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
