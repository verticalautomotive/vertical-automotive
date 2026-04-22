/**
 * About Us Page — Industrial Brutalism Design
 * Blue/white/black palette, bold typography
 * MOBILE: Compact spacing, smaller text, tighter grids
 * BILINGUAL: Uses useTranslation for EN/ES content
 */
import { COMPANY } from "@/lib/data";
import { Award, CheckCircle, TrendingUp, MapPin, Puzzle, ShieldCheck, Wrench, HeartHandshake, Search as SearchIcon } from "lucide-react";
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useTranslation } from "@/hooks/useTranslation";

export default function AboutPage() {
  const { isSpanish, aboutContent, ui } = useTranslation();

  const t = ui?.about ?? {
    title: "ABOUT US",
    subtitle: "Family-owned and operated since 1989",
    outstandingReputation: "OUTSTANDING",
    outstanding: "REPUTATION",
    communityInvolvement: "COMMUNITY",
    community: "INVOLVEMENT",
    whatMakesDifferent: "WHAT MAKES VERTICAL AUTOMOTIVE",
    different: "DIFFERENT",
    differentText: "Vertical Automotive combines modern automotive technology with real-world experience to deliver accurate diagnostics, transparent communication, and dependable results. Instead of focusing only on repairs, the team helps drivers prevent future issues and maintain long-term vehicle performance.",
    honestRec: "Honest & Clear Recommendations",
    honestRecDesc: "We provide transparent advice about what your vehicle truly needs — nothing more, nothing less. Our customers trust us because we communicate clearly and never upsell unnecessary services.",
    diagnosticFirst: "Diagnostic-First Approach",
    diagnosticFirstDesc: "We use modern diagnostic technology to quickly and accurately identify issues before recommending any repairs. This saves you time, money, and prevents unnecessary work.",
    mechExpertise: "Professional Mechanical Expertise",
    mechExpertiseDesc: "Our ASE-certified technicians bring decades of combined experience to every repair. From routine maintenance to complex diagnostics, we deliver dealership-level quality.",
    reliableMaint: "Reliable Maintenance Strategies",
    reliableMaintDesc: "We help drivers prevent future issues through proactive maintenance plans tailored to your vehicle's needs, keeping it running safely and efficiently for years to come.",
    trustedLocal: "Trusted Local Reputation",
    trustedLocalDesc: "Serving Wilton Manors and Fort Lauderdale since 1989, we've built a loyal customer base through consistent quality, honest service, and genuine care for every vehicle we touch.",
    realSolutions: "Real Solutions",
    howWeSolve: "HOW WE SOLVE REAL",
    driverProblems: "DRIVER PROBLEMS",
    driversSearch: "Drivers often search for solutions, not services. Vertical Automotive helps with:",
    problems: [
      "Cars that don't feel right but have no clear warning lights",
      "Vehicles needing reliable maintenance to avoid breakdowns",
      "Drivers wanting expert advice instead of guesswork",
      "Customers looking for quality work without dealership pricing",
      "Vehicle owners who want long-term reliability and safety",
    ],
    localAuthority: "Local Authority",
    yourTrusted: "YOUR TRUSTED",
    neighborhood: "NEIGHBORHOOD",
    shop: "SHOP",
    localAuthorityText: "Serving both Wilton Manors and Fort Lauderdale, Vertical Automotive is recognized as a local automotive expert that combines dealership-level diagnostics with personalized service from a trusted neighborhood shop.",
    aseCertifiedProfessionals: "ASE CERTIFIED PROFESSIONALS",
  };

  const statsLabels = isSpanish
    ? { years: "AÑOS DE EXPERIENCIA", vehicles: "VEHÍCULOS REPARADOS", locations: "UBICACIONES", satisfied: "CLIENTES SATISFECHOS" }
    : { years: "YEARS OF EXPERIENCE", vehicles: "VEHICLES REPAIRED", locations: "LOCATIONS", satisfied: "SATISFIED CUSTOMERS" };

  const differentiators = [
    { icon: HeartHandshake, title: t.honestRec, description: t.honestRecDesc },
    { icon: SearchIcon, title: t.diagnosticFirst, description: t.diagnosticFirstDesc },
    { icon: Wrench, title: t.mechExpertise, description: t.mechExpertiseDesc },
    { icon: ShieldCheck, title: t.reliableMaint, description: t.reliableMaintDesc },
    { icon: MapPin, title: t.trustedLocal, description: t.trustedLocalDesc },
  ];

  const problems = t.problems;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title={isSpanish
          ? "Sobre Nosotros | Vertical Automotive Fort Lauderdale"
          : "About Us | Vertical Automotive Fort Lauderdale"}
        description={isSpanish
          ? "Taller familiar desde 1989 en Fort Lauderdale. Certificado ASE, más de 54,000 vehículos reparados. Conozca a nuestro equipo."
          : "Family-owned ASE-certified auto repair since 1989 in Fort Lauderdale. 54,000+ vehicles repaired. Meet our expert team."}
        keywords={isSpanish
          ? "sobre Vertical Automotive, taller familiar Fort Lauderdale, mecánicos ASE, historia taller, equipo técnico"
          : "about Vertical Automotive, family auto repair Fort Lauderdale, ASE mechanics, shop history, expert team"}
      />
      <Navigation />

      <PageHero
        title={t.title}
        subtitle={t.subtitle}
      />

      {/* About Content — Main Section */}
      <section className="py-10 sm:py-20 bg-background">
        <div className="container max-w-5xl">
          {/* Lead sentence */}
          <p className="text-base sm:text-xl font-semibold leading-relaxed text-foreground mb-6 sm:mb-8">
            {aboutContent.intro}
          </p>

          {/* Body paragraphs */}
          <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
            {aboutContent.body.split('\n\n').map((para, i) => (
              <p key={i} className={`text-sm sm:text-lg leading-relaxed ${
                para.startsWith('We are not') || para.startsWith('No somos')
                  ? 'font-bold text-foreground'
                  : 'text-muted-foreground'
              }`}>
                {para}
              </p>
            ))}
          </div>

          {/* Customers come to us when… */}
          <div className="border-l-4 border-primary pl-4 sm:pl-6 mb-8 sm:mb-10">
            <p className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">
              {isSpanish ? 'Los clientes vienen a Vertical Automotive cuando:' : 'Customers come to Vertical Automotive when:'}
            </p>
            <ul className="space-y-2">
              {aboutContent.customerReasons.map((reason, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-base text-muted-foreground">
                  <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* Closing paragraphs */}
          <div className="space-y-4 sm:space-y-5">
            {aboutContent.closing.split('\n\n').map((para, i) => (
              <p key={i} className={`text-sm sm:text-lg leading-relaxed ${
                i === 1 ? 'font-semibold text-foreground' : 'text-muted-foreground'
              }`}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Vertical Automotive Different */}
      <section className="py-10 sm:py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-center mb-3 sm:mb-4">
            {t.whatMakesDifferent} <span className="text-primary">{t.different}</span>
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-6 sm:mb-8" />

          <p className="text-sm sm:text-lg leading-relaxed text-secondary-foreground/80 mb-8 sm:mb-12 max-w-3xl mx-auto text-center">
            {t.differentText}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 max-w-5xl mx-auto">
            {differentiators.map((item, i) => (
              <div
                key={i}
                className={`border-2 border-primary/20 p-4 sm:p-8 hover:border-primary transition-colors ${i === 4 ? "sm:col-span-2" : ""}`}
              >
                <div className="flex items-center gap-3 mb-2 sm:mb-4">
                  <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-primary/10 text-primary">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-sm sm:text-xl font-bold text-primary">
                    {item.title}
                  </h3>
                </div>
                <p className="text-secondary-foreground/70 leading-relaxed text-xs sm:text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Vertical Automotive Solves Real Driver Problems */}
      <section className="py-10 sm:py-20 bg-muted/30">
        <div className="container max-w-5xl">
          <div className="text-center mb-8 sm:mb-14">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-primary/10 px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
              <Puzzle className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <span className="font-display text-xs sm:text-sm font-bold tracking-widest text-primary uppercase">
                {t.realSolutions}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
              {t.howWeSolve}{" "}
              <span className="text-primary">{t.driverProblems}</span>
            </h2>
            <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-4 sm:mb-6" />
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.driversSearch}
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            {problems.map((problem, i) => (
              <div
                key={i}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 border-2 border-border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center bg-primary text-primary-foreground font-display font-bold text-xs sm:text-sm">
                  {i + 1}
                </div>
                <p className="text-xs sm:text-base leading-relaxed font-medium pt-0.5 sm:pt-1">
                  {problem}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Authority Statement */}
      <section className="py-10 sm:py-16 bg-secondary text-secondary-foreground">
        <div className="container max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-primary/10 px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span className="font-display text-xs sm:text-sm font-bold tracking-widest text-primary uppercase">
              {t.localAuthority}
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6">
            {t.yourTrusted} <span className="text-primary">{t.neighborhood}</span> {t.shop}
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-4 sm:mb-8" />
          <p className="text-sm sm:text-lg leading-relaxed text-secondary-foreground/80 max-w-3xl mx-auto">
            {t.localAuthorityText}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 sm:py-20 bg-muted">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {[
              { value: String(COMPANY.yearsExperience), label: statsLabels.years, icon: Award },
              { value: COMPANY.vehiclesRepaired, label: statsLabels.vehicles, icon: TrendingUp },
              { value: String(COMPANY.staff), label: statsLabels.locations, icon: MapPin },
              { value: COMPANY.satisfaction, label: statsLabels.satisfied, icon: CheckCircle },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-8 bg-card border-2 border-border hover:border-primary transition-all duration-300"
              >
                <stat.icon className="w-7 h-7 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 text-primary" />
                <div className="text-2xl sm:text-5xl md:text-6xl font-black mono-number mb-1 sm:mb-2 text-primary">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-sm font-bold tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-8 sm:py-16 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4">
            {t.aseCertifiedProfessionals}
          </h2>
          <p className="text-xs sm:text-lg opacity-90 max-w-2xl mx-auto">
            {aboutContent.certificationText}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
