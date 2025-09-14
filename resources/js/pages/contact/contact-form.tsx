import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type ContactForm = {
    name: string;
    subject: string;
    message: string;
    email: string;
};

export const ContactForm: React.FC = () => {
    const { processing, setData, data, errors, post, reset } = useForm<ContactForm>({
        name: '',
        subject: '',
        message: '',
        email: '',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/contact/send-message', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <form className="maw-w-3xl flex flex-col gap-6 rounded-md border p-2 lg:px-4 lg:py-6" onSubmit={onSubmit} noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input
                        id="name"
                        autoFocus
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        aria-describedby="nameHelp"
                        aria-invalid={!!errors.name}
                        required
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Adresse e-mail</Label>
                    <Input
                        id="email"
                        autoFocus
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        aria-describedby="emailHelp"
                        aria-invalid={!!errors.email}
                        required
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Textarea
                        id="subject"
                        required
                        tabIndex={2}
                        autoComplete="off"
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        aria-invalid={!!errors.subject}
                    />
                    <InputError message={errors.subject} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                        id="message"
                        required
                        tabIndex={2}
                        autoComplete="off"
                        value={data.message}
                        onChange={(e) => setData('message', e.target.value)}
                        aria-invalid={!!errors.message}
                    />
                    <InputError message={errors.message} />
                </div>

                <div>
                    <Button
                        type="submit"
                        className="mt-4 flex items-center justify-center gap-2"
                        tabIndex={3}
                        disabled={processing}
                        aria-disabled={processing}
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {processing ? 'Chargement...' : 'Envoyer'}
                    </Button>
                </div>
            </div>
        </form>
    );
};
