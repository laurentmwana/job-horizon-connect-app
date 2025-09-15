import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { OfferForm } from '@/shared/offer/offer-form';
import { Offer } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Edition d'une offre";

type Props = {
    offer: Offer;
};

const Page: React.FC<Props> = ({ offer }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Editer une offre pour facilement les offres publiées dans la plateforme...</Heading>
            <div className="max-w-5xl">
                <OfferForm offer={offer} />
            </div>
        </AdminLayout>
    );
};
export default Page;
