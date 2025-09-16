import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { JobPositionAdminDetails } from '@/shared/job-position/job-position-card';
import { JobPosition } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = 'En savoir plus sur un poste';

type Props = {
    jobPosition: JobPosition;
};

const Page: React.FC<Props> = ({ jobPosition }) => {
    return (
        <AdminLayout>
            <Head title={title} />

            <div className="container py-12">
                <Heading title={title}>Découvrez tous les détails et participez en quelques clics.</Heading>

                <JobPositionAdminDetails jobPosition={jobPosition} />
            </div>
        </AdminLayout>
    );
};
export default Page;
