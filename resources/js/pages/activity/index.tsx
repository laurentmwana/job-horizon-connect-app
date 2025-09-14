import { Heading } from '@/components/heading';
import { Pagination } from '@/components/ui/pagination';
import { BaseLayout } from '@/layouts/base-layout';
import { ActivityCollection } from '@/shared/activity/activity-card';
import { Activity } from '@/types/model';
import { PaginationData } from '@/types/paginate';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = { activities: PaginationData<Activity> };

const Page: React.FC<Props> = ({ activities }) => {
    return (
        <BaseLayout>
            <Head title="Liste des activités" />

            <div className="container py-12">
                <Heading title="Liste des activités">
                    Explorez les activités disponibles et participez facilement pour enrichir votre expérience.
                </Heading>

                <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {activities.data.map((activity) => (
                        <div key={activity.id} className="h-full">
                            <ActivityCollection activity={activity} />
                        </div>
                    ))}
                </div>

                <Pagination items={activities} />
            </div>
        </BaseLayout>
    );
};

export default Page;
