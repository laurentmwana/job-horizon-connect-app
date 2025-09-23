'use client';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LabelList, Pie, PieChart } from 'recharts';

export const description = 'Un graphique circulaire avec des étiquettes';

export type DashboardPiechartProps = {
    validated: number;
    novalidated: number;
    total: number;
};

const chartConfig: ChartConfig = {
    validated: {
        label: 'Validées',
        color: 'var(--chart-1)',
    },
    novalidated: {
        label: 'Non validées',
        color: 'var(--chart-2)',
    },
    total: {
        label: 'Total',
        color: 'var(--chart-3)',
    },
};

export function DashboardPiechart({ stats }: { stats: DashboardPiechartProps }) {
    const chartData = [
        { target: 'validated', counter: stats.validated, fill: 'var(--color-validated)' },
        { target: 'novalidated', counter: stats.novalidated, fill: 'var(--color-novalidated)' },
        { target: 'total', counter: stats.total, fill: 'var(--color-total)' },
    ];

    return (
        <div className="w-[330px]">
            <ChartContainer config={chartConfig} className="mx-auto aspect-square [&_.recharts-text]:fill-background">
                <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="counter" hideLabel />} />
                    <Pie data={chartData} dataKey="counter" nameKey="target">
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
