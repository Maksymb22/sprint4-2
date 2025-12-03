import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { AISuggestions } from "@/components/AISuggestions";
import { ExportData } from "@/components/ExportData";
import { PDFExportDialog } from "@/components/PDFExportDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Linkedin, Heart, MessageCircle, Share2, TrendingUp } from "lucide-react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ChartTypeSelector, ChartType } from "@/components/ChartTypeSelector";
import { HeatMap } from "@/components/HeatMap";
import { useState } from "react";

const platformData = [
  { platform: "Facebook", followers: 12400, engagement: 4.2, posts: 45 },
  { platform: "Instagram", followers: 18900, engagement: 6.8, posts: 62 },
  { platform: "LinkedIn", followers: 8200, engagement: 3.1, posts: 28 },
  { platform: "TikTok", followers: 24500, engagement: 8.5, posts: 71 },
  { platform: "Twitter/X", followers: 6700, engagement: 2.4, posts: 38 },
];

// Best posting times heat map data (engagement rates by day and hour)
const heatMapData = [
  [2.1, 2.5, 3.2, 4.1, 5.2, 6.8, 7.2], // Monday
  [2.3, 2.8, 3.5, 4.5, 5.5, 7.1, 7.5], // Tuesday
  [2.5, 3.1, 3.8, 4.8, 5.8, 7.5, 8.1], // Wednesday
  [2.2, 2.7, 3.3, 4.3, 5.3, 6.9, 7.3], // Thursday
  [1.9, 2.3, 2.9, 3.8, 4.7, 6.2, 6.8], // Friday
  [1.5, 1.8, 2.2, 2.8, 3.5, 4.5, 5.1], // Saturday
  [1.3, 1.6, 2.0, 2.5, 3.2, 4.2, 4.8], // Sunday
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hoursOfDay = ["9am", "12pm", "3pm", "6pm", "9pm", "12am", "3am"];

const OrganicSocial = () => {
  const [engagementChartType, setEngagementChartType] = useState<ChartType>("bar");
  const [followerChartType, setFollowerChartType] = useState<ChartType>("bar");

  const aiSuggestions = [
    {
      type: "opportunity" as const,
      title: "TikTok Leading Engagement",
      description: "TikTok shows 8.5% engagement rate, significantly higher than other platforms. Consider reallocating content resources to capitalize on this high-performing channel.",
    },
    {
      type: "insight" as const,
      title: "Follower Growth Pattern",
      description: "Instagram and TikTok account for 61% of total followers. Your audience demographic strongly prefers visual-first platforms.",
    },
    {
      type: "warning" as const,
      title: "Twitter/X Underperforming",
      description: "Twitter/X shows lowest engagement at 2.4%. Review content strategy or consider reducing resource allocation to this platform.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Organic Social Media</h1>
            <p className="text-muted-foreground mt-1">Monitor engagement and growth across all social platforms</p>
          </div>
          <div className="flex gap-2">
            <PDFExportDialog dashboardName="Organic Social" />
            <ExportData data={platformData} filename="organic-social-data" />
          </div>
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

        <AISuggestions suggestions={aiSuggestions} title="AI Social Media Insights" />

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

        {/* Heat Map for Best Posting Times */}
        <Card>
          <CardHeader>
            <CardTitle>Best Posting Times</CardTitle>
            <p className="text-sm text-muted-foreground">
              Engagement rates by day and time (hover for details)
            </p>
          </CardHeader>
          <CardContent>
            <HeatMap
              title=""
              data={heatMapData}
              xLabels={hoursOfDay}
              yLabels={daysOfWeek}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default OrganicSocial;
