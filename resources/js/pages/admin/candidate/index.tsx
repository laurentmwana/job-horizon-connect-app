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

type Props = {
    candidates: PaginationData<Candidate>;
};

const title = 'Gestion des candidats';

const Page: React.FC<Props> = ({ candidates }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Section d'administration des candidats">
                <Heading title={title}>
                    Gérez les profils des candidats enregistrés sur la plateforme : ajoutez, modifiez ou consultez leurs informations.
                </Heading>

                <div className="mb-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/candidate/create">
                            <Plus size={15} className="mr-2" />
                            Nouveau candidat
                        </Link>
                    </Button>
                </div>

                <CandidatesTable candidates={candidates.data} />
                <Pagination items={candidates} />
            </div>
        </AdminLayout>
    );
};

export default Page;
