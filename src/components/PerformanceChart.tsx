import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line, AreaChart, Area } from "recharts";
import { ChartTypeSelector, ChartType } from "@/components/ChartTypeSelector";
import { useState } from "react";

const data = [
  { name: "Facebook", impressions: 145000, engagement: 8500, conversions: 450 },
  { name: "Instagram", impressions: 98000, engagement: 12000, conversions: 380 },
  { name: "LinkedIn", impressions: 67000, engagement: 4200, conversions: 290 },
  { name: "Google Ads", impressions: 187000, engagement: 6800, conversions: 620 },
];

export const PerformanceChart = () => {
  const [chartType, setChartType] = useState<ChartType>("bar");

  const renderChart = () => {
    const commonProps = {
      data,
      children: [
        <CartesianGrid key="grid" strokeDasharray="3 3" stroke="hsl(var(--border))" />,
        <XAxis key="xaxis" dataKey="name" stroke="hsl(var(--muted-foreground))" />,
        <YAxis key="yaxis" stroke="hsl(var(--muted-foreground))" />,
        <Tooltip
          key="tooltip"
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />,
        <Legend key="legend" />
      ]
    };

    if (chartType === "bar") {
      return (
        <BarChart {...commonProps}>
          {commonProps.children}
          <Bar dataKey="impressions" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="engagement" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
          <Bar dataKey="conversions" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
        </BarChart>
      );
    }

    if (chartType === "line") {
      return (
        <LineChart {...commonProps}>
          {commonProps.children}
          <Line type="monotone" dataKey="impressions" stroke="hsl(var(--chart-1))" strokeWidth={2} />
          <Line type="monotone" dataKey="engagement" stroke="hsl(var(--chart-2))" strokeWidth={2} />
          <Line type="monotone" dataKey="conversions" stroke="hsl(var(--chart-3))" strokeWidth={2} />
        </LineChart>
      );
    }

    return (
      <AreaChart {...commonProps}>
        {commonProps.children}
        <Area type="monotone" dataKey="impressions" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} />
        <Area type="monotone" dataKey="engagement" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} />
        <Area type="monotone" dataKey="conversions" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.3} />
      </AreaChart>
    );
  };

  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Platform Performance Comparison</CardTitle>
        <ChartTypeSelector currentType={chartType} onTypeChange={setChartType} />
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
