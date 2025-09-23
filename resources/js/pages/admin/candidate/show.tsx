import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { CandidateAdminDetails } from '@/shared/candidate/candidate-card';
import { Candidate } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = 'En savoir plus sur un candidat';

type Props = {
    candidate: Candidate;
};

const Page: React.FC<Props> = ({ candidate }) => {
    return (
        <AdminLayout>
            <Head title={title} />

            <div className="container py-12" aria-label="Détails administratifs du profil candidat">
                <Heading title={title}>
                    Consultez les informations complètes liées à ce profil candidat pour faciliter son évaluation et son suivi.
                </Heading>

                <CandidateAdminDetails candidate={candidate} />
            </div>
        </AdminLayout>
    );
};

export default Page;
