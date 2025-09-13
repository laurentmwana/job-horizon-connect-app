import { Heading } from '@/components/heading';
import { Pagination } from '@/components/ui/pagination';
import { BaseLayout } from '@/layouts/base-layout';
import { OfferCollection } from '@/shared/offer/offer-card';
import { Offer } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = { offers: PaginationData<Offer> };

const Page: React.FC<Props> = ({ offers }) => {
    return (
        <BaseLayout>
            <Head title="Liste des offres" />

            <div className="container py-12">
                <Heading title="Liste des offres">Découvrez les offres disponibles et postulez en quelques clics.</Heading>

                <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {offers.data.map((offer) => (
                        <div key={offer.id} className="h-full">
                            <OfferCollection offer={offer} />
                        </div>
                    ))}
                </div>

                <Pagination items={offers} />
            </div>
        </BaseLayout>
    );
};

export default Page;
