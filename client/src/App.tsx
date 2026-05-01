import { lazy, Suspense, useEffect, useState } from "react";
import type { ReactNode } from "react";

/**
 * DeferredMount — delays mounting children until after the main thread is idle.
 * Uses requestIdleCallback (or a 2s setTimeout fallback) to avoid competing
 * with React hydration and LCP rendering. Reduces TBT on mobile significantly.
 */
function DeferredMount({ children, delay = 2500 }: { children: ReactNode; delay?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => setMounted(true),
        { timeout: delay }
      );
      return () => {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
      };
    } else {
      const id = setTimeout(() => setMounted(true), delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
  return mounted ? <>{children}</> : null;
}
import { Route, Switch, Redirect } from "wouter";
import { useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import StructuredData from "./components/StructuredData";
import HrefLang from "./components/HrefLang";
// Lazy-load Toaster (sonner ~67KB) — not needed for first paint
const Toaster = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));
// TooltipProvider is imported eagerly — it wraps the entire app so lazy-loading it blocks the Router
import { TooltipProvider } from "@/components/ui/tooltip";
// Lazy-load all non-critical UI components to reduce initial JS bundle
// These components are not needed for first paint or LCP
const MobileFooterBar = lazy(() => import("./components/MobileFooterBar"));
const FloatingActions = lazy(() => import("./components/FloatingActions"));
const CookieConsentBanner = lazy(() => import("@/components/CookieConsentBanner").then(m => ({ default: m.CookieConsentBanner })));

// Code-split all page components — all pages are lazy-loaded to minimize entry chunk size
const Home = lazy(() => import("./pages/Home"));
const Services = lazy(() => import("./pages/Services"));
const Offers = lazy(() => import("./pages/Offers"));
const About = lazy(() => import("./pages/About"));
const ServiceOrVehiclePage = lazy(() => import("./pages/ServiceOrVehiclePage"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Contacts = lazy(() => import("./pages/Contacts"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Gallery = lazy(() => import("./pages/Gallery"));
const ServiceGuide = lazy(() => import("./pages/ServiceGuide"));
const AdminConversations = lazy(() => import("./pages/AdminConversations"));
const AdminEscalations = lazy(() => import("./pages/AdminEscalations"));
const AdminAuthorizations = lazy(() => import("./pages/AdminAuthorizations"));
const PaymentAuthorization = lazy(() => import("./pages/PaymentAuthorization"));
const SendPaymentForm = lazy(() => import("./pages/SendPaymentForm"));
const CityServicePage = lazy(() => import("./pages/CityServicePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Community = lazy(() => import("./pages/Community"));
const Press = lazy(() => import("./pages/Press"));
const FortLauderdaleGuide = lazy(() => import("./pages/FortLauderdaleGuide"));
const SouthFloridaMaintenance = lazy(() => import("./pages/SouthFloridaMaintenance"));
const EVHybridRepair = lazy(() => import("./pages/EVHybridRepair"));
const FortLauderdaleCityLanding = lazy(() => import("./pages/FortLauderdaleCityLanding"));
const WiltonManorsCityLanding = lazy(() => import("./pages/WiltonManorsCityLanding"));
const AdminBacklinks = lazy(() => import("./pages/AdminBacklinks"));
const AdminGBPChecklist = lazy(() => import("./pages/AdminGBPChecklist"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const LocationHub = lazy(() => import("./pages/LocationHub"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (location.includes('#')) return;
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

// Minimal loading fallback — no layout shift
function PageFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <HrefLang />
      <Suspense fallback={<PageFallback />}>
        <Switch>
          {/* City-specific service pages — must be before generic :slug routes */}
          <Route path="/fort-lauderdale/:service" component={CityServicePage} />
          <Route path="/wilton-manors/:service" component={CityServicePage} />

          {/* English routes */}
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/offers" component={Offers} />
          <Route path="/about" component={About} />
          <Route path="/about/gallery" component={Gallery} />
          <Route path="/services/faq" component={FAQ} />
          {/* 301 redirects: old /services/* slugs → new city pages (prevents SPA from rendering them) */}
          <Route path="/services/tesla-vehicles-service"><Redirect to="/fort-lauderdale/tesla-ev-repair" /></Route>
          <Route path="/services/asian-vehicles-service"><Redirect to="/fort-lauderdale/asian-vehicle-repair" /></Route>
          <Route path="/services/european-vehicles-service"><Redirect to="/fort-lauderdale/european-vehicle-repair" /></Route>
          <Route path="/services/domestic-vehicles-service"><Redirect to="/fort-lauderdale/domestic-vehicle-repair" /></Route>
          <Route path="/services/brake-system"><Redirect to="/fort-lauderdale/brake-repair" /></Route>
          <Route path="/services/transmission"><Redirect to="/fort-lauderdale/transmission-service" /></Route>
          <Route path="/services/a-c-maintenance-repair"><Redirect to="/fort-lauderdale/ac-repair" /></Route>
          <Route path="/services/oil-change-engine-service"><Redirect to="/fort-lauderdale/engine-oil-service" /></Route>
          <Route path="/services/complete-diagnostics"><Redirect to="/fort-lauderdale/complete-diagnostics" /></Route>
          <Route path="/services/routine-preventive-maintenance"><Redirect to="/fort-lauderdale/routine-maintenance" /></Route>
          <Route path="/services/steering-suspension"><Redirect to="/fort-lauderdale/steering-suspension" /></Route>
          <Route path="/services/fuel-system"><Redirect to="/fort-lauderdale/fuel-system-service" /></Route>
          <Route path="/services/hybrids-ev"><Redirect to="/fort-lauderdale/hybrid-ev-service" /></Route>
          <Route path="/services/alignment-tire-rotation-balancing"><Redirect to="/fort-lauderdale/wheel-alignment" /></Route>
          <Route path="/services/battery-cranking-charging-systems"><Redirect to="/fort-lauderdale/battery-charging-systems" /></Route>
          <Route path="/services/tires"><Redirect to="/fort-lauderdale/wheel-alignment" /></Route>
          <Route path="/services/fleet-maintenance-repairs"><Redirect to="/fort-lauderdale/fleet-services" /></Route>
          <Route path="/services/powertrain-restoration"><Redirect to="/fort-lauderdale/routine-maintenance" /></Route>
          <Route path="/services/manufacturer-recommended-services"><Redirect to="/fort-lauderdale/routine-maintenance" /></Route>
          <Route path="/services/car-wash"><Redirect to="/" /></Route>
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogArticle} />
          <Route path="/contacts" component={Contacts} />
          <Route path="/service-guide" component={ServiceGuide} />

          {/* Spanish city-specific service pages */}
          <Route path="/es/fort-lauderdale/:service" component={CityServicePage} />
          <Route path="/es/wilton-manors/:service" component={CityServicePage} />

          {/* Spanish routes */}
          <Route path="/es" component={Home} />
          <Route path="/es/servicios" component={Services} />
          <Route path="/es/ofertas" component={Offers} />
          <Route path="/es/sobre-nosotros" component={About} />
          <Route path="/es/sobre-nosotros/galeria" component={Gallery} />
          <Route path="/es/servicios/preguntas-frecuentes" component={FAQ} />
          {/* 301 redirects: old /es/services/* slugs → new city pages */}
          <Route path="/es/services/tesla-vehicles-service"><Redirect to="/es/fort-lauderdale/tesla-ev-repair" /></Route>
          <Route path="/es/services/asian-vehicles-service"><Redirect to="/es/fort-lauderdale/asian-vehicle-repair" /></Route>
          <Route path="/es/services/european-vehicles-service"><Redirect to="/es/fort-lauderdale/european-vehicle-repair" /></Route>
          <Route path="/es/services/domestic-vehicles-service"><Redirect to="/es/fort-lauderdale/domestic-vehicle-repair" /></Route>
          <Route path="/es/services/brake-system"><Redirect to="/es/fort-lauderdale/brake-repair" /></Route>
          <Route path="/es/services/transmission"><Redirect to="/es/fort-lauderdale/transmission-service" /></Route>
          <Route path="/es/services/a-c-maintenance-repair"><Redirect to="/es/fort-lauderdale/ac-repair" /></Route>
          <Route path="/es/services/oil-change-engine-service"><Redirect to="/es/fort-lauderdale/engine-oil-service" /></Route>
          <Route path="/es/services/complete-diagnostics"><Redirect to="/es/fort-lauderdale/complete-diagnostics" /></Route>
          <Route path="/es/services/routine-preventive-maintenance"><Redirect to="/es/fort-lauderdale/routine-maintenance" /></Route>
          <Route path="/es/services/steering-suspension"><Redirect to="/es/fort-lauderdale/steering-suspension" /></Route>
          <Route path="/es/services/fuel-system"><Redirect to="/es/fort-lauderdale/fuel-system-service" /></Route>
          <Route path="/es/services/hybrids-ev"><Redirect to="/es/fort-lauderdale/hybrid-ev-service" /></Route>
          <Route path="/es/services/alignment-tire-rotation-balancing"><Redirect to="/es/fort-lauderdale/wheel-alignment" /></Route>
          <Route path="/es/services/battery-cranking-charging-systems"><Redirect to="/es/fort-lauderdale/battery-charging-systems" /></Route>
          <Route path="/es/services/tires"><Redirect to="/es/fort-lauderdale/wheel-alignment" /></Route>
          <Route path="/es/services/fleet-maintenance-repairs"><Redirect to="/es/fort-lauderdale/fleet-services" /></Route>
          <Route path="/es/services/powertrain-restoration"><Redirect to="/es/fort-lauderdale/routine-maintenance" /></Route>
          <Route path="/es/services/manufacturer-recommended-services"><Redirect to="/es/fort-lauderdale/routine-maintenance" /></Route>
          <Route path="/es/services/car-wash"><Redirect to="/es" /></Route>
          <Route path="/es/servicios/:slug" component={ServiceOrVehiclePage} />
          <Route path="/es/informacion" component={Blog} />
          <Route path="/es/informacion/:slug" component={BlogArticle} />
          <Route path="/es/contactos" component={Contacts} />
          <Route path="/es/guia-de-servicios" component={ServiceGuide} />

          {/* Payment Authorization */}
          <Route path="/payment-authorization" component={PaymentAuthorization} />
          <Route path="/send-payment-form" component={SendPaymentForm} />

          {/* Authority & SEO pages */}
          <Route path="/community" component={Community} />
          <Route path="/press" component={Press} />
          <Route path="/fort-lauderdale-auto-repair-guide" component={FortLauderdaleGuide} />
          <Route path="/car-maintenance-south-florida" component={SouthFloridaMaintenance} />
          <Route path="/ev-hybrid-repair-fort-lauderdale" component={EVHybridRepair} />
          <Route path="/fort-lauderdale/auto-repair" component={FortLauderdaleCityLanding} />
          <Route path="/wilton-manors/auto-repair" component={WiltonManorsCityLanding} />
          <Route path="/fort-lauderdale">{() => <LocationHub cityKey="fort-lauderdale" />}</Route>
          <Route path="/wilton-manors">{() => <LocationHub cityKey="wilton-manors" />}</Route>
          <Route path="/es/fort-lauderdale">{() => <LocationHub cityKey="fort-lauderdale" />}</Route>
          <Route path="/es/wilton-manors">{() => <LocationHub cityKey="wilton-manors" />}</Route>

          {/* Admin routes */}
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/admin/conversations" component={AdminConversations} />
          <Route path="/admin/escalations" component={AdminEscalations} />
          <Route path="/admin/authorizations" component={AdminAuthorizations} />
          <Route path="/admin/backlinks" component={AdminBacklinks} />
          <Route path="/admin/gbp-checklist" component={AdminGBPChecklist} />

          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  const [location] = useLocation();
  const language = location.startsWith("/es") ? "es" : "en";
  void language; // language kept for future use

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <StructuredData />
          {/* Toaster is lazy — not needed for first paint */}
          <Suspense fallback={null}>
            <Toaster />
          </Suspense>
          <Router />
          {/* Non-critical UI — deferred until main thread is idle to reduce TBT on mobile */}
          <DeferredMount delay={2500}>
            <Suspense fallback={null}>
              <FloatingActions />
              <MobileFooterBar />
              <CookieConsentBanner />
            </Suspense>
          </DeferredMount>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
