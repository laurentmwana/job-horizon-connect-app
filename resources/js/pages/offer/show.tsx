import { Heading } from '@/components/heading';
import { BaseLayout } from '@/layouts/base-layout';
import { OfferDetails } from '@/shared/offer/offer-card';
import { SharedData } from '@/types';
import { Offer } from '@/types/model';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

type Props = {
    offer: Offer;
};

const Page: React.FC<Props> = ({ offer }) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <BaseLayout>
            <Head title="Détails de l'offre" />

            <div className="container py-12" aria-label="Détails de l'offre sélectionnée">
                <Heading title="Détails de l'offre">
                    Consultez toutes les informations relatives à cette opportunité et postulez si elle correspond à votre profil.
                </Heading>

                <OfferDetails candidate={auth.user.candidate} offer={offer} />
            </div>
        </BaseLayout>
    );
};

export default Page;
