/**
 * TrustBadges - "Trusted By South Florida Drivers" section
 * Clean layout: uniform-sized logos, full color, no text labels
 * - Hover scale effect for interactivity
 * - Responsive: 6 per row desktop, 4 tablet, 3 mobile
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
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/xuLZhqyDAMgWcsNF.png",
    title: "ASE Certified Technicians",
    titleEs: "Técnicos Certificados ASE",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/IKVoMygvrhSIXoXp.jpg",
    title: "WorldPac Certified",
    titleEs: "Certificado WorldPac",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/jrwmzleNlMSZGXES.png",
    title: "O'Reilly Certified",
    titleEs: "Certificado O'Reilly",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/VwcywqJYtGcGdhEZ.png",
    title: "Tesla Certified",
    titleEs: "Certificado Tesla",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/eeNYOroSGtgqCWGT.png",
    title: "Google Verified Business",
    titleEs: "Negocio Verificado por Google",
  },
  {
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/GZDTIzwLRCkRYAND.png",
    title: "Yelp",
    titleEs: "Yelp",
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
                className="max-w-full max-h-full object-contain transition-all duration-300 opacity-90 group-hover:opacity-100"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
