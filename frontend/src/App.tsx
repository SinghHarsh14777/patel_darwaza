import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { MapPinOff, AlertTriangle, X } from "lucide-react"; 

import './i18n'; 
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// 1. APNI STORE KI LOCATION YAHAN ENTER KAREIN
const STORE_LOCATION = {
  lat: 25.4813512,
  lng: 82.8297396,
};
const MAX_DISTANCE_KM = 50; 

// 2. Haversine Formula for Distance Calculation
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; 
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

const App = () => {
  const [warningMessage, setWarningMessage] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setWarningMessage("Aapka browser location support nahi karta. Order process nahi ho payega.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const distance = calculateDistance(
          STORE_LOCATION.lat,
          STORE_LOCATION.lng,
          userLat,
          userLng
        );


        if (distance > MAX_DISTANCE_KM) {
          setWarningMessage("Sorry, we can't proceed. Hamari service aapke location per available nhi hai.");
        }
      },
      (error) => {
        console.error("Location Error:", error);
        setWarningMessage("Location access denied! Delivery service check karne ke liye location zaroori hai.");
      }
    );
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          
          {warningMessage && showWarning && (
            <div className="bg-red-50 text-red-600 border-b border-red-200 px-4 py-3 flex items-start sm:items-center justify-between fixed top-0 left-0 right-0 z-[99999] shadow-md animate-in slide-in-from-top-2">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="shrink-0 text-red-500" />
                <p className="text-sm sm:text-base font-medium">{warningMessage}</p>
              </div>
              <button 
                onClick={() => setShowWarning(false)}
                className="p-1 hover:bg-red-100 rounded-md transition-colors shrink-0"
                title="Dismiss"
              >
                <X size={20} />
              </button>
            </div>
          )}

          {/* MAIN WEBSITE ROUTES */}
          <div className={warningMessage && showWarning ? "pt-12" : ""}>
            {/* Jab banner dikhega toh website thodi niche khisak jayegi (pt-12) taaki header na dab jaye */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
