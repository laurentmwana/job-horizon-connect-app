import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AuthLayout } from '@/layouts/auth-layout';
import { ForgotPasswordUserModal } from '@/shared/user/forogot-password';
import { RegisterUserModal } from '@/shared/user/register';
import { useForm } from '@inertiajs/react';
import React, { FormEvent, useState } from 'react';

const Page: React.FC = () => {
    const [registerOpen, setRegisterOpen] = useState<boolean>(false);
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState<boolean>(false);
    const { post, processing, data, setData, errors, reset } = useForm({
        identifiant: '',
        password: '',
        remember: true,
    });

    const onLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/login', {
            showProgress: false,
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Connectez-vous à votre compte" description="Entrez votre e-mail et mot de passe ci-dessous pour vous connecter">
            <form action="" method="post" className="flex flex-col gap-6" onSubmit={onLogin}>
                <div className="grid gap-2">
                    <Label htmlFor="email">E-mail ou nom d'utilisateur</Label>
                    <Input
                        placeholder="johndoe@gmail.com"
                        id="email"
                        value={data.identifiant}
                        disabled={processing}
                        onChange={(e) => setData('identifiant', e.target.value)}
                    />
                    <InputError message={errors.identifiant} />
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center justify-between gap-4">
                        <Label htmlFor="password">Mot de passe</Label>
                        <button type="button" onClick={() => setForgotPasswordOpen(true)} className="text-link ms-2 text-sm">
                            oublié
                        </button>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        disabled={processing}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center space-x-3">
                    <Switch
                        disabled={processing}
                        id="remember"
                        name="remember"
                        checked={data.remember}
                        onClick={() => setData('remember', !data.remember)}
                        tabIndex={3}
                    />
                    <Label htmlFor="remember">Se souvenir de moi</Label>
                </div>

                <Button disabled={processing} type="submit">
                    Se connecters
                </Button>
            </form>

            <div className="mt-6 space-y-4 text-center text-sm text-muted-foreground">
                <div>
                    Si vous n'avez pas de compte,
                    <button type="button" onClick={() => setRegisterOpen(true)} className="text-link ms-2 text-sm">
                        créer un compte
                    </button>
                </div>
                <RegisterUserModal open={registerOpen} setOpen={setRegisterOpen} />
                <ForgotPasswordUserModal open={forgotPasswordOpen} setOpen={setForgotPasswordOpen} />
            </div>
        </AuthLayout>
    );
};

export default Page;
