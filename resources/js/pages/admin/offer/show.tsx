import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { OfferAdminDetails } from '@/shared/offer/offer-card';
import { Offer } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = {
    offer: Offer;
};

const Page: React.FC<Props> = ({ offer }) => {
    return (
        <AdminLayout>
            <Head title="En savoir plus sur une offre" />

            <div className="container py-12">
                <Heading title="En savoir plus sur une offre">Découvrez tous les détails et participez en quelques clics.</Heading>

                <OfferAdminDetails offer={offer} />
            </div>
        </AdminLayout>
    );
};
export default Page;
