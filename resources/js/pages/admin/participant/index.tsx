import { Heading } from '@/components/heading';
import { Pagination } from '@/components/ui/pagination';
import { AdminLayout } from '@/layouts/admin-layout';
import { ParticipantTable } from '@/shared/participant/participant-table';
import { Participant } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = {
    participants: PaginationData<Participant>;
};

const title = 'Gestion des participants';

const Page: React.FC<Props> = ({ participants }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Section d'administration des participants">
                <Heading title={title}>
                    Gérez les profils des participants inscrits sur la plateforme : consultez leurs informations et suivez leur activité.
                </Heading>

                <ParticipantTable participants={participants.data} />
                <Pagination items={participants} />
            </div>
        </AdminLayout>
    );
};

export default Page;
