import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { JobPositionForm } from '@/shared/job-position/job-position-form';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Création d'un poste";

type Props = {};

const Page: React.FC<Props> = () => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Ajouter une activité pour facilement les activités publiées dans la plateforme...</Heading>
            <div className="max-w-5xl">
                <JobPositionForm />
            </div>
        </AdminLayout>
    );
};
export default Page;
