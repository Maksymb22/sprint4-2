import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import Integrations from "./pages/Integrations";
import SearchSEO from "./pages/SearchSEO";
import OrganicSocial from "./pages/OrganicSocial";
import PaidSocial from "./pages/PaidSocial";
import ECommerce from "./pages/ECommerce";
import Conversions from "./pages/Conversions";
import Competitive from "./pages/Competitive";
import Financial from "./pages/Financial";
import SEOKeywordRankingsHistory from "./pages/SEOKeywordRankingsHistory";
import SEOOrganicTrafficHistory from "./pages/SEOOrganicTrafficHistory";
import SEOVisibilityHistory from "./pages/SEOVisibilityHistory";
import SEOCTRHistory from "./pages/SEOCTRHistory";
import Settings from "./pages/Settings";
import Activity from "./pages/Activity";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/" element={<Index />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/search-seo" element={<SearchSEO />} />
          <Route path="/search-seo/keyword-rankings-history" element={<SEOKeywordRankingsHistory />} />
          <Route path="/search-seo/organic-traffic-history" element={<SEOOrganicTrafficHistory />} />
          <Route path="/search-seo/visibility-history" element={<SEOVisibilityHistory />} />
          <Route path="/search-seo/ctr-history" element={<SEOCTRHistory />} />
          <Route path="/organic-social" element={<OrganicSocial />} />
          <Route path="/paid-social" element={<PaidSocial />} />
          <Route path="/ecommerce" element={<ECommerce />} />
          <Route path="/conversions" element={<Conversions />} />
          <Route path="/competitive" element={<Competitive />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/activity" element={<Activity />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
