import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line, AreaChart, Area, ComposedChart } from "recharts";
import { ChartTypeSelector, ChartType } from "@/components/ChartTypeSelector";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

const rawData = [
  { name: "Facebook", impressions: 145000, engagement: 8500, conversions: 450 },
  { name: "Instagram", impressions: 98000, engagement: 12000, conversions: 380 },
  { name: "LinkedIn", impressions: 67000, engagement: 4200, conversions: 290 },
  { name: "Google Ads", impressions: 187000, engagement: 6800, conversions: 620 },
];

// Calculate rates for better comparison
const data = rawData.map(item => ({
  ...item,
  engagementRate: ((item.engagement / item.impressions) * 100).toFixed(2),
  conversionRate: ((item.conversions / item.impressions) * 100).toFixed(3),
}));

// Find best performers
const bestImpressions = rawData.reduce((max, item) => item.impressions > max.impressions ? item : max);
const bestEngagement = rawData.reduce((max, item) => item.engagement > max.engagement ? item : max);
const bestConversions = rawData.reduce((max, item) => item.conversions > max.conversions ? item : max);
const bestEngagementRate = data.reduce((max, item) => parseFloat(item.engagementRate) > parseFloat(max.engagementRate) ? item : max);
const bestConversionRate = data.reduce((max, item) => parseFloat(item.conversionRate) > parseFloat(max.conversionRate) ? item : max);

export const PerformanceChart = () => {
  const [chartType, setChartType] = useState<ChartType>("bar");

  const formatNumber = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  const renderChart = () => {
    const commonProps = {
      data,
      children: [
        <CartesianGrid key="grid" strokeDasharray="3 3" stroke="hsl(var(--border))" />,
        <XAxis
          key="xaxis"
          dataKey="name"
          stroke="hsl(var(--muted-foreground))"
          style={{ fontSize: '12px' }}
        />,
        <YAxis
          key="yaxis"
          stroke="hsl(var(--muted-foreground))"
          tickFormatter={formatNumber}
          style={{ fontSize: '12px' }}
        />,
        <Tooltip
          key="tooltip"
          formatter={(value: number) => value.toLocaleString()}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "var(--radius)",
          }}
        />,
        <Legend
          key="legend"
          wrapperStyle={{ fontSize: '12px' }}
          iconType="circle"
        />
      ]
    };

    if (chartType === "bar") {
      return (
        <BarChart {...commonProps}>
          {commonProps.children}
          <Bar
            dataKey="impressions"
            fill="hsl(var(--chart-1))"
            radius={[4, 4, 0, 0]}
            name="Impressions"
          />
          <Bar
            dataKey="engagement"
            fill="hsl(var(--chart-2))"
            radius={[4, 4, 0, 0]}
            name="Engagement"
          />
          <Bar
            dataKey="conversions"
            fill="hsl(var(--chart-3))"
            radius={[4, 4, 0, 0]}
            name="Conversions"
          />
        </BarChart>
      );
    }

    if (chartType === "line") {
      return (
        <LineChart {...commonProps}>
          {commonProps.children}
          <Line
            type="monotone"
            dataKey="impressions"
            stroke="hsl(var(--chart-1))"
            strokeWidth={3}
            name="Impressions"
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="engagement"
            stroke="hsl(var(--chart-2))"
            strokeWidth={3}
            name="Engagement"
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="conversions"
            stroke="hsl(var(--chart-3))"
            strokeWidth={3}
            name="Conversions"
            dot={{ r: 4 }}
          />
        </LineChart>
      );
    }

    return (
      <AreaChart {...commonProps}>
        {commonProps.children}
        <Area
          type="monotone"
          dataKey="impressions"
          stroke="hsl(var(--chart-1))"
          fill="hsl(var(--chart-1))"
          fillOpacity={0.3}
          name="Impressions"
        />
        <Area
          type="monotone"
          dataKey="engagement"
          stroke="hsl(var(--chart-2))"
          fill="hsl(var(--chart-2))"
          fillOpacity={0.3}
          name="Engagement"
        />
        <Area
          type="monotone"
          dataKey="conversions"
          stroke="hsl(var(--chart-3))"
          fill="hsl(var(--chart-3))"
          fillOpacity={0.3}
          name="Conversions"
        />
      </AreaChart>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle>Platform Performance Comparison</CardTitle>
          <CardDescription>Comparing impressions, engagement, and conversions across platforms</CardDescription>
        </div>
        <ChartTypeSelector currentType={chartType} onTypeChange={setChartType} />
      </CardHeader>
      <CardContent className="space-y-4">
        <ResponsiveContainer width="100%" height={320}>
          {renderChart()}
        </ResponsiveContainer>

        {/* Performance Summary Table */}
        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-semibold mb-3">Performance Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-medium text-muted-foreground">Platform</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Impressions</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Engagement</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Eng. Rate</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Conversions</th>
                  <th className="text-right py-2 px-2 font-medium text-muted-foreground">Conv. Rate</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                    <td className="py-2 px-2 font-medium">{item.name}</td>
                    <td className="text-right py-2 px-2">
                      <div className="flex items-center justify-end gap-1">
                        {item.impressions.toLocaleString()}
                        {item.name === bestImpressions.name && (
                          <Trophy className="h-3 w-3 text-amber-500" />
                        )}
                      </div>
                    </td>
                    <td className="text-right py-2 px-2">
                      <div className="flex items-center justify-end gap-1">
                        {item.engagement.toLocaleString()}
                        {item.name === bestEngagement.name && (
                          <Trophy className="h-3 w-3 text-amber-500" />
                        )}
                      </div>
                    </td>
                    <td className="text-right py-2 px-2">
                      <div className="flex items-center justify-end gap-1">
                        <Badge variant={parseFloat(item.engagementRate) > 6 ? "default" : "secondary"} className="text-xs">
                          {item.engagementRate}%
                        </Badge>
                        {item.name === bestEngagementRate.name && (
                          <Trophy className="h-3 w-3 text-amber-500" />
                        )}
                      </div>
                    </td>
                    <td className="text-right py-2 px-2">
                      <div className="flex items-center justify-end gap-1">
                        {item.conversions.toLocaleString()}
                        {item.name === bestConversions.name && (
                          <Trophy className="h-3 w-3 text-amber-500" />
                        )}
                      </div>
                    </td>
                    <td className="text-right py-2 px-2">
                      <div className="flex items-center justify-end gap-1">
                        <Badge variant={parseFloat(item.conversionRate) > 0.3 ? "default" : "secondary"} className="text-xs">
                          {item.conversionRate}%
                        </Badge>
                        {item.name === bestConversionRate.name && (
                          <Trophy className="h-3 w-3 text-amber-500" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <Trophy className="h-3 w-3 inline text-amber-500" /> indicates best performer in each category
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
