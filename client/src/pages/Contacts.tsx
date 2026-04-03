/**
 * Contacts Page — Dedicated contact page at /contacts and /es/contactos
 * Industrial Brutalism Design
 * Reuses the same layout as the Home contact section but as a standalone page
 * BILINGUAL: Uses useTranslation for EN/ES content
 */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { COMPANY, LOCATIONS } from "@/lib/data";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { LazyMap } from "@/components/LazyMap";
import { MapPin, Phone, Clock, Mail, ExternalLink, Navigation2 } from "lucide-react";
import SEO from "@/components/SEO";
import { trackCall, trackSchedule, trackDirections } from "@/lib/gtm";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import CallNowDialog from "@/components/CallNowDialog";

function getMapsUrl(location: typeof LOCATIONS[0]) {
  return location.directionsUrl;
}

function ContactLocationCard({ location, isSpanish }: { location: typeof LOCATIONS[0]; isSpanish: boolean }) {
  const coords = { lat: location.lat, lng: location.lng };
  const mapsUrl = getMapsUrl(location);

  const handleMapReady = (map: google.maps.Map) => {
    new google.maps.marker.AdvancedMarkerElement({
      map,
      position: coords,
      title: `Vertical Automotive - ${location.name}`,
    });
  };

  return (
    <Card className="bg-secondary/50 border-2 border-primary/20 overflow-hidden">
      <div className="w-full h-[200px] sm:h-[280px]">
        <LazyMap
          className="w-full h-full"
          initialCenter={coords}
          initialZoom={16}
          onMapReady={handleMapReady}
          locationName={location.name}
          address={location.fullAddress}
        />
      </div>

      <div className="p-5 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 text-primary font-display tracking-wider">
          {location.name.toUpperCase()}
        </h3>
        <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-8">
          {/* Address — clickable to Google Maps */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start space-x-2 sm:space-x-3 group"
          >
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-primary flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-400 text-sm sm:text-base group-hover:text-primary transition-colors">
                {location.address}
              </p>
              <p className="text-gray-400 text-sm sm:text-base group-hover:text-primary transition-colors">
                {location.city}
              </p>
              <span className="text-xs text-primary/70 flex items-center gap-1 mt-1">
                <ExternalLink className="w-3 h-3" />
                {isSpanish ? "Abrir en Google Maps" : "Open in Google Maps"}
              </span>
            </div>
          </a>

          {/* Phone */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
            <a
              href={`tel:${location.phoneRaw}`}
              onClick={() => trackCall(location.name, location.phone, "contacts_location_card")}
              className="mono-number font-medium hover:text-primary transition-colors text-white text-sm sm:text-base"
            >
              {location.phone}
            </a>
          </div>

          {/* Hours */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
            <div>
              <p className="text-sm sm:text-base text-gray-400 mono-number">{COMPANY.hours}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mono-number">{COMPANY.closedDays}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <a
            href={location.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
            onClick={() => trackDirections(location.name, "contacts_location_card")}
          >
            <Button
              variant="outline"
              className="w-full border-primary/40 text-primary hover:bg-primary hover:text-white font-bold text-sm sm:text-base"
              size="lg"
            >
              <Navigation2 className="w-4 h-4 mr-2" />
              {isSpanish ? "DIRECCIONES" : "GET DIRECTIONS"}
            </Button>
          </a>
          <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer" className="flex-1" onClick={() => trackSchedule("contacts_location_card")}>
            <Button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-sm sm:text-base"
              size="lg"
            >
              {isSpanish ? "AGENDAR CITA" : "SCHEDULE"}
            </Button>
          </a>
        </div>
      </div>
    </Card>
  );
}

export default function Contacts() {
  const { isSpanish, prefix } = useTranslation();
  const [callDialogOpen, setCallDialogOpen] = useState(false);

  const t = {
    pageTitle: isSpanish ? "Contacto" : "Contact Us",
    metaTitle: isSpanish
      ? "Contacto | Vertical Automotive Fort Lauderdale"
      : "Contact Us | Vertical Automotive Fort Lauderdale",
    metaDescription: isSpanish
      ? "Contáctenos en nuestras dos ubicaciones en Wilton Manors y Fort Lauderdale. Llámenos o agende su cita en línea."
      : "Contact us at our two locations in Wilton Manors and Fort Lauderdale. Call us or schedule your appointment online.",
    heroSubtitle: isSpanish
      ? "Dos ubicaciones convenientes para servirle"
      : "Two convenient locations to serve you",
    getDirections: isSpanish ? "Obtener Direcciones" : "Get Directions",
    visitUs: isSpanish ? "VISÍTENOS" : "VISIT US",
    callUs: isSpanish ? "LLÁMENOS" : "CALL US",
    callAnytime: isSpanish
      ? "Llámenos durante horario de atención para consultas o citas"
      : "Call us during business hours for inquiries or appointments",
    scheduleOnline: isSpanish ? "AGENDE EN LÍNEA" : "SCHEDULE ONLINE",
    scheduleDesc: isSpanish
      ? "Reserve su cita en línea las 24 horas del día, los 7 días de la semana"
      : "Book your appointment online 24/7",
    scheduleNow: isSpanish ? "AGENDAR CITA" : "SCHEDULE NOW",
    breadcrumbHome: isSpanish ? "Inicio" : "Home",
    breadcrumbContacts: isSpanish ? "Contacto" : "Contact",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title={t.metaTitle}
        description={t.metaDescription}
        canonical={`https://verticalautomotive.com${isSpanish ? "/es/contactos" : "/contacts"}`}
        keywords={isSpanish
          ? "contacto Vertical Automotive, dirección taller Fort Lauderdale, teléfono mecánico Wilton Manors, agendar cita"
          : "contact Vertical Automotive, auto shop address Fort Lauderdale, mechanic phone Wilton Manors, schedule appointment"}
      />
      <Navigation />

      <PageHero
        title={t.pageTitle.toUpperCase()}
        subtitle={t.heroSubtitle}
        breadcrumb={[
          { label: t.breadcrumbHome, href: prefix || "/" },
          { label: t.breadcrumbContacts },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=50&fm=webp&fit=crop&auto=format"
      />

      {/* Locations Grid */}
      <section className="py-10 sm:py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <ContactLocationCard location={LOCATIONS[0]} isSpanish={isSpanish} />
            <ContactLocationCard location={LOCATIONS[1]} isSpanish={isSpanish} />
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-10 sm:py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {/* Call Us Card */}
            <div className="border-2 border-primary/20 p-6 sm:p-8 text-center">
              <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-lg sm:text-xl font-black tracking-wider mb-3">
                {t.callUs}
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                {t.callAnytime}
              </p>
              <button
                onClick={() => setCallDialogOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary/40 hover:border-primary text-primary hover:bg-primary hover:text-white font-display font-bold tracking-wider text-sm transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4" />
                {isSpanish ? "LLAMAR AHORA" : "CALL NOW"}
              </button>
            </div>

            {/* Schedule Online Card */}
            <div className="border-2 border-primary/20 p-6 sm:p-8 text-center">
              <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-lg sm:text-xl font-black tracking-wider mb-3">
                {t.scheduleOnline}
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                {t.scheduleDesc}
              </p>
              <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackSchedule("contacts_schedule_card")}>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-widest px-8">
                  {t.scheduleNow}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Call Now Dialog */}
      <CallNowDialog
        open={callDialogOpen}
        onClose={() => setCallDialogOpen(false)}
        source="contacts_quick_card"
      />
    </div>
  );
}
