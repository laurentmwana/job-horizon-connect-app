'use client';

import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Faq } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type FaqFormProps = {
    faq?: Faq;
};

type FaqForm = {
    id: string | null;
    question: string;
    answer: string;
    is_star: boolean;
};

export const FaqForm: React.FC<FaqFormProps> = ({ faq }) => {
    const { processing, setData, data, errors, post, put } = useForm<FaqForm>({
        id: faq?.id ?? '',
        question: faq?.question ?? '',
        answer: faq?.answer ?? '',
        is_star: faq?.is_star ?? false,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        faq ? put(`/admin/faq/${faq.id}`) : post('/admin/faq');
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="question">Question</Label>
                    <Input
                        id="question"
                        value={data.question}
                        onChange={(e) => setData('question', e.target.value)}
                        aria-invalid={!!errors.question}
                        required
                        autoFocus
                    />
                    <InputError message={errors.question} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="answer">Réponse</Label>
                    <Textarea
                        id="answer"
                        value={data.answer}
                        onChange={(e) => setData('answer', e.target.value)}
                        aria-invalid={!!errors.answer}
                        required
                        autoFocus
                    />
                    <InputError message={errors.answer} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="is_star">En vedette</Label>
                    <Switch checked={data.is_star} onClick={(e) => setData('is_star', !data.is_star)} />
                    <InputError message={errors.is_star} />
                </div>
                <div>
                    <Button type="submit" className="mt-4 flex items-center justify-center gap-2" disabled={processing} aria-disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        {processing ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </div>
            </div>
        </form>
    );
};
