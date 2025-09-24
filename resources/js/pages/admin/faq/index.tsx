import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { AdminLayout } from '@/layouts/admin-layout';
import { FaqsTable } from '@/shared/faq/faq-table';
import { Faq } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React from 'react';

type Props = {
    faqs: PaginationData<Faq>;
};

const title = 'Gestion des FAQ';

const Page: React.FC<Props> = ({ faqs }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Section d'administration des FAQ">
                <Heading title={title}>
                    Gérez les questions fréquentes de la plateforme&nbsp;: ajoutez, modifiez ou supprimez des entrées pour offrir une meilleure
                    expérience aux utilisateurs.
                </Heading>

                <div className="mb-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/faq/create">
                            <Plus size={15} />
                        </Link>
                    </Button>
                </div>

                <FaqsTable faqs={faqs.data} />
                <Pagination items={faqs} />
            </div>
        </AdminLayout>
    );
};

export default Page;
