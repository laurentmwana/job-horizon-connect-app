import { Heading } from '@/components/heading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/layouts/admin-layout';
import { DashboardPiechart, DashboardPiechartProps } from '@/shared/dashboard/dashboard-piechart';
import { DashboardStats } from '@/shared/dashboard/dashboard-state';
import { Head } from '@inertiajs/react';
import { Activity } from 'lucide-react';
import React from 'react';

type Props = {
    countActivities: number;
    countOffers: number;
    countCandidates: number;
    stats: DashboardPiechartProps;
};

const Page: React.FC<Props> = ({ countActivities, countCandidates, countOffers, stats }) => {
    return (
        <AdminLayout>
            <Head title="Tableau de bord" />
            <Heading title="Tableau de bord">
                Retrouvez ici un aperçu rapide de vos activités, vos statistiques, et les actions importantes à suivre.
            </Heading>

            <DashboardStats countActivities={countActivities} countCandidates={countCandidates} countOffers={countOffers} />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Statistiques
                        </CardTitle>
                        <CardDescription>Les statistiques du dernier offre...</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed bg-muted/50">
                            <DashboardPiechart stats={stats} />
                        </div>
                    </CardContent>
                </Card>
                {/* <DashboardLastNotifications /> */}
            </div>
        </AdminLayout>
    );
};

export default Page;
