/**
 * Home Page - Vertical Automotive
 * Design Philosophy: Industrial Brutalism
 * - Raw workshop aesthetics with bold geometric shapes
 * - Diagonal grid system with asymmetric layouts
 * - Black, white, and blue color scheme
 * - Mechanical precision in interactions
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { COMPANY, SERVICES, VEHICLE_TYPES, OFFERS, LOCATIONS } from "@/lib/data";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  CheckCircle,
  Award,
  Users,
  TrendingUp,
  MapPin,
  Phone,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";

export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsSection = document.getElementById("stats");
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <section 
        className="relative min-h-[90vh] flex items-center bg-secondary text-secondary-foreground overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(20, 20, 30, 0.95) 0%, rgba(20, 20, 30, 0.7) 50%, rgba(20, 20, 30, 0.4) 100%), url('https://private-us-east-1.manuscdn.com/sessionFile/zG7TkjTFYQTi6RlHwEX5Va/sandbox/4uoMfJPiYSKA2driFpoMoI-img-3_1771025931000_na1fn_dGVzbGEtc2VydmljZQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvekc3VGtqVEZZUVRpNlJsSHdFWDVWYS9zYW5kYm94LzR1b01mSlBpWVNLQTJkcmlGcG9Nb0ktaW1nLTNfMTc3MTAyNTkzMTAwMF9uYTFmbl9kR1Z6YkdFdGMyVnlkbWxqWlEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=YkRbXyYwnknHTfqRc0f6gz9xHbU6GQwYk2RwmzYxpuhkuo~MMZlqWY5FtxNZjJl1Eo2K3OtmhkIP1uyxWts8uKT1F8aVlyst9r9zKAL-4iBYDw4mz01MqmJVhuUmisHHVPrSDn9ut5BsFi2ZzcDqNCiEzrYrQX2LJKs74DrwyR1aoYYw2XMHyeWALXEOLGHGAwMzxFxuiDZbtdaNzo9x9ZTiMgwZ2REqTciWOS3C7rqYr5x~psJcT8eZeQMSU3Q8WiKuG1VZQKzUO7SSe-YMelDYvOsRBJTxnZqmr6BYWxt7BPIearN4r5sK9Phh3n~spfOWn3U2o0AqGFrtbznXdQ__')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block bg-primary text-primary-foreground px-6 py-2 mb-6 font-bold text-sm tracking-wider">
              {COMPANY.yearsExperience} YEARS OF EXCELLENCE
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
              TOTAL AUTO
              <br />
              <span className="text-primary">CARE</span>
            </h1>
            
            <div className="h-1 w-32 bg-primary mb-8" />
            
            <p className="text-xl md:text-2xl mb-8 leading-relaxed font-medium">
              3-Year Warranty on All Repairs
              <br />
              <span className="text-muted-foreground">
                ASE-Certified Mechanics • Tesla, Asian, European & Domestic Specialists
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg px-8 py-6 shadow-xl"
                >
                  SCHEDULE APPOINTMENT
                </Button>
              </a>
              <Link href="/offers">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-transparent border-2 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary font-bold text-lg px-8 py-6"
                >
                  VIEW OFFERS
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Diagonal bottom edge */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-24 bg-background"
          style={{
            clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 80%)'
          }}
        />
      </section>

      {/* Vehicle Types Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-black mb-12 text-center">
            WE SERVICE <span className="text-primary">ALL MAKES</span>
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {VEHICLE_TYPES.map((type) => (
              <Link
                key={type.slug}
                href={`/services/${type.slug}`}
                className="group relative aspect-[4/3] overflow-hidden bg-card hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={type.image}
                  alt={type.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="text-2xl font-black text-secondary-foreground">
                    {type.title}
                  </h3>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-secondary text-secondary-foreground diagonal-top diagonal-bottom">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: String(COMPANY.yearsExperience), label: "YEARS OF EXPERIENCE", icon: Award },
              { value: COMPANY.vehiclesRepaired, label: "VEHICLES REPAIRED", icon: TrendingUp },
              { value: String(COMPANY.staff), label: "EXPERT STAFF", icon: Users },
              { value: COMPANY.satisfaction, label: "SATISFIED CUSTOMERS", icon: CheckCircle },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 bg-secondary/50 border-2 border-primary/20 hover:border-primary transition-all duration-300"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <div className="text-5xl md:text-6xl font-black mono-number mb-2 text-primary">
                  {stat.value}
                </div>
                <div className="text-sm font-bold tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              OUR <span className="text-primary">SERVICES</span>
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {SERVICES.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                <Card
                  className="p-6 bg-card border-2 border-border hover:border-primary hover:bg-primary group transition-all duration-300 cursor-pointer h-full"
                >
                  <div className="w-12 h-12 mb-4">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary-foreground transition-colors">{service.shortTitle}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                    {service.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section id="offers" className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              CURRENT <span className="text-primary">OFFERS</span>
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              Save on quality auto care with our exclusive promotions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFERS.slice(0, 6).map((offer, index) => (
              <Card
                key={index}
                className="p-8 bg-card border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-xl"
              >
                <div className="inline-block bg-primary text-primary-foreground px-4 py-1 text-xs font-bold mb-4">
                  {offer.badge}
                </div>
                <h3 className="text-xl font-bold mb-3">{offer.title}</h3>
                <div className="text-4xl font-black text-primary mb-4 mono-number">
                  {offer.value}
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {offer.description}
                </p>
                <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer">
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold"
                  >
                    CLAIM OFFER
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                CERTIFIED AUTOMOTIVE
                <br />
                <span className="text-primary">PROFESSIONALS</span>
              </h2>
              <div className="h-1 w-24 bg-primary mb-8" />
              <p className="text-lg leading-relaxed mb-6">
                Our ASE-certified mechanics bring decades of combined experience to every repair. We feature complete diagnostic and repair services for all makes and models, from classic American muscle to cutting-edge electric vehicles.
              </p>
              <p className="text-lg leading-relaxed mb-8">
                With state-of-the-art equipment and a commitment to honest, transparent service, we treat every vehicle like our own. Our 3-year warranty on repairs demonstrates our confidence in quality workmanship.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-medium">ASE Certified</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-medium">3-Year Warranty</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-medium">All Makes & Models</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="font-medium">EV Specialists</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/zG7TkjTFYQTi6RlHwEX5Va/sandbox/4uoMfJPiYSKA2driFpoMoI-img-2_1771025932000_na1fn_c2VydmljZXMtZGlhZ25vc3RpYw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvekc3VGtqVEZZUVRpNlJsSHdFWDVWYS9zYW5kYm94LzR1b01mSlBpWVNLQTJkcmlGcG9Nb0ktaW1nLTJfMTc3MTAyNTkzMjAwMF9uYTFmbl9jMlZ5ZG1salpYTXRaR2xoWjI1dmMzUnBZdy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=apHNfs4OvHz~Zl8LwjV~1L8cr966xQn-Aehe5YbA6AvCK9xQ0tYXUcoge3OBi4phHgoqt1xnqVURrLimUfkx3D9ypL0hSg0xi~jNia3VLzVe9rxGLIkm9QLLuhZZdM4fb1SmrT73mq~8I~WexGMAcV5Bi7KGd1x3C-ouFMLE-Px4KW-chT9Z5TR9uy3SEr01Dp06IVzyqf4q5U7g4~JFkhdPWG0DULUGLk1zCSxc~QXz4Tv1f99IwOEWd4oZW1~8ENNTvYTRU6vwplDeLOX4UZW6XnD-7tqFoGuQ2hfD~q5LKrqEjZmWefiyRL7mWmTSPm3kytEBQSc3qqZ-jmPXhA__"
                alt="Diagnostic Equipment"
                className="w-full shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary opacity-20 -z-10" />
              <div className="absolute -top-6 -left-6 w-48 h-48 border-4 border-primary -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              CONTACT <span className="text-primary">US</span>
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mb-4" />
            <p className="text-lg">
              Two convenient locations to serve you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {LOCATIONS.map((loc) => (
              <Card key={loc.name} className="p-8 bg-secondary/50 border-2 border-primary/20">
                <h3 className="text-2xl font-black mb-6 text-primary">
                  {loc.name.toUpperCase()}
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">{loc.address}</p>
                      <p className="text-muted-foreground">{loc.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <a href={`tel:${loc.phoneRaw}`} className="mono-number font-medium hover:text-primary transition-colors">
                      {loc.phone}
                    </a>
                  </div>
                </div>
                <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer">
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                    size="lg"
                  >
                    SCHEDULE APPOINTMENT
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const iconColor = "text-primary group-hover:text-primary-foreground transition-colors";
  const size = "w-12 h-12";

  const icons: Record<string, React.ReactNode> = {
    battery: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="14" width="32" height="22" rx="2" />
        <line x1="16" y1="10" x2="16" y2="14" />
        <line x1="32" y1="10" x2="32" y2="14" />
        <line x1="18" y1="22" x2="18" y2="30" />
        <line x1="14" y1="26" x2="22" y2="26" />
        <line x1="26" y1="26" x2="34" y2="26" />
      </svg>
    ),
    disc: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="24" r="18" />
        <circle cx="24" cy="24" r="8" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    ),
    cog: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="24" r="8" />
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M10 38l4-4M34 14l4-4" />
      </svg>
    ),
    snowflake: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="24" y1="4" x2="24" y2="44" />
        <line x1="4" y1="24" x2="44" y2="24" />
        <line x1="10" y1="10" x2="38" y2="38" />
        <line x1="38" y1="10" x2="10" y2="38" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
      </svg>
    ),
    droplet: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M24 4C24 4 10 20 10 30a14 14 0 0028 0C38 20 24 4 24 4z" />
      </svg>
    ),
    search: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="20" cy="20" r="14" />
        <line x1="30" y1="30" x2="42" y2="42" />
        <path d="M14 20h12M20 14v12" />
      </svg>
    ),
    wrench: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M36 8a12 12 0 00-16 16L8 36l4 4 12-12a12 12 0 0016-16l-6 6-4-4 6-6z" />
      </svg>
    ),
    gauge: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="28" r="16" />
        <path d="M24 28l-8-12" strokeWidth="3" />
        <line x1="24" y1="14" x2="24" y2="18" />
        <line x1="12" y1="28" x2="16" y2="28" />
        <line x1="36" y1="28" x2="32" y2="28" />
      </svg>
    ),
    fuel: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="10" width="22" height="30" rx="2" />
        <rect x="12" y="14" width="14" height="10" />
        <path d="M30 20h6a4 4 0 014 4v12a2 2 0 01-4 0v-8" />
        <circle cx="37" cy="14" r="3" />
      </svg>
    ),
    zap: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M26 4L10 28h12L20 44l16-24H24L26 4z" fill="currentColor" opacity="0.2" />
        <path d="M26 4L10 28h12L20 44l16-24H24L26 4z" />
      </svg>
    ),
    circle: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="24" r="18" />
        <circle cx="24" cy="24" r="6" />
        <line x1="24" y1="6" x2="24" y2="12" />
        <line x1="24" y1="36" x2="24" y2="42" />
        <line x1="6" y1="24" x2="12" y2="24" />
        <line x1="36" y1="24" x2="42" y2="24" />
      </svg>
    ),
  };

  return <>{icons[name] || icons.wrench}</>;
}
