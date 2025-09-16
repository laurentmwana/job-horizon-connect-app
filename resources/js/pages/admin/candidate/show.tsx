import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { CandidatelAdminDetails } from '@/shared/candidate/candidate-card';
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

            <div className="container py-12">
                <Heading title={title}>Découvrez tous les détails et participez en quelques clics.</Heading>

                <CandidatelAdminDetails candidate={candidate} />
            </div>
        </AdminLayout>
    );
};
export default Page;
