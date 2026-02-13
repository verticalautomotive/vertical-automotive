/**
 * Navigation Component
 * Design: Industrial Brutalism - Bold geometric shapes, high contrast
 * Features: Sticky header with diagonal accent, mobile responsive
 */

import { Button } from "@/components/ui/button";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-secondary text-secondary-foreground shadow-lg">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center space-x-2">
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

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:9545651518" className="flex items-center space-x-2 text-sm">
              <Phone className="w-4 h-4" />
              <span className="mono-number">(954) 565-1518</span>
            </a>
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
