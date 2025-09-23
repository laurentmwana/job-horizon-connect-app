import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { OfferAdminDetails } from '@/shared/offer/offer-card';
import { Offer } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = 'En savoir plus sur une offre';

type Props = {
    offer: Offer;
};

const Page: React.FC<Props> = ({ offer }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Détails administratifs de l'offre">
                <Heading title={title}>
                    Consultez toutes les informations relatives à cette offre pour faciliter sa gestion et son suivi sur la plateforme.
                </Heading>

                <OfferAdminDetails candidate={null} offer={offer} />
            </div>
        </AdminLayout>
    );
};

export default Page;
