'use client';

import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { ChipsSelector } from '@/components/ui/chips';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MarkdownTextarea } from '@/components/ui/markdown-textarea';
import { Textarea } from '@/components/ui/textarea';
import { useFetch } from '@/hooks/use-fetch';
import { Activity } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type ActivityFormProps = {
    activity?: Activity;
};

type ActivityForm = {
    id: string | null;
    title: string;
    start_at: string;
    end_at: string;
    description: string;
    content: string;
    type: string;
    image: File | null;
    _method: 'PUT' | 'POST';
};

export const ActivityForm: React.FC<ActivityFormProps> = ({ activity }) => {
    const fetchTypes = useFetch<string[]>('/api/enum/activity-types');

    const { processing, setData, data, errors, post } = useForm<ActivityForm>({
        id: activity?.id ?? '',
        title: activity?.title ?? '',
        start_at: activity?.start_at ?? '',
        end_at: activity?.end_at ?? '',
        description: activity?.description ?? '',
        content: activity?.content ?? '',
        type: activity?.type ?? '',
        image: null,
        _method: activity ? 'PUT' : 'POST',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const baseActionUrl = activity ? `/admin/activity/${activity.id}` : '/admin/activity';

        post(baseActionUrl, {
            forceFormData: true,
        });

        console.log(errors);
    };

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setData('image', file);
        }
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} encType="multipart/form-data" noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="image">Image</Label>
                    <Input type="file" id="image" autoFocus onChange={onChangeFile} aria-invalid={!!errors.image} required />
                    <InputError message={errors.image} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="title">Titre</Label>
                    <Input
                        id="title"
                        autoFocus
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        aria-invalid={!!errors.title}
                        required
                    />
                    <InputError message={errors.title} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        required
                        tabIndex={2}
                        autoComplete="off"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        aria-invalid={!!errors.description}
                    />
                    <InputError message={errors.description} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <ChipsSelector
                        isPending={fetchTypes.isPending}
                        clearable={false}
                        items={
                            fetchTypes.fetchData
                                ? fetchTypes.fetchData.map((c) => ({
                                      id: c,
                                      value: c,
                                      label: c,
                                      disabled: false,
                                  }))
                                : []
                        }
                        mode="single"
                        selectedValues={data.type}
                        onSelectionChange={(values) => setData('type', values as string)}
                        placeholder="Selectionner un type"
                        searchable={false}
                        error={errors.type || fetchTypes.error || undefined}
                        size="sm"
                        maxSelection={3}
                    />
                </div>

                <div className="grid gap-2">
                    <DatePicker title="Début" value={data.start_at} onChange={(d) => setData('start_at', d)} aria-invalid={!!errors.start_at} />
                    <InputError message={errors.start_at} />
                </div>

                <div className="grid gap-2">
                    <DatePicker
                        disabled={processing}
                        title="Fin"
                        value={data.end_at}
                        onChange={(d) => setData('end_at', d)}
                        aria-invalid={!!errors.end_at}
                    />
                    <InputError message={errors.end_at} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="content">Contenu</Label>
                    <MarkdownTextarea
                        className="min-h-[200px]"
                        id="content"
                        defaultValue={data.content}
                        disabled={processing}
                        onChange={(e) => setData('content', e)}
                        contentType={activity ? 'html' : 'markdown'}
                    />
                    <InputError message={errors.content} />
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
                        {processing ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </div>
            </div>
        </form>
    );
};
