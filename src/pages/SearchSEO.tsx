import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { AISuggestions } from "@/components/AISuggestions";
import { ExportData } from "@/components/ExportData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Eye, Target, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState, useRef } from "react";
import { ChartTypeSelector, ChartType } from "@/components/ChartTypeSelector";
import { ChartExportButton } from "@/components/ChartExportButton";
import { useNavigate } from "react-router-dom";

const keywordData = [
  { month: "Jan", rankings: 45, traffic: 1200, visibility: 65 },
  { month: "Feb", rankings: 52, traffic: 1450, visibility: 70 },
  { month: "Mar", rankings: 58, traffic: 1680, visibility: 75 },
  { month: "Apr", rankings: 63, traffic: 1920, visibility: 78 },
  { month: "May", rankings: 71, traffic: 2350, visibility: 82 },
  { month: "Jun", rankings: 78, traffic: 2680, visibility: 85 },
];

const keywordsDatabase = [
  { keyword: "digital marketing services", position: 3, searchVolume: 8100, trend: "up", change: 2 },
  { keyword: "social media management", position: 5, searchVolume: 6500, trend: "up", change: 1 },
  { keyword: "content marketing strategy", position: 7, searchVolume: 5200, trend: "stable", change: 0 },
  { keyword: "SEO optimization", position: 2, searchVolume: 12400, trend: "up", change: 3 },
  { keyword: "email marketing automation", position: 8, searchVolume: 4800, trend: "down", change: -1 },
  { keyword: "PPC advertising", position: 4, searchVolume: 7300, trend: "up", change: 2 },
  { keyword: "brand awareness campaign", position: 12, searchVolume: 3900, trend: "stable", change: 0 },
  { keyword: "conversion rate optimization", position: 6, searchVolume: 5800, trend: "up", change: 1 },
  { keyword: "marketing analytics", position: 9, searchVolume: 4200, trend: "down", change: -2 },
  { keyword: "influencer marketing", position: 11, searchVolume: 3600, trend: "stable", change: 0 },
];

const SearchSEO = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [trendsChartType, setTrendsChartType] = useState<ChartType>("line");
  const [trafficChartType, setTrafficChartType] = useState<ChartType>("bar");
  const trendsChartRef = useRef<HTMLDivElement>(null);
  const trafficChartRef = useRef<HTMLDivElement>(null);

  const aiSuggestions = [
    {
      type: "opportunity" as const,
      title: "High-Performing Keywords",
      description: "SEO optimization ranks #2 with 12.4K search volume. Consider creating more content around this topic to capture additional market share.",
    },
    {
      type: "insight" as const,
      title: "Traffic Growth Momentum",
      description: "Organic traffic is up 22.5% month-over-month. This upward trend suggests your content strategy is resonating with your target audience.",
    },
    {
      type: "warning" as const,
      title: "Keyword Position Decline",
      description: "Marketing analytics dropped 2 positions. Review content freshness and backlink profile to prevent further ranking loss.",
    },
  ];

  const filteredKeywords = keywordsDatabase.filter(keyword =>
    keyword.keyword.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <ArrowUp className="h-4 w-4 text-success" />;
    if (trend === "down") return <ArrowDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Search & SEO Performance</h1>
            <p className="text-muted-foreground mt-1">Track keyword rankings, visibility metrics, and organic traffic</p>
          </div>
          <ExportData
            data={keywordData}
            filename="search-seo-data"
            dashboardName="Search & SEO"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="cursor-pointer" onClick={() => navigate('/search-seo/keyword-rankings-history')}>
            <MetricCard
              title="Keyword Rankings"
              value="78"
              change={15.3}
              icon={<Search className="h-4 w-4" />}
              subtitle="Top 10 positions"
            />
          </div>
          <div className="cursor-pointer" onClick={() => navigate('/search-seo/organic-traffic-history')}>
            <MetricCard
              title="Organic Traffic"
              value="2,680"
              change={22.5}
              icon={<TrendingUp className="h-4 w-4" />}
              subtitle="Monthly visitors"
            />
          </div>
          <div className="cursor-pointer" onClick={() => navigate('/search-seo/visibility-history')}>
            <MetricCard
              title="Search Visibility"
              value="85%"
              change={8.2}
              icon={<Eye className="h-4 w-4" />}
              subtitle="Domain visibility"
            />
          </div>
          <div className="cursor-pointer" onClick={() => navigate('/search-seo/ctr-history')}>
            <MetricCard
              title="Click-Through Rate"
              value="4.2%"
              change={12.1}
              icon={<Target className="h-4 w-4" />}
              subtitle="Average CTR"
            />
          </div>
        </div>

        {/* AI Strategic Insights */}
        <AISuggestions suggestions={aiSuggestions} title="AI SEO Insights" />

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>SEO Performance Trends</CardTitle>
              <div className="flex gap-2">
                <ChartExportButton chartRef={trendsChartRef} filename="seo-performance-trends" />
                <ChartTypeSelector currentType={trendsChartType} onTypeChange={setTrendsChartType} />
              </div>
            </CardHeader>
            <CardContent ref={trendsChartRef}>
              <ResponsiveContainer width="100%" height={300}>
                {trendsChartType === "line" ? (
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
                    <Line type="monotone" dataKey="visibility" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Visibility %" />
                  </LineChart>
                ) : trendsChartType === "bar" ? (
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
                    <Legend />
                    <Bar dataKey="rankings" fill="hsl(var(--chart-1))" name="Rankings" />
                    <Bar dataKey="visibility" fill="hsl(var(--chart-3))" name="Visibility %" />
                  </BarChart>
                ) : (
                  <AreaChart data={keywordData}>
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
                    <Area type="monotone" dataKey="rankings" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.3} name="Rankings" />
                    <Area type="monotone" dataKey="visibility" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.3} name="Visibility %" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>Monthly Traffic Growth</CardTitle>
              <div className="flex gap-2">
                <ChartExportButton chartRef={trafficChartRef} filename="monthly-traffic-growth" />
                <ChartTypeSelector currentType={trafficChartType} onTypeChange={setTrafficChartType} />
              </div>
            </CardHeader>
            <CardContent ref={trafficChartRef}>
              <ResponsiveContainer width="100%" height={300}>
                {trafficChartType === "bar" ? (
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
                ) : trafficChartType === "line" ? (
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
                    <Line type="monotone" dataKey="traffic" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Organic Traffic" />
                  </LineChart>
                ) : (
                  <AreaChart data={keywordData}>
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
                    <Area type="monotone" dataKey="traffic" stroke="hsl(var(--chart-3))" fill="hsl(var(--chart-3))" fillOpacity={0.3} name="Organic Traffic" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Keyword Rankings</CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Keyword</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Position</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Search Volume</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Trend</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKeywords.length > 0 ? (
                    filteredKeywords.map((item, index) => (
                      <tr key={index} className="border-b border-border/50 transition-colors">
                        <td className="py-3 px-4 text-sm text-foreground">{item.keyword}</td>
                        <td className="text-center py-3 px-4">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                            {item.position}
                          </span>
                        </td>
                        <td className="text-center py-3 px-4 text-sm text-muted-foreground">
                          {item.searchVolume.toLocaleString()}
                        </td>
                        <td className="text-center py-3 px-4">
                          <div className="flex justify-center">
                            {getTrendIcon(item.trend)}
                          </div>
                        </td>
                        <td className="text-center py-3 px-4">
                          <span className={`text-sm font-medium ${
                            item.change > 0 ? 'text-success' : 
                            item.change < 0 ? 'text-destructive' : 
                            'text-muted-foreground'
                          }`}>
                            {item.change > 0 ? '+' : ''}{item.change}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-muted-foreground">
                        No keywords found matching "{searchQuery}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SearchSEO;
