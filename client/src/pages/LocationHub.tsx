/**
 * LocationHub — Shared component for /fort-lauderdale and /wilton-manors hub pages
 * Full SEO hub: H1, NAP, map, shop photos, 16 service tiles, Work We Do dropdown,
 * location-specific reviews, LocalBusiness JSON-LD schema
 */
import { useState, useEffect } from "react";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { LazyMap } from "@/components/LazyMap";
import { COMPANY, LOCATIONS } from "@/lib/data";
import { ChevronDown, MapPin, Phone, Clock, ExternalLink, Star, CheckCircle, Calendar } from "lucide-react";
import { trackCall, trackDirections, trackSchedule } from "@/lib/gtm";
import ServiceIcon from "@/components/ServiceIcon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ─── All 17 services with slug + display name + icon ────────────────────────
const ALL_SERVICES = [
  { slug: "tesla-ev-repair",          name: "Tesla & EV Service",                  shortTitle: "Tesla & EV",            icon: "zap" },
  { slug: "european-vehicle-repair",  name: "European Vehicle Service",            shortTitle: "European",              icon: "cog" },
  { slug: "asian-vehicle-repair",     name: "Asian Vehicle Service",               shortTitle: "Asian",                 icon: "wrench" },
  { slug: "domestic-vehicle-repair",  name: "Domestic Vehicle Service",            shortTitle: "Domestic",              icon: "truck" },
  { slug: "brake-repair",             name: "Brake & Rotor Service",               shortTitle: "Brakes",                icon: "disc" },
  { slug: "transmission-service",     name: "Transmission Service",                shortTitle: "Transmission",          icon: "cog" },
  { slug: "ac-repair",                name: "A/C Repair & Maintenance",            shortTitle: "A/C Repair",            icon: "snowflake" },
  { slug: "engine-oil-service",       name: "Engine, Oil & Filters",               shortTitle: "Oil & Engine",          icon: "droplet" },
  { slug: "complete-diagnostics",     name: "Complete Diagnostics",                shortTitle: "Diagnostics",           icon: "search" },
  { slug: "routine-maintenance",      name: "Routine & Preventive Maintenance",    shortTitle: "Maintenance",           icon: "wrench" },
  { slug: "steering-suspension",      name: "Steering & Suspension",               shortTitle: "Suspension",            icon: "gauge" },
  { slug: "fuel-system-service",      name: "Fuel System Service",                 shortTitle: "Fuel System",           icon: "fuel" },
  { slug: "hybrid-ev-service",        name: "Hybrid & EV Service",                 shortTitle: "Hybrid & EV",           icon: "zap" },
  { slug: "wheel-alignment",          name: "Wheel Alignment & Tires",             shortTitle: "Alignment",             icon: "circle" },
  { slug: "battery-charging-systems", name: "Battery & Charging Systems",          shortTitle: "Battery",               icon: "battery" },
  { slug: "fleet-services",           name: "Fleet Services",                      shortTitle: "Fleet",                 icon: "truck" },
  { slug: "tire-service",             name: "Tire Service & Replacement",          shortTitle: "Tires",                 icon: "circle" },
];

const CDN = "/img";

// ─── Location-specific data ──────────────────────────────────────────────────
interface LocationData {
  city: "fort-lauderdale" | "wilton-manors";
  location: typeof LOCATIONS[0];
  h1: string;
  metaTitle: string;
  metaDescription: string;
  aboutParagraph: string;
  heroPhoto?: { src: string; alt: string }; // single static hero photo; if set, replaces the rotating gallery
  photos: { src: string; alt: string }[];
  reviews: { name: string; rating: number; text: string; date: string }[];
  schemaId: string;
}

const FORT_LAUDERDALE_DATA: LocationData = {
  city: "fort-lauderdale",
  location: LOCATIONS[1],
  h1: "Auto Repair in Fort Lauderdale",
  heroPhoto: { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/wm-exterior-1_a6a6ea18.webp", alt: "Vertical Automotive Fort Lauderdale shop exterior" },
  metaTitle: "Auto Repair Fort Lauderdale | Vertical Automotive",
  metaDescription: "ASE-certified auto repair in Fort Lauderdale, FL. Tesla, European, Asian & Domestic specialists. 36-month / 36,000-mile warranty. Call (645) 216-2266.",
  aboutParagraph: "Vertical Automotive's Fort Lauderdale location sits at 707 NE 11th Street — minutes from Victoria Park, Las Olas, and Flagler Village. Our ASE-certified technicians specialize in Tesla, European, Asian, and Domestic vehicles, delivering dealership-level diagnostics at independent shop prices. From routine oil changes to complex transmission rebuilds, every repair is backed by our 36-month / 36,000-mile warranty. We've been serving Broward County drivers since 1989 with honest estimates, no upsells, and same-day service on most repairs.",
  photos: [
    { src: `${CDN}/brake-rotor-real_2efc5177.webp`, alt: "Brake service at Vertical Automotive Fort Lauderdale" },
    { src: `${CDN}/diag-1_ceb74e24.webp`, alt: "Engine diagnostics at Vertical Automotive Fort Lauderdale" },
    { src: `${CDN}/engine-oil-1_2794a779.webp`, alt: "Oil change service Fort Lauderdale" },
    { src: `${CDN}/tesla-frunk-open_3696ade7.webp`, alt: "Tesla service at Vertical Automotive Fort Lauderdale" },
    { src: `${CDN}/alignment-real-1_11cbcc74.webp`, alt: "Wheel alignment Fort Lauderdale" },
    { src: `${CDN}/susp-1_5c3d7f9a.webp`, alt: "Suspension repair Fort Lauderdale" },
  ],
  reviews: [
    { name: "David M.", rating: 5, text: "Best auto shop in Fort Lauderdale. They diagnosed my BMW correctly the first time — other shops had it wrong for months. Honest, professional, and fast.", date: "2025" },
    { name: "Sarah K.", rating: 5, text: "Brought my Tesla Model 3 in for brake service. Half the price of the Tesla Service Center and done same day. Highly recommend.", date: "2025" },
    { name: "Carlos R.", rating: 5, text: "My A/C went out in July — worst timing. They got me in next day, fixed it in a few hours, and the price was very fair. 5 stars.", date: "2024" },
    { name: "Jennifer L.", rating: 5, text: "I've been coming here for 8 years. They always explain exactly what's wrong and why. Never felt pressured. Best shop in Broward.", date: "2024" },
    { name: "Michael T.", rating: 5, text: "Transmission service on my Audi A4. Vertical Automotive knew exactly what fluid to use and the procedure. Dealership wanted $800 more for the same job.", date: "2025" },
    { name: "Ana G.", rating: 5, text: "Friendly staff, clean shop, honest pricing. They fixed my Prius hybrid battery issue that two other shops couldn't diagnose. Incredible.", date: "2024" },
  ],
  schemaId: "https://verticalautomotive.com/fort-lauderdale/#business",
};

const WILTON_MANORS_DATA: LocationData = {
  city: "wilton-manors",
  location: LOCATIONS[0],
  h1: "Auto Repair in Wilton Manors",
  heroPhoto: { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/wm-exterior-2_e5bbb357.webp", alt: "Vertical Automotive Wilton Manors service bays" },
  metaTitle: "Auto Repair Wilton Manors | Vertical Automotive",
  metaDescription: "ASE-certified auto repair in Wilton Manors, FL. Tesla, European, Asian & Domestic specialists. 36-month / 36,000-mile warranty. Call (954) 565-1518.",
  aboutParagraph: "Vertical Automotive's Wilton Manors location at 1100 W Oakland Park Blvd has been the go-to shop for Oakland Park, Sunrise, and Lauderdale Lakes drivers since 1989. Our ASE-certified team handles everything from Tesla battery diagnostics to European transmission rebuilds — with factory-level scan tools and honest, transparent pricing. Every repair comes with our 36-month / 36,000-mile warranty, and we offer complimentary multi-point inspections with every service visit. No upsells, no surprises — just quality work done right the first time.",
  photos: [
    { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/wm-exterior-2_e5bbb357.webp", alt: "Vertical Automotive Wilton Manors service bays" },
    { src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/wm-exterior-1_a6a6ea18.webp", alt: "Vertical Automotive Wilton Manors shop exterior" },
    { src: `${CDN}/susp-2_b7e4c123.webp`, alt: "Suspension service at Vertical Automotive Wilton Manors" },
    { src: `${CDN}/brake-rotor-real-2_fa4a30ab.webp`, alt: "Brake repair Wilton Manors" },
    { src: `${CDN}/engine-oil-2_764ac92e.webp`, alt: "Oil change Wilton Manors" },
    { src: `${CDN}/tesla-hv-battery_19dac181.webp`, alt: "Tesla HV battery service Wilton Manors" },
    { src: `${CDN}/align-1_e2569bdc.webp`, alt: "Wheel alignment Wilton Manors" },
    { src: `${CDN}/diag-2_35a138b1.webp`, alt: "Diagnostics at Vertical Automotive Wilton Manors" },
  ],
  reviews: [
    { name: "Robert H.", rating: 5, text: "I've been bringing my cars here since 2018. Best shop in Wilton Manors by far. They know European cars — my Volvo is always in great hands.", date: "2025" },
    { name: "Lisa P.", rating: 5, text: "Took my Prius in for a strange noise. They found the issue in 20 minutes, fixed it same day. Very honest — didn't try to upsell me on anything.", date: "2025" },
    { name: "Marcus W.", rating: 5, text: "Had a full brake job done on my F-150. Price was fair, work was excellent, and they finished ahead of schedule. Will be back for everything.", date: "2024" },
    { name: "Diana F.", rating: 5, text: "My Honda's AC stopped working in August. Vertical Automotive on Oakland Park got me in immediately and fixed it the same day. Lifesavers!", date: "2024" },
    { name: "Tom B.", rating: 5, text: "These guys are the real deal. Diagnosed a transmission issue that the dealer missed. Saved me over $1,000. Honest and skilled.", date: "2025" },
    { name: "Natalie C.", rating: 5, text: "Clean shop, friendly staff, and they explain everything clearly. My whole family brings their cars here now. Wouldn't go anywhere else.", date: "2024" },
  ],
  schemaId: "https://verticalautomotive.com/wilton-manors/#business",
};

// ─── Component ───────────────────────────────────────────────────────────────
interface Props {
  cityKey: "fort-lauderdale" | "wilton-manors";
}

export default function LocationHub({ cityKey }: Props) {
  const data = cityKey === "fort-lauderdale" ? FORT_LAUDERDALE_DATA : WILTON_MANORS_DATA;
  const { location: loc, h1, metaTitle, metaDescription, aboutParagraph, heroPhoto, photos, reviews, schemaId } = data;
  const [workWeDoOpen, setWorkWeDoOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const [reviewsExpanded, setReviewsExpanded] = useState(false);

  // Auto-rotate photos
  useEffect(() => {
    const id = setInterval(() => setActivePhoto((p) => (p + 1) % photos.length), 4000);
    return () => clearInterval(id);
  }, [photos.length]);

  // LocalBusiness JSON-LD
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": schemaId,
    name: `Vertical Automotive — ${loc.name}`,
    description: metaDescription,
    url: `https://verticalautomotive.com/${cityKey}`,
    telephone: loc.phone,
    priceRange: "$$",
    image: `${COMPANY.logoUrl}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      addressLocality: loc.name,
      addressRegion: "FL",
      postalCode: loc.city.split(" ").pop(),
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.lat,
      longitude: loc.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Auto Repair Services",
      itemListElement: ALL_SERVICES.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name },
      })),
    },
  };

  const cityPrefix = `/${cityKey}`;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO title={metaTitle} description={metaDescription} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Navigation />

      {/* ── HERO ── */}
      <section className="relative bg-secondary text-secondary-foreground overflow-hidden">
        {/* Photo strip */}
        <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
          {heroPhoto ? (
            <img
              src={heroPhoto.src}
              alt={heroPhoto.alt}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            photos.map((photo, i) => (
              <img
                key={i}
                src={photo.src}
                alt={photo.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === activePhoto ? "opacity-100" : "opacity-0"}`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))
          )}
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Photo dots — only show for rotating gallery */}
          {!heroPhoto && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhoto(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === activePhoto ? "bg-primary w-5" : "bg-white/50"}`}
                  aria-label={`Photo ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* H1 overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 z-10">
            <div className="inline-block bg-primary text-white text-xs font-display font-bold tracking-widest px-3 py-1 mb-3 w-fit">
              36 YEARS OF EXCELLENCE
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-white leading-tight">
              {h1}
            </h1>
            <p className="text-white/80 text-sm sm:text-base mt-2 max-w-xl">
              ASE-Certified Mechanics · Tesla, European, Asian & Domestic Specialists
            </p>
          </div>
        </div>

        {/* NAP Bar */}
        <div className="bg-secondary border-t border-border">
          <div className="max-w-5xl mx-auto px-4 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-0 sm:divide-x sm:divide-border">
            {/* Address */}
            <a
              href={loc.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDirections(cityKey, 'hub')}
              className="flex items-start gap-3 px-4 hover:text-primary transition-colors group"
            >
              <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-display font-bold text-sm tracking-wider text-secondary-foreground group-hover:text-primary transition-colors">
                  {loc.address}
                </div>
                <div className="text-xs text-muted-foreground">{loc.city}</div>
                <div className="text-xs text-primary font-medium mt-0.5 flex items-center gap-1">
                  Get Directions <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </a>

            {/* Phone */}
            <a
              href={`tel:${loc.phoneRaw}`}
              onClick={() => trackCall(cityKey, loc.phone, 'hub_nap')}
              className="flex items-start gap-3 px-4 hover:text-primary transition-colors group"
            >
              <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-display font-bold text-sm tracking-wider text-secondary-foreground group-hover:text-primary transition-colors">
                  {loc.phone}
                </div>
                <div className="text-xs text-muted-foreground">Call or Text</div>
              </div>
            </a>

            {/* Hours */}
            <div className="flex items-start gap-3 px-4">
              <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-display font-bold text-sm tracking-wider text-secondary-foreground">
                  Mon – Fri: 8:00 AM – 5:00 PM
                </div>
                <div className="text-xs text-muted-foreground">Sat – Sun: Closed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORK WE DO DROPDOWN + SERVICE TILES ── */}
      <section className="py-12 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-1 w-8 bg-primary" />
                <span className="font-display font-bold text-xs tracking-widest text-primary uppercase">
                  Services
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
                EVERYTHING WE DO
              </h2>
            </div>

            {/* Work We Do dropdown */}
            <div className="relative">
              <button
                onClick={() => setWorkWeDoOpen(!workWeDoOpen)}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-display font-bold text-sm tracking-wider hover:bg-primary/90 transition-colors"
              >
                WORK WE DO
                <ChevronDown className={`w-4 h-4 transition-transform ${workWeDoOpen ? "rotate-180" : ""}`} />
              </button>

              {workWeDoOpen && (
                <div className="absolute right-0 top-full mt-1 bg-secondary border border-border shadow-2xl z-50 min-w-[260px]">
                  {ALL_SERVICES.map((svc) => (
                    <Link
                      key={svc.slug}
                      href={`${cityPrefix}/${svc.slug}`}
                      onClick={() => setWorkWeDoOpen(false)}
                      className="block px-4 py-2.5 text-sm font-medium text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors border-b border-border/30 last:border-0"
                    >
                      {svc.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Service tiles — homepage glass card style, mobile compact */}
          {/* Mobile: 3-col compact glass tiles */}
          <div className="grid grid-cols-3 gap-2 sm:hidden">
            {ALL_SERVICES.map((svc) => (
              <Link
                key={svc.slug}
                href={`${cityPrefix}/${svc.slug}`}
                className="glass-compact flex flex-col items-center justify-center text-center p-2.5 border border-transparent hover:border-primary group cursor-pointer h-[88px] transition-all duration-300"
              >
                <div className="w-7 h-7 mb-1.5 flex-shrink-0 glass-icon group-hover:[&_svg]:text-primary transition-colors duration-300">
                  <ServiceIcon name={svc.icon} />
                </div>
                <span className="text-[10px] font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">{svc.shortTitle}</span>
              </Link>
            ))}
          </div>

          {/* Desktop: glass cards with icon */}
          <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {ALL_SERVICES.map((svc) => (
              <div key={svc.slug} className="glass-wrap h-full">
                <Card
                  onClick={() => { window.location.href = `${cityPrefix}/${svc.slug}`; }}
                  className="glass-card p-5 group cursor-pointer h-full flex flex-col items-center justify-center text-center border border-transparent hover:border-primary transition-all duration-300"
                >
                  <div className="w-10 h-10 mb-3 glass-icon group-hover:[&_svg]:text-primary transition-colors duration-300">
                    <ServiceIcon name={svc.icon} />
                  </div>
                  <h3 className="text-sm font-bold group-hover:text-primary transition-colors leading-tight relative z-[2]">{svc.shortTitle}</h3>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT THIS LOCATION ── */}
      <section className="py-12 bg-muted/40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-8 bg-primary" />
            <span className="font-display font-bold text-xs tracking-widest text-primary uppercase">
              About This Location
            </span>
          </div>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
            {aboutParagraph}
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap gap-3">
            {["ASE Certified", "36-Month Warranty", "All Makes & Models", "EV Specialists", "Free Inspection"].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-1.5 bg-secondary text-secondary-foreground text-xs font-display font-bold tracking-wider px-3 py-1.5 border border-border"
              >
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOOGLE MAP ── */}
      <section className="py-12 bg-background">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-1 w-8 bg-primary" />
            <span className="font-display font-bold text-xs tracking-widest text-primary uppercase">
              Find Us
            </span>
          </div>
          <div className="h-80 sm:h-96 border border-border overflow-hidden">
            <LazyMap
              initialCenter={{ lat: loc.lat, lng: loc.lng }}
              initialZoom={15}
              locationName={`Vertical Automotive — ${loc.name}`}
              address={loc.fullAddress}
              className="w-full h-full"
              onMapReady={(map) => {
                const position = { lat: loc.lat, lng: loc.lng };
                // Add a prominent marker for the shop
                const marker = new window.google!.maps.marker.AdvancedMarkerElement({
                  map,
                  position,
                  title: `Vertical Automotive — ${loc.name}`,
                });
                // Open an info window showing the shop name + address
                const infoWindow = new window.google!.maps.InfoWindow({
                  content: `<div style="font-family:sans-serif;padding:4px 2px;">
                    <strong style="font-size:13px;">Vertical Automotive</strong><br/>
                    <span style="font-size:12px;color:#555;">${loc.fullAddress}</span><br/>
                    <a href="${loc.directionsUrl}" target="_blank" style="font-size:12px;color:#1a73e8;">Get Directions</a>
                  </div>`,
                });
                infoWindow.open({ anchor: marker, map });
              }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-3">
            <a
              href={loc.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDirections(cityKey, 'hub')}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-display font-bold text-sm tracking-wider hover:bg-primary/90 transition-colors"
            >
              <MapPin className="w-4 h-4" />
              GET DIRECTIONS
            </a>
            <a
              href={COMPANY.appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSchedule(`hub_${cityKey}`)}
              className="flex items-center gap-2 px-5 py-2.5 border-2 border-primary text-primary font-display font-bold text-sm tracking-wider hover:bg-primary hover:text-white transition-all"
            >
              <Calendar className="w-4 h-4" />
              SCHEDULE APPOINTMENT
            </a>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      {/* ── REVIEWS ── — matches homepage review style */}
      <section className="py-10 sm:py-20 bg-muted">
        <div className="max-w-5xl mx-auto px-4">
          {/* Header — same as homepage */}
          <div className="text-center mb-6 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
              CUSTOMER <span className="text-primary">REVIEWS</span>
            </h2>
            <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-3 sm:mb-4" />
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="text-2xl sm:text-3xl font-black mono-number">4.9</span>
            </div>
            <p className="text-sm sm:text-lg text-muted-foreground">
              Based on <span className="font-bold text-foreground">503 Google Reviews</span>
            </p>
          </div>

          {/* Review card component */}
          {(() => {
            const ReviewCard = ({ review }: { review: typeof reviews[0] }) => (
              <Card className="p-4 sm:p-6 bg-card border-2 border-border hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-4 sm:line-clamp-none">
                  "{review.text}"
                </p>
                <div className="border-t border-border pt-2 sm:pt-4 flex items-center justify-between">
                  <p className="font-bold text-xs sm:text-sm">{review.name}</p>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{review.date}</span>
                </div>
              </Card>
            );

            return (
              <>
                {/* Mobile: collapsible */}
                <div className="sm:hidden mb-6">
                  <button
                    onClick={() => setReviewsExpanded(!reviewsExpanded)}
                    className="w-full py-3.5 bg-card border-2 border-primary/30 text-foreground font-bold text-sm flex items-center justify-between px-4 hover:bg-primary/5 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      Read Customer Reviews
                    </span>
                    <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-300 ${reviewsExpanded ? "rotate-180" : ""}`} />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: reviewsExpanded ? "3000px" : "0px", opacity: reviewsExpanded ? 1 : 0 }}
                  >
                    <div className="space-y-3 pt-3">
                      {reviews.map((review, i) => <ReviewCard key={i} review={review} />)}
                    </div>
                  </div>
                </div>

                {/* Desktop: 3-col grid */}
                <div className="hidden sm:grid sm:grid-cols-3 gap-6 mb-12">
                  {reviews.map((review, i) => <ReviewCard key={i} review={review} />)}
                </div>
              </>
            );
          })()}

          {/* CTA to Google Reviews */}
          <div className="text-center">
            <a
              href="https://maps.app.goo.gl/FeCVCCDNZMjGieMEA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                SEE ALL 503 REVIEWS ON GOOGLE
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="py-10 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-display font-black text-xl sm:text-2xl tracking-tight">
              Ready to Book Your Service?
            </div>
            <div className="text-white/80 text-sm mt-1">
              36-Month / 36,000-Mile Warranty on All Repairs
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${loc.phoneRaw}`}
              onClick={() => trackCall(cityKey, loc.phone, `cta_${cityKey}`)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-primary font-display font-bold text-sm tracking-wider hover:bg-white/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              {loc.phone}
            </a>
            <a
              href={COMPANY.appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSchedule(`cta_${cityKey}`)}
              className="flex items-center gap-2 px-6 py-3 border-2 border-white text-white font-display font-bold text-sm tracking-wider hover:bg-white/10 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              SCHEDULE ONLINE
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
