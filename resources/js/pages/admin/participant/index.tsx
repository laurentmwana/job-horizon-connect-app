import { Heading } from '@/components/heading';
import { Pagination } from '@/components/ui/pagination';
import { AdminLayout } from '@/layouts/admin-layout';
import { ParticipantTable } from '@/shared/participant/participant-table';
import { Participant } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = { participants: PaginationData<Participant> };

const title = 'Gestions des participants';

const Page: React.FC<Props> = ({ participants }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Gérer facilement les activités publiées dans la plateforme...</Heading>
            <ParticipantTable participants={participants.data} />
            <Pagination items={participants} />
        </AdminLayout>
    );
};
export default Page;
