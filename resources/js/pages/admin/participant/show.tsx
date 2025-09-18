import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { ParticipantAdminDetails } from '@/shared/participant/participant-card';
import { Participant } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = 'En savoir plus sur une participation';

type Props = {
    participant: Participant;
};

const Page: React.FC<Props> = ({ participant }) => {
    return (
        <AdminLayout>
            <Head title={title} />

            <div className="container py-12">
                <Heading title={title}>Découvrez tous les détails et participez en quelques clics.</Heading>

                <ParticipantAdminDetails participant={participant} />
            </div>
        </AdminLayout>
    );
};
export default Page;
