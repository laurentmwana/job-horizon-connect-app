import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { JobPositionForm } from '@/shared/job-position/job-position-form';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Création d'un poste";

const Page: React.FC = () => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Formulaire de création de poste">
                <Heading title={title}>
                    Ajoutez un nouveau poste pour enrichir l’offre de recrutement et faciliter la gestion des candidatures.
                </Heading>
                <div className="max-w-5xl">
                    <JobPositionForm />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
