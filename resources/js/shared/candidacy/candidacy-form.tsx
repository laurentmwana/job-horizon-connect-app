'use client';

import { Button } from '@/components/ui/button';
import { ChipsSelector } from '@/components/ui/chips';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Selector } from '@/components/ui/selector';
import { fetchData } from '@/lib/fetch';
import { FetchResponse } from '@/types';
import { Candidacy, Offer } from '@/types/model';
import { useForm } from '@inertiajs/react';
import React, { FormEventHandler, useEffect, useState } from 'react';

type CandidacyFormProps = {
    candidacy: Candidacy;
    open: boolean;
    setOpen: (v: boolean) => void;
    fetchCandidaciesStatus: FetchResponse<string[]>;
};

type CandidacyForm = {
    id: string;
    status: string;
};

export const CandidacyForm: React.FC<CandidacyFormProps> = ({ candidacy, open, setOpen, fetchCandidaciesStatus }) => {
    const { processing, setData, data, errors, post, clearErrors, reset } = useForm<CandidacyForm>({
        id: candidacy.id,
        status: candidacy.status,
    });

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(`/admin/candidacy/${candidacy.id}/status`, {
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
                <DialogTitle>Modifier le statut de la candidature</DialogTitle>
                <DialogDescription>Veuillez sélectionner un nouveau statut. Cette action est irréversible.</DialogDescription>

                <form className="flex flex-col gap-6" onSubmit={onSubmit} noValidate>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="status">Statut</Label>
                            <ChipsSelector
                                isPending={fetchCandidaciesStatus.isPending}
                                clearable={false}
                                items={
                                    fetchCandidaciesStatus.fetchData?.map((status) => ({
                                        id: status,
                                        value: status,
                                        label: status,
                                        disabled: status === 'pending' || candidacy.candidacy_at !== null,
                                    })) ?? []
                                }
                                mode="single"
                                selectedValues={data.status}
                                onSelectionChange={(value) => setData('status', value as string)}
                                placeholder="Sélectionner un statut"
                                searchable={false}
                                error={errors.status || fetchCandidaciesStatus.error || undefined}
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
                                disabled={processing || data.status === 'pending' || candidacy.candidacy_at !== null}
                                aria-disabled={processing || data.status === 'pending' || candidacy.candidacy_at !== null}
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

type CandidacyGenerateFormProps = {
    offer_id: string;
    criteria: CriteriaType;
};

export const CandidacyGenerateForm = () => {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { processing, setData, data, errors } = useForm<CandidacyGenerateFormProps>({
        offer_id: '',
        criteria: 'all',
    });

    // Fonction pour récupérer les offres
    const findOffers = async (url: string) => {
        setIsLoading(true);
        try {
            const result = await fetchData<Offer[]>(url);
            setOffers(result);
        } catch (err) {
            console.error(err);
            setOffers([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchOfferUrl = '/api/data/offers';

    useEffect(() => {
        findOffers(fetchOfferUrl);
    }, [fetchOfferUrl]);

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        if (!data.offer_id) return;

        window.open(`/admin/generate/candidacies/offer/${data.offer_id}`, '_blank');
    };

    const onCriteriaChange = (criteria: CriteriaType) => {
        let newUrl = '/api/data/offers';

        if (criteria === 'expired') {
            newUrl = '/api/data/offers?with_expired=true';
        } else if (criteria === 'pending') {
            newUrl = '/api/data/offers?with_expired=false';
        }

        setData('criteria', criteria);
        setData('offer_id', '');

        findOffers(newUrl);
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

                {/* Sélecteur d’offre */}
                <div className="grid gap-2">
                    <Label htmlFor="offer">Offre</Label>
                    <Selector
                        isPending={isLoading}
                        items={
                            offers.map((offer) => ({
                                id: offer.id,
                                value: offer.id,
                                label: offer.name,
                            })) ?? []
                        }
                        mode="single"
                        defaultValue={data.offer_id}
                        onChange={(value) => setData('offer_id', value as string)}
                        placeholder="Sélectionner une offre"
                        size="sm"
                    />
                </div>

                {/* Bouton */}
                <div>
                    <Button type="submit" disabled={processing || data.offer_id === ''}>
                        {processing ? 'Préparation du PDF...' : 'Télécharger le PDF'}
                    </Button>
                </div>
            </div>
        </form>
    );
};
