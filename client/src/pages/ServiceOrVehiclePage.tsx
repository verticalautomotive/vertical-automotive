/**
 * ServiceOrVehiclePage — Router component that determines whether to show
 * a service detail page or a vehicle type page based on the slug
 * BILINGUAL: Checks both EN and ES data sets for slug matching
 */
import { SERVICES, VEHICLE_TYPES } from "@/lib/data";
import { SERVICES_ES, VEHICLE_TYPES_ES } from "@/lib/data-es";
import { useParams, useLocation } from "wouter";
import ServiceDetail from "./ServiceDetail";
import VehicleDetail from "./VehicleDetail";
import NotFound from "./NotFound";

export default function ServiceOrVehiclePage() {
  const { slug } = useParams<{ slug: string }>();
  const [location] = useLocation();
  const isSpanish = location.startsWith("/es");

  const vehicleData = isSpanish ? VEHICLE_TYPES_ES : VEHICLE_TYPES;
  const serviceData = isSpanish ? SERVICES_ES : SERVICES;

  // Check if it's a vehicle type page
  const isVehicle = vehicleData.some((v) => v.slug === slug);
  if (isVehicle) {
    return <VehicleDetail />;
  }

  // Check if it's a service page
  const isService = serviceData.some((s) => s.slug === slug);
  if (isService) {
    return <ServiceDetail />;
  }

  return <NotFound />;
}
