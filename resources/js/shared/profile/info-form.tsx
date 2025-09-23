'use client';

import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react';

type Props = {
    user: User;
};

export const ProfileUserInfoForm: React.FC<Props> = ({ user }) => {
    const { errors, setData, data, processing, put } = useForm({
        name: user.name,
        email: user.email,
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put('/profile/edit', { preserveScroll: true });
    };

    return (
        <div className="rounded-xl border px-4 py-6" aria-label="Formulaire de mise à jour du profil utilisateur">
            <div className="max-w-4xl space-y-6">
                <div className="grid gap-3">
                    <h2 className="text-base font-medium">Informations sur le profil</h2>
                    <p className="text-muted-foreground">Mettez à jour votre nom et votre adresse e-mail associée au compte.</p>
                </div>

                <form onSubmit={onSubmit} method="post" className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            aria-invalid={!!errors.name}
                            required
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
                            disabled={processing}
                            aria-invalid={!!errors.email}
                            required
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div>
                        <Button type="submit" size="sm" variant="secondary" disabled={processing} aria-disabled={processing}>
                            {processing ? 'Mise à jour...' : 'Mettre à jour'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
