'use client';

import { Button } from '@/components/ui/button';
import { ChipsSelector } from '@/components/ui/chips';
import { Label } from '@/components/ui/label';
import { FilterYearMonth } from '@/types/filter';
import { useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react';

const months = {
    '01': 'Janvier',
    '02': 'Février',
    '03': 'Mars',
    '04': 'Avril',
    '05': 'Mai',
    '06': 'Juin',
    '07': 'Juillet',
    '08': 'Août',
    '09': 'Septembre',
    '10': 'Octobre',
    '11': 'Novembre',
    '12': 'Décembre',
};

const YEAR_START = 2025;
const YEAR_INTERVAL = 3;

type Props = {
    filters: FilterYearMonth;
    url: string;
};

export const SpaceFilters: React.FC<Props> = ({ url, filters }) => {
    const { data, setData, processing, get } = useForm<FilterYearMonth>({
        year: filters.year,
        month: filters.month,
    });

    const years = Array.from({ length: YEAR_INTERVAL + 1 }, (_, i) => (YEAR_START - i).toString());

    const onFilters = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        get(url);
    };

    return (
        <div className="flex flex-col gap-4">
            <form className="grid gap-3" onSubmit={onFilters}>
                {/* Sélecteur Année */}
                <div className="grid gap-2">
                    <Label htmlFor="year">Année</Label>
                    <ChipsSelector
                        clearable={false}
                        items={years.map((year) => ({
                            id: year,
                            value: year,
                            label: year,
                        }))}
                        mode="single"
                        selectedValues={data.year}
                        onSelectionChange={(value) => setData('year', value as string)}
                        placeholder="Sélectionner une année"
                        searchable={false}
                        size="sm"
                        disabled={processing}
                    />
                </div>

                {/* Sélecteur Mois */}
                <div className="grid gap-2">
                    <Label htmlFor="month">Mois</Label>
                    <ChipsSelector
                        clearable={false}
                        items={Object.entries(months).map(([key, label]) => ({
                            id: key,
                            value: key,
                            label,
                        }))}
                        mode="single"
                        selectedValues={data.month}
                        onSelectionChange={(value) => setData('month', value as string)}
                        placeholder="Sélectionner un mois"
                        searchable={false}
                        size="sm"
                        disabled={processing}
                    />
                </div>

                {/* Bouton Filtrer */}
                <div className="mt-4">
                    <Button type="submit" disabled={processing}>
                        {processing ? 'Chargement...' : 'Appliquer'}
                    </Button>
                </div>
            </form>
        </div>
    );
};
