import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { RevenueChart } from "@/components/RevenueChart";
import { PerformanceChart } from "@/components/PerformanceChart";
import { AISuggestions } from "@/components/AISuggestions";
import { DollarSign, Users, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const aiSuggestions = [
    {
      type: "opportunity" as const,
      title: "Revenue Growth Opportunity",
      description: "Your revenue is up 12.3% but conversion rate dropped 2.4%. Focus on optimizing checkout flow to maximize this traffic surge.",
    },
    {
      type: "insight" as const,
      title: "User Engagement Peak",
      description: "Engagement score of 87.5 (+5.2%) indicates strong product-market fit. Consider expanding marketing efforts to capitalize on this momentum.",
    },
    {
      type: "warning" as const,
      title: "Conversion Rate Decline",
      description: "Conversion rate decreased by 2.4%. Analyze user journey friction points and consider A/B testing new CTAs.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Executive Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive overview of your business performance and key metrics
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$346,820"
            change={12.3}
            icon={<DollarSign className="h-4 w-4" />}
            subtitle="Last 30 days"
          />
          <MetricCard
            title="Active Users"
            value="12,847"
            change={8.1}
            icon={<Users className="h-4 w-4" />}
            subtitle="Daily active users"
          />
          <MetricCard
            title="Conversion Rate"
            value="3.24%"
            change={-2.4}
            icon={<TrendingUp className="h-4 w-4" />}
            subtitle="From all traffic"
          />
          <MetricCard
            title="Engagement Score"
            value="87.5"
            change={5.2}
            icon={<Activity className="h-4 w-4" />}
            subtitle="Out of 100"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          <RevenueChart />
          <PerformanceChart />
        </div>

        {/* Additional Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            title="Website Traffic"
            value="247,893"
            change={15.8}
            subtitle="Page views this month"
          />
          <MetricCard
            title="Ad Spend"
            value="$45,230"
            change={-3.2}
            subtitle="Optimized spending"
          />
          <MetricCard
            title="ROI"
            value="4.2x"
            change={18.5}
            subtitle="Return on investment"
          />
        </div>

        {/* AI Strategic Insights */}
        <AISuggestions suggestions={aiSuggestions} />

        {/* Strategic Overview Table */}
        <Card>
          <CardHeader>
            <CardTitle>Strategic Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Current</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Target</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Progress</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Priority</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action Items</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium">Revenue Growth</td>
                    <td className="py-3 px-4 text-sm">$346,820</td>
                    <td className="py-3 px-4 text-sm">$400,000</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="text-success">87% ↑</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">High</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">Expand marketing channels</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium">User Acquisition</td>
                    <td className="py-3 px-4 text-sm">12,847</td>
                    <td className="py-3 px-4 text-sm">15,000</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="text-amber-500">86% →</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-500">High</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">Launch referral program</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium">Conversion Optimization</td>
                    <td className="py-3 px-4 text-sm">3.24%</td>
                    <td className="py-3 px-4 text-sm">4.50%</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="text-destructive">72% ↓</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-red-500/10 text-red-500">Critical</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">A/B test checkout flow</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium">Customer Retention</td>
                    <td className="py-3 px-4 text-sm">87.5</td>
                    <td className="py-3 px-4 text-sm">90.0</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="text-success">97% ↑</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-amber-500/10 text-amber-500">Medium</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">Enhance onboarding experience</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-accent/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium">Marketing ROI</td>
                    <td className="py-3 px-4 text-sm">4.2x</td>
                    <td className="py-3 px-4 text-sm">5.0x</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="text-success">84% ↑</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-amber-500/10 text-amber-500">Medium</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">Optimize ad spend allocation</td>
                  </tr>
                  <tr className="hover:bg-accent/50 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium">Brand Awareness</td>
                    <td className="py-3 px-4 text-sm">247,893</td>
                    <td className="py-3 px-4 text-sm">300,000</td>
                    <td className="py-3 px-4 text-sm">
                      <span className="text-success">83% ↑</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/10 text-blue-500">Low</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">Increase content marketing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Index;
