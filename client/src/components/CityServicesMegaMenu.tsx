/**
 * CityServicesMegaMenu — Two-column mega menu for SERVICE dropdown
 * Shows Fort Lauderdale (left) and Wilton Manors (right) with all 16 services each
 * Mobile: stacks vertically
 */

import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";

const SERVICES_DATA = [
  { slug: "tesla-ev-repair", name: "Tesla & EV Repair", nameEs: "Reparación Tesla y Vehículos Eléctricos" },
  { slug: "european-vehicle-repair", name: "European Vehicle Service", nameEs: "Servicio de Vehículos Europeos" },
  { slug: "asian-vehicle-repair", name: "Asian Vehicle Service", nameEs: "Servicio de Vehículos Asiáticos" },
  { slug: "domestic-vehicle-repair", name: "Domestic Vehicle Service", nameEs: "Servicio de Vehículos Domésticos" },
  { slug: "brake-repair", name: "Brake & Rotor Service", nameEs: "Servicio de Frenos y Rotores" },
  { slug: "transmission-service", name: "Transmission Service", nameEs: "Servicio de Transmisión" },
  { slug: "ac-repair", name: "A/C Repair & Maintenance", nameEs: "Reparación y Mantenimiento de A/C" },
  { slug: "engine-oil-service", name: "Engine, Oil & Filters", nameEs: "Motor, Aceite y Filtros" },
  { slug: "complete-diagnostics", name: "Complete Diagnostics", nameEs: "Diagnóstico Completo" },
  { slug: "routine-maintenance", name: "Routine Maintenance", nameEs: "Mantenimiento Rutinario" },
  { slug: "steering-suspension", name: "Steering & Suspension", nameEs: "Dirección y Suspensión" },
  { slug: "fuel-system-service", name: "Fuel System Service", nameEs: "Servicio del Sistema de Combustible" },
  { slug: "hybrid-ev-service", name: "Hybrid & EV Service", nameEs: "Servicio Híbrido y Eléctrico" },
  { slug: "wheel-alignment", name: "Wheel Alignment", nameEs: "Alineación de Ruedas" },
  { slug: "battery-charging-systems", name: "Battery & Charging Systems", nameEs: "Batería y Sistemas de Carga" },
  { slug: "fleet-services", name: "Fleet Services", nameEs: "Servicios de Flota" },
];

interface CityServicesMegaMenuProps {
  onClose: () => void;
}

export default function CityServicesMegaMenu({ onClose }: CityServicesMegaMenuProps) {
  const { isSpanish } = useTranslation();

  const fortLauderdalePhone = "(645) 216-2266";
  const wiltonManorsPhone = "(954) 565-1518";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-6">
      {/* FORT LAUDERDALE COLUMN */}
      <div>
        <div className="mb-4">
          <h3 className="font-display font-bold text-sm tracking-wider uppercase text-primary mb-1">
            Fort Lauderdale
          </h3>
          <p className="text-xs text-secondary-foreground/70">{fortLauderdalePhone}</p>
        </div>
        <ul className="space-y-2">
          {SERVICES_DATA.map((service) => (
            <li key={`fl-${service.slug}`}>
              <Link
                href={`/fort-lauderdale/${service.slug}`}
                className="block text-sm text-secondary-foreground/80 hover:text-primary hover:bg-white/5 px-3 py-1.5 rounded transition-colors"
                onClick={onClose}
              >
                {isSpanish ? service.nameEs : service.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* WILTON MANORS COLUMN */}
      <div>
        <div className="mb-4">
          <h3 className="font-display font-bold text-sm tracking-wider uppercase text-primary mb-1">
            Wilton Manors
          </h3>
          <p className="text-xs text-secondary-foreground/70">{wiltonManorsPhone}</p>
        </div>
        <ul className="space-y-2">
          {SERVICES_DATA.map((service) => (
            <li key={`wm-${service.slug}`}>
              <Link
                href={`/wilton-manors/${service.slug}`}
                className="block text-sm text-secondary-foreground/80 hover:text-primary hover:bg-white/5 px-3 py-1.5 rounded transition-colors"
                onClick={onClose}
              >
                {isSpanish ? service.nameEs : service.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
