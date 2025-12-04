import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line, BarChart, Bar } from "recharts";
import { ChartTypeSelector, ChartType } from "@/components/ChartTypeSelector";
import { useState } from "react";

const data = [
  { month: "Jan", revenue: 45000, target: 50000 },
  { month: "Feb", revenue: 52000, target: 55000 },
  { month: "Mar", revenue: 48000, target: 52000 },
  { month: "Apr", revenue: 61000, target: 58000 },
  { month: "May", revenue: 67000, target: 65000 },
  { month: "Jun", revenue: 73000, target: 70000 },
];

export const RevenueChart = () => {
  const [chartType, setChartType] = useState<ChartType>("area");

  const renderChart = () => {
    const commonProps = {
      data,
      children: [
        <CartesianGrid key="grid" strokeDasharray="3 3" stroke="hsl(var(--border))" />,
        <XAxis key="xaxis" dataKey="month" stroke="hsl(var(--muted-foreground))" />,
        <YAxis key="yaxis" stroke="hsl(var(--muted-foreground))" />,
        <Tooltip
          key="tooltip"
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />
      ]
    };

    if (chartType === "area") {
      return (
        <AreaChart {...commonProps}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          {commonProps.children}
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorRevenue)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="target"
            stroke="hsl(var(--secondary))"
            fillOpacity={1}
            fill="url(#colorTarget)"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        </AreaChart>
      );
    }

    if (chartType === "line") {
      return (
        <LineChart {...commonProps}>
          {commonProps.children}
          <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
          <Line type="monotone" dataKey="target" stroke="hsl(var(--secondary))" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      );
    }

    return (
      <BarChart {...commonProps}>
        {commonProps.children}
        <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Revenue" />
        <Bar dataKey="target" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} name="Target" />
      </BarChart>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Revenue Trends</CardTitle>
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
