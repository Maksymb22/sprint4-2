import { Bell, User, CheckCircle2, AlertTriangle, Info, Clock, X, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DateRangeSelector } from "./DateRangeSelector";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const notifications = [
  {
    id: "1",
    type: "alert" as const,
    title: "Conversion Rate Drop",
    message: "Conversion rate decreased by 2.4% in the last 24 hours",
    time: "5 min ago",
    unread: true,
  },
  {
    id: "2",
    type: "success" as const,
    title: "Revenue Target Achieved",
    message: "Monthly revenue target of $350K reached",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: "3",
    type: "info" as const,
    title: "New Data Sync Complete",
    message: "Facebook Ads data successfully synchronized",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: "4",
    type: "warning" as const,
    title: "Integration Issue",
    message: "Twitter/X connection needs attention",
    time: "3 hours ago",
    unread: true,
  },
  {
    id: "5",
    type: "info" as const,
    title: "Weekly Report Ready",
    message: "Your weekly performance report is now available",
    time: "1 day ago",
    unread: false,
  },
];

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const [notificationList, setNotificationList] = useState(notifications);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const unreadCount = notificationList.filter(n => n.unread).length;

  const markAsRead = (id: string) => {
    setNotificationList(prev =>
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const removeNotification = (id: string) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const handleProfileClick = () => {
    navigate('/settings?tab=profile');
  };

  const handleViewAllActivity = () => {
    navigate('/activity');
  };

  const handleLogout = () => {
    // In a real app, this would handle authentication logout
    console.log('Logout clicked');
    // Could redirect to login page or show confirmation
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh - in real app would reload data
    setTimeout(() => {
      setIsRefreshing(false);
      window.location.reload();
    }, 500);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-foreground">Performance Analytics Hub</h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Date Range Selector */}
          <DateRangeSelector className="hidden lg:flex" />

          {/* Manual Refresh Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Refresh data"
          >
            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>

          {/* Notification Center */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96" align="end">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    <p className="text-xs text-muted-foreground">
                      {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={markAllAsRead}
                    >
                      Mark all read
                    </Button>
                  )}
                </div>
                <Separator />
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {notificationList.map((notification) => (
                      <div
                        key={notification.id}
                        className={`group relative p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer ${
                          notification.unread ? "bg-primary/5" : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-medium">{notification.title}</p>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(notification.id);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {notification.time}
                            </div>
                          </div>
                        </div>
                        {notification.unread && (
                          <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Separator />
                <Button
                  variant="ghost"
                  className="w-full text-xs"
                  onClick={() => navigate('/activity')}
                >
                  View All Notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 px-2 py-1.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@example.com</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfileClick}>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
