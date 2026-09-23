import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { trackPageView } from "@/lib/analytics";
import Index from "./pages/Index";
import Implements from "./pages/Implements";
import MachineDetail from "./pages/MachineDetail";
import About from "./pages/About";
import Appointments from "./pages/Appointments";
import Faq from "./pages/Faq";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// GA4's default tag only fires page_view once on load — this sends one on every
// client-side route change so traffic doesn't all report as "/".
const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/implements" element={<Implements />} />
            <Route path="/implements/:id" element={<MachineDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
