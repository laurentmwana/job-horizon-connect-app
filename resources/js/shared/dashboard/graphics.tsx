'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Selector } from '@/components/ui/selector';
import { useParams } from '@/hooks/use-params';
import type { ChartDataModel } from '@/types/model';
import { router } from '@inertiajs/react';

export const description = 'Un graphique en aires interactif';

const chartConfig = {
    candidacies: {
        label: 'Candidatures',
        color: 'var(--chart-1)',
    },
    participants: {
        label: 'Participants',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig;

type DashboardGraphicsProps = { chartData: ChartDataModel[]; years: string[] };

export const DashboardGraphics: React.FC<DashboardGraphicsProps> = ({ chartData, years }) => {
    const [timeRange, setTimeRange] = React.useState('90d');
    const { params, mergeParams } = useParams<{ year?: string }>();
    const [year, setYear] = React.useState<string>(params.year ?? new Date().getFullYear().toString());

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.month);
        const referenceDate = new Date();

        let daysToSubtract = 90;
        if (timeRange === '30d') {
            daysToSubtract = 30;
        } else if (timeRange === '7d') {
            daysToSubtract = 7;
        }
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    const onFilterByYear = (newYear: string) => {
        setYear(newYear);

        const url = mergeParams('/dashboard', { year: newYear });

        router.get(url);
    };

    const months = [
        { value: '90d', label: '3 derniers mois' },
        { value: '30d', label: '30 derniers jours' },
        { value: '7d', label: '7 derniers jours' },
    ];

    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Statistiques</CardTitle>
                    <CardDescription>Évolution des candidatures et des participants sur la période choisie</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                    <Selector
                        size="sm"
                        defaultValue={year.toString()}
                        onChange={(v) => onFilterByYear(v as string)}
                        mode="single"
                        items={years.map((y) => ({
                            id: y,
                            value: y,
                            label: y,
                            disabled: y === year,
                        }))}
                    />
                    <Selector
                        size="sm"
                        defaultValue={timeRange}
                        onChange={(v) => setTimeRange(v as string)}
                        mode="single"
                        items={months.map((m) => ({
                            id: m.value,
                            value: m.value,
                            label: m.label,
                            disabled: m.value === timeRange,
                        }))}
                    />
                </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillCandidacies" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-candidacies)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-candidacies)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillParticipants" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-participants)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-participants)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('fr-FR', {
                                    month: 'short',
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) =>
                                        new Date(value).toLocaleDateString('fr-FR', {
                                            month: 'short',
                                        })
                                    }
                                    indicator="dot"
                                />
                            }
                        />
                        <Area dataKey="participants" type="natural" fill="url(#fillParticipants)" stroke="var(--color-participants)" stackId="a" />
                        <Area dataKey="candidacies" type="natural" fill="url(#fillCandidacies)" stroke="var(--color-candidacies)" stackId="a" />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
