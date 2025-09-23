import { Heading } from '@/components/heading';
import { Pagination } from '@/components/ui/pagination';
import { AdminLayout } from '@/layouts/admin-layout';
import { CandidaciesTable } from '@/shared/candidacy/candidacy-table';
import { Candidacy } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = {
    candidacies: PaginationData<Candidacy>;
};

const title = 'Gestion des candidatures';

const Page: React.FC<Props> = ({ candidacies }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Section d'administration des candidatures">
                <Heading title={title}>
                    Gérez les candidatures reçues sur la plateforme : suivez leur statut, consultez les profils et prenez les décisions appropriées.
                </Heading>

                <CandidaciesTable candidacies={candidacies.data} />
                <Pagination items={candidacies} />
            </div>
        </AdminLayout>
    );
};

export default Page;
