import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from 'react-i18next';

// 👇 YAHAN i18n IMPORT KIYA HAI (Kyunki App.tsx aur i18n file dono src/ folder me hain)
import './i18n'; 

import Index from "./pages/Index";
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Yeh About component ab properly update hoga jab bhi language change hogi
const About = () => {
  const { t } = useTranslation();

  return (
    <div>
      <span className="text-primary font-medium mb-2 block">{t('why_choose_us')}</span>
      <h2 className="section-heading mb-6">{t('quality_trust')}</h2>
    </div>
  )
}

export default App;