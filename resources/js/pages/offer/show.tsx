import { Heading } from '@/components/heading';
import { BaseLayout } from '@/layouts/base-layout';
import { OfferDetails } from '@/shared/offer/offer-card';
import { Offer } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = { offer: Offer };

const Page: React.FC<Props> = ({ offer }) => {
    return (
        <BaseLayout>
            <Head title="En savoir plus sur une offre" />

            <div className="container py-12">
                <Heading title="En savoir plus sur une offre">Découvrez les offres disponibles et postulez en quelques clics.</Heading>
                <OfferDetails offer={offer} />
            </div>
        </BaseLayout>
    );
};

export default Page;
