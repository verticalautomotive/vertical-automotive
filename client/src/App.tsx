import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import StructuredData from "./components/StructuredData";
import HrefLang from "./components/HrefLang";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Offers from "./pages/Offers";
import About from "./pages/About";
import ServiceOrVehiclePage from "./pages/ServiceOrVehiclePage";
import Blog from "./pages/Blog";
import { useEffect } from "react";
import { useLocation } from "wouter";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (location.includes('#')) return;
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <HrefLang />
      <Switch>
        {/* English routes */}
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/offers" component={Offers} />
        <Route path="/about" component={About} />
        <Route path="/services/:slug" component={ServiceOrVehiclePage} />
        <Route path="/blog" component={Blog} />

        {/* Spanish routes */}
        <Route path="/es" component={Home} />
        <Route path="/es/servicios" component={Services} />
        <Route path="/es/ofertas" component={Offers} />
        <Route path="/es/sobre-nosotros" component={About} />
        <Route path="/es/servicios/:slug" component={ServiceOrVehiclePage} />
        <Route path="/es/informacion" component={Blog} />

        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <StructuredData />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
