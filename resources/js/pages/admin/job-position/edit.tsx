import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { JobPositionForm } from '@/shared/job-position/job-position-form';
import { JobPosition } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Édition d'un poste";

type Props = {
    jobPosition: JobPosition;
};

const Page: React.FC<Props> = ({ jobPosition }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Formulaire d'édition de poste">
                <Heading title={title}>
                    Modifiez les informations du poste pour garantir leur exactitude et faciliter la gestion des offres sur la plateforme.
                </Heading>
                <div className="max-w-5xl">
                    <JobPositionForm jobPosition={jobPosition} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
