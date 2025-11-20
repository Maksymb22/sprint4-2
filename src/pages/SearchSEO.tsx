import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, TrendingUp, Eye, Target } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const keywordData = [
  { month: "Jan", rankings: 45, traffic: 1200, visibility: 65 },
  { month: "Feb", rankings: 52, traffic: 1450, visibility: 70 },
  { month: "Mar", rankings: 58, traffic: 1680, visibility: 75 },
  { month: "Apr", rankings: 63, traffic: 1920, visibility: 78 },
  { month: "May", rankings: 71, traffic: 2350, visibility: 82 },
  { month: "Jun", rankings: 78, traffic: 2680, visibility: 85 },
];

const SearchSEO = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Search & SEO Performance</h1>
          <p className="text-muted-foreground mt-1">Track keyword rankings, visibility metrics, and organic traffic</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Keyword Rankings"
            value="78"
            change={15.3}
            icon={<Search className="h-4 w-4" />}
            subtitle="Top 10 positions"
          />
          <MetricCard
            title="Organic Traffic"
            value="2,680"
            change={22.5}
            icon={<TrendingUp className="h-4 w-4" />}
            subtitle="Monthly visitors"
          />
          <MetricCard
            title="Search Visibility"
            value="85%"
            change={8.2}
            icon={<Eye className="h-4 w-4" />}
            subtitle="Domain visibility"
          />
          <MetricCard
            title="Click-Through Rate"
            value="4.2%"
            change={12.1}
            icon={<Target className="h-4 w-4" />}
            subtitle="Average CTR"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>SEO Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={keywordData}>
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
                  <Line type="monotone" dataKey="rankings" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Rankings" />
                  <Line type="monotone" dataKey="visibility" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Visibility %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Traffic Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={keywordData}>
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
                  <Bar dataKey="traffic" fill="hsl(var(--chart-3))" name="Organic Traffic" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SearchSEO;
