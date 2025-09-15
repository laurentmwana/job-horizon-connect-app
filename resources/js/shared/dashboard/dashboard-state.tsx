import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

type DashboardStatsProps = {
    countActivities: number;
    countOffers: number;
    countCandidates: number;
};

export const DashboardStats: React.FC<DashboardStatsProps> = ({ countActivities, countOffers, countCandidates }) => {
    const stats = [
        {
            title: 'Activités',
            value: countActivities,
            description: 'les activités...',
        },
        {
            title: 'Offres',
            value: countOffers,
            description: 'les offres...',
        },
        {
            title: 'Candidats',
            value: countCandidates,
            description: 'Les candidats...',
        },
    ];

    return (
        <div>
            <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat, index) => {
                    return (
                        <Card key={index} className="relative">
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                                        <p className="text-xs text-muted-foreground">{stat.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};
