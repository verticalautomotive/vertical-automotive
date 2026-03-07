/**
 * TrustBadges - "Trusted By South Florida Drivers" section
 * Clean layout: large logos with small text underneath, no card/tile containers
 * - Grayscale-to-color hover effect for premium feel
 * - Responsive: 5 per row desktop, 3 tablet, 2 mobile
 * - No borders, no shadows on items — just logos floating on the background
 */

import { useTranslation } from "@/hooks/useTranslation";

interface TrustBadge {
  logo: string;
  title: string;
  titleEs: string;
}

const TRUST_BADGES: TrustBadge[] = [
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/RwtwiJPyaggxkZKB.png",
    title: "BBB Accredited",
    titleEs: "Acreditado por BBB",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/PYRMyNCETckJRpjT.png",
    title: "CARFAX Service Center",
    titleEs: "Centro de Servicio CARFAX",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/CySFqiXXczuUwvsM.png",
    title: "Broward County Licensed",
    titleEs: "Licencia del Condado Broward",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/qrZiyfrQWmVUrtMl.png",
    title: "Florida Consumer Services Registered",
    titleEs: "Registrado en Servicios al Consumidor de Florida",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/rhAfJJITrrulswVk.png",
    title: "RepairPal Certified",
    titleEs: "Certificado RepairPal",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/LQoktEHmDDZQNMVV.png",
    title: "Automotive Maintenance & Repair Association",
    titleEs: "Asociación de Mantenimiento y Reparación Automotriz",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/ZcnQtbZIpdOCrwCT.png",
    title: "ASE Certified Technicians",
    titleEs: "Técnicos Certificados ASE",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/IKVoMygvrhSIXoXp.jpg",
    title: "WorldPac Tesla Certification",
    titleEs: "Certificación Tesla WorldPac",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/jrwmzleNlMSZGXES.png",
    title: "O'Reilly Certified",
    titleEs: "Certificado O'Reilly",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/IKVoMygvrhSIXoXp.jpg",
    title: "WorldPac Certified",
    titleEs: "Certificado WorldPac",
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

      {/* Logo Grid — no tiles, just large logos with small labels */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-8 sm:gap-x-8 sm:gap-y-10">
        {TRUST_BADGES.map((badge, i) => (
          <div
            key={i}
            className="group flex flex-col items-center text-center cursor-default"
          >
            {/* Large logo */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 flex items-center justify-center mb-2 sm:mb-3 transition-transform duration-300 ease-out group-hover:scale-110">
              <img
                src={badge.logo}
                alt={badge.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain transition-all duration-300 grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>

            {/* Small label */}
            <p className="text-[10px] sm:text-xs font-medium leading-tight text-muted-foreground/70 group-hover:text-foreground transition-colors duration-300 max-w-[120px]">
              {isSpanish ? badge.titleEs : badge.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
