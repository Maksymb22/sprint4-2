import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, TrendingUp, Target, BarChart3 } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, BarChart as ReBarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { ChartTypeSelector, ChartType } from "@/components/ChartTypeSelector";
import { useState } from "react";

const competitorData = [
  { metric: "Market Share", value: 28, competitor1: 35, competitor2: 22 },
  { metric: "Brand Awareness", value: 42, competitor1: 38, competitor2: 31 },
  { metric: "Customer Satisfaction", value: 85, competitor1: 78, competitor2: 72 },
  { metric: "Digital Presence", value: 76, competitor1: 82, competitor2: 64 },
  { metric: "Price Competitiveness", value: 68, competitor1: 71, competitor2: 59 },
];

const marketPositionData = [
  { company: "Your Company", share: 28 },
  { company: "Competitor A", share: 35 },
  { company: "Competitor B", share: 22 },
  { company: "Others", share: 15 },
];

const Competitive = () => {
  const [shareChartType, setShareChartType] = useState<ChartType>("bar");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Competitive Intelligence</h1>
          <p className="text-muted-foreground mt-1">Market positioning, competitor tracking, and industry benchmarking</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Market Position"
            value="#2"
            icon={<Award className="h-4 w-4" />}
            subtitle="In industry ranking"
          />
          <MetricCard
            title="Market Share"
            value="28%"
            change={3.2}
            icon={<Target className="h-4 w-4" />}
            subtitle="Current quarter"
          />
          <MetricCard
            title="Competitive Index"
            value="76/100"
            change={5.8}
            icon={<TrendingUp className="h-4 w-4" />}
            subtitle="Overall score"
          />
          <MetricCard
            title="Share Growth"
            value="+3.2%"
            change={12.4}
            icon={<BarChart3 className="h-4 w-4" />}
            subtitle="YoY growth"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Competitive Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={competitorData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                  <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
                  <Radar name="Your Company" dataKey="value" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} />
                  <Radar name="Competitor A" dataKey="competitor1" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} />
                  <Radar name="Competitor B" dataKey="competitor2" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.3} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Market Share Distribution</CardTitle>
              <ChartTypeSelector currentType={shareChartType} onTypeChange={setShareChartType} />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {shareChartType === "bar" ? (
                  <ReBarChart data={marketPositionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="company" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="share" fill="hsl(var(--chart-4))" name="Market Share %" />
                  </ReBarChart>
                ) : shareChartType === "line" ? (
                  <LineChart data={marketPositionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="company" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="share" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Market Share %" />
                  </LineChart>
                ) : (
                  <AreaChart data={marketPositionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="company" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="share" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4))" fillOpacity={0.3} name="Market Share %" />
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

export default Competitive;
