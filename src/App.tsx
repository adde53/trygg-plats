import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import Index from "./pages/Index";
import CityPage from "./pages/CityPage";
import PlacePage from "./pages/PlacePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Helmet>
          <title>Amningsrum & skötrum i Sverige – amningsrum.se</title>
          <meta 
            name="description" 
            content="Hitta närmaste amningsrum och skötrum i hela Sverige. Sök på karta eller stad. Gratis tjänst för föräldrar." 
          />
          <meta name="keywords" content="amningsrum, skötrum, amning, blöjbyte, Sverige, föräldrar, baby" />
          <meta property="og:title" content="Amningsrum & skötrum i Sverige – amningsrum.se" />
          <meta property="og:description" content="Hitta närmaste amningsrum och skötrum i hela Sverige." />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="sv_SE" />
          <link rel="canonical" href="https://amningsrum.se" />
        </Helmet>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/:citySlug" element={<CityPage />} />
            <Route path="/plats/:placeSlug" element={<PlacePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
