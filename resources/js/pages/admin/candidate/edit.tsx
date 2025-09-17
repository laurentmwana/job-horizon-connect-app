import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { CandidateForm } from '@/shared/candidate/candidate-form';
import { Candidate } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Edition d'un candidat(e)";

type Props = {
    candidate: Candidate;
};

const Page: React.FC<Props> = ({ candidate }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Editer une activité pour facilement les activités publiées dans la plateforme...</Heading>
            <div className="max-w-5xl">
                <CandidateForm candidate={candidate} />
            </div>
        </AdminLayout>
    );
};
export default Page;
