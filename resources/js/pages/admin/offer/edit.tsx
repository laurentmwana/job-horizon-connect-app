import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { OfferForm } from '@/shared/offer/offer-form';
import { Offer } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Édition d'une offre";

type Props = {
    offer: Offer;
};

const Page: React.FC<Props> = ({ offer }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Formulaire d'édition d'offre">
                <Heading title={title}>
                    Modifiez les informations de l’offre pour garantir leur exactitude et améliorer leur visibilité sur la plateforme.
                </Heading>
                <div className="max-w-5xl">
                    <OfferForm offer={offer} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default Page;
