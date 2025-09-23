import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { ActivityAdminDetails } from '@/shared/activity/activity-card';
import { Activity } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = {
    activity: Activity;
};

const title = "Détails d'une activité";

const Page: React.FC<Props> = ({ activity }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Vue détaillée d'une activité côté administrateur">
                <Heading title={title}>
                    Consultez toutes les informations liées à cette activité pour assurer sa gestion et son suivi sur la plateforme.
                </Heading>

                <ActivityAdminDetails activity={activity} />
            </div>
        </AdminLayout>
    );
};

export default Page;
