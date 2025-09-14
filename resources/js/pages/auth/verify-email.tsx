import { TextLink } from '@/components';
import { Button } from '@/components/ui/button';
import { AuthLayout } from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type Props = { status?: string };

const Page: React.FC<Props> = ({ status }) => {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/email/verification-notification', {
            showProgress: false,
        });
    };

    return (
        <AuthLayout
            title="Vérifier l'e-mail"
            description="Veuillez vérifier votre adresse e-mail en cliquant sur le lien que nous venons de vous envoyer."
        >
            <Head title="Vérifier l'e-mail" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    Un nouveau lien de vérification a été envoyé à l'adresse e-mail fournie lors de l'inscription.
                </div>
            )}

            <form onSubmit={submit} className="space-y-6 text-center">
                <Button disabled={processing} variant="secondary">
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Renvoyer l'e-mail de vérification
                </Button>

                <TextLink href="/logout" method="post" className="mx-auto block text-sm">
                    Se déconnecter
                </TextLink>
            </form>
        </AuthLayout>
    );
};

export default Page;
