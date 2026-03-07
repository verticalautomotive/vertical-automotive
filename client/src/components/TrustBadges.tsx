/**
 * TrustBadges - "Trusted By South Florida Drivers" section
 * Premium badge grid showcasing certifications and affiliations
 * - Glassmorphism badge cards with grayscale-to-color hover
 * - Responsive: 5 per row desktop, 3 tablet, 2 mobile
 * - Subtle shadows, rounded corners, premium spacing
 */

import {
  Shield,
  Award,
  FileCheck,
  Building2,
  Wrench,
  Zap,
  BadgeCheck,
  CircleCheckBig,
  ShieldCheck,
  Car,
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface TrustBadge {
  icon: React.ElementType;
  title: string;
  titleEs: string;
  color: string;
  bgGradient: string;
}

const TRUST_BADGES: TrustBadge[] = [
  {
    icon: Shield,
    title: "BBB Accredited",
    titleEs: "Acreditado por BBB",
    color: "#0066CC",
    bgGradient: "from-blue-500/10 to-blue-600/5",
  },
  {
    icon: Car,
    title: "CARFAX Service Center",
    titleEs: "Centro de Servicio CARFAX",
    color: "#E31937",
    bgGradient: "from-red-500/10 to-red-600/5",
  },
  {
    icon: Building2,
    title: "Broward County Licensed",
    titleEs: "Licencia del Condado Broward",
    color: "#2E7D32",
    bgGradient: "from-green-500/10 to-green-600/5",
  },
  {
    icon: FileCheck,
    title: "Florida Consumer Services Registered",
    titleEs: "Registrado en Servicios al Consumidor de Florida",
    color: "#F57C00",
    bgGradient: "from-orange-500/10 to-orange-600/5",
  },
  {
    icon: Wrench,
    title: "RepairPal Certified",
    titleEs: "Certificado RepairPal",
    color: "#1565C0",
    bgGradient: "from-blue-500/10 to-blue-600/5",
  },
  {
    icon: Award,
    title: "Automotive Maintenance and Repair Association",
    titleEs: "Asociación de Mantenimiento y Reparación Automotriz",
    color: "#6A1B9A",
    bgGradient: "from-purple-500/10 to-purple-600/5",
  },
  {
    icon: BadgeCheck,
    title: "ASE Certified Technicians",
    titleEs: "Técnicos Certificados ASE",
    color: "#0277BD",
    bgGradient: "from-sky-500/10 to-sky-600/5",
  },
  {
    icon: Zap,
    title: "WorldPac Tesla Certification",
    titleEs: "Certificación Tesla WorldPac",
    color: "#E53935",
    bgGradient: "from-red-500/10 to-red-600/5",
  },
  {
    icon: CircleCheckBig,
    title: "O'Reilly Certified",
    titleEs: "Certificado O'Reilly",
    color: "#2E7D32",
    bgGradient: "from-green-500/10 to-green-600/5",
  },
  {
    icon: ShieldCheck,
    title: "WorldPac Certified",
    titleEs: "Certificado WorldPac",
    color: "#1565C0",
    bgGradient: "from-blue-500/10 to-blue-600/5",
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
      <p className="text-xs sm:text-sm text-muted-foreground mb-5 sm:mb-8 max-w-2xl leading-relaxed">
        {isSpanish
          ? "Certificaciones profesionales, alianzas de la industria y estándares reconocidos que respaldan nuestro compromiso con un servicio de calidad."
          : "Professional certifications, trusted industry partnerships, and recognized standards that support our commitment to quality service."}
      </p>

      {/* Badge Grid — 2 cols mobile, 3 tablet, 5 desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {TRUST_BADGES.map((badge, i) => {
          const Icon = badge.icon;
          return (
            <div
              key={i}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br p-3 sm:p-4 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 cursor-default"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
                backdropFilter: "blur(8px)",
              }}
            >
              {/* Subtle top-left sheen */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Icon container with glow on hover */}
              <div
                className="relative mx-auto mb-2 sm:mb-3 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `linear-gradient(135deg, ${badge.color}15, ${badge.color}08)`,
                  boxShadow: `0 2px 8px ${badge.color}10`,
                }}
              >
                <Icon
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 opacity-50 group-hover:opacity-100"
                  style={{ color: badge.color }}
                  strokeWidth={1.5}
                />
                {/* Glow ring on hover */}
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: `0 0 16px ${badge.color}20, inset 0 0 8px ${badge.color}10`,
                  }}
                />
              </div>

              {/* Badge title */}
              <p className="text-[10px] sm:text-xs font-semibold leading-tight text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {isSpanish ? badge.titleEs : badge.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
