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
            onSuccess: () => {
                closeModal();
            },
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
                <DialogTitle>Êtes-vous sûr de vouloir continuer ?</DialogTitle>
                <DialogDescription>Cette action est irréversible. Veuillez entrer votre mot de passe pour confirmer.</DialogDescription>

                <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="status">Status</Label>
                            <ChipsSelector
                                isPending={fetchParticipatedStatus.isPending}
                                clearable={false}
                                items={
                                    fetchParticipatedStatus.fetchData
                                        ? fetchParticipatedStatus.fetchData.map((status) => {
                                              return {
                                                  id: status,
                                                  value: status,
                                                  label: status,
                                                  disabled: status == 'pending' || participant.participant_at !== null,
                                              };
                                          })
                                        : []
                                }
                                mode="single"
                                selectedValues={data.status}
                                onSelectionChange={(values) => setData('status', values as string)}
                                placeholder="Selectionner une valeur"
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

                            <Button disabled={processing || data.status === 'pending' || participant.participant_at !== null} type="submit">
                                {processing ? 'Mise à jour...' : 'Effectuer'}
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
