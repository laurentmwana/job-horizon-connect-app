import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { JobPositionForm } from '@/shared/job-position/job-position-form';
import { JobPosition } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Edition d'un poste";

type Props = {
    jobPosition: JobPosition;
};

const Page: React.FC<Props> = ({ jobPosition }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Editer une activité pour facilement les activités publiées dans la plateforme...</Heading>
            <div className="max-w-5xl">
                <JobPositionForm jobPosition={jobPosition} />
            </div>
        </AdminLayout>
    );
};
export default Page;
