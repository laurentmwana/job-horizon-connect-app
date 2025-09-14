import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/layouts/auth-layout';
import { useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react';

type Props = {
    email: string;
    token: string;
};

const Page: React.FC<Props> = ({ email, token }) => {
    const { post, processing, data, setData, errors, reset } = useForm({
        password: '',
        password_confirmation: '',
        token: token,
        email: email,
    });

    const onLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/reset-password', {
            showProgress: false,
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Réinitialiser le mot de passe" description="Veuillez entrer votre nouveau mot de passe ci-dessous">
            <form action="" method="post" className="flex flex-col gap-6" onSubmit={onLogin}>
                <div className="grid gap-2">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                        id="password"
                        type="password"
                        value={data.password}
                        disabled={processing}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation">Confirmation du mot de passe</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        disabled={processing}
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                <Button disabled={processing} type="submit">
                    Modifier
                </Button>
            </form>
        </AuthLayout>
    );
};

export default Page;
