import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { CandidacyAdminDetails } from '@/shared/candidacy/candidacy-card';
import { Candidacy } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = 'En savoir plus sur une candidature';

type Props = {
    candidacy: Candidacy;
};

const Page: React.FC<Props> = ({ candidacy }) => {
    return (
        <AdminLayout>
            <Head title={title} />

            <div className="container py-12" aria-label="Détails administratifs d'une candidature">
                <Heading title={title}>
                    Consultez les informations complètes liées à cette candidature pour faciliter son traitement et son suivi.
                </Heading>

                <CandidacyAdminDetails candidacy={candidacy} />
            </div>
        </AdminLayout>
    );
};

export default Page;
