import {
  LayoutDashboard,
  Search,
  Share2,
  DollarSign,
  ShoppingCart,
  Target,
  TrendingUp,
  FileText,
  Settings,
  Plug
} from "lucide-react";
import { NavLink } from "./NavLink";
import { useState, useEffect } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Executive Dashboard", href: "/" },
  { icon: Search, label: "Search & SEO", href: "/search-seo" },
  { icon: Share2, label: "Organic Social", href: "/organic-social" },
  { icon: DollarSign, label: "Paid Social", href: "/paid-social" },
  { icon: ShoppingCart, label: "E-Commerce", href: "/ecommerce" },
  { icon: Target, label: "Conversions", href: "/conversions" },
  { icon: TrendingUp, label: "Competitive Intelligence", href: "/competitive" },
  { icon: FileText, label: "Financial & Operations", href: "/financial" },
  { icon: Plug, label: "Integrations", href: "/integrations" },
];

const getTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes === 1) return '1 min ago';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 hour ago';
  return `${hours} hours ago`;
};

export const DashboardNav = () => {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [timeAgo, setTimeAgo] = useState('just now');

  useEffect(() => {
    // Update the time ago display every minute
    const interval = setInterval(() => {
      setTimeAgo(getTimeAgo(lastUpdate));
    }, 60000);

    // Listen for refresh events from the header
    const handleRefresh = () => {
      setLastUpdate(Date.now());
      setTimeAgo('just now');
    };

    window.addEventListener('dataRefreshed', handleRefresh);

    return () => {
      clearInterval(interval);
      window.removeEventListener('dataRefreshed', handleRefresh);
    };
  }, [lastUpdate]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-sidebar-foreground">ENABLE</h1>
        <p className="text-sm text-sidebar-foreground/60 mt-1">Data Platform</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-sm">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors mb-2"
          activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
        >
          <Settings className="h-5 w-5" />
          <span className="text-sm">Settings</span>
        </NavLink>
        <div className="px-3 py-2 text-xs text-sidebar-foreground/60">
          <p>Data updated {timeAgo}</p>
        </div>
      </div>
    </div>
  );
};
