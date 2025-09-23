import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { CandidacyGenerateForm } from '@/shared/candidacy/candidacy-form';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = {};

const title = 'Génération de la liste des candidats ayant postulé';

const Page: React.FC<Props> = () => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Section d'administration : Génération de la liste des candidats ayant postulé">
                <Heading title={title}>
                    Gérez les profils des candidats enregistrés sur la plateforme&nbsp;: ajoutez, modifiez ou consultez leurs informations.
                </Heading>

                <div className="max-w-4xl">
                    <CandidacyGenerateForm />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
