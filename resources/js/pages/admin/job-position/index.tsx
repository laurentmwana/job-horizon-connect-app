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

type Props = {
    jobPositions: PaginationData<JobPosition>;
};

const title = 'Gestion des postes';

const Page: React.FC<Props> = ({ jobPositions }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Section d'administration des postes">
                <Heading title={title}>
                    Gérez les postes proposés sur la plateforme : ajoutez, modifiez ou supprimez les intitulés pour structurer vos offres.
                </Heading>

                <div className="mb-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/job-position/create">
                            <Plus size={15} className="mr-2" />
                            Nouveau poste
                        </Link>
                    </Button>
                </div>

                <JobPositionsTable jobPositions={jobPositions.data} />
                <Pagination items={jobPositions} />
            </div>
        </AdminLayout>
    );
};

export default Page;
