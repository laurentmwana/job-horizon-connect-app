'use client';

import * as React from 'react';
import { Label, Pie, PieChart, Sector } from 'recharts';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChipsSelector } from '@/components/ui/chips';
import { SpacePiechartStats } from '@/types/filter';

type Status = 'accepted' | 'refused' | 'pending';

type Item = { status: Status; value: number; fill: string }

type Props = {
    title: string;
    description?: string;
    stats: SpacePiechartStats;
};

const chartConfig = {
    accepted: { label: 'Acceptées', color: 'var(--primary)' },
    refused: { label: 'Refusées', color: 'var(--destructive)' },
    pending: { label: 'En attente', color: 'var(--secondary)' },
} as const satisfies ChartConfig;

export const SpacePiechart: React.FC<Props> = ({ title, description, stats }) => {
    const id = 'pie-interactive';

    const data = React.useMemo<Item[]>(() => {
        return [
            { status: 'refused', value: stats.refused, fill: 'var(--color-refused)' },
            { status: 'accepted', value: stats.accepted, fill: 'var(--color-accepted)' },
            { status: 'pending', value: stats.pending, fill: 'var(--color-pending)' },
        ]
    }, [stats])

    const [activeStatus, setActiveStatus] = React.useState<Status>(data[0].status);

    const activeIndex = React.useMemo(() => data.findIndex((d) => d.status === activeStatus), [activeStatus, data]);

    const statusList = React.useMemo(() => data.map((d) => d.status), [data]);

    return (
        <Card data-chart={id} className="flex flex-col">
            <ChartStyle id={id} config={chartConfig} />

            <CardHeader className="flex-row items-start space-y-0 pb-0">
                <div className="grid gap-1">
                    <CardTitle>{title}</CardTitle>
                    {description && <CardDescription>{description}</CardDescription>}
                </div>

                <ChipsSelector
                    clearable={false}
                    mode="single"
                    size="sm"
                    selectedValues={activeStatus}
                    onSelectionChange={(v) => setActiveStatus(v as Status)}
                    items={statusList.map((s) => ({
                        id: s,
                        value: s,
                        label: chartConfig[s].label,
                    }))}
                />
            </CardHeader>

            <CardContent className="flex flex-1 justify-center pb-0">
                <ChartContainer id={id} config={chartConfig} className="mx-auto aspect-square w-full max-w-[300px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="status"
                            innerRadius={60}
                            strokeWidth={5}
                            activeIndex={activeIndex}
                            activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                                <g>
                                    <Sector {...props} outerRadius={outerRadius + 10} />
                                    <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                                </g>
                            )}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) return null;

                                    const { value, status } = data[activeIndex];
                                    return (
                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                                {value.toLocaleString()}
                                            </tspan>
                                            <tspan x={viewBox.cx} y={(viewBox.cy as number) + 24} className="fill-muted-foreground">
                                                {chartConfig[status].label}
                                            </tspan>
                                        </text>
                                    );
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
