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

type Props = { activities: PaginationData<Activity> };

const title = "Gestions d'activités";

const Page: React.FC<Props> = ({ activities }) => {
    return (
        <AdminLayout>
            <Head title={title} />
            <Heading title={title}>Gérer facilement les activités publiées dans la plateforme...</Heading>
            <div className="mb-4 flex justify-between gap-4">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/activity/create">
                        <Plus size={15} />
                    </Link>
                </Button>
            </div>
            <ActivitiesTable activities={activities.data} />
            <Pagination items={activities} />
        </AdminLayout>
    );
};
export default Page;
