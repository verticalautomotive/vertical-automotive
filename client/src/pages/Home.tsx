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
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Battery,
  Wrench,
  Wind,
  Droplets,
  Settings,
  Gauge,
  Cog,
  Disc,
  Fuel,
  Zap,
  CheckCircle,
  Award,
  Users,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { useState, useEffect } from "react";

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

  const services = [
    { icon: Battery, name: "BATTERY & CHARGING", description: "Complete electrical system diagnostics and repair" },
    { icon: Wrench, name: "STEERING & SUSPENSION", description: "Alignment, shocks, struts, and handling optimization" },
    { icon: Wind, name: "A/C SYSTEMS", description: "Climate control repair and refrigerant service" },
    { icon: Droplets, name: "ENGINE, OIL & FILTERS", description: "Oil changes, filter replacement, engine maintenance" },
    { icon: Settings, name: "COMPLETE DIAGNOSTIC", description: "Advanced computer diagnostics for all systems" },
    { icon: Gauge, name: "TRANSMISSION", description: "Automatic and manual transmission service and repair" },
    { icon: Cog, name: "ROUTINE MAINTENANCE", description: "Scheduled service to keep your vehicle running perfectly" },
    { icon: Disc, name: "BRAKES & ROTORS", description: "Brake pad replacement, rotor resurfacing, ABS service" },
    { icon: Fuel, name: "FUEL SYSTEMS", description: "Fuel injection cleaning and fuel system optimization" },
    { icon: Zap, name: "HYBRID & EV", description: "Specialized service for hybrid and electric vehicles" },
  ];

  const offers = [
    {
      title: "EVERY 3RD OIL CHANGE",
      value: "FREE",
      description: "Based on number of visits",
      badge: "LOYALTY REWARD",
    },
    {
      title: "$25 OFF SYNTHETIC OIL CHANGE",
      value: "$25 OFF",
      description: "Full Synthetic Oil + Filter + Digital Vehicle Inspection",
      badge: "FIRST VISIT ONLY",
    },
    {
      title: "10% OFF FIRST VISIT",
      value: "10% OFF",
      description: "Discount on total invoice for new customers",
      badge: "NEW CUSTOMER",
    },
    {
      title: "BRAKES & ROTORS",
      value: "$385.99",
      description: "Per axle - Complete brake service",
      badge: "SPECIAL PRICE",
    },
    {
      title: "A/C VENT DISINFECTING",
      value: "FREE",
      description: "Available with any $499+ service",
      badge: "COMPLIMENTARY",
    },
    {
      title: "UBER/LYFT RIDES",
      value: "INCLUDED",
      description: "Within the area while we service your vehicle",
      badge: "CONVENIENCE",
    },
  ];

  const vehicleTypes = [
    {
      name: "TESLA",
      image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    },
    {
      name: "EUROPEAN",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    },
    {
      name: "ASIAN",
      image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80",
    },
    {
      name: "DOMESTIC",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
    },
  ];

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
              36 YEARS OF EXCELLENCE
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
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg px-8 py-6 shadow-xl"
              >
                SCHEDULE APPOINTMENT
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-2 border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary font-bold text-lg px-8 py-6"
              >
                VIEW OFFERS
              </Button>
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
            {vehicleTypes.map((type, index) => (
              <div
                key={index}
                className="group relative aspect-[4/3] overflow-hidden bg-card hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="text-2xl font-black text-secondary-foreground">
                    {type.name}
                  </h3>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-secondary text-secondary-foreground diagonal-top diagonal-bottom">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "36", label: "YEARS OF EXPERIENCE", icon: Award },
              { value: "54K", label: "VEHICLES REPAIRED", icon: TrendingUp },
              { value: "8", label: "EXPERT STAFF", icon: Users },
              { value: "99%", label: "SATISFIED CUSTOMERS", icon: CheckCircle },
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
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-6 bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 group border-2 border-border hover:border-primary hover:shadow-xl"
              >
                <service.icon className="w-12 h-12 mb-4 text-primary group-hover:text-primary-foreground transition-colors" />
                <h3 className="text-lg font-bold mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                  {service.description}
                </p>
              </Card>
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
            {offers.map((offer, index) => (
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
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold"
                >
                  CLAIM OFFER
                </Button>
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
            {/* Wilton Manors */}
            <Card className="p-8 bg-secondary/50 border-2 border-primary/20">
              <h3 className="text-2xl font-black mb-6 text-primary">
                WILTON MANORS
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">1100 W Oakland Park Blvd Bay 5</p>
                    <p className="text-muted-foreground">Wilton Manors, FL 33311</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="tel:9545651518" className="mono-number font-medium hover:text-primary transition-colors">
                    (954) 565-1518
                  </a>
                </div>
              </div>
              <Button 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                size="lg"
              >
                SCHEDULE APPOINTMENT
              </Button>
            </Card>

            {/* Fort Lauderdale */}
            <Card className="p-8 bg-secondary/50 border-2 border-primary/20">
              <h3 className="text-2xl font-black mb-6 text-primary">
                FORT LAUDERDALE
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">707 NE 11th Str</p>
                    <p className="text-muted-foreground">Fort Lauderdale, FL 33304</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href="tel:6452162266" className="mono-number font-medium hover:text-primary transition-colors">
                    (645) 216-2266
                  </a>
                </div>
              </div>
              <Button 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
                size="lg"
              >
                SCHEDULE APPOINTMENT
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
