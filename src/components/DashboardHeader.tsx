import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

export const DashboardHeader = () => {
  const dailySummary = [
    { metric: "Revenue", change: "+2.3%", trend: "up", value: "$12,450" },
    { metric: "Active Users", change: "+5.1%", trend: "up", value: "847" },
    { metric: "Conversion Rate", change: "-0.8%", trend: "down", value: "3.18%" },
    { metric: "Organic Traffic", change: "+8.4%", trend: "up", value: "2,847" },
    { metric: "Ad Spend", change: "-1.2%", trend: "down", value: "$1,523" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-foreground">Performance Analytics Hub</h2>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  5
                </Badge>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-3">
                <div className="border-b border-border pb-2">
                  <h3 className="font-semibold text-sm">Daily Summary</h3>
                  <p className="text-xs text-muted-foreground">Today's key metric changes</p>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {dailySummary.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {item.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-success" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-destructive" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{item.metric}</p>
                          <p className="text-xs text-muted-foreground">{item.value}</p>
                        </div>
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          item.trend === "up" ? "text-success" : "text-destructive"
                        }`}
                      >
                        {item.change}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-2">
                  <Button variant="ghost" className="w-full text-xs">
                    View All Activity
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
