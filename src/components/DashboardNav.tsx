import { 
  LayoutDashboard, 
  Search, 
  Share2, 
  DollarSign, 
  ShoppingCart, 
  Target, 
  TrendingUp, 
  FileText 
} from "lucide-react";
import { NavLink } from "./NavLink";

const navItems = [
  { icon: LayoutDashboard, label: "Executive Dashboard", href: "/" },
  { icon: Search, label: "Search & SEO", href: "/search-seo" },
  { icon: Share2, label: "Organic Social", href: "/organic-social" },
  { icon: DollarSign, label: "Paid Social", href: "/paid-social" },
  { icon: ShoppingCart, label: "E-Commerce", href: "/ecommerce" },
  { icon: Target, label: "Conversions", href: "/conversions" },
  { icon: TrendingUp, label: "Competitive Intelligence", href: "/competitive" },
  { icon: FileText, label: "Financial & Operations", href: "/financial" },
];

export const DashboardNav = () => {
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
        <div className="px-3 py-2 text-xs text-sidebar-foreground/60">
          <p>Data updated 5 min ago</p>
        </div>
      </div>
    </div>
  );
};
