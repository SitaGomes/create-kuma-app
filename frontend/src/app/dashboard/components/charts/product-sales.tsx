'use client';

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type ProductSales = {
  product: { id: string; name: string; quantity: number };
  count: number;
};

const chartConfig = {
  quantity: {
    label: 'Quantidade',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

type ProductSalesChartProps = {
  data: ProductSales[];
};

export function ProductSalesChart({ data }: ProductSalesChartProps) {
  const chartData = data.map((item) => ({
    name: item.product.name,
    quantity: item.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico dos produtos vendidos</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={1}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="quantity" fill="var(--color-quantity)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
