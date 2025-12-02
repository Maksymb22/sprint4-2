import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { AISuggestions } from "@/components/AISuggestions";
import { ExportData } from "@/components/ExportData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, TrendingUp, Zap } from "lucide-react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartTypeSelector, ChartType } from "@/components/ChartTypeSelector";
import { useState } from "react";

const funnelData = [
  { stage: "Visitors", count: 45800, rate: 100 },
  { stage: "Leads", count: 12400, rate: 27.1 },
  { stage: "Qualified", count: 6200, rate: 13.5 },
  { stage: "Opportunities", count: 2480, rate: 5.4 },
  { stage: "Customers", count: 892, rate: 1.9 },
];

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

const Conversions = () => {
  const [funnelChartType, setFunnelChartType] = useState<ChartType>("bar");

  const aiSuggestions = [
    {
      type: "opportunity" as const,
      title: "Strong Close Rate",
      description: "36% close rate from opportunity to customer is excellent. Document your sales process and replicate this success across all sales reps.",
    },
    {
      type: "insight" as const,
      title: "Healthy Lead Quality",
      description: "50% qualification rate from leads suggests strong lead scoring. Your marketing is attracting the right audience profile.",
    },
    {
      type: "warning" as const,
      title: "Top of Funnel Optimization",
      description: "Only 1.9% overall conversion from visitor to customer. Focus on increasing visitor engagement and initial lead capture to improve funnel efficiency.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Conversion Performance</h1>
            <p className="text-muted-foreground mt-1">Funnel visualization and customer acquisition metrics</p>
          </div>
          <ExportData data={funnelData} filename="conversions-data" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Overall Conversion"
            value="1.9%"
            change={12.5}
            icon={<Target className="h-4 w-4" />}
            subtitle="Visitor to customer"
          />
          <MetricCard
            title="Lead Conversion"
            value="27.1%"
            change={8.4}
            icon={<Users className="h-4 w-4" />}
            subtitle="Visitor to lead"
          />
          <MetricCard
            title="Qualified Rate"
            value="50.0%"
            change={5.2}
            icon={<TrendingUp className="h-4 w-4" />}
            subtitle="Lead to qualified"
          />
          <MetricCard
            title="Close Rate"
            value="36.0%"
            change={15.8}
            icon={<Zap className="h-4 w-4" />}
            subtitle="Opportunity to customer"
          />
        </div>

        <AISuggestions suggestions={aiSuggestions} title="AI Conversion Insights" />

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Conversion Funnel</CardTitle>
            <ChartTypeSelector currentType={funnelChartType} onTypeChange={setFunnelChartType} />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              {funnelChartType === "bar" ? (
                <BarChart data={funnelData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="stage" type="category" stroke="hsl(var(--muted-foreground))" width={100} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number, name: string, props: any) => {
                      return [
                        `${value.toLocaleString()} (${props.payload.rate}%)`,
                        name === "count" ? "Count" : name
                      ];
                    }}
                  />
                  <Bar dataKey="count" name="Count">
                    {funnelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              ) : funnelChartType === "line" ? (
                <LineChart data={funnelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="stage" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Line type="monotone" dataKey="count" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Count" />
                </LineChart>
              ) : (
                <AreaChart data={funnelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="stage" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="count" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} name="Count" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Conversions;
