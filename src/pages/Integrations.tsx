import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Facebook,
  Linkedin,
  Search,
  Instagram,
  Twitter,
  DollarSign,
  BarChart3,
  Calendar,
  Globe,
  CheckCircle2,
  AlertCircle,
  Clock,
  Settings,
  Play
} from "lucide-react";
import { useState } from "react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: "marketing" | "social" | "financial" | "project" | "analytics";
  status: "connected" | "disconnected" | "error" | "syncing";
  lastSync?: string;
  dataPoints?: string;
}

const integrations: Integration[] = [
  {
    id: "facebook-ads",
    name: "Facebook Ads",
    description: "Campaign performance, ad spend, and ROI tracking",
    icon: Facebook,
    category: "marketing",
    status: "connected",
    lastSync: "2 minutes ago",
    dataPoints: "12,458"
  },
  {
    id: "linkedin-ads",
    name: "LinkedIn Ads",
    description: "B2B advertising metrics and lead generation",
    icon: Linkedin,
    category: "marketing",
    status: "connected",
    lastSync: "5 minutes ago",
    dataPoints: "8,234"
  },
  {
    id: "google-analytics",
    name: "Google Analytics",
    description: "Website traffic, user behavior, and conversions",
    icon: BarChart3,
    category: "analytics",
    status: "connected",
    lastSync: "1 minute ago",
    dataPoints: "45,892"
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Engagement metrics, follower growth, and content performance",
    icon: Instagram,
    category: "social",
    status: "connected",
    lastSync: "10 minutes ago",
    dataPoints: "18,942"
  },
  {
    id: "twitter",
    name: "Twitter / X",
    description: "Tweet engagement, mentions, and audience insights",
    icon: Twitter,
    category: "social",
    status: "error",
    lastSync: "2 hours ago",
    dataPoints: "6,789"
  },
  {
    id: "tiktok",
    name: "TikTok",
    description: "Video performance, trends, and audience demographics",
    icon: Play,
    category: "social",
    status: "disconnected"
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Financial data, revenue tracking, and expense management",
    icon: DollarSign,
    category: "financial",
    status: "syncing",
    lastSync: "Syncing now...",
    dataPoints: "3,456"
  },
  {
    id: "asana",
    name: "Asana",
    description: "Project tracking, team productivity, and task completion",
    icon: Calendar,
    category: "project",
    status: "disconnected"
  },
  {
    id: "google-ads",
    name: "Google Ads",
    description: "PPC campaigns, keyword performance, and conversion tracking",
    icon: Search,
    category: "marketing",
    status: "connected",
    lastSync: "3 minutes ago",
    dataPoints: "15,678"
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "E-commerce sales, product performance, and customer data",
    icon: Globe,
    category: "analytics",
    status: "disconnected"
  }
];

const Integrations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "syncing":
        return <Clock className="h-4 w-4 text-blue-500 animate-pulse" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge variant="secondary" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Connected</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      case "syncing":
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">Syncing</Badge>;
      default:
        return <Badge variant="outline">Not Connected</Badge>;
    }
  };

  const connectedCount = integrations.filter(i => i.status === "connected").length;
  const totalCount = integrations.length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Connect your data sources to power your analytics dashboard
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Connected Integrations</CardDescription>
              <CardTitle className="text-3xl">{connectedCount}/{totalCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Data Points Synced</CardDescription>
              <CardTitle className="text-3xl">104K+</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Last Sync Status</CardDescription>
              <CardTitle className="text-3xl flex items-center gap-2">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                Healthy
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            <Button
              variant={selectedCategory === "marketing" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("marketing")}
            >
              Marketing
            </Button>
            <Button
              variant={selectedCategory === "social" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("social")}
            >
              Social
            </Button>
            <Button
              variant={selectedCategory === "analytics" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("analytics")}
            >
              Analytics
            </Button>
            <Button
              variant={selectedCategory === "financial" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("financial")}
            >
              Financial
            </Button>
          </div>
        </div>

        {/* Integration Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredIntegrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <Card key={integration.id} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{integration.name}</CardTitle>
                        {getStatusBadge(integration.status)}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    {integration.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {integration.status === "connected" || integration.status === "syncing" || integration.status === "error" ? (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Last Sync:</span>
                        <span className="flex items-center gap-1.5">
                          {getStatusIcon(integration.status)}
                          {integration.lastSync}
                        </span>
                      </div>
                      {integration.dataPoints && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Data Points:</span>
                          <span className="font-medium">{integration.dataPoints}</span>
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
                        {integration.status === "connected" && (
                          <Button variant="outline" size="sm" className="flex-1">
                            Disconnect
                          </Button>
                        )}
                        {integration.status === "error" && (
                          <Button variant="default" size="sm" className="flex-1">
                            Reconnect
                          </Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <Button className="w-full">
                      Connect {integration.name}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredIntegrations.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No integrations found matching "{searchQuery}"
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Integrations;
