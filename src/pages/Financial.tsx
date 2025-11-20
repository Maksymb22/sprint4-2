import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, PieChart, Activity } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const financialData = [
  { month: "Jan", revenue: 156000, expenses: 98000, profit: 58000 },
  { month: "Feb", revenue: 172000, expenses: 104000, profit: 68000 },
  { month: "Mar", revenue: 189000, expenses: 112000, profit: 77000 },
  { month: "Apr", revenue: 201000, expenses: 118000, profit: 83000 },
  { month: "May", revenue: 218000, expenses: 126000, profit: 92000 },
  { month: "Jun", revenue: 234000, expenses: 132000, profit: 102000 },
];

const Financial = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial & Operational</h1>
          <p className="text-muted-foreground mt-1">Revenue tracking, profitability analysis, and operational efficiency</p>
        </div>

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

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
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
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profit Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
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
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Financial;
