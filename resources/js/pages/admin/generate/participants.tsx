import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { ParticipantGenerateForm } from '@/shared/participant/participant-form';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = 'Génération de la liste des participant ayant participé';

const Page: React.FC = () => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Section d'administration : Génération de la liste des participant ayant participé">
                <Heading title={title}>
                    Gérez les profils des participant enregistrés sur la plateforme&nbsp;: ajoutez, modifiez ou consultez leurs informations.
                </Heading>

                <div className="max-w-4xl">
                    <ParticipantGenerateForm />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
