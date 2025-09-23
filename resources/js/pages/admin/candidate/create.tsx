import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { CandidateForm } from '@/shared/candidate/candidate-form';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Création d'un(e) candidat(e)";

const Page: React.FC = () => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Formulaire de création de candidat">
                <Heading title={title}>
                    Ajoutez un(e) nouveau(elle) candidat(e) pour enrichir votre base de données et faciliter le suivi des candidatures.
                </Heading>
                <div className="max-w-5xl">
                    <CandidateForm />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
