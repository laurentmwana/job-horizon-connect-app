import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { AdminLayout } from '@/layouts/admin-layout';
import { JobPositionsTable } from '@/shared/job-position/job-position-table';
import { JobPosition } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React from 'react';

type Props = { jobPositions: PaginationData<JobPosition> };

const title = 'Gestions de postes';

const Page: React.FC<Props> = ({ jobPositions }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Gérer facilement les activités publiées dans la plateforme...</Heading>
            <div className="mb-4 flex justify-between gap-4">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/job-position/create">
                        <Plus size={15} />
                    </Link>
                </Button>
            </div>
            <JobPositionsTable jobPositions={jobPositions.data} />
            <Pagination items={jobPositions} />
        </AdminLayout>
    );
};
export default Page;
