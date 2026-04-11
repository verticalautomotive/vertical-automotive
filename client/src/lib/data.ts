// ============================================================
// Vertical Automotive — Centralized Data
// All page content, services, offers, and contact info
// ============================================================

export const COMPANY = {
  name: "Vertical Automotive",
  tagline: "Total Auto Care - 3 Years Warranty!",
  testimonial: '"..Great service, great prices, great customer experience. 5 stars!"',
  founded: 1989,
  yearsExperience: 36,
  vehiclesRepaired: "54k",
  staff: 2,
  satisfaction: "99%",
  hours: "8:00 AM — 5:00 PM",
  closedDays: "SAT-SUN Closed",
  appointmentUrl: "https://schedule.kukui.com/?mg_permanent=true&cid=8f11f65e-faae-4fdd-9275-20daefd38e2b&merchant_id=41049&hl=en-US&gei=cI2TafOKM-PJwt0PyNG6QQ&rwg_token=AFd1xnEuArG_s518nC9zqHme02PTrt1Bh4eLxCPdzptPNdAHspxQPFRzmUn0StOuvZamtHD05WU3V_u7JwtkKRM4EhUsB67PDA%3D%3D",
  logoUrl: "/logo-vertical-automotive.svg",
};

export const LOCATIONS = [
  {
    name: "Wilton Manors",
    address: "1100 W Oakland Park Blvd Unit 5",
    city: "Wilton Manors, FL 33311",
    fullAddress: "1100 W Oakland Park Blvd Unit 5, Wilton Manors, FL 33311",
    phone: "(954) 565-1518",
    phoneRaw: "9545651518",
    lat: 26.165788050203393,
    lng: -80.15759747891684,
    directionsUrl: "https://maps.app.goo.gl/dyKs1o1YECYzbJFf6",
  },
  {
    name: "Fort Lauderdale",
    address: "707 NE 11th Street",
    city: "Fort Lauderdale, FL 33304",
    fullAddress: "707 NE 11th Street, Fort Lauderdale, FL 33304",
    phone: "(645) 216-2266",
    phoneRaw: "6452162266",
    lat: 26.139035077116752,
    lng: -80.13559753014344,
    directionsUrl: "https://maps.app.goo.gl/52SrqXcH6K65Nqn66",
  },
];

export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  content: {
    intro: string;
    whenNeeded: string;
    benefits: string;
  };
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "battery-cranking-charging-systems",
    title: "Battery, Cranking & Charging Systems",
    shortTitle: "Battery & Charging Systems",
    description: "Car won't start or losing charge? Our diagnostic-first approach pinpoints battery, alternator, and starter issues accurately — so you avoid replacing parts you don't need.",
    icon: "battery",
    content: {
      intro: "A dead battery or slow crank is one of the most common — and most frustrating — reasons drivers get stranded. At Vertical Automotive in Wilton Manors and Fort Lauderdale, we go beyond simply swapping batteries. Our ASE-certified technicians perform a complete electrical system evaluation, testing battery capacity, alternator output, starter draw, wiring integrity, and charging relay function using factory-level diagnostic equipment. Whether you drive a conventional vehicle, a hybrid, or a full EV, we identify the root cause before recommending any repair — saving you from unnecessary part replacements. All work is backed by our 36-month / 36,000-mile warranty.",
      whenNeeded: "Have your battery and charging system inspected at least once a year or every 12,000 miles. In South Florida's extreme heat, batteries degrade faster than average. Warning signs include slow engine cranking, dimming headlights, dashboard warning lights, or needing frequent jump-starts.",
      benefits: "Accurate diagnostics prevent unnecessary part replacements and reduce repair costs. A properly functioning charging system ensures reliable starts, protects sensitive electronics, and extends overall battery life — keeping you safe and avoiding roadside breakdowns.",
    },
  },
  {
    slug: "brake-system",
    title: "Brake Service",
    shortTitle: "Brakes & Rotors",
    description: "Hearing squealing, grinding, or feeling a soft pedal? Our certified technicians inspect, repair, and replace brake components with precision — backed by a 3-year warranty.",
    icon: "disc",
    content: {
      intro: "When your brakes feel off, every mile matters. Drivers in Wilton Manors and Fort Lauderdale trust Vertical Automotive for brake service because we combine thorough inspection with honest recommendations. Our technicians evaluate pads, rotors, calipers, brake lines, and fluid condition before recommending any work. We use professional-grade components and perform precision rotor resurfacing or replacement to restore confident stopping power. Whether it's a routine pad replacement or a complete brake system overhaul, every repair is backed by our 3-year parts and labor warranty. We also offer complimentary brake inspections — stop in anytime.",
      whenNeeded: "Have your brakes inspected every 6 months or 10,000–15,000 miles. Don't wait for warning signs — but if you hear squealing, grinding, or feel pulsation in the pedal, vibration while braking, or notice your vehicle pulling to one side, schedule an inspection immediately. Early detection prevents rotor damage and significantly reduces repair costs.",
      benefits: "Professional brake service restores safe stopping distances, eliminates noise and vibration, prevents rotor warping from worn pads, and gives you confidence in emergency braking situations. Our transparent inspection reports show you exactly what needs attention and what can wait.",
    },
  },
  {
    slug: "transmission",
    title: "Transmission",
    shortTitle: "Transmission",
    description: "Rough shifting, slipping gears, or delayed engagement? We diagnose transmission problems accurately and offer repairs from fluid service to complete rebuilds.",
    icon: "cog",
    content: {
      intro: "Transmission problems can escalate quickly — what starts as a slight hesitation can become a complete failure if left unaddressed. At Vertical Automotive, serving drivers across Wilton Manors and Fort Lauderdale, our technicians specialize in diagnosing the actual cause of transmission issues before recommending repairs. From fluid flushes and solenoid replacements to valve body work and full rebuilds, we handle automatic, manual, CVT, and dual-clutch systems for all makes and models. Our diagnostic-first approach means you get an accurate assessment, not a guess. All transmission work is guaranteed with our warranty.",
      whenNeeded: "Have your transmission fluid checked every 30,000 miles or if you notice rough shifting, slipping between gears, delayed engagement, unusual noises in neutral, or transmission fluid leaks. Catching issues early often means the difference between a minor repair and a full rebuild.",
      benefits: "Proper transmission care preserves smooth shifting, protects internal components from premature wear, maintains fuel efficiency, and avoids the high cost of emergency rebuilds. Our honest diagnostics ensure you only pay for what your vehicle actually needs.",
    },
  },
  {
    slug: "a-c-maintenance-repair",
    title: "A/C Maintenance & Repair",
    shortTitle: "A/C",
    description: "A/C blowing warm air or not cooling enough? In South Florida heat, a working A/C isn't optional. We diagnose and fix the issue — not just recharge the system.",
    icon: "snowflake",
    content: {
      intro: "In South Florida, a failing air conditioning system turns every drive into an uncomfortable experience. Drivers in Wilton Manors and Fort Lauderdale rely on Vertical Automotive because we diagnose A/C problems properly — not just recharge refrigerant and hope for the best. Our technicians test compressor function, check for leaks using electronic detection, inspect condenser and evaporator performance, and verify electrical controls before recommending any repair. Whether it's a refrigerant recharge, compressor replacement, or evaporator repair, we use quality components and restore full cooling performance.",
      whenNeeded: "Have your A/C system inspected every 12–18 months, ideally before summer. Warning signs include weak airflow, warm air from vents, unusual odors when the A/C runs, moisture on the windshield when using defrost, or clicking and grinding noises from the compressor.",
      benefits: "A properly functioning A/C system keeps you comfortable, prevents windshield fogging for safer visibility, and protects interior components from heat damage. Addressing small leaks early prevents compressor failure — one of the most expensive A/C repairs.",
    },
  },
  {
    slug: "oil-change-engine-service",
    title: "Oil Change & Engine Service",
    shortTitle: "Engine, Oil & Filters",
    description: "Overdue for an oil change or hearing engine noise? Regular oil and filter service is the single most effective way to extend your engine's life and prevent costly damage.",
    icon: "droplet",
    content: {
      intro: "Engine oil is your vehicle's lifeblood — skip changes too long and internal components wear faster, run hotter, and eventually fail. At Vertical Automotive in Wilton Manors and Fort Lauderdale, our ASE-certified technicians perform thorough oil and filter services for all makes and models, using the correct oil grade specified by your manufacturer. Beyond the oil change, we inspect belts, hoses, fluid levels, and engine components during every visit — catching small issues before they become expensive problems. We also perform spark plug replacement, fuel filter service, and complete engine diagnostics when needed.",
      whenNeeded: "Follow your manufacturer's recommended interval — typically every 3,000–7,500 miles depending on oil type and driving conditions. South Florida's stop-and-go traffic and heat put extra stress on engine oil. If your oil light is on, the oil appears dark and gritty, or you hear unusual engine noise, schedule service immediately.",
      benefits: "Consistent oil changes reduce engine friction, prevent sludge buildup, maintain fuel efficiency, and protect against premature wear. It's the most cost-effective maintenance you can do — and the easiest way to avoid a major engine repair bill.",
    },
  },
  {
    slug: "complete-diagnostics",
    title: "Complete Diagnostics",
    shortTitle: "Complete Diagnostic",
    description: "Check engine light on? Something feels wrong but you're not sure what? Our advanced diagnostics identify the real problem — so you fix the right thing the first time.",
    icon: "search",
    content: {
      intro: "When your check engine light comes on or your vehicle just doesn't feel right, guessing at the problem wastes time and money. Drivers in Wilton Manors and Fort Lauderdale choose Vertical Automotive for diagnostics because we use factory-level scan tools and decades of hands-on experience to pinpoint issues accurately. We read and interpret fault codes, perform live data analysis, test individual components, and trace electrical circuits to find the actual root cause — not just the symptom. Our diagnostic-first philosophy means you get a clear explanation of what's wrong and what it takes to fix it before any wrench turns.",
      whenNeeded: "Schedule a diagnostic evaluation if your check engine light is on, you notice decreased fuel efficiency, the engine runs rough or misfires, you experience unusual vibrations or noises, or your vehicle's performance has changed. Proactive diagnostics during routine maintenance can also catch developing issues before they cause breakdowns.",
      benefits: "Accurate diagnostics save money by identifying the real issue on the first visit. You avoid trial-and-error repairs, get transparent cost estimates, and make informed decisions about your vehicle. Our detailed diagnostic reports give you the knowledge to prioritize repairs based on urgency and budget.",
    },
  },
  {
    slug: "routine-preventive-maintenance",
    title: "Routine & Preventive Maintenance",
    shortTitle: "Routine Maintenance",
    description: "Want to avoid surprise breakdowns and expensive emergency repairs? Scheduled maintenance at the right intervals keeps your vehicle reliable, safe, and holding its value.",
    icon: "wrench",
    content: {
      intro: "The most expensive repair is the one that could have been prevented. At Vertical Automotive in Wilton Manors and Fort Lauderdale, we follow manufacturer-specified maintenance schedules at 15k, 30k, 45k, 60k, and 90k mile intervals to keep your vehicle performing at its best. Our ASE-certified technicians inspect, service, and replace components before they fail — covering fluid changes, filter replacements, belt and hose inspections, brake checks, and more. Every service is performed in-house with quality parts and documented for your records. We treat preventive maintenance as an investment in your vehicle's longevity, not just a checklist.",
      whenNeeded: "Follow your manufacturer's recommended schedule — typically every 5,000–12,000 miles or every 6 months, whichever comes first. South Florida's heat, humidity, and stop-and-go traffic accelerate wear on fluids, belts, and cooling systems. If it's been a while since your last service or you're approaching a mileage milestone, schedule an appointment.",
      benefits: "Consistent preventive maintenance avoids costly emergency repairs, maintains fuel efficiency, preserves your vehicle's resale value, and keeps your warranty intact. Our 36+ years of experience means we know what to look for at every interval — catching problems while they're still small and affordable to fix.",
    },
  },
  {
    slug: "steering-suspension",
    title: "Steering & Suspension",
    shortTitle: "Steering & Suspension",
    description: "Vehicle pulling to one side, bouncing over bumps, or steering feels loose? Worn suspension components affect safety, tire wear, and ride comfort.",
    icon: "gauge",
    content: {
      intro: "If your vehicle wanders on the highway, bounces excessively over bumps, or the steering feels vague, your suspension or steering components likely need attention. At Vertical Automotive, serving Wilton Manors and Fort Lauderdale, we inspect and repair struts, shocks, tie rod ends, ball joints, control arms, sway bar links, and power steering systems for all makes and models. South Florida's road conditions — speed bumps, potholes, and construction zones — take a toll on these components. Our technicians identify exactly which parts are worn and replace only what's necessary, restoring safe handling and a comfortable ride.",
      whenNeeded: "Have your steering and suspension inspected if you notice the vehicle pulling to one side, uneven tire wear, excessive bouncing after hitting bumps, clunking or knocking noises over rough roads, difficulty steering, or a vibrating steering wheel. These symptoms indicate worn components that affect both safety and tire life.",
      benefits: "Properly maintained steering and suspension restore predictable handling, reduce tire wear, improve braking performance, and make every drive more comfortable. Addressing worn components early prevents cascading damage to other parts — saving you from larger repair bills down the road.",
    },
  },
  {
    slug: "fuel-system",
    title: "Fuel System",
    shortTitle: "Fuel Systems",
    description: "Poor gas mileage, rough idle, or hesitation when accelerating? Clogged injectors and worn fuel components rob your engine of power and efficiency.",
    icon: "fuel",
    content: {
      intro: "When your engine hesitates, idles rough, or your fuel economy drops noticeably, the fuel system is often the culprit. At Vertical Automotive in Wilton Manors and Fort Lauderdale, we perform complete fuel system diagnostics and service — including injector cleaning, fuel pump testing, filter replacement, and pressure regulation checks. Dirty injectors and clogged filters restrict fuel delivery, causing poor performance and wasted gas. Our technicians use professional-grade cleaning equipment and diagnostic tools to restore proper fuel flow and engine efficiency without unnecessary part replacements.",
      whenNeeded: "Have your fuel system serviced every 30,000 miles or sooner if you notice decreased fuel economy, difficulty starting, rough idling, engine hesitation during acceleration, or a strong fuel odor. South Florida's ethanol-blended fuels can accelerate deposit buildup in injectors and fuel lines.",
      benefits: "A clean, properly functioning fuel system restores lost horsepower, improves fuel economy, reduces emissions, and eliminates rough running conditions. Regular fuel system maintenance is one of the most cost-effective ways to keep your engine running efficiently for years.",
    },
  },
  {
    slug: "hybrids-ev",
    title: "Hybrids & EV",
    shortTitle: "Hybrid & EV",
    description: "Own a hybrid or electric vehicle? Finding a qualified technician matters. We specialize in EV diagnostics, battery health, and hybrid-specific maintenance.",
    icon: "zap",
    content: {
      intro: "Hybrid and electric vehicles require specialized knowledge that most general repair shops don't have. At Vertical Automotive in Wilton Manors and Fort Lauderdale, our technicians are trained in high-voltage safety protocols and EV-specific diagnostics. We service Tesla, Toyota, Honda, Ford, Hyundai, and all other hybrid and electric platforms — handling battery health assessments, regenerative braking service, inverter diagnostics, cooling system maintenance, and software-related troubleshooting. Whether your hybrid battery is underperforming or your EV needs routine maintenance, we provide accurate diagnostics and honest recommendations without the dealership markup.",
      whenNeeded: "Schedule hybrid or EV service if you notice reduced electric range, warning lights related to the hybrid system, unusual behavior during regenerative braking, decreased fuel economy on hybrids, or if you're approaching a manufacturer-recommended service interval. Even when everything seems fine, annual inspections help catch cooling system and battery degradation issues early.",
      benefits: "Specialized hybrid and EV maintenance preserves battery life, maintains electric range, ensures safe high-voltage system operation, and protects your investment in advanced vehicle technology. Our expertise means you get dealership-quality service with the personalized attention of a trusted local shop.",
    },
  },
  {
    slug: "alignment-tire-rotation-balancing",
    title: "Wheel Alignment, Tire Rotation & Balancing",
    shortTitle: "Wheel Alignment",
    description: "Tires wearing unevenly or vehicle pulling to one side? Proper alignment and rotation extend tire life and improve handling — we offer free alignment checks.",
    icon: "circle",
    content: {
      intro: "Misaligned wheels and unbalanced tires cost you money every mile you drive — through premature tire wear, reduced fuel efficiency, and compromised handling. At Vertical Automotive in Wilton Manors and Fort Lauderdale, we use precision alignment equipment to adjust camber, caster, and toe angles to manufacturer specifications. Combined with regular tire rotation and balancing, this service maximizes tire life and ensures your vehicle tracks straight and handles predictably. We offer complimentary alignment checks so you know exactly where you stand before committing to any service.",
      whenNeeded: "Have your alignment checked after hitting a pothole or curb, when installing new tires, if your vehicle pulls to one side, or if you notice uneven tread wear. Tire rotation should be done every 5,000–7,500 miles. Balancing is recommended with new tire installation or if you feel vibrations at highway speeds.",
      benefits: "Correct alignment and balanced tires extend tire life by thousands of miles, improve fuel economy, ensure safe and predictable handling, and provide a smoother, quieter ride. It's one of the simplest services that delivers measurable savings over time.",
    },
  },
  {
    slug: "tires",
    title: "Tires",
    shortTitle: "Tires",
    description: "Need new tires or a flat repair? We carry quality brands at competitive prices with professional installation, balancing, and TPMS service included.",
    icon: "circle",
    content: {
      intro: "Your tires are the only part of your vehicle that touches the road — their condition directly affects braking distance, handling, and safety. At Vertical Automotive in Wilton Manors and Fort Lauderdale, we offer complete tire services: new tire sales from trusted brands, professional mounting and balancing, flat repairs, TPMS sensor replacement, and expert recommendations based on your driving needs and budget. South Florida's heat accelerates tire aging, so we also inspect sidewall condition and tread depth during every service visit to help you stay ahead of potential blowouts.",
      whenNeeded: "Replace tires when tread depth reaches 2/32 of an inch, if you see sidewall cracking or bulging, after a puncture that can't be safely repaired, or if your tires are more than 6 years old regardless of tread depth. Schedule tire service if you notice vibrations, uneven wear, or frequent pressure loss.",
      benefits: "Quality tires with proper installation improve braking performance, wet-weather traction, fuel efficiency, and ride comfort. Professional mounting and balancing prevent vibrations and premature wear — and our competitive pricing means you don't have to sacrifice quality for value.",
    },
  },
  {
    slug: "powertrain-restoration",
    title: "Powertrain Restoration",
    shortTitle: "Powertrain Restoration",
    description: "High-mileage vehicle losing power or burning oil? A full powertrain restoration can bring your engine and transmission back to reliable performance — often for less than a new car.",
    icon: "cog",
    content: {
      intro: "When a vehicle you depend on starts losing power, burning oil, or developing persistent drivetrain issues, replacement isn't always the best answer. At Vertical Automotive in Wilton Manors and Fort Lauderdale, our ASE-certified technicians perform complete powertrain restorations — including engine rebuilds, transmission overhauls, and drivetrain component replacement. Using precision machining and quality parts, we restore your vehicle's powertrain to reliable, like-new performance. For many drivers, powertrain restoration is the smartest financial decision: you keep a vehicle you know and trust while avoiding the cost and depreciation of buying new.",
      whenNeeded: "Consider powertrain restoration if your vehicle has high mileage with declining performance, excessive oil consumption, persistent engine or transmission problems, or if repair costs on individual components keep adding up. It's also ideal for vehicles with sentimental value or those that are mechanically sound everywhere except the drivetrain.",
      benefits: "A complete powertrain restoration extends your vehicle's life by years, restores original power and efficiency, eliminates recurring mechanical issues, and costs significantly less than purchasing a replacement vehicle. You get the reliability of a fresh drivetrain in a vehicle you already know and trust.",
    },
  },
  {
    slug: "fleet-maintenance-repairs",
    title: "Fleet Maintenance & Repairs",
    shortTitle: "Fleet Services",
    description: "Managing a fleet of vehicles for your business? Vertical Automotive offers dedicated fleet maintenance and repair programs with priority scheduling, volume pricing, and detailed service records to keep your vehicles on the road.",
    icon: "truck",
    content: {
      intro: "Keeping a fleet of vehicles running reliably is critical to your business operations — every vehicle down means lost revenue and disrupted schedules. At Vertical Automotive in Wilton Manors and Fort Lauderdale, we provide comprehensive fleet maintenance and repair services tailored to businesses of all sizes. Whether you manage delivery vans, service trucks, company cars, or a mixed fleet, our ASE-certified technicians deliver consistent, high-quality service with priority scheduling so your vehicles spend less time in the shop and more time working. We handle everything from routine oil changes and tire rotations to complex engine diagnostics, brake service, transmission repair, and A/C maintenance — all documented with detailed digital service records for your fleet management. Our fleet program includes volume pricing, dedicated account coordination, and flexible scheduling to minimize downtime. We service all makes and models, including Ford Transit, Chevrolet Express, Ram ProMaster, Toyota Tacoma, and more. Every repair is backed by our 36,000-mile / 36-month warranty.",
      whenNeeded: "Establish a fleet maintenance program before problems arise — proactive scheduling based on mileage intervals and manufacturer recommendations prevents costly breakdowns and extends vehicle life. Contact us if you manage 3 or more vehicles, if your current provider lacks consistency or detailed record-keeping, if fleet vehicles are experiencing recurring issues, or if you need priority turnaround times to keep operations running. We also assist businesses transitioning to hybrid or electric fleet vehicles with specialized EV maintenance support.",
      benefits: "A dedicated fleet maintenance program reduces unplanned breakdowns by up to 50%, extends vehicle lifespan, lowers total cost of ownership, and provides complete service documentation for tax and compliance purposes. Our priority scheduling and volume pricing help you budget predictably while keeping every vehicle in your fleet safe, reliable, and road-ready. Businesses across Broward County trust Vertical Automotive to keep their fleets performing at their best.",
    },
  },
  {
    slug: "manufacturer-recommended-services",
    title: "Manufacturer Recommended Services",
    shortTitle: "Manufacturer Recommended Services",
    description: "Want to keep your warranty valid and your vehicle running like new? We follow your manufacturer's exact maintenance schedule using OEM-quality parts.",
    icon: "wrench",
    content: {
      intro: "Your vehicle's manufacturer designed a specific maintenance schedule for a reason — skipping or delaying these services leads to premature wear, reduced performance, and potentially voided warranty coverage. At Vertical Automotive in Wilton Manors and Fort Lauderdale, we perform every manufacturer-recommended service at the correct interval using OEM or equivalent-quality parts. From timing belt replacements and coolant flushes to spark plug changes and multi-point inspections, our technicians know what each manufacturer requires at every mileage milestone. We document every service for your records, keeping your maintenance history complete and your warranty protected.",
      whenNeeded: "Follow the intervals in your owner's manual — typically at 15,000, 30,000, 45,000, 60,000, and 90,000 miles. Each milestone includes specific services beyond basic oil changes: fluid exchanges, filter replacements, belt and hose inspections, and component evaluations. If you're unsure what's due, bring your vehicle in and we'll check your service history.",
      benefits: "Following manufacturer schedules protects your warranty, maintains peak performance and fuel efficiency, prevents unexpected breakdowns, and preserves your vehicle's resale value. Our technicians ensure nothing gets missed — giving you confidence that your vehicle is maintained to the standard it was engineered for.",
    },
  },
  {
    slug: "car-wash",
    title: "Car Wash",
    shortTitle: "Car Wash",
    description: "South Florida sun, salt air, and road grime take a toll on your finish. Our professional wash and detail services protect your paint and preserve your vehicle's value.",
    icon: "droplet",
    content: {
      intro: "South Florida's combination of intense UV exposure, salt air, and frequent rain creates a harsh environment for your vehicle's exterior. At Vertical Automotive in Wilton Manors and Fort Lauderdale, our professional car wash and detailing services go beyond aesthetics — we protect your investment. From thorough exterior washes that remove contaminants before they damage your clear coat, to full interior and exterior details that restore your vehicle's showroom appearance, we use premium products safe for all paint finishes and interior materials.",
      whenNeeded: "Wash your vehicle every two weeks to prevent buildup of bird droppings, tree sap, bug residue, and road film that can etch into your paint. Full detailing every 3–6 months provides deeper protection with wax or sealant application. After beach trips or heavy rain, a wash helps remove salt and mineral deposits that accelerate corrosion.",
      benefits: "Regular washing and detailing preserves your paint, prevents rust and corrosion, protects interior surfaces from UV fading and cracking, improves visibility through clean glass, and maintains your vehicle's resale value. A well-maintained appearance also reflects the overall care you put into your vehicle.",
    },
  },
];

export interface VehicleType {
  slug: string;
  title: string;
  image: string;
  gallery?: string[];
  description: string;
  services: string[];
}

export const VEHICLE_TYPES: VehicleType[] = [
  {
    slug: "tesla-vehicles-service",
    title: "TESLA & EV",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-diagnostics_7906cd95.webp",
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-diagnostics_7906cd95.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-frunk-open_3696ade7.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-gears_c5769e70.png",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-battery-fuse_8c80d49f.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-hv-battery_19dac181.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-service-mode_ca070e93.webp",
    ],
    description: "Looking for a qualified Tesla or electric vehicle specialist in Fort Lauderdale or Wilton Manors? Most general repair shops lack the training, tooling, and high-voltage safety protocols required to properly service EVs — leading to misdiagnoses, unnecessary part replacements, and safety risks. Vertical Automotive provides certified Tesla and EV repair with factory-grade diagnostic equipment, genuine or OEM-equivalent components, and technicians trained specifically in electric drivetrains, battery management systems, and regenerative braking. Whether your Tesla needs a battery health evaluation, suspension calibration, A/C service, or a full diagnostic scan, our team delivers dealership-level precision at independent shop value. We service all Tesla models — Model S, Model 3, Model X, and Model Y — as well as other electric and plug-in hybrid vehicles. Every repair is backed by our 36,000-mile/36-month warranty. If you need expert EV care without the dealership wait times or pricing, Vertical Automotive is the trusted choice for drivers across South Florida.",
    services: ["battery-cranking-charging-systems", "brake-system", "routine-preventive-maintenance", "complete-diagnostics", "a-c-maintenance-repair", "steering-suspension"],
  },
  {
    slug: "asian-vehicles-service",
    title: "ASIAN",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/asian-acura-nsx-shop_bcf4008e.webp",
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/asian-acura-nsx-shop_bcf4008e.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/asian-acura-nsx-lift_4f2edb68.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/asian-lexus-hood-open_9ea6e232.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/asian-lexus-sc-convertible_4e06b62a.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/asian-toyota-tacoma-alignment_8b858d66.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/asian-lexus-is-dyno_33f4b770.webp",
    ],
    description: "Searching for a mechanic who truly understands Japanese and Korean vehicles in Fort Lauderdale or Wilton Manors? Asian-engineered cars like Toyota, Honda, Nissan, Subaru, Hyundai, Kia, Lexus, Acura, Infiniti, and Genesis are built with precision — and they deserve service that matches. Many shops apply generic repair approaches that miss the specific engineering tolerances and maintenance intervals these vehicles require. Vertical Automotive specializes in Asian vehicle diagnostics, repair, and preventive maintenance using advanced scan tools calibrated for Japanese and Korean systems, along with OEM or high-quality aftermarket parts designed for your exact model. From hybrid powertrain service on a Toyota Prius to timing chain replacement on a Hyundai Tucson, our ASE-certified technicians handle everything from routine oil changes to complex engine and transmission work. Every repair is backed by our 36,000-mile/36-month warranty. If your Asian vehicle needs expert attention from a team that understands its engineering, Vertical Automotive delivers the specialized care drivers across South Florida depend on.",
    services: ["battery-cranking-charging-systems", "brake-system", "oil-change-engine-service", "complete-diagnostics", "hybrids-ev", "routine-preventive-maintenance", "steering-suspension", "fuel-system", "transmission", "a-c-maintenance-repair"],
  },
  {
    slug: "european-vehicles-service",
    title: "EUROPEAN",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/euro-porsche-911_1b816237.webp",
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/euro-porsche-911_1b816237.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/euro-range-rover_05d0f6a6.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/euro-bmw-m2_ad657da1.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/euro-porsche-cayenne_3689fe50.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/euro-maserati_1e019840.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/euro-porsche-panamera_1282f008.webp",
    ],
    description: "Need a European car specialist in Fort Lauderdale or Wilton Manors who won't charge dealership prices? European vehicles from BMW, Mercedes-Benz, Audi, Porsche, Volkswagen, Volvo, Land Rover, Jaguar, and Mini Cooper are engineered with advanced systems that require specialized knowledge, factory-level diagnostic software, and precise calibration. General repair shops often lack the tools and training to properly service these vehicles, leading to recurring issues and costly repeat visits. Vertical Automotive provides expert European vehicle repair and maintenance using manufacturer-specific diagnostic equipment, genuine or OEM-equivalent parts, and technicians with deep experience in German, British, and Scandinavian automotive engineering. Whether your BMW needs a valve cover gasket replacement, your Audi requires DSG transmission service, or your Land Rover has an air suspension fault, our team diagnoses accurately and repairs correctly the first time. All work is backed by our 36,000-mile/36-month warranty. For European vehicle owners who want dealership-quality results with personalized service and transparent pricing, Vertical Automotive is the trusted local expert.",
    services: ["battery-cranking-charging-systems", "brake-system", "oil-change-engine-service", "complete-diagnostics", "hybrids-ev", "routine-preventive-maintenance", "steering-suspension", "fuel-system", "transmission", "a-c-maintenance-repair"],
  },
  {
    slug: "domestic-vehicles-service",
    title: "DOMESTIC",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/domestic-dodge-charger-black_f3986d96.webp",
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/domestic-dodge-charger-black_f3986d96.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/domestic-plymouth-fury_6eea5fa5.jpeg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/domestic-ford-raptor_f0115281.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/domestic-dodge-challenger-green_02019df5.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/domestic-plymouth-barracuda-purple_302f3af9.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/domestic-challengers-lifts_b0804351.webp",
    ],
    description: "Looking for reliable repair and maintenance for your American-made vehicle in Fort Lauderdale or Wilton Manors? Whether you drive a Ford F-150, Chevrolet Silverado, Jeep Wrangler, Dodge Ram, GMC Sierra, Cadillac Escalade, Chrysler Pacifica, or Lincoln Navigator, Vertical Automotive provides the expert care your domestic vehicle needs to stay dependable for years. American trucks, SUVs, and sedans are built tough — but they still require proper maintenance intervals, quality parts, and accurate diagnostics to avoid premature wear and expensive breakdowns. Our ASE-certified technicians use advanced diagnostic tools alongside high-quality OEM or aftermarket components to handle everything from routine oil changes and brake service to complex engine diagnostics, transmission repair, and electrical system troubleshooting. We understand the specific needs of domestic platforms, including EcoBoost engines, Hemi powertrains, and GM direct injection systems. Every repair is backed by our 36,000-mile/36-month warranty. For American vehicle owners who want honest service, professional results, and long-term reliability, Vertical Automotive is the local shop drivers across South Florida trust.",
    services: ["battery-cranking-charging-systems", "brake-system", "oil-change-engine-service", "complete-diagnostics", "hybrids-ev", "routine-preventive-maintenance", "steering-suspension", "fuel-system", "transmission", "a-c-maintenance-repair"],
  },
];

export interface Offer {
  title: string;
  value: string;
  description: string;
  badge: string;
}

export const OFFERS: Offer[] = [
  {
    title: "Every 3rd Oil Change",
    value: "FREE",
    description: "based on number of visits",
    badge: "LOYALTY",
  },
  {
    title: "A/C Vent & Duct Disinfecting",
    value: "FREE",
    description: "available per request with any $399+ service",
    badge: "SERVICE",
  },
  {
    title: "ELEVATE Basic Maintenance",
    value: "FREE",
    description: "included with every service",
    badge: "INCLUDED",
  },
  {
    title: "Wiper Blades",
    value: "ON US",
    description: "any $399+ service",
    badge: "BONUS",
  },
  {
    title: "$25 OFF Synthetic Oil Change",
    value: "$25 OFF",
    description: "Full Synth Oil + Filter + Digital Vehicle Inspection (first visit only)",
    badge: "FIRST VISIT",
  },
  {
    title: "Uber/Lyft Comp Ride",
    value: "INCLUDED",
    description: "with $500+ service",
    badge: "CONVENIENCE",
  },
  {
    title: "FREE Brake Inspection",
    value: "FREE",
    description: "Inspect your brakes and have peace of mind navigating busy roads!",
    badge: "SAFETY",
  },
  {
    title: "FREE 2nd Opinion",
    value: "FREE",
    description: "Received too high estimate? We will inspect and provide a second opinion for FREE!",
    badge: "VALUE",
  },
  {
    title: "Tires Discounts",
    value: "up to $100 OFF",
    description: "On Set of 4 selected tires at the time of purchase",
    badge: "TIRES",
  },
  {
    title: "FREE Alignment Check",
    value: "FREE",
    description: "Check your Alignment for FREE",
    badge: "CHECK",
  },
];

export const COUPONS = [
  {
    title: "Wiper Blades",
    description: "with any $399+ service\n\ncoupons do not combine, first visit only",
    expiry: "No expiration",
  },
  {
    title: "10% OFF First Visit",
    description: "First visit 10% off labor only\n\ncoupons do not combine",
    expiry: "No expiration",
  },
  {
    title: "$25 OFF",
    description: "Full Synthetic Oil + Filter + Digital Vehicle Inspection (first visit only)",
    expiry: "No expiration",
  },
  {
    title: "$385 Brake Pads and Rotors!",
    description: "Brake Pads and Rotors! *per axle, some makes and models may not qualify, first visit",
    expiry: "No expiration",
  },
  {
    title: "AC Vent & Duct Disinfecting",
    description: "Available per request with any $100+ service\n\ncoupons do not combine",
    expiry: "No expiration",
  },
  {
    title: "Uber / Lyft Rides",
    description: "available with $500+ service",
    expiry: "No expiration",
  },
  {
    title: "FREE Brake Inspection",
    description: "Inspect your brakes and have peace of mind navigating busy roads!",
    expiry: "No expiration",
  },
  {
    title: "FREE 2nd Opinion",
    description: "Received too high estimate, we will inspect and provide a second opinion for FREE!",
    expiry: "No expiration",
  },
  {
    title: "Up To $100 OFF",
    description: "On Set of 4 selected tires at the time of purchase and availability",
    expiry: "No expiration",
  },
  {
    title: "FREE Alignment Check",
    description: "Check your Alignment for FREE",
    expiry: "No expiration",
  },
];

export const ABOUT_CONTENT = {
  intro: "Founded and built from the ground up in 1989. As a local family-owned and operated business that has been servicing the area for more than 30 years. We are truly a family-owned business and treat you like family. We are looking forward to working with You!",
  reputation: "Outstanding Reputation. Our outstanding reputation is backed by years of excellent service and satisfied customers. Follow us to see our stellar Google ratings and reviews!",
  community: 'Active Participants & Donors in the Community. We have participated in the "Making Strides Against Breast Cancer® walk" since 2005 and sponsor our daughters dance team at DANL Dance Center, since 2003. The VERTICAL AUTOMOTIVE is also a member of the Southeast Florida Chamber of Commerce and a proud sponsor of the Gold Coast Derby Girls.',
  whyChooseUs: [
    {
      title: "HONEST WORK, FAIR PRICES",
      description: "Offering the best in customer service, when you come into our facility, you aren't treated like any other customer, but rather our ONLY customer.",
    },
    {
      title: "AFFORDABLE PRICES",
      description: "We value the service we provide and our loyal returning customers can always expect some appreciation from us, like a future service discount or some other loyalty perks.",
    },
    {
      title: "TOP CUSTOMER SERVICE",
      description: "VERTICAL AUTOMOTIVE saves over $5k monthly to our customers over dealer proposed repairs. Your car is ready at the time promised. We want everyone who walks in the door to feel completely comfortable.",
    },
    {
      title: "ESTABLISHED in 1989",
      description: "Offering the best in customer service, when you come into our facility, you aren't treated like any other customer, but rather our ONLY customer.",
    },
  ],
  certificationText: "Our ASE-certified MASTER technicians feature complete repairs on all makes and models of cars and trucks.",
};

export const SERVICES_PAGE_EXTRA = {
  subtitle: "Schedule your appointment — same-day service available",
  heading: "EXPERT SERVICE FOR ASIAN, AMERICAN & EUROPEAN VEHICLES",
  bottomSection: {
    title: "Complete Automotive Services",
    description: "From routine oil changes to complex engine diagnostics, Vertical Automotive provides professional repair and maintenance for every system in your vehicle. Our ASE-certified technicians in Wilton Manors and Fort Lauderdale use factory-level tools and quality parts to deliver reliable results — backed by our 36,000-mile / 36-month warranty.",
    list: [
      "Complete Engine Diagnostics & Repair",
      "Preventive Maintenance & Scheduled Service",
      "Transmission Repair & Replacement",
      "Brake System Inspection & Repair",
      "Fuel System Cleaning & Service",
      "A/C Diagnostics & Climate Control",
      "Exhaust System & Emissions",
      "Tire Sales, Repair & TPMS Service",
      "Cooling System Flush & Repair",
      "Hybrid & Electric Vehicle Service",
      "Electrical System Diagnostics",
      "Engine Tune-Up & Performance",
      "CV Axles & Drivetrain Repair",
      "Oil Change & Filter Service",
      "Computerized Diagnostic Scanning",
      "Steering & Suspension Repair",
      "Wheel Alignment & Balancing",
      "Fleet Maintenance & Repairs",
    ],
  },
};
