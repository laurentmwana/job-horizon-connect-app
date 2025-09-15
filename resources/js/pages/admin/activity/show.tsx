import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { ActivityAdminDetails } from '@/shared/activity/activity-card';
import { Activity } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = {
    activity: Activity;
};

const Page: React.FC<Props> = ({ activity }) => {
    return (
        <AdminLayout>
            <Head title="En savoir plus sur une activité" />

            <div className="container py-12">
                <Heading title="En savoir plus sur une activité">Découvrez tous les détails et participez en quelques clics.</Heading>

                <ActivityAdminDetails activity={activity} />
            </div>
        </AdminLayout>
    );
};
export default Page;
