/**
 * FAQ Data — Service-specific FAQs for structured data (JSON-LD FAQPage schema)
 * Each service has 4-5 questions targeting long-tail local SEO queries
 * Bilingual: English (default) + Spanish override in faq-data-es.ts
 */

export interface FAQItem {
  question: string;
  answer: string;
}

export const SERVICE_FAQS: Record<string, FAQItem[]> = {
  "battery-cranking-charging-systems": [
    {
      question: "How often should I replace my car battery in South Florida?",
      answer: "In South Florida's extreme heat, car batteries typically last 2–4 years compared to 4–6 years in cooler climates. We recommend having your battery tested annually at Vertical Automotive in Wilton Manors or Fort Lauderdale to catch degradation early and avoid unexpected breakdowns.",
    },
    {
      question: "What are the signs of a failing alternator?",
      answer: "Common signs include dimming headlights, a battery warning light on the dashboard, electrical accessories malfunctioning, whining or grinding noises from the engine, and frequent dead batteries. Our ASE-certified technicians use factory-level diagnostic tools to test alternator output and pinpoint the exact issue.",
    },
    {
      question: "How much does a car battery replacement cost in Fort Lauderdale?",
      answer: "Battery replacement costs vary depending on your vehicle make and model, typically ranging from $150–$350 including parts and labor. At Vertical Automotive, we test your entire charging system before recommending a replacement — so you only pay for what you actually need. All work is backed by our 3-year warranty.",
    },
    {
      question: "Can you test my car battery for free?",
      answer: "Yes. Vertical Automotive offers complimentary battery and charging system tests at both our Wilton Manors and Fort Lauderdale locations. We'll check battery capacity, alternator output, and starter draw — and give you an honest assessment with no obligation.",
    },
    {
      question: "Do you service hybrid and EV batteries?",
      answer: "Absolutely. Our technicians are trained and equipped to diagnose and service hybrid high-voltage batteries, EV battery management systems, and 12V auxiliary batteries across all major brands including Tesla, Toyota, Honda, and more.",
    },
  ],

  "brake-system": [
    {
      question: "How do I know when my brakes need to be replaced?",
      answer: "Warning signs include squealing or grinding noises, a soft or spongy brake pedal, vibration when braking, the vehicle pulling to one side, or a brake warning light on your dashboard. We offer free brake inspections at Vertical Automotive — stop by our Wilton Manors or Fort Lauderdale shop anytime.",
    },
    {
      question: "How much does a brake job cost in Fort Lauderdale?",
      answer: "A standard brake pad replacement typically costs $150–$350 per axle, while a full brake job including rotors ranges from $300–$600 per axle depending on your vehicle. At Vertical Automotive, we provide a transparent inspection report showing exactly what needs attention and what can wait — no upselling.",
    },
    {
      question: "How often should brake pads be replaced?",
      answer: "Brake pads generally last 30,000–70,000 miles depending on driving habits, vehicle weight, and pad material. In South Florida's stop-and-go traffic, pads may wear faster. We recommend inspections every 6 months or 10,000–15,000 miles to catch wear early and prevent rotor damage.",
    },
    {
      question: "Do you offer a warranty on brake repairs?",
      answer: "Yes. All brake repairs at Vertical Automotive are backed by our 3-year / 36,000-mile warranty covering both parts and labor. We use professional-grade components to ensure long-lasting performance and your complete confidence.",
    },
    {
      question: "Can you resurface my brake rotors instead of replacing them?",
      answer: "In many cases, yes. If your rotors are within minimum thickness specifications and not severely warped or cracked, we can precision-resurface them to restore a smooth braking surface. Our technicians will measure and advise you on the most cost-effective option.",
    },
  ],

  "transmission": [
    {
      question: "What are the signs of transmission problems?",
      answer: "Common warning signs include rough or delayed shifting, slipping between gears, grinding or shaking during gear changes, transmission fluid leaks (red or brown fluid), a burning smell, or the check engine light. If you notice any of these, schedule a diagnostic at Vertical Automotive before the issue escalates.",
    },
    {
      question: "How much does a transmission repair cost in Fort Lauderdale?",
      answer: "Transmission repair costs vary widely: a fluid service runs $150–$300, solenoid or sensor replacement $200–$600, and a full rebuild $2,000–$4,500 depending on the vehicle. Our diagnostic-first approach ensures an accurate assessment so you know exactly what's needed before any work begins.",
    },
    {
      question: "How often should I change my transmission fluid?",
      answer: "Most manufacturers recommend transmission fluid changes every 30,000–60,000 miles, though this varies by vehicle and driving conditions. In South Florida's heat, more frequent changes can extend transmission life. We check your fluid condition during every service visit.",
    },
    {
      question: "Do you work on CVT and dual-clutch transmissions?",
      answer: "Yes. Our technicians are experienced with all transmission types including conventional automatic, manual, CVT (continuously variable), and dual-clutch systems across all makes and models — domestic, Asian, and European vehicles.",
    },
    {
      question: "Is it worth rebuilding a transmission or should I replace it?",
      answer: "It depends on the vehicle's age, value, and the extent of damage. A rebuild is often more cost-effective and can restore like-new performance. At Vertical Automotive, we'll give you an honest comparison of rebuild vs. replacement costs so you can make the best decision for your situation.",
    },
  ],

  "a-c-maintenance-repair": [
    {
      question: "Why is my car A/C blowing warm air?",
      answer: "Common causes include low refrigerant from a leak, a failing compressor, a clogged expansion valve, a faulty condenser, or electrical issues. In South Florida's heat, A/C problems need immediate attention. At Vertical Automotive, we diagnose the root cause — not just recharge the system — to ensure a lasting fix.",
    },
    {
      question: "How much does car A/C repair cost in Fort Lauderdale?",
      answer: "A/C repair costs depend on the issue: a simple recharge runs $150–$250, leak repair $200–$600, and compressor replacement $500–$1,200. We provide a detailed diagnosis before any work so you understand exactly what's needed and the cost involved.",
    },
    {
      question: "How often should I service my car's A/C system?",
      answer: "We recommend an A/C performance check annually, especially before South Florida's summer months. Regular maintenance catches small leaks and component wear before they lead to complete system failure — keeping you cool and avoiding expensive emergency repairs.",
    },
    {
      question: "Can you fix A/C leaks in my car?",
      answer: "Yes. We use professional UV dye testing and electronic leak detection to locate even the smallest refrigerant leaks. Once found, we repair the source — whether it's a hose, O-ring, condenser, or evaporator — rather than just topping off refrigerant, which is a temporary fix.",
    },
    {
      question: "Does my car A/C use Freon or R-134a?",
      answer: "Most vehicles manufactured after 1994 use R-134a refrigerant, while newer models (2017+) may use R-1234yf. Vertical Automotive services all refrigerant types and has the proper equipment for each. We'll identify the correct type for your vehicle during diagnosis.",
    },
  ],

  "oil-change-engine-service": [
    {
      question: "How often do I need an oil change in South Florida?",
      answer: "For conventional oil, every 3,000–5,000 miles; for synthetic oil, every 5,000–10,000 miles. South Florida's heat accelerates oil breakdown, so staying on schedule is especially important here. At Vertical Automotive, we'll recommend the right interval based on your vehicle and driving habits.",
    },
    {
      question: "How much does an oil change cost in Fort Lauderdale?",
      answer: "A conventional oil change typically costs $35–$65, while a full synthetic oil change ranges from $65–$120 depending on your vehicle's requirements. Every oil change at Vertical Automotive includes a multi-point inspection, filter replacement, and fluid top-offs at no extra charge.",
    },
    {
      question: "What's the difference between synthetic and conventional oil?",
      answer: "Synthetic oil is engineered for better performance at extreme temperatures, provides superior engine protection, resists breakdown longer, and allows extended change intervals. It's especially beneficial in South Florida's heat. We recommend synthetic for most modern vehicles.",
    },
    {
      question: "What happens if I go too long without an oil change?",
      answer: "Neglecting oil changes leads to sludge buildup, increased engine wear, overheating, reduced fuel efficiency, and eventually catastrophic engine failure. Regular oil service is the single most cost-effective way to extend your engine's life and maintain performance.",
    },
  ],

  "complete-diagnostics": [
    {
      question: "What does a car diagnostic test check?",
      answer: "A comprehensive diagnostic at Vertical Automotive scans all vehicle computer systems — engine, transmission, ABS, airbag, emissions, and more — reading fault codes and live data to identify the root cause of warning lights, performance issues, or unusual symptoms. We use factory-level equipment for accurate results.",
    },
    {
      question: "How much does a car diagnostic cost in Fort Lauderdale?",
      answer: "Our complete diagnostic evaluation is competitively priced and thorough. Unlike quick code readers at parts stores, we analyze the full picture — fault codes, freeze frame data, live sensor readings, and system performance — to give you an accurate diagnosis, not just a code number.",
    },
    {
      question: "Should I get a diagnostic if my check engine light is on?",
      answer: "Yes, absolutely. A check engine light can indicate anything from a loose gas cap to a serious engine or emissions problem. Ignoring it can lead to more expensive repairs down the road. Our diagnostics identify the exact issue so you can address it before it worsens.",
    },
    {
      question: "How long does a car diagnostic take?",
      answer: "A standard diagnostic scan takes 30–60 minutes. More complex issues involving intermittent problems or multiple systems may require additional testing time. We'll keep you informed throughout the process and explain our findings in plain language.",
    },
  ],

  "routine-preventive-maintenance": [
    {
      question: "What does routine car maintenance include?",
      answer: "Routine maintenance at Vertical Automotive includes oil and filter changes, tire rotation, brake inspections, fluid checks and top-offs (coolant, transmission, brake, power steering), air filter replacement, battery testing, belt and hose inspection, and a comprehensive multi-point vehicle health check.",
    },
    {
      question: "How often should I bring my car in for maintenance?",
      answer: "Most vehicles benefit from a maintenance visit every 5,000–7,500 miles or every 6 months, whichever comes first. In South Florida's harsh conditions — heat, humidity, salt air — staying on schedule is especially important to prevent accelerated wear and costly breakdowns.",
    },
    {
      question: "Is preventive maintenance worth the cost?",
      answer: "Absolutely. Regular maintenance typically costs a fraction of emergency repairs. For example, a $100 coolant flush prevents a $1,500+ engine overheating repair. Our maintenance programs at Vertical Automotive are designed to keep your vehicle reliable, safe, and holding its value.",
    },
    {
      question: "Do you follow manufacturer maintenance schedules?",
      answer: "Yes. We follow your vehicle manufacturer's recommended maintenance schedule using OEM-spec parts and fluids. This keeps your warranty valid and ensures every service is performed at the right interval for your specific make, model, and driving conditions.",
    },
  ],

  "steering-suspension": [
    {
      question: "What are the signs of bad suspension?",
      answer: "Common signs include the vehicle pulling to one side, bouncing excessively over bumps, uneven tire wear, a drifting or wandering feeling while driving, nose-diving when braking, and clunking or knocking noises over rough roads. Any of these warrant an inspection at Vertical Automotive.",
    },
    {
      question: "How much does suspension repair cost in Fort Lauderdale?",
      answer: "Suspension repair costs vary: strut or shock replacement runs $400–$900 per pair, control arm replacement $200–$500 per side, and a complete suspension overhaul $1,000–$3,000. We diagnose the specific worn components so you only replace what's needed.",
    },
    {
      question: "How often should suspension components be replaced?",
      answer: "Shocks and struts typically last 50,000–100,000 miles, but South Florida's road conditions can accelerate wear. We recommend a suspension inspection every 12 months or if you notice any handling changes. Early detection prevents tire damage and maintains safe handling.",
    },
    {
      question: "Can bad suspension damage my tires?",
      answer: "Yes. Worn suspension components cause uneven tire wear, reducing tire life significantly. Misaligned or bouncing wheels create irregular contact patches that wear tires prematurely. Fixing suspension issues promptly protects your tire investment and improves safety.",
    },
  ],

  "fuel-system": [
    {
      question: "What are the signs of a fuel system problem?",
      answer: "Warning signs include poor gas mileage, rough idle, hesitation or stumbling during acceleration, difficulty starting, engine misfires, and a strong fuel smell. These symptoms often point to clogged injectors, a failing fuel pump, or a dirty throttle body.",
    },
    {
      question: "How often should fuel injectors be cleaned?",
      answer: "We recommend fuel injector cleaning every 30,000–45,000 miles or if you notice performance issues. Professional cleaning restores proper spray patterns, improves fuel atomization, and can restore lost horsepower and fuel efficiency.",
    },
    {
      question: "How much does fuel system service cost?",
      answer: "A professional fuel injector cleaning service typically costs $100–$250. Fuel pump replacement ranges from $400–$900 depending on the vehicle. At Vertical Automotive, we diagnose the specific issue first to recommend the most cost-effective solution.",
    },
    {
      question: "Can a clogged fuel filter cause engine problems?",
      answer: "Yes. A clogged fuel filter restricts fuel flow, causing hesitation, power loss, stalling, and difficulty starting. It can also damage the fuel pump by forcing it to work harder. Regular replacement as part of scheduled maintenance prevents these issues.",
    },
  ],

  "hybrids-ev": [
    {
      question: "Can a regular mechanic work on hybrid and electric vehicles?",
      answer: "Hybrid and EV service requires specialized training, equipment, and safety protocols for high-voltage systems. At Vertical Automotive, our technicians are trained and certified to work on hybrid and electric vehicles from all major manufacturers including Tesla, Toyota, Honda, Ford, and more.",
    },
    {
      question: "How much does hybrid battery replacement cost?",
      answer: "Hybrid battery replacement costs vary significantly by vehicle: $2,000–$4,000 for most hybrids, and more for certain models. We also offer battery reconditioning services that can restore capacity at a fraction of replacement cost. We'll diagnose your battery health and present all options.",
    },
    {
      question: "Do electric vehicles need regular maintenance?",
      answer: "Yes, though less than gas vehicles. EVs still need tire rotation, brake inspection, cabin air filter replacement, coolant service for the battery thermal system, and software updates. Regular maintenance at Vertical Automotive keeps your EV running efficiently and preserves battery life.",
    },
    {
      question: "Do you service Tesla vehicles in Fort Lauderdale?",
      answer: "Yes. Vertical Automotive is equipped to service all Tesla models including Model 3, Model Y, Model S, and Model X. We handle tire service, brake maintenance, suspension work, A/C service, 12V battery replacement, and general diagnostics.",
    },
  ],

  "alignment-tire-rotation-balancing": [
    {
      question: "How often do I need a wheel alignment?",
      answer: "We recommend a wheel alignment check every 12 months or 12,000 miles, and whenever you notice uneven tire wear, the vehicle pulling to one side, or after hitting a significant pothole or curb. Regular alignments extend tire life and improve fuel efficiency.",
    },
    {
      question: "How much does a wheel alignment cost in Fort Lauderdale?",
      answer: "A standard two-wheel alignment typically costs $75–$100, while a four-wheel alignment ranges from $100–$150. At Vertical Automotive, we include a printout showing before and after measurements so you can see exactly what was adjusted.",
    },
    {
      question: "What's the difference between alignment and balancing?",
      answer: "Wheel alignment adjusts the angles of your wheels relative to each other and the road surface, affecting steering and tire wear. Wheel balancing corrects weight imbalances in the tire/wheel assembly, eliminating vibrations at highway speeds. Both are important for tire longevity and ride comfort.",
    },
    {
      question: "How often should I rotate my tires?",
      answer: "Tires should be rotated every 5,000–7,500 miles to ensure even wear across all four tires. This extends tire life, maintains balanced handling, and can be done during your regular oil change visit at Vertical Automotive. We offer free alignment checks with every tire rotation.",
    },
  ],

  "tires": [
    {
      question: "How do I know when I need new tires?",
      answer: "Replace your tires when tread depth reaches 2/32 of an inch (the penny test), if you see cracks, bulges, or blisters on the sidewall, if the tires are more than 6 years old, or if you experience vibration at highway speeds. We carry quality brands at competitive prices at Vertical Automotive.",
    },
    {
      question: "How much do new tires cost in Fort Lauderdale?",
      answer: "Tire prices vary by size and brand, typically ranging from $80–$250 per tire for passenger vehicles. At Vertical Automotive, every tire purchase includes professional mounting, balancing, valve stems, and a complimentary alignment check.",
    },
    {
      question: "What tire pressure should I use?",
      answer: "Use the pressure listed on the sticker inside your driver's door jamb — not the number on the tire sidewall (that's the maximum). Proper inflation improves fuel economy, tire life, and handling. In South Florida's heat, tire pressure can fluctuate, so check monthly.",
    },
    {
      question: "Can you repair a flat tire or do I need a new one?",
      answer: "Many punctures in the tread area can be safely repaired with a plug-patch combination. However, sidewall damage, large punctures, or tires with low tread cannot be safely repaired and need replacement. We'll inspect and advise you honestly.",
    },
  ],

  "powertrain-restoration": [
    {
      question: "What is a powertrain restoration?",
      answer: "A powertrain restoration is a comprehensive service that addresses engine and transmission wear in high-mileage vehicles. It can include engine reconditioning, compression restoration, seal replacement, transmission rebuild, and drivetrain component renewal — bringing your vehicle's performance back to reliable levels.",
    },
    {
      question: "Is powertrain restoration worth it for a high-mileage car?",
      answer: "Often yes, especially if the vehicle's body and frame are in good condition. A powertrain restoration at $3,000–$6,000 is typically far less than a new or used vehicle purchase. We'll assess your vehicle's overall condition and give you an honest recommendation.",
    },
    {
      question: "How many miles can an engine last after restoration?",
      answer: "A properly restored engine can deliver another 100,000+ miles of reliable service. The key is quality parts, precise machining, and experienced technicians — all of which Vertical Automotive provides, backed by our comprehensive warranty.",
    },
    {
      question: "Do you offer engine rebuilds in Fort Lauderdale?",
      answer: "Yes. Vertical Automotive offers complete engine rebuilds and reconditioning services at our Wilton Manors and Fort Lauderdale locations. We handle everything from cylinder head work to complete long-block rebuilds for domestic, Asian, and European vehicles.",
    },
  ],

  "manufacturer-recommended-services": [
    {
      question: "What are manufacturer recommended services?",
      answer: "These are maintenance tasks specified by your vehicle's manufacturer at certain mileage or time intervals — such as timing belt replacement, spark plug changes, coolant flushes, and transmission services. Following this schedule keeps your warranty valid and your vehicle running optimally.",
    },
    {
      question: "Will aftermarket service void my warranty?",
      answer: "No. Under the Magnuson-Moss Warranty Act, you have the right to have your vehicle serviced at any qualified shop without voiding your manufacturer's warranty. Vertical Automotive uses OEM-spec parts and follows factory service procedures, fully preserving your warranty coverage.",
    },
    {
      question: "How do I know what maintenance my car needs?",
      answer: "Check your owner's manual for the manufacturer's maintenance schedule, or simply bring your vehicle to Vertical Automotive. We look up the exact service requirements for your make, model, year, and mileage — and only recommend what's actually due.",
    },
    {
      question: "Do you use OEM parts for manufacturer services?",
      answer: "We use OEM-specification parts and fluids that meet or exceed manufacturer requirements. This ensures proper fit, performance, and warranty compliance. If you prefer genuine OEM parts, we can source those as well — just let us know.",
    },
  ],

  "car-wash": [
    {
      question: "Do you offer car wash and detailing services?",
      answer: "Yes. Vertical Automotive offers professional wash and detail services at our Wilton Manors and Fort Lauderdale locations. From basic exterior washes to full interior/exterior details, we help protect your vehicle's finish from South Florida's sun, salt air, and road grime.",
    },
    {
      question: "How often should I wash my car in South Florida?",
      answer: "We recommend washing your vehicle every 1–2 weeks in South Florida due to salt air, UV exposure, and frequent rain that deposits contaminants. Regular washing prevents paint oxidation, clear coat damage, and corrosion — preserving your vehicle's appearance and resale value.",
    },
    {
      question: "Do you offer paint protection services?",
      answer: "Yes. We offer ceramic coating, paint sealant, and wax protection services that shield your paint from UV rays, salt air, bird droppings, and environmental contaminants. These treatments are especially valuable in South Florida's harsh conditions.",
    },
    {
      question: "Can I get my car washed while it's being serviced?",
      answer: "Absolutely. Many of our customers add a wash or detail to their service appointment. It's a convenient way to get your vehicle looking great while we handle the mechanical work. Ask about our service combo packages.",
    },
  ],
  "fleet-maintenance-repairs": [
    {
      question: "What types of fleet vehicles do you service?",
      answer: "We service all makes and models used in commercial fleets — including Ford Transit, Chevrolet Express, Ram ProMaster, Toyota Tacoma, box trucks, delivery vans, service vehicles, and company cars. Whether you have a small fleet of 3 vehicles or manage 50+, our ASE-certified technicians handle everything from routine maintenance to complex repairs.",
    },
    {
      question: "Do you offer priority scheduling for fleet vehicles?",
      answer: "Yes. Our fleet program includes priority scheduling to minimize vehicle downtime. We understand that every day a vehicle is in the shop costs your business money, so we coordinate service appointments to get your vehicles back on the road as quickly as possible — often with same-day or next-day turnaround for routine maintenance.",
    },
    {
      question: "Do you provide detailed service records for fleet management?",
      answer: "Absolutely. Every fleet vehicle receives comprehensive digital service records documenting all maintenance performed, parts used, and recommended future service. These records support your fleet management, tax documentation, warranty tracking, and compliance requirements.",
    },
    {
      question: "Is there volume pricing for fleet maintenance?",
      answer: "Yes. We offer competitive volume pricing for businesses with multiple vehicles. Our fleet program is designed to reduce your per-vehicle maintenance costs while maintaining the same high-quality service standards. Contact us to discuss a customized fleet maintenance plan for your business.",
    },
    {
      question: "Can you handle emergency fleet repairs?",
      answer: "Yes. We understand that fleet breakdowns can disrupt your entire operation. We offer expedited service for emergency fleet repairs and work to diagnose and resolve issues as quickly as possible. Our experienced technicians and well-stocked parts inventory help minimize unexpected downtime.",
    },
  ],
};
