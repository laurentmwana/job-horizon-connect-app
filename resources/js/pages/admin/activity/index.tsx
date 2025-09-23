import { Heading } from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { AdminLayout } from '@/layouts/admin-layout';
import { ActivitiesTable } from '@/shared/activity/activity-table';
import { Activity } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React from 'react';

type Props = {
    activities: PaginationData<Activity>;
};

const title = 'Gestion des activités';

const Page: React.FC<Props> = ({ activities }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <div className="container py-12" aria-label="Section d'administration des activités">
                <Heading title={title}>
                    Gérez les activités publiées sur la plateforme : ajoutez, modifiez ou supprimez facilement les contenus proposés.
                </Heading>

                <div className="mb-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/admin/activity/create">
                            <Plus size={15} className="mr-2" />
                        </Link>
                    </Button>
                </div>

                <ActivitiesTable activities={activities.data} />
                <Pagination items={activities} />
            </div>
        </AdminLayout>
    );
};

export default Page;
