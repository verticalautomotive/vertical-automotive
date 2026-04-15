/**
 * CityServicesMegaMenu — Two-column mega menu for SERVICE dropdown
 * Desktop: Shows Fort Lauderdale (left) and Wilton Manors (right) with all 16 services each
 * Mobile: Two location buttons that expand as accordion dropdowns
 */

import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";

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
  { slug: "tire-service", name: "Tire Service & Replacement", nameEs: "Servicio y Reemplazo de Neumáticos" },
  { slug: "battery-charging-systems", name: "Battery & Charging Systems", nameEs: "Batería y Sistemas de Carga" },
  { slug: "fleet-services", name: "Fleet Services", nameEs: "Servicios de Flota" },
];

interface CityServicesMegaMenuProps {
  onClose: () => void;
}

interface LocationData {
  id: "fl" | "wm";
  city: string;
  cityEs: string;
  phone: string;
  slug: string;
}

const LOCATIONS: LocationData[] = [
  { id: "fl", city: "Fort Lauderdale", cityEs: "Fort Lauderdale", phone: "(645) 216-2266", slug: "fort-lauderdale" },
  { id: "wm", city: "Wilton Manors", cityEs: "Wilton Manors", phone: "(954) 565-1518", slug: "wilton-manors" },
];

export default function CityServicesMegaMenu({ onClose }: CityServicesMegaMenuProps) {
  const { isSpanish } = useTranslation();
  const [expandedLocation, setExpandedLocation] = useState<"fl" | "wm" | null>(null);

  const toggleLocation = (locationId: "fl" | "wm") => {
    setExpandedLocation(expandedLocation === locationId ? null : locationId);
  };

  return (
    <>
      {/* DESKTOP: Two-column grid */}
      <div className="hidden md:grid grid-cols-2 gap-6 md:gap-8 p-6">
        {LOCATIONS.map((location) => (
          <div key={location.id}>
            <div className="mb-4">
              <h3 className="font-display font-bold text-sm tracking-wider uppercase text-primary mb-1">
                {location.city}
              </h3>
              <p className="text-xs text-secondary-foreground/70">{location.phone}</p>
            </div>
            <ul className="space-y-2">
              {SERVICES_DATA.map((service) => (
                <li key={`${location.id}-${service.slug}`}>
                  <Link
                    href={`/${location.slug}/${service.slug}`}
                    className="block text-sm text-secondary-foreground/80 hover:text-primary hover:bg-white/5 px-3 py-1.5 rounded transition-colors"
                    onClick={onClose}
                  >
                    {isSpanish ? service.nameEs : service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* MOBILE: Accordion buttons */}
      <div className="md:hidden flex flex-col gap-3 p-4">
        {LOCATIONS.map((location) => (
          <div key={location.id}>
            {/* Location Button */}
            <button
              onClick={() => toggleLocation(location.id)}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-4 rounded-lg flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-3 text-left">
                <MapPin size={20} className="flex-shrink-0" />
                <div>
                  <div className="font-bold text-sm leading-tight">{location.city}</div>
                  <div className="text-xs opacity-90">{location.phone}</div>
                </div>
              </div>
              <ChevronDown
                size={20}
                className={`flex-shrink-0 transition-transform duration-300 ${
                  expandedLocation === location.id ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Accordion Services List */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedLocation === location.id ? "max-h-[800px]" : "max-h-0"
              }`}
            >
              <ul className="bg-secondary/50 border border-border rounded-b-lg space-y-0">
                {SERVICES_DATA.map((service, index) => (
                  <li
                    key={`${location.id}-${service.slug}`}
                    className={`border-t border-border/50 first:border-t-0 ${
                      index === SERVICES_DATA.length - 1 ? "" : ""
                    }`}
                  >
                    <Link
                      href={`/${location.slug}/${service.slug}`}
                      className="block text-sm text-secondary-foreground/80 hover:text-primary hover:bg-white/5 px-4 py-3 transition-colors"
                      onClick={() => {
                        setExpandedLocation(null);
                        onClose();
                      }}
                    >
                      {isSpanish ? service.nameEs : service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
