import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { ParticipantAdminDetails } from '@/shared/participant/participant-card';
import { Participant } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = 'En savoir plus sur un participant';

type Props = {
    participant: Participant;
};

const Page: React.FC<Props> = ({ participant }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Détails administratifs du participant">
                <Heading title={title}>
                    Consultez toutes les informations liées à ce participant pour faciliter son suivi et sa gestion sur la plateforme.
                </Heading> 

                <ParticipantAdminDetails participant={participant} />
            </div>
        </AdminLayout>
    );
};

export default Page;
