/**
 * TrustBadges - "Trusted By South Florida Drivers" section
 * Premium badge grid showcasing certifications and affiliations
 * - Uses actual official partner logos from CDN
 * - Grayscale-to-color hover effect for premium feel
 * - Responsive: 5 per row desktop, 3 tablet, 2 mobile
 * - Subtle shadows, rounded corners, premium spacing
 */

import { useTranslation } from "@/hooks/useTranslation";

interface TrustBadge {
  logo: string;
  title: string;
  titleEs: string;
  bgColor: string;
}

const TRUST_BADGES: TrustBadge[] = [
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/RwtwiJPyaggxkZKB.png",
    title: "BBB Accredited",
    titleEs: "Acreditado por BBB",
    bgColor: "#0066CC",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/PYRMyNCETckJRpjT.png",
    title: "CARFAX Service Center",
    titleEs: "Centro de Servicio CARFAX",
    bgColor: "#E31937",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/CySFqiXXczuUwvsM.png",
    title: "Broward County Licensed",
    titleEs: "Licencia del Condado Broward",
    bgColor: "#2E7D32",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/qrZiyfrQWmVUrtMl.png",
    title: "Florida Consumer Services Registered",
    titleEs: "Registrado en Servicios al Consumidor de Florida",
    bgColor: "#F57C00",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/rhAfJJITrrulswVk.png",
    title: "RepairPal Certified",
    titleEs: "Certificado RepairPal",
    bgColor: "#1565C0",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/LQoktEHmDDZQNMVV.png",
    title: "Automotive Maintenance & Repair Association",
    titleEs: "Asociación de Mantenimiento y Reparación Automotriz",
    bgColor: "#0D6E8A",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/ZcnQtbZIpdOCrwCT.png",
    title: "ASE Certified Technicians",
    titleEs: "Técnicos Certificados ASE",
    bgColor: "#0277BD",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/IKVoMygvrhSIXoXp.jpg",
    title: "WorldPac Tesla Certification",
    titleEs: "Certificación Tesla WorldPac",
    bgColor: "#E53935",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/jrwmzleNlMSZGXES.png",
    title: "O'Reilly Certified",
    titleEs: "Certificado O'Reilly",
    bgColor: "#2E7D32",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/IKVoMygvrhSIXoXp.jpg",
    title: "WorldPac Certified",
    titleEs: "Certificado WorldPac",
    bgColor: "#1565C0",
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
        {TRUST_BADGES.map((badge, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-xl border border-border/50 bg-white/[0.03] p-3 sm:p-4 text-center transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 cursor-default"
            style={{ backdropFilter: "blur(8px)" }}
          >
            {/* Subtle top-left sheen */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Logo container */}
            <div className="relative mx-auto mb-2 sm:mb-3 w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center bg-white/80 p-2 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
              <img
                src={badge.logo}
                alt={badge.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain transition-all duration-300 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
              />
              {/* Glow ring on hover */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `0 0 16px ${badge.bgColor}20, inset 0 0 8px ${badge.bgColor}10`,
                }}
              />
            </div>

            {/* Badge title */}
            <p className="text-[10px] sm:text-xs font-semibold leading-tight text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              {isSpanish ? badge.titleEs : badge.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
