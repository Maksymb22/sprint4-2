import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { AISuggestions } from "@/components/AISuggestions";
import { ExportData } from "@/components/ExportData";
import { PDFExportDialog } from "@/components/PDFExportDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, DollarSign, Package, TrendingUp } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartTypeSelector, ChartType } from "@/components/ChartTypeSelector";
import { useState } from "react";

const salesData = [
  { month: "Jan", revenue: 45200, orders: 312, avgOrder: 145 },
  { month: "Feb", revenue: 52800, orders: 368, avgOrder: 143 },
  { month: "Mar", revenue: 61400, orders: 425, avgOrder: 144 },
  { month: "Apr", revenue: 68900, orders: 478, avgOrder: 144 },
  { month: "May", revenue: 74200, orders: 512, avgOrder: 145 },
  { month: "Jun", revenue: 82500, orders: 567, avgOrder: 146 },
];

const ECommerce = () => {
  const [revenueChartType, setRevenueChartType] = useState<ChartType>("area");
  const [ordersChartType, setOrdersChartType] = useState<ChartType>("bar");

  const aiSuggestions = [
    {
      type: "opportunity" as const,
      title: "Strong Revenue Growth",
      description: "Revenue grew 82.5% from $45.2K to $82.5K in 6 months. Continue this momentum by expanding successful product lines and marketing channels.",
    },
    {
      type: "insight" as const,
      title: "Stable Average Order Value",
      description: "AOV remains consistent around $144-146, indicating stable customer purchasing behavior. This predictability helps with inventory and cash flow planning.",
    },
    {
      type: "warning" as const,
      title: "Conversion Rate Below Potential",
      description: "3.8% conversion rate has room for improvement. Focus on checkout optimization, product page enhancements, and retargeting campaigns.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">E-Commerce Performance</h1>
            <p className="text-muted-foreground mt-1">Sales metrics, product analytics, and customer journey tracking</p>
          </div>
          <div className="flex gap-2">
            <PDFExportDialog dashboardName="E-Commerce" />
            <ExportData data={salesData} filename="ecommerce-data" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$385,000"
            change={15.8}
            icon={<DollarSign className="h-4 w-4" />}
            subtitle="Last 6 months"
          />
          <MetricCard
            title="Total Orders"
            value="2,662"
            change={12.4}
            icon={<ShoppingCart className="h-4 w-4" />}
            subtitle="Completed orders"
          />
          <MetricCard
            title="Avg Order Value"
            value="$144.67"
            change={2.1}
            icon={<Package className="h-4 w-4" />}
            subtitle="Per transaction"
          />
          <MetricCard
            title="Conversion Rate"
            value="3.8%"
            change={8.3}
            icon={<TrendingUp className="h-4 w-4" />}
            subtitle="Visitor to customer"
          />
        </div>

        <AISuggestions suggestions={aiSuggestions} title="AI E-Commerce Insights" />

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Revenue Trends</CardTitle>
              <ChartTypeSelector currentType={revenueChartType} onTypeChange={setRevenueChartType} />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {revenueChartType === "area" ? (
                  <AreaChart data={salesData}>
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
                    <Area type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} name="Revenue ($)" />
                  </AreaChart>
                ) : revenueChartType === "line" ? (
                  <LineChart data={salesData}>
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
                    <Line type="monotone" dataKey="revenue" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Revenue ($)" />
                  </LineChart>
                ) : (
                  <BarChart data={salesData}>
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
                    <Bar dataKey="revenue" fill="hsl(var(--chart-1))" name="Revenue ($)" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Order Volume</CardTitle>
              <ChartTypeSelector currentType={ordersChartType} onTypeChange={setOrdersChartType} />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {ordersChartType === "bar" ? (
                  <BarChart data={salesData}>
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
                    <Bar dataKey="orders" fill="hsl(var(--chart-3))" name="Orders" />
                  </BarChart>
                ) : ordersChartType === "line" ? (
                  <LineChart data={salesData}>
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
                    <Line type="monotone" dataKey="orders" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Orders" />
                  </LineChart>
                ) : (
                  <AreaChart data={salesData}>
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
                    <Area type="monotone" dataKey="orders" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.3} name="Orders" />
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

export default ECommerce;
