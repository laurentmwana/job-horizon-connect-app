import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { OfferForm } from '@/shared/offer/offer-form';
import { Head } from '@inertiajs/react';
import React from 'react';

const title = "Création d'une offre";

type Props = {};

const Page: React.FC<Props> = () => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Ajouter une offre pour facilement les offres publiées dans la plateforme...</Heading>
            <div className="max-w-5xl">
                <OfferForm />
            </div>
        </AdminLayout>
    );
};
export default Page;
