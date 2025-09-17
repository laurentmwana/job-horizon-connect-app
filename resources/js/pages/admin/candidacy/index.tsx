import { Heading } from '@/components/heading';
import { Pagination } from '@/components/ui/pagination';
import { AdminLayout } from '@/layouts/admin-layout';
import { CandidaciesTable } from '@/shared/candidacy/candidate-table';
import { Candidacy } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = { candidacies: PaginationData<Candidacy> };

const title = 'Gestions des candidatures';

const Page: React.FC<Props> = ({ candidacies }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Gérer facilement les activités publiées dans la plateforme...</Heading>
            <CandidaciesTable candidacies={candidacies.data} />
            <Pagination items={candidacies} />
        </AdminLayout>
    );
};
export default Page;
