'use client';

import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { ChipsSelector } from '@/components/ui/chips';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFetch } from '@/hooks/use-fetch';
import { JobPosition, Skill } from '@/types/model';
import { useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';

type SkillFormProps = {
    skill?: Skill;
};

type SkillForm = {
    id: string | null;
    name: string;
    description: string;
    job_position_id: string;
};

export const SkillForm: React.FC<SkillFormProps> = ({ skill }) => {
    const fetchJobPositions = useFetch<JobPosition[]>('/api/data/job-positions');

    const { processing, setData, data, errors, post, put } = useForm<SkillForm>({
        id: skill?.id ?? '',
        name: skill?.name ?? '',
        description: skill?.description ?? '',
        job_position_id: skill?.job_position_id ?? '',
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        skill ? put(`/admin/skill/${skill.id}`) : post('/admin/skill');
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} encType="multipart/form-data" noValidate>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="type">Postes</Label>
                    <ChipsSelector
                        isPending={fetchJobPositions.isPending}
                        clearable={false}
                        items={
                            fetchJobPositions.fetchData
                                ? fetchJobPositions.fetchData.map((job) => {
                                      const lenJobPositions = job.skills.length;
                                      return {
                                          id: job.id,
                                          value: job.id,
                                          label: `${job.name} ~ ${lenJobPositions} ${lenJobPositions > 0 ? 'compétences' : 'compétence'}`,
                                          disabled: false,
                                      };
                                  })
                                : []
                        }
                        mode="single"
                        selectedValues={data.job_position_id}
                        onSelectionChange={(values) => setData('job_position_id', values as string)}
                        placeholder="Selectionner les postes"
                        searchable={false}
                        error={errors.job_position_id || fetchJobPositions.error || undefined}
                        size="sm"
                        maxSelection={5}
                    />
                </div>
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
