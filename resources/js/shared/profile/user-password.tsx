'use client';

import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react';

export const ProfileUserPassword: React.FC = () => {
    const { errors, setData, data, processing, put } = useForm({
        password: '',
        password_confirmation: '',
        current_password: '',
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put('/profile/password', { preserveScroll: true });
    };

    return (
        <div className="rounded-xl border px-4 py-6" aria-label="Formulaire de mise à jour du mot de passe">
            <div className="max-w-4xl space-y-6">
                <div className="grid gap-2">
                    <h2 className="text-base font-medium">Mettre à jour le mot de passe</h2>
                    <p className="text-muted-foreground">
                        Assurez-vous que votre compte utilise un mot de passe long et aléatoire pour rester sécurisé.
                    </p>
                </div>

                <form onSubmit={onSubmit} method="post" className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="current_password">Ancien mot de passe</Label>
                        <Input
                            id="current_password"
                            type="password"
                            value={data.current_password}
                            onChange={(e) => setData('current_password', e.target.value)}
                            disabled={processing}
                            aria-invalid={!!errors.current_password}
                            required
                        />
                        <InputError message={errors.current_password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Nouveau mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            aria-invalid={!!errors.password}
                            required
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirmation du mot de passe</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            aria-invalid={!!errors.password_confirmation}
                            required
                        />
                        <InputError message={errors.password_confirmation} />
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
