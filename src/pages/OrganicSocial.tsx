import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Linkedin, Heart, MessageCircle, Share2, TrendingUp } from "lucide-react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartTypeSelector, ChartType } from "@/components/ChartTypeSelector";
import { useState } from "react";

const platformData = [
  { platform: "Facebook", followers: 12400, engagement: 4.2, posts: 45 },
  { platform: "Instagram", followers: 18900, engagement: 6.8, posts: 62 },
  { platform: "LinkedIn", followers: 8200, engagement: 3.1, posts: 28 },
  { platform: "TikTok", followers: 24500, engagement: 8.5, posts: 71 },
  { platform: "Twitter/X", followers: 6700, engagement: 2.4, posts: 38 },
];

const OrganicSocial = () => {
  const [engagementChartType, setEngagementChartType] = useState<ChartType>("bar");
  const [followerChartType, setFollowerChartType] = useState<ChartType>("bar");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Organic Social Media</h1>
          <p className="text-muted-foreground mt-1">Monitor engagement and growth across all social platforms</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Followers"
            value="70,700"
            change={14.2}
            icon={<Heart className="h-4 w-4" />}
            subtitle="Across all platforms"
          />
          <MetricCard
            title="Avg Engagement Rate"
            value="5.0%"
            change={8.7}
            icon={<MessageCircle className="h-4 w-4" />}
            subtitle="Platform average"
          />
          <MetricCard
            title="Total Posts"
            value="244"
            change={18.3}
            icon={<Share2 className="h-4 w-4" />}
            subtitle="This month"
          />
          <MetricCard
            title="Best Performing"
            value="TikTok"
            icon={<TrendingUp className="h-4 w-4" />}
            subtitle="8.5% engagement"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Platform Engagement Rates</CardTitle>
              <ChartTypeSelector currentType={engagementChartType} onTypeChange={setEngagementChartType} />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {engagementChartType === "bar" ? (
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="platform" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="engagement" fill="hsl(var(--chart-2))" name="Engagement %" />
                  </BarChart>
                ) : engagementChartType === "line" ? (
                  <LineChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="platform" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="engagement" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Engagement %" />
                  </LineChart>
                ) : (
                  <AreaChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="platform" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="engagement" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.3} name="Engagement %" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Follower Distribution</CardTitle>
              <ChartTypeSelector currentType={followerChartType} onTypeChange={setFollowerChartType} />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {followerChartType === "bar" ? (
                  <BarChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="platform" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="followers" fill="hsl(var(--chart-1))" name="Followers" />
                  </BarChart>
                ) : followerChartType === "line" ? (
                  <LineChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="platform" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line type="monotone" dataKey="followers" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Followers" />
                  </LineChart>
                ) : (
                  <AreaChart data={platformData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="platform" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area type="monotone" dataKey="followers" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} name="Followers" />
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

export default OrganicSocial;
