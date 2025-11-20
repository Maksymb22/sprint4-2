import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SearchSEO from "./pages/SearchSEO";
import OrganicSocial from "./pages/OrganicSocial";
import PaidSocial from "./pages/PaidSocial";
import ECommerce from "./pages/ECommerce";
import Conversions from "./pages/Conversions";
import Competitive from "./pages/Competitive";
import Financial from "./pages/Financial";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search-seo" element={<SearchSEO />} />
          <Route path="/organic-social" element={<OrganicSocial />} />
          <Route path="/paid-social" element={<PaidSocial />} />
          <Route path="/ecommerce" element={<ECommerce />} />
          <Route path="/conversions" element={<Conversions />} />
          <Route path="/competitive" element={<Competitive />} />
          <Route path="/financial" element={<Financial />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
