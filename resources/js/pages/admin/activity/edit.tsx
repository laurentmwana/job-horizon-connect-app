import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { ActivityForm } from '@/shared/activity/activity-form';
import { Activity } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Edition d'une activité";

type Props = {
    activity: Activity;
};

const Page: React.FC<Props> = ({ activity }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Editer une activité pour facilement les activités publiées dans la plateforme...</Heading>
            <div className="max-w-5xl">
                <ActivityForm activity={activity} />
            </div>
        </AdminLayout>
    );
};
export default Page;
