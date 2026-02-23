/**
 * ServiceOrVehiclePage — Router component that determines whether to show
 * a service detail page or a vehicle type page based on the slug
 */
import { SERVICES, VEHICLE_TYPES } from "@/lib/data";
import { useParams } from "wouter";
import ServiceDetail from "./ServiceDetail";
import VehicleDetail from "./VehicleDetail";
import NotFound from "./NotFound";

export default function ServiceOrVehiclePage() {
  const { slug } = useParams<{ slug: string }>();

  // Check if it's a vehicle type page
  const isVehicle = VEHICLE_TYPES.some((v) => v.slug === slug);
  if (isVehicle) {
    return <VehicleDetail />;
  }

  // Check if it's a service page
  const isService = SERVICES.some((s) => s.slug === slug);
  if (isService) {
    return <ServiceDetail />;
  }

  return <NotFound />;
}
