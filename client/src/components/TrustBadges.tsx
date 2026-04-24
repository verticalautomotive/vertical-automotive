/**
 * TrustBadges - "Trusted By South Florida Drivers" section
 * Clean layout: uniform-sized logos, full color, no text labels
 * - Hover scale effect for interactivity
 * - Responsive: 6 per row desktop, 4 tablet, 3 mobile
 * - No borders, no shadows on items — just logos floating on the background
 * - All logos served from permanent CloudFront CDN (no session-file URLs)
 */

import { useTranslation } from "@/hooks/useTranslation";

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB";

interface TrustBadge {
  logo: string;
  title: string;
  titleEs: string;
}

const TRUST_BADGES: TrustBadge[] = [
  {
    logo: `${CDN}/badge-bbb_7f1aa0e5.png`,
    title: "BBB Accredited",
    titleEs: "Acreditado por BBB",
  },
  {
    logo: `${CDN}/badge-carfax_cbce4da6.png`,
    title: "CARFAX Service Center",
    titleEs: "Centro de Servicio CARFAX",
  },
  {
    logo: `${CDN}/badge-broward_4d14f234.png`,
    title: "Broward County Licensed",
    titleEs: "Licencia del Condado Broward",
  },
  {
    logo: `${CDN}/badge-florida-consumer_52ccd024.png`,
    title: "Florida Consumer Services Registered",
    titleEs: "Registrado en Servicios al Consumidor de Florida",
  },
  {
    logo: `${CDN}/badge-repairpal_5e3fb627.png`,
    title: "RepairPal Certified",
    titleEs: "Certificado RepairPal",
  },
  {
    logo: `${CDN}/badge-amra_b47dad12.png`,
    title: "Automotive Maintenance & Repair Association",
    titleEs: "Asociación de Mantenimiento y Reparación Automotriz",
  },
  {
    logo: `${CDN}/badge-ase_33175494.png`,
    title: "ASE Certified Technicians",
    titleEs: "Técnicos Certificados ASE",
  },
  {
    logo: `${CDN}/badge-worldpac_68664b35.jpg`,
    title: "WorldPac Certified",
    titleEs: "Certificado WorldPac",
  },
  {
    logo: `${CDN}/badge-oreilly_6eb7e794.png`,
    title: "O'Reilly Certified",
    titleEs: "Certificado O'Reilly",
  },
  {
    logo: `${CDN}/silverrock_logo_dark_188b40cd.png`,
    title: "SilverRock Warranty",
    titleEs: "Garantía SilverRock",
  },
  {
    logo: `${CDN}/carmax_logo_0457b3ea.png`,
    title: "CarMax",
    titleEs: "CarMax",
  },
  {
    logo: `${CDN}/carshield_logo_e199d3fc.png`,
    title: "CarShield",
    titleEs: "CarShield",
  },
  {
    logo: `${CDN}/badge-google_8a3d07b6.png`,
    title: "Google Verified Business",
    titleEs: "Negocio Verificado por Google",
  },
  {
    logo: `${CDN}/badge-yelp_b933bac8.png`,
    title: "Yelp",
    titleEs: "Yelp",
  },
  {
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/cbe-certified-logo_b2b75fec.png",
    title: "Broward County CBE Certified",
    titleEs: "Certificado CBE del Condado Broward",
  },
];

export default function TrustBadges() {
  const { isSpanish } = useTranslation();

  return (
    <div className="mt-8 sm:mt-12">
      {/* Section Header */}
      <h3 className="text-lg sm:text-2xl font-black mb-2 sm:mb-3 tracking-tight">
        {isSpanish ? "CONFIANZA DE LOS CONDUCTORES DEL" : "TRUSTED BY SOUTH FLORIDA"}{" "}
        <span className="text-primary">{isSpanish ? "SUR DE FLORIDA" : "DRIVERS"}</span>
      </h3>
      <p className="text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-10 max-w-2xl leading-relaxed">
        {isSpanish
          ? "Certificaciones profesionales, alianzas de la industria y estándares reconocidos que respaldan nuestro compromiso con un servicio de calidad."
          : "Professional certifications, trusted industry partnerships, and recognized standards that support our commitment to quality service."}
      </p>

      {/* Logo Grid — uniform size, full color, no text labels */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-6 sm:gap-x-8 sm:gap-y-8">
        {TRUST_BADGES.map((badge, i) => (
          <div
            key={i}
            className="group flex items-center justify-center cursor-default"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110">
              <img
                src={badge.logo}
                alt={badge.title}
                loading="lazy"
                decoding="async"
                width={112}
                height={112}
                className="max-w-full max-h-full object-contain transition-all duration-300 opacity-90 group-hover:opacity-100"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
