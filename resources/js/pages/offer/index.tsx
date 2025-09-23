import { Heading } from '@/components/heading';
import { Pagination } from '@/components/ui/pagination';
import { BaseLayout } from '@/layouts/base-layout';
import { OfferCollection } from '@/shared/offer/offer-card';
import { SharedData } from '@/types';
import { Offer } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head, usePage } from '@inertiajs/react';
import React from 'react';

type Props = {
    offers: PaginationData<Offer>;
};

const Page: React.FC<Props> = ({ offers }) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <BaseLayout>
            <Head title="Liste des offres" />

            <div className="container py-12" aria-label="Section des offres disponibles">
                <Heading title="Liste des offres">
                    Parcourez les opportunités disponibles et postulez facilement pour faire avancer votre carrière.
                </Heading>

                <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {offers.data.map((offer) => (
                        <div key={offer.id} className="h-full">
                            <OfferCollection candidate={auth.user.candidate} offer={offer} />
                        </div>
                    ))}
                </div>

                <Pagination items={offers} />
            </div>
        </BaseLayout>
    );
};

export default Page;
