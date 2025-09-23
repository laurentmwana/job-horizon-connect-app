import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { ActivityForm } from '@/shared/activity/activity-form';
import { Activity } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Édition d'une activité";

type Props = {
    activity: Activity;
};

const Page: React.FC<Props> = ({ activity }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Formulaire d'édition d'activité">
                <Heading title={title}>
                    Modifiez les informations d’une activité existante pour garantir leur exactitude et leur visibilité sur la plateforme.
                </Heading>
                <div className="max-w-5xl">
                    <ActivityForm activity={activity} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
