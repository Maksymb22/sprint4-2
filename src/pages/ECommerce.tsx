import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, DollarSign, Package, TrendingUp } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const salesData = [
  { month: "Jan", revenue: 45200, orders: 312, avgOrder: 145 },
  { month: "Feb", revenue: 52800, orders: 368, avgOrder: 143 },
  { month: "Mar", revenue: 61400, orders: 425, avgOrder: 144 },
  { month: "Apr", revenue: 68900, orders: 478, avgOrder: 144 },
  { month: "May", revenue: 74200, orders: 512, avgOrder: 145 },
  { month: "Jun", revenue: 82500, orders: 567, avgOrder: 146 },
];

const ECommerce = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">E-Commerce Performance</h1>
          <p className="text-muted-foreground mt-1">Sales metrics, product analytics, and customer journey tracking</p>
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

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
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
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
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
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ECommerce;
