
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import VenuesPage from "./components/VenuesPage";
import CateringPage from "./pages/CateringPage";
import EntertainmentPage from "./pages/EntertainmentPage";
import ServicesPage from "./pages/ServicesPage";
import PlanEventPage from "./pages/PlanEventPage";
import ContactPage from "./pages/ContactPage";
import VendorDashboard from "./pages/VendorDashboard";
import NotFound from "./pages/NotFound";
import Cart from "./components/Cart";
import LoginModal from "./components/LoginModal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-vaikunta-warm">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/venues" element={<VenuesPage />} />
              <Route path="/catering" element={<CateringPage />} />
              <Route path="/entertainment" element={<EntertainmentPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/plan-event" element={<PlanEventPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/vendor-dashboard" element={<VendorDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Cart />
            <LoginModal />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
