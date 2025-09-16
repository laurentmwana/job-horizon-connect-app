import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { CandidateForm } from '@/shared/candidate/candidate-form';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Création d'un candidat(e)";

type Props = {};

const Page: React.FC<Props> = () => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Ajouter une activité pour facilement les activités publiées dans la plateforme...</Heading>
            <div className="max-w-5xl">
                <CandidateForm />
            </div>
        </AdminLayout>
    );
};
export default Page;
