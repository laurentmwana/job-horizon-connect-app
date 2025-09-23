'use client';

import { Button } from '@/components/ui/button';
import { ChipsSelector } from '@/components/ui/chips';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { FetchResponse } from '@/types';
import { Participant } from '@/types/model';
import { useForm } from '@inertiajs/react';
import React, { FormEventHandler } from 'react';

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
