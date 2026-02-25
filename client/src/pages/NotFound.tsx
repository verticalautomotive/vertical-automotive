import { Link, useLocation } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  const [location] = useLocation();
  const isSpanish = location.startsWith("/es");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center max-w-md px-4">
          <div className="text-8xl font-black text-primary mb-4">404</div>
          <h1 className="text-2xl font-bold mb-4">
            {isSpanish ? "Página No Encontrada" : "Page Not Found"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isSpanish
              ? "Lo sentimos, la página que busca no existe o ha sido movida."
              : "Sorry, the page you're looking for doesn't exist or has been moved."}
          </p>
          <Link
            href={isSpanish ? "/es" : "/"}
            className="inline-block bg-primary text-primary-foreground font-bold tracking-wider px-8 py-3 hover:bg-primary/90 transition-colors"
          >
            {isSpanish ? "VOLVER AL INICIO" : "BACK TO HOME"}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
