'use client';

import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { ChipsSelector } from '@/components/ui/chips';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFetch } from '@/hooks/use-fetch';
import { Candidate } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type CandidateFormProps = {
    candidate?: Candidate;
};

type CandidateForm = {
    id: string | null;
    name: string;
    firstname: string;
    phone: string;
    gender: string;
    email: string;
};

export const CandidateForm: React.FC<CandidateFormProps> = ({ candidate }) => {
    const fetchGenders = useFetch<string[]>('/api/enum/genders');

    const { processing, setData, data, errors, post, put } = useForm<CandidateForm>({
        id: candidate?.id ?? '',
        name: candidate?.name ?? '',
        firstname: candidate?.firstname ?? '',
        phone: candidate?.phone ?? '',
        gender: candidate?.gender ?? '',
        email: '',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        candidate ? put(`/admin/candidate/${candidate.id}`) : post('/admin/candidate');
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
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
                    <Label htmlFor="firstname">Postnom</Label>
                    <Input
                        id="firstname"
                        autoFocus
                        value={data.firstname}
                        onChange={(e) => setData('firstname', e.target.value)}
                        aria-invalid={!!errors.firstname}
                        required
                    />
                    <InputError message={errors.firstname} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                        id="phone"
                        autoFocus
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        aria-invalid={!!errors.phone}
                        required
                    />
                    <InputError message={errors.phone} />
                </div>

                {candidate ? null : (
                    <div className="grid gap-2">
                        <Label htmlFor="email">Adresse e-mail</Label>
                        <Input
                            id="email"
                            autoFocus
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            aria-invalid={!!errors.email}
                            required
                        />
                        <InputError message={errors.email} />
                    </div>
                )}

                <div className="grid gap-2">
                    <Label htmlFor="gender">Genre</Label>
                    <ChipsSelector
                        isPending={fetchGenders.isPending}
                        clearable={false}
                        items={
                            fetchGenders.fetchData
                                ? fetchGenders.fetchData.map((gender) => {
                                      return {
                                          id: gender,
                                          value: gender,
                                          label: gender,
                                          disabled: false,
                                      };
                                  })
                                : []
                        }
                        mode="single"
                        selectedValues={data.gender}
                        onSelectionChange={(values) => setData('gender', values as string)}
                        placeholder="Selectionner les postes"
                        searchable={false}
                        error={errors.gender || fetchGenders.error || undefined}
                        size="sm"
                    />
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

export const CandidateCompletedForm: React.FC = () => {
    const fetchGenders = useFetch<string[]>('/api/enum/genders');

    const { processing, setData, data, errors, post, put } = useForm({
        id: '',
        name: '',
        firstname: '',
        phone: '',
        gender: '',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/candidate');
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
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
                    <Label htmlFor="firstname">Postnom</Label>
                    <Input
                        id="firstname"
                        autoFocus
                        value={data.firstname}
                        onChange={(e) => setData('firstname', e.target.value)}
                        aria-invalid={!!errors.firstname}
                        required
                    />
                    <InputError message={errors.firstname} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                        id="phone"
                        autoFocus
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        aria-invalid={!!errors.phone}
                        required
                    />
                    <InputError message={errors.phone} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="gender">Genre</Label>
                    <ChipsSelector
                        isPending={fetchGenders.isPending}
                        clearable={false}
                        items={
                            fetchGenders.fetchData
                                ? fetchGenders.fetchData.map((gender) => {
                                      return {
                                          id: gender,
                                          value: gender,
                                          label: gender,
                                          disabled: false,
                                      };
                                  })
                                : []
                        }
                        mode="single"
                        selectedValues={data.gender}
                        onSelectionChange={(values) => setData('gender', values as string)}
                        placeholder="Selectionner les postes"
                        searchable={false}
                        error={errors.gender || fetchGenders.error || undefined}
                        size="sm"
                    />
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
