'use client';

import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { JobPosition } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type JobPositionFormProps = {
    jobPosition?: JobPosition;
};

type JobPositionForm = {
    id: string | null;
    name: string;
    description: string;
};

export const JobPositionForm: React.FC<JobPositionFormProps> = ({ jobPosition }) => {
    const { processing, setData, data, errors, post, put } = useForm<JobPositionForm>({
        id: jobPosition?.id ?? '',
        name: jobPosition?.name ?? '',
        description: jobPosition?.description ?? '',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        jobPosition ? put(`/admin/job-position/${jobPosition.id}`) : post('/admin/job-position');
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} encType="multipart/form-data" noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input
                        id="name"
                        autoFocus
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        aria-invalid={!!errors.name}
                        required
                    />
                    <InputError message={errors.name} />
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
