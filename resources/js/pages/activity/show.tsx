import { Heading } from '@/components/heading';
import { BaseLayout } from '@/layouts/base-layout';
import { ActivityDetails } from '@/shared/activity/activity-card';
import { Activity } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = {
    activity: Activity;
};

const Page: React.FC<Props> = ({ activity }) => {
    return (
        <BaseLayout>
            <Head title="En savoir plus sur une activité" />

            <div className="container py-12" aria-label="Détails de l'activité">
                <Heading title="En savoir plus sur une activité">Découvrez tous les détails et participez en quelques clics.</Heading>

                <ActivityDetails activity={activity} />
            </div>
        </BaseLayout>
    );
};

export default Page;
