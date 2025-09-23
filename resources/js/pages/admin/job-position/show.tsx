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
            <div className="container py-12" aria-label="Détails administratifs du poste">
                <Heading title={title}>
                    Consultez toutes les informations liées à ce poste pour faciliter sa gestion et son intégration dans les offres disponibles.
                </Heading>

                <JobPositionAdminDetails jobPosition={jobPosition} />
            </div>
        </AdminLayout>
    );
};

export default Page;
