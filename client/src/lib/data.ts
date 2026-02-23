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
  staff: 8,
  satisfaction: "99%",
  hours: "8:00 AM — 5:00 PM",
  closedDays: "SAT-SUN Closed",
  appointmentUrl: "https://schedule.kukui.com/",
  logoUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663354819748/lVPmvaQYkURznMWm.svg",
};

export const LOCATIONS = [
  {
    name: "Wilton Manors",
    address: "1100 W Oakland Park Blvd Bay 5",
    city: "Wilton Manors, FL 33311",
    phone: "(954) 565-1518",
    phoneRaw: "9545651518",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.5!2d-80.1544!3d26.1617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d904b0a5c7e5e1%3A0x1234567890!2s1100+W+Oakland+Park+Blvd+Bay+5%2C+Wilton+Manors%2C+FL+33311!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
  },
  {
    name: "Fort Lauderdale",
    address: "707 NE 11th St",
    city: "Fort Lauderdale, FL 33304",
    phone: "(645) 216-2266",
    phoneRaw: "6452162266",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.5!2d-80.1344!3d26.1317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d904b0a5c7e5e1%3A0x0987654321!2s707+NE+11th+St%2C+Fort+Lauderdale%2C+FL+33304!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
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
    description: "Comprehensive Computer Diagnostic, Preventive Maintenance and Repair",
    icon: "battery",
    content: {
      intro: "At Vertical Automotive, your trusted auto shop in Fort Lauderdale, we provide comprehensive car service and repairs for all make and models. Our technicians are highly skilled and trained to perform the most complex auto repairs, including battery and hybrid inspections. We inspect the electrical connections, wiring charging relays, charging resistance box, and battery capacity while following a wiring diagram. We use only the highest quality auto parts and industry-leading diagnostic tools to ensure your car is running optimally. In addition, we offer a 36 month/36,000 mile warranty on all auto repairs that we provide. With our quality auto repair services, you can rest assured that your vehicle is in good hands.",
      whenNeeded: "It is important to regularly check the electrical connections, wiring charging relays, charging resistance box, and storage batteries of your car. This Battery & Hybrid Inspection should be done at least once a year or every 12,000 miles — whichever comes first.",
      benefits: "The benefit of checking the battery system of your hybrid car on a regular basis is that it can help maintain maximum performance of your vehicle. Proper inspection and maintenance of the electrical components, such as wiring charging relays, charging resistance box, and storage batteries, will help ensure the safety of you, your passengers and other drivers on the road. It will also allow you to detect any potential issues before they become major problems. Additionally, regularly checking the battery system can help to extend the life of your car.",
    },
  },
  {
    slug: "brake-system",
    title: "Brake Service",
    shortTitle: "Brakes & Rotors",
    description: "Brakes must be maintained and fixed correctly in a timely manner utilizing the latest equipment, technology and best available parts. Stop by for free brake inspection today!",
    icon: "disc",
    content: {
      intro: "Welcome to Vertical Automotive Auto Repair Shop, your premier destination for comprehensive brake repair and service in Fort Lauderdale, FL. At Vertical Automotive, we specialize in delivering top-notch brake repair, brake service, brake replacement, and brake inspection services tailored to meet the needs of your vehicle. Whether you're dealing with worn brake pads, damaged rotors, or simply need a routine brake inspection, our team of certified mechanics is here to provide the expert care your car deserves. Our brake service extends beyond simple repairs. We also specialize in brake replacement for all types of vehicles. Whether you drive a car, truck, or SUV, our experts use only high-quality brake pads and rotors to ensure your vehicle's braking system is in optimal condition and provide 3 years parts and labor warranty.",
      whenNeeded: "It's important to regularly check your vehicle's brake system to ensure your safety and the safety of others on the road. As a rule of thumb, it's a good idea to have your brakes inspected as part of your vehicle's routine maintenance schedule. This is usually recommended every 6 months or around every 10,000 to 15,000 miles. If you hear squeaking, grinding, or any unusual noises when you apply the brakes, it's a clear sign that you should have your brake system checked.",
      benefits: "Preventive maintenance is key to the longevity and safety of your vehicle's braking system. Our brake inspection process includes examining the brake pads, rotors, calipers, and fluid levels to ensure everything is functioning correctly. If we find any concerns, we'll provide you with a detailed report and recommended solutions to keep your brakes performing effectively, along with transparent cost estimates.",
    },
  },
  {
    slug: "transmission",
    title: "Transmission",
    shortTitle: "Transmission",
    description: "We provide complete transmission service and maintenance, as well as full rebuilds. All work is guaranteed with a one-year or 12,000-mile warranty.",
    icon: "cog",
    content: {
      intro: "At Vertical Automotive in Fort Lauderdale, we offer comprehensive transmission services designed to keep your vehicle running smoothly. Our experienced auto technicians specialize in all types of transmission repairs, from minor adjustments to complete rebuilds. We use the latest diagnostic tools and high-quality parts to ensure your transmission is in optimal condition. All work is guaranteed with a one-year or 12,000-mile warranty.",
      whenNeeded: "You should check your Transmission System regularly to ensure the safety and reliability of your vehicle. It is recommended that you have your Transmission System checked at least once a year or every 30,000 miles (whichever comes first) for preventative maintenance. If you experience any problems with shifting gears, strange noises, fluid leaks or other transmission issues, it's important to get these addressed by a professional auto technician as soon as possible.",
      benefits: "Regular transmission maintenance helps keep your vehicle running at peak performance, avoid costly auto repairs down the line, and ensures you feel safe and secure knowing your car is well maintained. Our certified technicians can quickly diagnose and repair any transmission issue in a timely manner so that you can get back on the road fast.",
    },
  },
  {
    slug: "a-c-maintenance-repair",
    title: "A/C Maintenance & Repair",
    shortTitle: "A/C",
    description: "We use the latest equipment and technology to install, repair, or recharge your air-conditioning unit fast and accurately.",
    icon: "snowflake",
    content: {
      intro: "At Vertical Automotive in Fort Lauderdale, FL, we are dedicated to offering top-notch Auto Air Conditioner Repair and Maintenance services. Our expert team excels in automotive AC repair, ensuring your vehicle's air conditioner operates efficiently for a comfortable driving experience. As a local car air conditioning repair specialist, we pride ourselves on our ability to handle a wide range of services, from routine automotive air conditioner maintenance to intricate car AC compressor repairs. We are committed to using only high-quality parts in all our repairs, ensuring durability and optimal performance.",
      whenNeeded: "Your auto's air conditioning system should be inspected and serviced on a regular basis, preferably every 12-18 months or after 10,000 miles. This will help ensure that your auto's air conditioning system is running at peak efficiency and can catch any minor issues before they become larger problems.",
      benefits: "Reliable auto service that ensures your car's AC is running smoothly for many years. Latest tools and technology used to diagnose any issues with your auto's AC system. Quick and accurate repairs or recharging services. Regular inspections and servicing helps ensure peak efficiency of your auto's AC system.",
    },
  },
  {
    slug: "oil-change-engine-service",
    title: "Oil Change & Engine Service",
    shortTitle: "Engine, Oil & Filters",
    description: "Perform routine engine maintenance, such as oil change and filters, lubricating parts and replacing spark plugs. Computer diagnostic and components inspection for malfunctioning components.",
    icon: "droplet",
    content: {
      intro: "At Vertical Automotive in Fort Lauderdale, we provide comprehensive oil change and engine services for all makes and models. Our ASE-certified technicians perform routine engine maintenance, including oil changes, filter replacements, lubricating parts, and replacing spark plugs. We also offer computer diagnostics and component inspections for malfunctioning components according to manufacturer specifications, including engine replacement when needed.",
      whenNeeded: "Regular oil changes are essential for maintaining your engine's health. Most manufacturers recommend an oil change every 3,000 to 7,500 miles, depending on the type of oil used and your driving conditions. Synthetic oil typically allows for longer intervals between changes. If you notice your oil change light illuminating, dark or gritty oil on the dipstick, or unusual engine noises, it's time for service.",
      benefits: "Regular oil changes and engine maintenance help extend the life of your engine, improve fuel efficiency, reduce harmful emissions, and prevent costly repairs down the line. Fresh oil keeps engine components properly lubricated, reducing friction and heat buildup that can cause premature wear.",
    },
  },
  {
    slug: "complete-diagnostics",
    title: "Complete Diagnostics",
    shortTitle: "Complete Diagnostic",
    description: "Car diagnostic tests/scans your car's components and systems to check for issues with components like the engine, transmission, oil tank, throttle, and many more.",
    icon: "search",
    content: {
      intro: "Car diagnostic tests scan your car's components and systems to check for issues with components like the engine, transmission, oil tank, throttle, and many more. Most car diagnostic tests require specific devices and expertise to read correctly, therefore they are best performed by qualified mechanics at professional shops. At Vertical Automotive, we use state-of-the-art diagnostic equipment to quickly and accurately identify any issues with your vehicle.",
      whenNeeded: "You should consider getting a car diagnostic test if your check engine light is on, if you notice a decrease in fuel efficiency, if your vehicle is making unusual noises, or if you're experiencing any performance issues. Regular diagnostic checks are also recommended as part of your vehicle's routine maintenance to catch potential problems early.",
      benefits: "Car diagnostics help identify potential safety issues before they become big problems. Regular diagnostics can help keep your car running smoothly for longer by identifying problems early on. Diagnostic tests also provide more accurate estimates for repair costs since mechanics can accurately diagnose the problem and know what parts need to be replaced.",
    },
  },
  {
    slug: "routine-preventive-maintenance",
    title: "Routine & Preventive Maintenance",
    shortTitle: "Routine Maintenance",
    description: "The recommended intervals by manufacturers for maintenance at 15k, 30k, 45k, 60k, 90k miles. All work is guaranteed and performed in-house by ASE-certified Technicians.",
    icon: "wrench",
    content: {
      intro: "Regular auto repair and car service is an essential part of vehicle ownership. Without routine maintenance, your car's performance can suffer and you may end up facing bigger — and more expensive — repairs down the line. This is why it's important to stay on top of auto repair in order to ensure that your vehicle runs properly for years to come.",
      whenNeeded: "Routine auto repair and car service should be done every 6 months, or every 5,000 - 12,000 miles, whichever comes first. This is because smaller auto repairs can become much larger — and more expensive — problems if left unchecked. Additionally, certain auto parts may need to be replaced or serviced more frequently than others due to wear.",
      benefits: "Regular auto repair and car service helps ensure the optimal performance of your vehicle, increased gas mileage, maximum performance, and maintained value. All work is guaranteed and performed in-house by ASE-certified Technicians with more than 30 years of experience. We use genuine or high quality parts.",
    },
  },
  {
    slug: "steering-suspension",
    title: "Steering & Suspension",
    shortTitle: "Steering & Suspension",
    description: "The suspension and steering systems on your vehicle are responsible for maintaining directional stability, comfortable riding conditions and overall driving performance.",
    icon: "gauge",
    content: {
      intro: "Steering and suspension are important auto services that should not be overlooked. Poorly maintained components can lead to an unsafe driving experience, making auto repair a necessity for every vehicle. At our auto shop in Fort Lauderdale, we specialize in providing quality steering and suspension services for all makes and models of cars. We use the highest quality parts and tools.",
      whenNeeded: "You should check your steering and suspension regularly to ensure they are in proper working condition. You may need auto repair or car service if you experience strange noises or vibrations while driving, uneven tire wear, loose steering wheel and/or difficulty turning the wheel.",
      benefits: "Properly maintained steering and suspension systems ensure safe driving, comfortable ride quality, even tire wear, and optimal vehicle handling. Regular inspections can catch issues before they become major problems, saving you money on costly repairs.",
    },
  },
  {
    slug: "fuel-system",
    title: "Fuel System",
    shortTitle: "Fuel Systems",
    description: "A full fuel system service should include both a chemical cleaning of your system and replacing any worn components.",
    icon: "fuel",
    content: {
      intro: "A full fuel system service should include both a chemical cleaning of your system and replacing any worn components. This could include your fuel pump, fuel filter or fuel injectors. At our auto shop in Fort Lauderdale, we specialize in diagnosing and repairing all types of fuel system-related issues so that auto owners can enjoy maximum auto performance and protection against expensive repair bills.",
      whenNeeded: "Your fuel system should be inspected and serviced regularly to ensure optimal performance. Signs that your fuel system may need attention include decreased fuel efficiency, difficulty starting, rough idling, or engine hesitation during acceleration. Regular fuel system cleaning is recommended every 30,000 miles.",
      benefits: "Regular maintenance helps ensure that your auto runs at its best while also helping to prevent expensive auto repair bills down the road. Routine checks of your auto's fuel system can help identify small issues or worn components before they become larger problems that require more costly repairs. Regular inspection and cleaning can help keep the auto's engine running better for longer and optimize power output, acceleration, and fuel economy.",
    },
  },
  {
    slug: "hybrids-ev",
    title: "Hybrids & EV",
    shortTitle: "Hybrid & EV",
    description: "Inspects electrical connections, wiring, charging relays, charging resistance box, and storage batteries, following wiring diagram and comprehensive software.",
    icon: "zap",
    content: {
      intro: "For auto repair specifically designed for hybrid cars, look no further than our auto shop in Fort Lauderdale. Our experienced technicians specialize in servicing hybrid makes and models of all sizes and are committed to providing the highest level of customer service. We understand the unique needs of hybrid vehicles and have the knowledge to properly troubleshoot any issues that may arise. Our auto shop offers comprehensive auto repair services, including oil changes, brake repairs, battery replacements, and more.",
      whenNeeded: "You may need auto repair services for your hybrid car if you notice reduced engine performance, poor fuel economy, unusual noises, warning lights on dashboard, difficulty starting, or it's time for regular maintenance. Even when nothing seems wrong, regular auto maintenance checks are recommended to keep it running smoothly.",
      benefits: "Get the auto repair services you need for your hybrid car. Improve fuel efficiency and engine performance. Feel safe driving your hybrid vehicle knowing that it is in peak condition. Enjoy the peace of mind that comes with expert auto technicians taking care of all your auto repair needs.",
    },
  },
  {
    slug: "alignment-tire-rotation-balancing",
    title: "Wheel Alignment, Tire Rotation & Balancing",
    shortTitle: "Alignment & Tires",
    description: "Comprehensive wheel alignment, tire rotation, and balancing services to ensure optimal vehicle performance and tire longevity.",
    icon: "circle",
    content: {
      intro: "At Vertical Automotive in Fort Lauderdale, we provide comprehensive wheel alignment, tire rotation, and balancing services. Proper alignment and balanced tires are essential for safe driving, even tire wear, and optimal fuel efficiency. Our state-of-the-art equipment and experienced technicians ensure precise adjustments for all makes and models.",
      whenNeeded: "You should have your alignment checked if you notice your vehicle pulling to one side, uneven tire wear, or a crooked steering wheel when driving straight. Tire rotation is typically recommended every 5,000 to 7,500 miles. Balancing should be done whenever you get new tires or notice vibrations at highway speeds.",
      benefits: "Proper wheel alignment and regular tire rotation extend the life of your tires, improve fuel efficiency, ensure safe handling, and provide a smoother ride. Early detection of any issues can prevent them from developing into major problems, ensuring you avoid unexpected breakdowns.",
    },
  },
];

export interface VehicleType {
  slug: string;
  title: string;
  image: string;
  description: string;
  services: string[];
}

export const VEHICLE_TYPES: VehicleType[] = [
  {
    slug: "tesla-vehicles-service",
    title: "TESLA",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
    description: "Vertical Automotive is your leading choice for Tesla Service and Repair in Fort Lauderdale, where we're dedicated to delivering a top-tier 5-star experience every time you visit. Our commitment is to provide outstanding Tesla auto care, making your journey to us more than worthwhile. Our expert team of Certified Tesla Mechanics specializes in every aspect of Tesla Repair and Maintenance. Whether it's in-depth Tesla Car Diagnostics to identify any issues or dependable Tesla Vehicle Maintenance, our skilled technicians are ready to meet all your needs with unmatched precision and care, using genuine Tesla or matching quality parts engineered and designed for your specific model. We understand the importance of your Tesla's performance and longevity, offering specialized Electric Vehicle Repair and Electric Car Maintenance services. Our expertise ensures your Tesla stays in prime condition, ready to deliver the remarkable performance you expect. At Vertical Automotive, we're not just a repair shop; we're a center for specialized Tesla care. This includes essential services like Tesla Battery Replacement, Tesla Steering Repair, Tesla Tire Replacement, Tesla Alignment and Tesla Air Conditioning Services, ensuring your vehicle operates seamlessly.",
    services: ["battery-cranking-charging-systems", "brake-system", "routine-preventive-maintenance", "complete-diagnostics", "a-c-maintenance-repair", "steering-suspension"],
  },
  {
    slug: "asian-vehicles-service",
    title: "ASIAN",
    image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=800&q=80",
    description: "Welcome to Vertical Automotive, Fort Lauderdale's Premier Japanese and Korean Car Repair & Maintenance Shop! Specializing in Asian-made vehicles, we're your trusted source for exceptional automotive care. Our expert team is dedicated to providing unparalleled service for Asian cars, with a deep understanding of their unique engineering. Whether you're driving a revered Japanese brand like Toyota, Honda, Nissan, Subaru, Lexus, Mitsubishi, Acura, Suzuki, or Infiniti, or a Korean favorite such as Hyundai, Genesis, or Kia, we're equipped to cater to your specific needs. At Vertical Automotive, we pride ourselves on our specialized Japanese and Korean car repairs. Our skilled technicians, armed with extensive knowledge of these vehicles, use the latest diagnostic tools and authentic OEM or high-quality aftermarket parts, backed by a 36,000-miles/36-month warranty, ensuring top-tier care for your vehicle.",
    services: ["battery-cranking-charging-systems", "brake-system", "oil-change-engine-service", "complete-diagnostics", "hybrids-ev", "routine-preventive-maintenance", "steering-suspension", "fuel-system", "transmission", "a-c-maintenance-repair"],
  },
  {
    slug: "european-vehicles-service",
    title: "EUROPEAN",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
    description: "Welcome to Vertical Automotive, your premier auto repair shop in Fort Lauderdale, FL, for exceptional European automotive repair. We specialize in servicing and maintaining European cars, providing expertise and dedication that's second to none. Our highly skilled technicians understand the intricacies of European automotive engineering, ensuring your vehicle receives specialized and professional care. Equipped with cutting-edge diagnostic tools and genuine manufacturer parts, we guarantee top-notch performance and longevity for your car. We offer comprehensive maintenance and repair services for European vehicles, encompassing everything from German car repairs for brands like BMW, Audi, Porsche, and Volkswagen to British vehicle care for Land Rover, Jaguar and Mini Cooper, as well as other renowned European manufacturers.",
    services: ["battery-cranking-charging-systems", "brake-system", "oil-change-engine-service", "complete-diagnostics", "hybrids-ev", "routine-preventive-maintenance", "steering-suspension", "fuel-system", "transmission", "a-c-maintenance-repair"],
  },
  {
    slug: "domestic-vehicles-service",
    title: "DOMESTIC",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
    description: "At Vertical Automotive in Fort Lauderdale, we are your trusted experts for domestic vehicle repair and maintenance. Whether you drive a Ford, Chevrolet, Dodge, Chrysler, Jeep, GMC, Cadillac, Lincoln, or any other American-made vehicle, our ASE-certified technicians have the expertise and experience to keep your car running at peak performance. We use the latest diagnostic tools and high-quality OEM or aftermarket parts, backed by our 36,000-miles/36-month warranty, to ensure your domestic vehicle receives the best possible care.",
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
    description: "available per request with any $100+ service",
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
  subtitle: "Contact us today to schedule an appointment",
  heading: "WE SERVICE ASIAN, AMERICAN AND EUROPEAN VEHICLES",
  bottomSection: {
    title: "services we offer",
    description: "We provide a full range of front end mechanical repairs for all makes and models of cars, no matter the cause. This includes everything from struts, shocks, and tie rod ends to ball joints, springs, and basically everything that is included in repairing the front end of the vehicle.",
    list: [
      "General Auto Repair & Maintenance",
      "Routine Maintenance Service",
      "Transmission Repair & Replacement",
      "Brakes System",
      "Fuel System",
      "Air Conditioning",
      "Exhaust System",
      "Tire Repair and Replacement",
      "Cooling System",
      "Vehicle Preventive Maintenance",
      "Electrical Diagnostics",
      "Tune Up",
      "CV Axles",
      "Oil Change",
      "Computer Diagnostic",
      "Engine Cooling System Flush & Repair",
      "Steering and Suspension Work",
    ],
  },
};
