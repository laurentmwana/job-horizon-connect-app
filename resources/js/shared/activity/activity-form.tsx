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
        post(baseActionUrl, { forceFormData: true });
    };

    const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) setData('image', file);
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} encType="multipart/form-data" noValidate>
            <div className="grid gap-6">
                {/* Image */}
                <div className="grid gap-2">
                    <Label htmlFor="image">Image</Label>
                    <Input type="file" id="image" onChange={onChangeFile} aria-invalid={!!errors.image} required />
                    <InputError message={errors.image} />
                </div>

                {/* Title */}
                <div className="grid gap-2">
                    <Label htmlFor="title">Titre</Label>
                    <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} aria-invalid={!!errors.title} required />
                    <InputError message={errors.title} />
                </div>

                {/* Description */}
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        aria-invalid={!!errors.description}
                        required
                        autoComplete="off"
                    />
                    <InputError message={errors.description} />
                </div>

                {/* Type */}
                <div className="grid gap-2">
                    <Label htmlFor="type">Type</Label>
                    <ChipsSelector
                        isPending={fetchTypes.isPending}
                        clearable={false}
                        items={
                            fetchTypes.fetchData?.map((c) => ({
                                id: c,
                                value: c,
                                label: c,
                                disabled: false,
                            })) ?? []
                        }
                        mode="single"
                        selectedValues={data.type}
                        onSelectionChange={(value) => setData('type', value as string)}
                        placeholder="Sélectionner un type"
                        searchable={false}
                        error={errors.type || fetchTypes.error || undefined}
                        size="sm"
                        maxSelection={3}
                    />
                </div>

                {/* Start Date */}
                <div className="grid gap-2">
                    <DatePicker title="Début" value={data.start_at} onChange={(d) => setData('start_at', d)} aria-invalid={!!errors.start_at} />
                    <InputError message={errors.start_at} />
                </div>

                {/* End Date */}
                <div className="grid gap-2">
                    <DatePicker
                        title="Fin"
                        value={data.end_at}
                        onChange={(d) => setData('end_at', d)}
                        disabled={processing}
                        aria-invalid={!!errors.end_at}
                    />
                    <InputError message={errors.end_at} />
                </div>

                {/* Content */}
                <div className="grid gap-2">
                    <Label htmlFor="content">Contenu</Label>
                    <MarkdownTextarea
                        id="content"
                        className="min-h-[200px]"
                        defaultValue={data.content}
                        disabled={processing}
                        onChange={(value) => setData('content', value)}
                        contentType={activity ? 'html' : 'markdown'}
                    />
                    <InputError message={errors.content} />
                </div>

                {/* Submit */}
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
