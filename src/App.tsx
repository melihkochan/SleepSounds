import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "./contexts/I18nContext";
import { initAnalytics, trackAppOpen } from "./services/analytics";
import { initAdMob } from "./services/admob";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const AppContent = () => {
  useEffect(() => {
    // Analytics ve AdMob'u başlat (async)
    const initialize = async () => {
      // iOS kontrolü - iOS'ta Firebase ve AdMob kullanma
      try {
        const { Capacitor } = await import('@capacitor/core');
        if (Capacitor.getPlatform() === 'ios') {
          console.log("📱 iOS platform - Firebase ve AdMob devre dışı");
          return; // iOS'ta hiçbir şey başlatma
        }
      } catch {
        // Capacitor yoksa devam et (web platform)
      }
      
      await initAnalytics();
      initAdMob();
      
      // App açılışını track et
      trackAppOpen();
    };
    
    initialize();
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  </QueryClientProvider>
);

export default App;
