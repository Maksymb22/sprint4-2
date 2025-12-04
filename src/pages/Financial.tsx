import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { AISuggestions } from "@/components/AISuggestions";
import { ExportData } from "@/components/ExportData";
import { WidgetManager, Widget } from "@/components/WidgetManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, PieChart, Activity } from "lucide-react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartTypeSelector, ChartType } from "@/components/ChartTypeSelector";
import { ChartExportButton } from "@/components/ChartExportButton";
import { useState, useRef, useEffect } from "react";

const financialData = [
  { month: "Jan", revenue: 156000, expenses: 98000, profit: 58000 },
  { month: "Feb", revenue: 172000, expenses: 104000, profit: 68000 },
  { month: "Mar", revenue: 189000, expenses: 112000, profit: 77000 },
  { month: "Apr", revenue: 201000, expenses: 118000, profit: 83000 },
  { month: "May", revenue: 218000, expenses: 126000, profit: 92000 },
  { month: "Jun", revenue: 234000, expenses: 132000, profit: 102000 },
];

const AVAILABLE_WIDGETS: Widget[] = [
  { id: "key-metrics", label: "Key Metrics", description: "Total revenue, net profit, profit margin, and operating efficiency" },
  { id: "ai-insights", label: "AI Financial Insights", description: "AI-generated financial recommendations" },
  { id: "revenue-expenses", label: "Revenue vs Expenses", description: "Revenue and expense comparison" },
  { id: "profit-trends", label: "Profit Trends", description: "Net profit over time" },
];

const Financial = () => {
  const [revenueChartType, setRevenueChartType] = useState<ChartType>("line");
  const [profitChartType, setProfitChartType] = useState<ChartType>("area");
  const revenueChartRef = useRef<HTMLDivElement>(null);
  const profitChartRef = useRef<HTMLDivElement>(null);

  const [visibleWidgets, setVisibleWidgets] = useState<string[]>(() => {
    const saved = localStorage.getItem("financial-widgets");
    return saved ? JSON.parse(saved) : AVAILABLE_WIDGETS.map(w => w.id);
  });

  useEffect(() => {
    localStorage.setItem("financial-widgets", JSON.stringify(visibleWidgets));
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
      title: "Strong Profit Growth",
      description: "Net profit grew 76% from $58K to $102K in 6 months while maintaining healthy 41% margins. This trajectory suggests sustainable growth - consider reinvesting in expansion.",
    },
    {
      type: "insight" as const,
      title: "Excellent Operating Efficiency",
      description: "92% operating efficiency score with improving margins indicates strong operational management. Document best practices to maintain this as you scale.",
    },
    {
      type: "warning" as const,
      title: "Expense Growth Monitoring",
      description: "Expenses grew 35% ($98K to $132K) while revenue grew 50%. Monitor expense ratios carefully to ensure profitability remains strong during growth phase.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial & Operational</h1>
            <p className="text-muted-foreground mt-1">Revenue tracking, profitability analysis, and operational efficiency</p>
          </div>
          <div className="flex gap-2">
            <WidgetManager
              widgets={AVAILABLE_WIDGETS}
              visibleWidgets={visibleWidgets}
              onToggleWidget={handleToggleWidget}
            />
            <ExportData
              data={financialData}
              filename="financial-data"
              dashboardName="Financial & Operations"
            />
          </div>
        </div>

        {isVisible("key-metrics") && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$1.17M"
            change={18.4}
            icon={<DollarSign className="h-4 w-4" />}
            subtitle="Last 6 months"
          />
          <MetricCard
            title="Net Profit"
            value="$480K"
            change={22.1}
            icon={<TrendingUp className="h-4 w-4" />}
            subtitle="After expenses"
          />
          <MetricCard
            title="Profit Margin"
            value="41.0%"
            change={4.8}
            icon={<PieChart className="h-4 w-4" />}
            subtitle="Average margin"
          />
          <MetricCard
            title="Operating Efficiency"
            value="92%"
            change={6.2}
            icon={<Activity className="h-4 w-4" />}
            subtitle="Efficiency score"
          />
        </div>
        )}

        {isVisible("ai-insights") && (
          <AISuggestions suggestions={aiSuggestions} title="AI Financial Insights" />
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {isVisible("revenue-expenses") && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Revenue vs Expenses</CardTitle>
              <div className="flex gap-2">
                <ChartExportButton chartRef={revenueChartRef} filename="revenue-vs-expenses" />
                <ChartTypeSelector currentType={revenueChartType} onTypeChange={setRevenueChartType} />
              </div>
            </CardHeader>
            <CardContent ref={revenueChartRef}>
              <ResponsiveContainer width="100%" height={300}>
                {revenueChartType === "line" ? (
                  <LineChart data={financialData}>
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
                    <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Revenue ($)" />
                    <Line type="monotone" dataKey="expenses" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Expenses ($)" />
                  </LineChart>
                ) : revenueChartType === "bar" ? (
                  <BarChart data={financialData}>
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
                    <Bar dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue ($)" />
                    <Bar dataKey="expenses" fill="hsl(var(--chart-4))" name="Expenses ($)" />
                  </BarChart>
                ) : (
                  <AreaChart data={financialData}>
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
                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} name="Revenue ($)" />
                    <Area type="monotone" dataKey="expenses" stroke="hsl(var(--chart-4))" fill="hsl(var(--chart-4))" fillOpacity={0.3} name="Expenses ($)" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
          )}

          {isVisible("profit-trends") && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Profit Trends</CardTitle>
              <div className="flex gap-2">
                <ChartExportButton chartRef={profitChartRef} filename="profit-trends" />
                <ChartTypeSelector currentType={profitChartType} onTypeChange={setProfitChartType} />
              </div>
            </CardHeader>
            <CardContent ref={profitChartRef}>
              <ResponsiveContainer width="100%" height={300}>
                {profitChartType === "area" ? (
                  <AreaChart data={financialData}>
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
                    <Area type="monotone" dataKey="profit" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} name="Net Profit ($)" />
                  </AreaChart>
                ) : profitChartType === "line" ? (
                  <LineChart data={financialData}>
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
                    <Line type="monotone" dataKey="profit" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Net Profit ($)" />
                  </LineChart>
                ) : (
                  <BarChart data={financialData}>
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
                    <Bar dataKey="profit" fill="hsl(var(--chart-2))" name="Net Profit ($)" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Financial;
