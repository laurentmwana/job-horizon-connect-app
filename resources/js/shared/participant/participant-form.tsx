'use client';

import { Button } from '@/components/ui/button';
import { ChipsSelector } from '@/components/ui/chips';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Selector } from '@/components/ui/selector';
import { fetchData } from '@/lib/fetch';
import { FetchResponse } from '@/types';
import { Activity, Participant } from '@/types/model';
import { useForm } from '@inertiajs/react';
import React, { FormEventHandler, useEffect, useState } from 'react';

type ParticipantFormProps = {
    participant: Participant;
    open: boolean;
    setOpen: (v: boolean) => void;
    fetchParticipatedStatus: FetchResponse<string[]>;
};

type ParticipantForm = {
    id: string;
    status: string;
};

export const ParticipantForm: React.FC<ParticipantFormProps> = ({ participant, open, setOpen, fetchParticipatedStatus }) => {
    const { processing, setData, data, errors, post, clearErrors, reset } = useForm<ParticipantForm>({
        id: participant.id,
        status: participant.status,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(`/admin/participant/${participant.id}/status`, {
            onSuccess: closeModal,
        });
    };

    const closeModal = () => {
        setOpen(false);
        clearErrors();
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={closeModal}>
            <DialogContent>
                <DialogTitle>Modifier le statut du participant</DialogTitle>
                <DialogDescription>Veuillez sélectionner un nouveau statut pour ce participant. Cette action est irréversible.</DialogDescription>

                <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="status">Statut</Label>
                            <ChipsSelector
                                isPending={fetchParticipatedStatus.isPending}
                                clearable={false}
                                items={
                                    fetchParticipatedStatus.fetchData?.map((status) => ({
                                        id: status,
                                        value: status,
                                        label: status,
                                        disabled: status === 'pending' || participant.participant_at !== null,
                                    })) ?? []
                                }
                                mode="single"
                                selectedValues={data.status}
                                onSelectionChange={(value) => setData('status', value as string)}
                                placeholder="Sélectionner une valeur"
                                searchable={false}
                                error={errors.status || fetchParticipatedStatus.error || undefined}
                                size="sm"
                            />
                        </div>

                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary" onClick={closeModal}>
                                    Annuler
                                </Button>
                            </DialogClose>

                            <Button
                                type="submit"
                                disabled={processing || data.status === 'pending' || participant.participant_at !== null}
                                aria-disabled={processing || data.status === 'pending' || participant.participant_at !== null}
                            >
                                {processing ? 'Mise à jour...' : 'Effectuer'}
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const CRITERIA = ['Tous', 'Expiré', 'En cours'];
type CriteriaType = 'all' | 'expired' | 'pending';

type ParticipantGenerateFormProps = {
    activity_id: string;
    criteria: CriteriaType;
};

export const ParticipantGenerateForm = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { processing, setData, data, errors } = useForm<ParticipantGenerateFormProps>({
        activity_id: '',
        criteria: 'all',
    });

    const findActivities = async (url: string) => {
        setIsLoading(true);
        try {
            const result = await fetchData<Activity[]>(url);
            setActivities(result);
        } catch (err) {
            console.error(err);
            setActivities([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchActivityUrl = '/api/data/activities';

    useEffect(() => {
        findActivities(fetchActivityUrl);
    }, [fetchActivityUrl]);

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!data.activity_id) return;

        window.open(`/admin/generate/participants/activity/${data.activity_id}`, '_blank');
    };

    const onCriteriaChange = (criteria: CriteriaType) => {
        let newUrl = '/api/data/activities';

        if (criteria === 'expired') {
            newUrl = '/api/data/activities?with_expired=true';
        } else if (criteria === 'pending') {
            newUrl = '/api/data/activities?with_expired=false';
        }

        setData('criteria', criteria);
        setData('activity_id', '');

        findActivities(newUrl);
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
            <div className="grid gap-6">
                {/* Critères */}
                <div className="grid gap-2">
                    <Label htmlFor="criteria">Filtrer par statut</Label>
                    <ChipsSelector
                        clearable={false}
                        items={CRITERIA.map((c) => ({ id: c, value: c, label: c }))}
                        mode="single"
                        selectedValues={data.criteria}
                        onSelectionChange={(value) => onCriteriaChange(value as CriteriaType)}
                        placeholder="Sélectionner un statut"
                        searchable={false}
                        error={errors.criteria}
                        size="sm"
                    />
                </div>

                {/* Sélecteur d'activité */}
                <div className="grid gap-2">
                    <Label htmlFor="activity_id">Activité</Label>
                    <Selector
                        isPending={isLoading}
                        items={
                            activities.map((activity) => ({
                                id: activity.id,
                                value: activity.id,
                                label: activity.title,
                            })) ?? []
                        }
                        mode="single"
                        defaultValue={data.activity_id}
                        onChange={(value) => setData('activity_id', value as string)}
                        placeholder="Sélectionner une activité"
                        size="sm"
                    />
                </div>

                {/* Bouton */}
                <div>
                    <Button type="submit" disabled={processing || data.activity_id === ''}>
                        {processing ? 'Préparation du PDF...' : 'Télécharger le PDF'}
                    </Button>
                </div>
            </div>
        </form>
    );
};
