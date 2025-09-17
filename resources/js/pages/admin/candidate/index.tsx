import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { AdminLayout } from '@/layouts/admin-layout';
import { CandidatesTable } from '@/shared/candidate/candidate-table';
import { Candidate } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React from 'react';

type Props = { candidates: PaginationData<Candidate> };

const title = 'Gestions candidats';

const Page: React.FC<Props> = ({ candidates }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Gérer facilement les activités publiées dans la plateforme...</Heading>
            <div className="mb-4 flex justify-between gap-4">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/candidate/create">
                        <Plus size={15} />
                    </Link>
                </Button>
            </div>
            <CandidatesTable candidates={candidates.data} />
            <Pagination items={candidates} />
        </AdminLayout>
    );
};
export default Page;
