import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import StructuredData from "./components/StructuredData";
import HrefLang from "./components/HrefLang";
import { lazy, Suspense, useEffect, useState, useCallback } from "react";
import { useLocation } from "wouter";
import MobileFooterBar from "./components/MobileFooterBar";
import FloatingActions from "./components/FloatingActions";
// Lazy-load ChatButton — deferred until after initial render to reduce first-load JS
const ChatButton = lazy(() => import("@/components/ChatButton").then(m => ({ default: m.ChatButton })));
import { ChatBubble } from "@/components/ChatBubble";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";

// Code-split all page components — only Home is eagerly loaded for fast FCP
import Home from "./pages/Home";
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
          <Route path="/services/:slug" component={ServiceOrVehiclePage} />
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
          <Route path="/es/servicios/:slug" component={ServiceOrVehiclePage} />
          <Route path="/es/informacion" component={Blog} />
          <Route path="/es/informacion/:slug" component={BlogArticle} />
          <Route path="/es/contactos" component={Contacts} />
          <Route path="/es/guia-de-servicios" component={ServiceGuide} />

          {/* Payment Authorization */}
          <Route path="/payment-authorization" component={PaymentAuthorization} />
          <Route path="/send-payment-form" component={SendPaymentForm} />

          {/* Admin routes */}
          <Route path="/admin/conversations" component={AdminConversations} />
          <Route path="/admin/escalations" component={AdminEscalations} />
          <Route path="/admin/authorizations" component={AdminAuthorizations} />

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
  const [isChatOpen, setIsChatOpen] = useState(false);
  const handleChatToggle = useCallback(() => setIsChatOpen(prev => !prev), []);
  const handleChatClose = useCallback(() => setIsChatOpen(false), []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <StructuredData />
          <Toaster />
          <Router />
          {/* Single ChatBubble instance — shared by desktop and mobile buttons */}
          <ChatBubble isOpen={isChatOpen} onClose={handleChatClose} language={language} />
          <FloatingActions isChatOpen={isChatOpen} onChatToggle={handleChatToggle} />
          <MobileFooterBar />
          <Suspense fallback={null}>
            <ChatButton language={language} isOpen={isChatOpen} onToggle={handleChatToggle} />
          </Suspense>
          <CookieConsentBanner />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
