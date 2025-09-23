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
import { JobPosition, Offer } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type OfferFormProps = {
    offer?: Offer;
};

type OfferForm = {
    id: string | null;
    name: string;
    start_at: string;
    end_at: string;
    description: string;
    bio: string;
    image: File | null;
    job_positions: string[];
    _method: 'PUT' | 'POST';
};

export const OfferForm: React.FC<OfferFormProps> = ({ offer }) => {
    const fetchJobPositions = useFetch<JobPosition[]>('/api/data/job-positions');

    const { processing, setData, data, errors, post } = useForm<OfferForm>({
        id: offer?.id ?? '',
        name: offer?.name ?? '',
        start_at: offer?.start_at ?? '',
        end_at: offer?.end_at ?? '',
        bio: offer?.bio ?? '',
        description: offer?.description ?? '',
        image: null,
        job_positions: offer?.job_positions.map((job) => job.id) ?? [],
        _method: offer ? 'PUT' : 'POST',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const baseActionUrl = offer ? `/admin/offer/${offer.id}` : '/admin/offer';
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

                {/* Titre */}
                <div className="grid gap-2">
                    <Label htmlFor="name">Titre</Label>
                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} aria-invalid={!!errors.name} required />
                    <InputError message={errors.name} />
                </div>

                {/* Bio */}
                <div className="grid gap-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                        id="bio"
                        value={data.bio}
                        onChange={(e) => setData('bio', e.target.value)}
                        aria-invalid={!!errors.bio}
                        required
                        autoComplete="off"
                    />
                    <InputError message={errors.bio} />
                </div>

                {/* Postes */}
                <div className="grid gap-2">
                    <Label htmlFor="job_positions">Postes</Label>
                    <ChipsSelector
                        isPending={fetchJobPositions.isPending}
                        clearable={false}
                        items={
                            fetchJobPositions.fetchData?.map((job) => {
                                const count = job.skills.length;
                                return {
                                    id: job.id,
                                    value: job.id,
                                    label: `${job.name} ~ ${count} ${count > 1 ? 'compétences' : 'compétence'}`,
                                    disabled: false,
                                };
                            }) ?? []
                        }
                        mode="multiple"
                        selectedValues={data.job_positions}
                        onSelectionChange={(values) => setData('job_positions', values as string[])}
                        placeholder="Sélectionner les postes"
                        searchable={false}
                        error={errors.job_positions || fetchJobPositions.error || undefined}
                        size="sm"
                        maxSelection={5}
                    />
                </div>

                {/* Dates */}
                <div className="grid gap-2">
                    <DatePicker title="Début" value={data.start_at} onChange={(d) => setData('start_at', d)} aria-invalid={!!errors.start_at} />
                    <InputError message={errors.start_at} />
                </div>

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

                {/* Description */}
                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <MarkdownTextarea
                        id="description"
                        className="min-h-[200px]"
                        defaultValue={data.description}
                        disabled={processing}
                        onChange={(value) => setData('description', value)}
                        contentType={offer ? 'html' : 'markdown'}
                    />
                    <InputError message={errors.description} />
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
