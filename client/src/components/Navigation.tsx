/**
 * Navigation Component
 * Design: Industrial Brutalism - Bold geometric shapes, high contrast
 * Features: Sticky header with diagonal accent, mobile responsive
 */

import { Button } from "@/components/ui/button";
import { Menu, Phone, X, ImagePlus } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-secondary text-secondary-foreground shadow-lg">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Upload your logo here */}
          <Link href="/">
            <a className="flex items-center space-x-3">
              <div className="w-12 h-12 border-2 border-primary flex items-center justify-center bg-secondary/80">
                <ImagePlus className="w-6 h-6 text-primary" />
              </div>
              <div className="font-display text-2xl font-black tracking-tight">
                VERTICAL
                <span className="text-primary ml-2">AUTO</span>
              </div>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/#services">
              <a className="font-medium hover:text-primary transition-colors">
                SERVICES
              </a>
            </Link>
            <Link href="/#offers">
              <a className="font-medium hover:text-primary transition-colors">
                OFFERS
              </a>
            </Link>
            <Link href="/#about">
              <a className="font-medium hover:text-primary transition-colors">
                ABOUT
              </a>
            </Link>
            <Link href="/#contact">
              <a className="font-medium hover:text-primary transition-colors">
                CONTACT
              </a>
            </Link>
          </div>

          {/* CTA Buttons with both phone numbers */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex flex-col items-end text-sm space-y-0.5">
              <a href="tel:9545651518" className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span className="mono-number">(954) 565-1518</span>
              </a>
              <a href="tel:6452162266" className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span className="mono-number">(645) 216-2266</span>
              </a>
            </div>
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg"
            >
              SCHEDULE NOW
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-secondary border-t-4 border-primary">
          <div className="container py-6 space-y-4">
            <Link href="/#services">
              <a 
                className="block py-3 font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                SERVICES
              </a>
            </Link>
            <Link href="/#offers">
              <a 
                className="block py-3 font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                OFFERS
              </a>
            </Link>
            <Link href="/#about">
              <a 
                className="block py-3 font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                ABOUT
              </a>
            </Link>
            <Link href="/#contact">
              <a 
                className="block py-3 font-medium hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                CONTACT
              </a>
            </Link>
            <div className="pt-4 space-y-3">
              <a 
                href="tel:9545651518" 
                className="flex items-center space-x-2 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span className="mono-number">(954) 565-1518</span>
              </a>
              <a 
                href="tel:6452162266" 
                className="flex items-center space-x-2 text-sm"
              >
                <Phone className="w-4 h-4" />
                <span className="mono-number">(645) 216-2266</span>
              </a>
              <Button 
                size="lg" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
              >
                SCHEDULE NOW
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Diagonal accent line */}
      <div className="h-1 bg-primary" 
        style={{
          clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0 100%)'
        }}
      />
    </nav>
  );
}
