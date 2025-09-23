import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { AdminLayout } from '@/layouts/admin-layout';
import { OffersTable } from '@/shared/offer/offer-table';
import { Offer } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React from 'react';

type Props = {
    offers: PaginationData<Offer>;
};

const title = 'Gestion des offres';

const Page: React.FC<Props> = ({ offers }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Section d'administration des offres">
                <Heading title={title}>
                    Gérez les offres publiées sur la plateforme : ajoutez, modifiez ou supprimez les opportunités proposées.
                </Heading>

                <div className="mb-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/offer/create">
                            <Plus size={15} className="mr-2" />
                            Nouvelle offre
                        </Link>
                    </Button>
                </div>

                <OffersTable offers={offers.data} />
                <Pagination items={offers} />
            </div>
        </AdminLayout>
    );
};

export default Page;
