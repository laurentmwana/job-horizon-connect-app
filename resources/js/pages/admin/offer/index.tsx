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

type Props = { offers: PaginationData<Offer> };

const title = "Gestions d'offers";

const Page: React.FC<Props> = ({ offers }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Gérer facilement les activités publiées dans la plateforme...</Heading>
            <div className="mb-4 flex justify-between gap-4">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/offer/create">
                        <Plus size={15} />
                    </Link>
                </Button>
            </div>
            <OffersTable offers={offers.data} />
            <Pagination items={offers} />
        </AdminLayout>
    );
};
export default Page;
