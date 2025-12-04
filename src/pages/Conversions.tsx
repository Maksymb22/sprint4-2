import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { AISuggestions } from "@/components/AISuggestions";
import { ExportData } from "@/components/ExportData";
import { WidgetManager, Widget } from "@/components/WidgetManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, TrendingUp, Zap } from "lucide-react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ChartTypeSelector, ChartType } from "@/components/ChartTypeSelector";
import { ChartExportButton } from "@/components/ChartExportButton";
import { FunnelChart } from "@/components/FunnelChart";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

const AVAILABLE_WIDGETS: Widget[] = [
  { id: "key-metrics", label: "Key Metrics", description: "Overall conversion, lead conversion, qualified rate, close rate" },
  { id: "ai-insights", label: "AI Conversion Insights", description: "AI-generated conversion recommendations" },
  { id: "funnel-chart", label: "Conversion Funnel", description: "Visual funnel representation" },
];

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
  const [funnelChartType, setFunnelChartType] = useState<"funnel" | "bar">("funnel");
  const funnelChartRef = useRef<HTMLDivElement>(null);

  const [visibleWidgets, setVisibleWidgets] = useState<string[]>(() => {
    const saved = localStorage.getItem("conversions-widgets");
    return saved ? JSON.parse(saved) : AVAILABLE_WIDGETS.map(w => w.id);
  });

  useEffect(() => {
    localStorage.setItem("conversions-widgets", JSON.stringify(visibleWidgets));
  }, [visibleWidgets]);

  const handleToggleWidget = (widgetId: string) => {
    setVisibleWidgets(prev =>
      prev.includes(widgetId)
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  const isVisible = (widgetId: string) => visibleWidgets.includes(widgetId);

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
          <div className="flex gap-2">
            <WidgetManager
              widgets={AVAILABLE_WIDGETS}
              visibleWidgets={visibleWidgets}
              onToggleWidget={handleToggleWidget}
            />
            <ExportData
              data={funnelData}
              filename="conversions-data"
              dashboardName="Conversions"
            />
          </div>
        </div>

        {isVisible("key-metrics") && (
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
        )}

        {isVisible("ai-insights") && (
          <AISuggestions suggestions={aiSuggestions} title="AI Conversion Insights" />
        )}

        {isVisible("funnel-chart") && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle>Conversion Funnel</CardTitle>
            <div className="flex gap-2">
              <ChartExportButton chartRef={funnelChartRef} filename="conversion-funnel" />
              <Button
                variant={funnelChartType === "funnel" ? "default" : "outline"}
                size="sm"
                onClick={() => setFunnelChartType("funnel")}
              >
                Funnel View
              </Button>
              <ChartTypeSelector currentType={funnelChartType} onTypeChange={setFunnelChartType} availableTypes={["bar"]} />
            </div>
          </CardHeader>
          <CardContent ref={funnelChartRef}>
            {funnelChartType === "funnel" ? (
              <FunnelChart data={funnelData} />
            ) : (
              <ResponsiveContainer width="100%" height={400}>
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
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Conversions;
