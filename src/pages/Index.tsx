import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { RevenueChart } from "@/components/RevenueChart";
import { PerformanceChart } from "@/components/PerformanceChart";
import { DollarSign, Users, TrendingUp, Activity } from "lucide-react";

const Index = () => {
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </DashboardLayout>
  );
};

export default Index;
