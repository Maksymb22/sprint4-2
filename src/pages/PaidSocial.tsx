import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Target, TrendingUp, Users } from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartTypeSelector, ChartType } from "@/components/ChartTypeSelector";
import { useState } from "react";

const campaignData = [
  { month: "Jan", spend: 8500, conversions: 142, roas: 3.2 },
  { month: "Feb", spend: 9200, conversions: 168, roas: 3.5 },
  { month: "Mar", spend: 10100, conversions: 195, roas: 3.8 },
  { month: "Apr", spend: 11400, conversions: 224, roas: 4.1 },
  { month: "May", spend: 12800, conversions: 267, roas: 4.4 },
  { month: "Jun", spend: 14200, conversions: 312, roas: 4.7 },
];

const PaidSocial = () => {
  const [performanceChartType, setPerformanceChartType] = useState<ChartType>("line");
  const [spendChartType, setSpendChartType] = useState<ChartType>("line");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Paid Social Media</h1>
          <p className="text-muted-foreground mt-1">Track ROI, ad spend, and campaign performance</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Ad Spend"
            value="$66,200"
            change={-8.3}
            icon={<DollarSign className="h-4 w-4" />}
            subtitle="Last 6 months"
          />
          <MetricCard
            title="Total Conversions"
            value="1,308"
            change={24.6}
            icon={<Target className="h-4 w-4" />}
            subtitle="Across all campaigns"
          />
          <MetricCard
            title="Avg ROAS"
            value="4.0x"
            change={18.2}
            icon={<TrendingUp className="h-4 w-4" />}
            subtitle="Return on ad spend"
          />
          <MetricCard
            title="Cost per Conversion"
            value="$50.61"
            change={-12.4}
            icon={<Users className="h-4 w-4" />}
            subtitle="Average CPC"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Campaign Performance Trends</CardTitle>
              <ChartTypeSelector currentType={performanceChartType} onTypeChange={setPerformanceChartType} />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {performanceChartType === "line" ? (
                  <LineChart data={campaignData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="conversions" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Conversions" />
                    <Line type="monotone" dataKey="roas" stroke="hsl(var(--chart-2))" strokeWidth={2} name="ROAS" />
                  </LineChart>
                ) : performanceChartType === "bar" ? (
                  <BarChart data={campaignData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="conversions" fill="hsl(var(--chart-1))" name="Conversions" />
                    <Bar dataKey="roas" fill="hsl(var(--chart-2))" name="ROAS" />
                  </BarChart>
                ) : (
                  <AreaChart data={campaignData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Area type="monotone" dataKey="conversions" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} name="Conversions" />
                    <Area type="monotone" dataKey="roas" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} name="ROAS" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Ad Spend Over Time</CardTitle>
              <ChartTypeSelector currentType={spendChartType} onTypeChange={setSpendChartType} />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {spendChartType === "line" ? (
                  <LineChart data={campaignData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="spend" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Ad Spend ($)" />
                  </LineChart>
                ) : spendChartType === "bar" ? (
                  <BarChart data={campaignData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="spend" fill="hsl(var(--chart-4))" name="Ad Spend ($)" />
                  </BarChart>
                ) : (
                  <AreaChart data={campaignData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="spend" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4))" fillOpacity={0.3} name="Ad Spend ($)" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PaidSocial;
