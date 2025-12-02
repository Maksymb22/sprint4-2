import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart, Target, Eye, Activity as ActivityIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const activityData = [
  {
    date: "Today",
    activities: [
      { metric: "Revenue", change: "+2.3%", trend: "up", value: "$12,450", time: "2 hours ago", icon: DollarSign },
      { metric: "Active Users", change: "+5.1%", trend: "up", value: "847", time: "3 hours ago", icon: Users },
      { metric: "Conversion Rate", change: "-0.8%", trend: "down", value: "3.18%", time: "4 hours ago", icon: Target },
      { metric: "Organic Traffic", change: "+8.4%", trend: "up", value: "2,847", time: "5 hours ago", icon: Eye },
      { metric: "Ad Spend", change: "-1.2%", trend: "down", value: "$1,523", time: "6 hours ago", icon: DollarSign },
    ],
  },
  {
    date: "Yesterday",
    activities: [
      { metric: "Total Orders", change: "+3.7%", trend: "up", value: "127", time: "Yesterday at 6:00 PM", icon: ShoppingCart },
      { metric: "Average Order Value", change: "+1.2%", trend: "up", value: "$142.50", time: "Yesterday at 4:30 PM", icon: DollarSign },
      { metric: "Bounce Rate", change: "-2.1%", trend: "up", value: "42.3%", time: "Yesterday at 2:15 PM", icon: ActivityIcon },
      { metric: "Email Click Rate", change: "+4.8%", trend: "up", value: "12.4%", time: "Yesterday at 11:00 AM", icon: Target },
      { metric: "Social Engagement", change: "+6.2%", trend: "up", value: "8,450", time: "Yesterday at 9:30 AM", icon: Users },
    ],
  },
  {
    date: "This Week",
    activities: [
      { metric: "Website Traffic", change: "+15.8%", trend: "up", value: "247,893", time: "3 days ago", icon: Eye },
      { metric: "New Customers", change: "+12.4%", trend: "up", value: "342", time: "4 days ago", icon: Users },
      { metric: "Product Views", change: "+18.3%", trend: "up", value: "15,423", time: "5 days ago", icon: Eye },
      { metric: "Cart Additions", change: "+9.7%", trend: "up", value: "1,234", time: "6 days ago", icon: ShoppingCart },
    ],
  },
];

const Activity = () => {
  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-success" />
    ) : (
      <TrendingDown className="h-4 w-4 text-destructive" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-success" : "text-destructive";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activity Feed</h1>
          <p className="text-muted-foreground mt-1">Comprehensive view of all metric changes and updates</p>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Changes Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Metric updates</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Positive Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">12</div>
              <p className="text-xs text-muted-foreground">Improving metrics</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Negative Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">2</div>
              <p className="text-xs text-muted-foreground">Declining metrics</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Last Update</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h ago</div>
              <p className="text-xs text-muted-foreground">Most recent change</p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {activityData.map((dayGroup, groupIndex) => (
                <div key={groupIndex}>
                  <div className="flex items-center gap-2 mb-4">
                    <h3 className="text-sm font-semibold text-foreground">{dayGroup.date}</h3>
                    <Separator className="flex-1" />
                    <Badge variant="outline" className="text-xs">
                      {dayGroup.activities.length} updates
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {dayGroup.activities.map((activity, activityIndex) => {
                      const IconComponent = activity.icon;
                      return (
                        <div
                          key={activityIndex}
                          className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="text-sm font-medium text-foreground">{activity.metric}</p>
                                  <Badge variant={activity.trend === "up" ? "default" : "secondary"} className="text-xs">
                                    {activity.change}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <p className="text-sm text-muted-foreground">
                                    Current value: <span className="font-medium text-foreground">{activity.value}</span>
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {getTrendIcon(activity.trend)}
                                <span className={`text-sm font-medium ${getTrendColor(activity.trend)}`}>
                                  {activity.change}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                <TrendingUp className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">Strong Performance Trend</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    12 out of 14 metrics are showing positive trends this week, indicating strong overall business health.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <ActivityIcon className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">High Activity Period</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Most metric changes occurred between 2 PM - 6 PM, suggesting peak business activity during these hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <Eye className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-foreground">Watch These Metrics</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Conversion Rate and Ad Spend are showing downward trends. Consider reviewing these areas for optimization opportunities.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Activity;
