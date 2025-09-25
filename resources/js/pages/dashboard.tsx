import { Heading } from '@/components/heading';
import { AdminLayout } from '@/layouts/admin-layout';
import { DashboardStats } from '@/shared/dashboard/dashboard-state';
import { DashboardGraphics } from '@/shared/dashboard/graphics';
import { ChartDataModel } from '@/types/model';
import { Head } from '@inertiajs/react';
import React from 'react';

type Props = {
    counter: {
        countActivities: number;
        countOffers: number;
        countCandidates: number;
    };
    stats: { chartData: ChartDataModel[]; years: string[] };
};

const Page: React.FC<Props> = ({ counter, stats }) => {
    console.log(stats);
    return (
        <AdminLayout>
            <Head title="Tableau de bord" />
            <Heading title="Tableau de bord">
                Retrouvez ici un aperçu rapide de vos activités, vos statistiques, et les actions importantes à suivre.
            </Heading>

            <DashboardStats countActivities={counter.countActivities} countCandidates={counter.countCandidates} countOffers={counter.countOffers} />

            <div className="grid grid-cols-1">
                <DashboardGraphics years={stats.years} chartData={stats.chartData} />
            </div>
        </AdminLayout>
    );
};

export default Page;
