/**
 * RelatedServices — keyword-rich internal links for SEO
 * Displays 3-5 related service links at the bottom of service pages
 */

import { Link } from "wouter";

export interface RelatedService {
  slug: string;
  label: string;
  keyword: string; // anchor text for SEO
}

interface RelatedServicesProps {
  services: RelatedService[];
  title?: string;
}

export function RelatedServices({ services, title = "Related Services" }: RelatedServicesProps) {
  if (!services || services.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-border">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-foreground">{title}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group p-4 border border-border rounded-lg hover:bg-accent hover:border-accent transition-colors"
            >
              <div className="text-sm text-muted-foreground mb-2">{service.label}</div>
              <div className="text-blue-600 group-hover:text-blue-700 font-medium underline">
                {service.keyword}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Predefined related service maps for each service page
export const RELATED_SERVICES: Record<string, RelatedService[]> = {
  "brake-system": [
    { slug: "steering-suspension", label: "Suspension & Steering", keyword: "Suspension Repair" },
    { slug: "alignment-tire-rotation-balancing", label: "Wheels & Alignment", keyword: "Wheel Alignment Service" },
    { slug: "complete-diagnostics", label: "Diagnostics", keyword: "Engine Diagnostics" },
    { slug: "oil-change-engine-service", label: "Engine Service", keyword: "Oil Change & Service" },
    { slug: "hybrids-ev", label: "EV & Hybrid", keyword: "Hybrid & EV Repair" },
  ],
  "a-c-maintenance-repair": [
    { slug: "complete-diagnostics", label: "Diagnostics", keyword: "Engine Diagnostics" },
    { slug: "oil-change-engine-service", label: "Engine Service", keyword: "Oil Change & Service" },
    { slug: "transmission", label: "Transmission", keyword: "Transmission Repair" },
    { slug: "steering-suspension", label: "Suspension & Steering", keyword: "Suspension Repair" },
    { slug: "hybrids-ev", label: "EV & Hybrid", keyword: "Hybrid & EV Repair" },
  ],
  "oil-change-engine-service": [
    { slug: "complete-diagnostics", label: "Diagnostics", keyword: "Engine Diagnostics" },
    { slug: "battery-cranking-charging-systems", label: "Battery Service", keyword: "Battery Replacement" },
    { slug: "transmission", label: "Transmission", keyword: "Transmission Repair" },
    { slug: "a-c-maintenance-repair", label: "A/C Service", keyword: "A/C Repair & Recharge" },
    { slug: "hybrids-ev", label: "EV & Hybrid", keyword: "Hybrid & EV Repair" },
  ],
  "transmission": [
    { slug: "complete-diagnostics", label: "Diagnostics", keyword: "Engine Diagnostics" },
    { slug: "oil-change-engine-service", label: "Engine Service", keyword: "Oil Change & Service" },
    { slug: "steering-suspension", label: "Suspension & Steering", keyword: "Suspension Repair" },
    { slug: "brake-system", label: "Brake Service", keyword: "Brake Repair" },
    { slug: "hybrids-ev", label: "EV & Hybrid", keyword: "Hybrid & EV Repair" },
  ],
  "alignment-tire-rotation-balancing": [
    { slug: "brake-system", label: "Brake Service", keyword: "Brake Repair" },
    { slug: "steering-suspension", label: "Suspension & Steering", keyword: "Suspension Repair" },
    { slug: "complete-diagnostics", label: "Diagnostics", keyword: "Engine Diagnostics" },
    { slug: "hybrids-ev", label: "EV & Hybrid", keyword: "Hybrid & EV Repair" },
  ],
  "steering-suspension": [
    { slug: "alignment-tire-rotation-balancing", label: "Wheels & Alignment", keyword: "Wheel Alignment Service" },
    { slug: "brake-system", label: "Brake Service", keyword: "Brake Repair" },
    { slug: "complete-diagnostics", label: "Diagnostics", keyword: "Engine Diagnostics" },
    { slug: "oil-change-engine-service", label: "Engine Service", keyword: "Oil Change & Service" },
    { slug: "hybrids-ev", label: "EV & Hybrid", keyword: "Hybrid & EV Repair" },
  ],
  "hybrids-ev": [
    { slug: "battery-cranking-charging-systems", label: "Battery Service", keyword: "Battery Replacement" },
    { slug: "complete-diagnostics", label: "Diagnostics", keyword: "Engine Diagnostics" },
    { slug: "oil-change-engine-service", label: "Engine Service", keyword: "Oil Change & Service" },
    { slug: "brake-system", label: "Brake Service", keyword: "Brake Repair" },
    { slug: "transmission", label: "Transmission", keyword: "Transmission Repair" },
  ],
  "battery-cranking-charging-systems": [
    { slug: "hybrids-ev", label: "EV & Hybrid", keyword: "Hybrid & EV Repair" },
    { slug: "complete-diagnostics", label: "Diagnostics", keyword: "Engine Diagnostics" },
    { slug: "oil-change-engine-service", label: "Engine Service", keyword: "Oil Change & Service" },
    { slug: "a-c-maintenance-repair", label: "A/C Service", keyword: "A/C Repair & Recharge" },
  ],
  "fleet-maintenance-repairs": [
    { slug: "oil-change-engine-service", label: "Engine Service", keyword: "Oil Change & Service" },
    { slug: "brake-system", label: "Brake Service", keyword: "Brake Repair" },
    { slug: "transmission", label: "Transmission", keyword: "Transmission Repair" },
    { slug: "complete-diagnostics", label: "Diagnostics", keyword: "Engine Diagnostics" },
    { slug: "steering-suspension", label: "Suspension & Steering", keyword: "Suspension Repair" },
  ],
  "complete-diagnostics": [
    { slug: "oil-change-engine-service", label: "Engine Service", keyword: "Oil Change & Service" },
    { slug: "brake-system", label: "Brake Service", keyword: "Brake Repair" },
    { slug: "transmission", label: "Transmission", keyword: "Transmission Repair" },
    { slug: "battery-cranking-charging-systems", label: "Battery Service", keyword: "Battery Replacement" },
    { slug: "hybrids-ev", label: "EV & Hybrid", keyword: "Hybrid & EV Repair" },
  ],
};
