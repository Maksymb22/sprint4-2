import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, BarChart3, Briefcase } from "lucide-react";

const roles = [
  {
    id: "executive",
    title: "Executive User",
    description: "High-level overview and strategic insights with minimal complexity",
    icon: Briefcase,
    features: ["Executive Dashboard", "Strategic KPIs", "AI Insights", "High-level Reports"],
    badge: "Leadership",
    color: "from-purple-500/10 to-purple-500/5 hover:from-purple-500/20 hover:to-purple-500/10"
  },
  {
    id: "marketing",
    title: "Marketing Team",
    description: "Detailed campaign performance and optimization tools",
    icon: TrendingUp,
    features: ["Campaign Analytics", "Social Media Metrics", "SEO Performance", "Ad Performance"],
    badge: "Marketing",
    color: "from-blue-500/10 to-blue-500/5 hover:from-blue-500/20 hover:to-blue-500/10"
  },
  {
    id: "analyst",
    title: "Analyst",
    description: "Deep-dive capabilities, customizable views, and data export",
    icon: BarChart3,
    features: ["All Dashboards", "Custom Reports", "Data Export", "Advanced Filters"],
    badge: "Analytics",
    color: "from-green-500/10 to-green-500/5 hover:from-green-500/20 hover:to-green-500/10"
  },
  {
    id: "account-manager",
    title: "Account Manager",
    description: "Opportunity identification and client expansion insights",
    icon: Users,
    features: ["Client Overview", "Opportunities", "Growth Metrics", "Account Health"],
    badge: "Sales",
    color: "from-amber-500/10 to-amber-500/5 hover:from-amber-500/20 hover:to-amber-500/10"
  }
];

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (roleId: string) => {
    // Store selected role in localStorage for demo purposes
    localStorage.setItem("userRole", roleId);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-6xl space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-bold">Choose Your Role</h1>
          <p className="text-muted-foreground text-lg">
            Select your role to customize your dashboard experience
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className={`cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary/50 bg-gradient-to-br ${role.color}`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">{role.badge}</Badge>
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">{role.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {role.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Key Features:</p>
                    <ul className="space-y-1">
                      {role.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          You can change your role anytime in Settings
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;
