import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { AISuggestions } from "@/components/AISuggestions";
import { ExportData } from "@/components/ExportData";
import { PDFExportDialog } from "@/components/PDFExportDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, TrendingUp, Target, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend, BarChart as ReBarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import { ChartTypeSelector, ChartType } from "@/components/ChartTypeSelector";
import { Button } from "@/components/ui/button";
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

const CHART_COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"];

const Competitive = () => {
  const [shareChartType, setShareChartType] = useState<"pie" | ChartType>("pie");

  const aiSuggestions = [
    {
      type: "opportunity" as const,
      title: "Customer Satisfaction Lead",
      description: "Your customer satisfaction score of 85 significantly outperforms competitors (78 and 72). Leverage this in marketing and use NPS testimonials to drive acquisition.",
    },
    {
      type: "insight" as const,
      title: "Digital Presence Gap",
      description: "Competitor A leads in digital presence (82 vs your 76). Invest in SEO, content marketing, and social media to close this gap and capture more online traffic.",
    },
    {
      type: "warning" as const,
      title: "Market Share Deficit",
      description: "Trailing Competitor A by 7 percentage points (28% vs 35%). While growing at 3.2%, consider strategic partnerships or acquisition to accelerate market share gains.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Competitive Intelligence</h1>
            <p className="text-muted-foreground mt-1">Market positioning, competitor tracking, and industry benchmarking</p>
          </div>
          <div className="flex gap-2">
            <PDFExportDialog dashboardName="Competitive Intelligence" />
            <ExportData data={competitorData} filename="competitive-data" />
          </div>
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

        <AISuggestions suggestions={aiSuggestions} title="AI Competitive Insights" />

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
              <div className="flex gap-1">
                <Button
                  variant={shareChartType === "pie" ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setShareChartType("pie")}
                  title="Pie Chart"
                >
                  <PieChartIcon className="h-4 w-4" />
                </Button>
                {shareChartType !== "pie" && (
                  <ChartTypeSelector currentType={shareChartType} onTypeChange={setShareChartType} />
                )}
              </div>
            </CardHeader>
            <CardContent>
              {shareChartType === "pie" ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={marketPositionData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ company, share }) => `${company}: ${share}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="share"
                    >
                      {marketPositionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
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
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Competitive;
