'use client';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LabelList, Pie, PieChart } from 'recharts';

export const description = 'A pie chart with a label list';

export type DashboardPiechartProps = { validated: number; novalidated: number; total: number };

export function DashboardPiechart({ stats }: { stats: DashboardPiechartProps }) {
    const chartData = [
        { target: 'validated', counter: stats.validated, fill: 'var(--color-validated)' },
        { target: 'novalidated', counter: stats.novalidated, fill: 'var(--color-novalidated)' },
        { target: 'total', counter: stats.total, fill: 'var(--color-total)' },
    ];

    const chartConfig = {
        counter: {
            label: 'Statistique',
        },
        validated: {
            label: 'validées',
            color: 'var(--chart-1)',
        },
        novalidated: {
            label: 'non validées',
            color: 'var(--chart-2)',
        },
        total: {
            label: 'Total',
            color: 'var(--chart-3)',
        },
    } satisfies ChartConfig;

    return (
        <div className="w-[330px]">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square [&_.recharts-text]:fill-background">
                <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="counter" hideLabel />} />
                    <Pie data={chartData} dataKey="counter">
                        <LabelList
                            dataKey="target"
                            className="fill-background"
                            stroke="none"
                            fontSize={12}
                            formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
                        />
                    </Pie>
                </PieChart>
            </ChartContainer>
        </div>
    );
}
