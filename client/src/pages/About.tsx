/**
 * About Us Page — Industrial Brutalism Design
 * Blue/white/black palette, bold typography
 * MOBILE: Compact spacing, smaller text, tighter grids
 */
import { ABOUT_CONTENT, COMPANY } from "@/lib/data";
import { Award, CheckCircle, TrendingUp, Users, Star, Puzzle, MapPin, CircleCheck, Search as SearchIcon, ShieldCheck, Wrench, HeartHandshake } from "lucide-react";
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title="About Us - Vertical Automotive | Family-Owned Auto Repair Since 1989"
        description="Family-owned and operated since 1989, Vertical Automotive is an ASE-certified auto repair shop in Fort Lauderdale. 36 years of experience, 54,000+ vehicles repaired. Learn about our team and commitment to quality."
      />
      <Navigation />

      <PageHero
        title="ABOUT US"
        subtitle="Family-owned and operated since 1989"
      />

      {/* About Content */}
      <section className="py-10 sm:py-20 bg-background">
        <div className="container max-w-5xl">
          <p className="text-sm sm:text-lg leading-relaxed text-muted-foreground mb-8 sm:mb-12">
            {ABOUT_CONTENT.intro}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
            <div>
              <h2 className="text-xl sm:text-3xl font-black mb-3 sm:mb-4">
                OUTSTANDING <span className="text-primary">REPUTATION</span>
              </h2>
              <div className="h-1 w-12 sm:w-16 bg-primary mb-4 sm:mb-6" />
              <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
                {ABOUT_CONTENT.reputation}
              </p>
            </div>
            <div>
              <h2 className="text-xl sm:text-3xl font-black mb-3 sm:mb-4">
                COMMUNITY <span className="text-primary">INVOLVEMENT</span>
              </h2>
              <div className="h-1 w-12 sm:w-16 bg-primary mb-4 sm:mb-6" />
              <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
                {ABOUT_CONTENT.community}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-10 sm:py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-center mb-3 sm:mb-4">
            WHY <span className="text-primary">CHOOSE US</span>
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-6 sm:mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 max-w-5xl mx-auto">
            {ABOUT_CONTENT.whyChooseUs.map((item, i) => (
              <div
                key={i}
                className="border-2 border-primary/20 p-4 sm:p-8 hover:border-primary transition-colors"
              >
                <h3 className="text-sm sm:text-xl font-bold mb-2 sm:mb-4 text-primary">
                  {item.title}
                </h3>
                <p className="text-secondary-foreground/70 leading-relaxed text-xs sm:text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Vertical Automotive Different */}
      <section className="py-10 sm:py-20 bg-background">
        <div className="container max-w-5xl">
          <div className="text-center mb-8 sm:mb-14">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-primary/10 px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <span className="font-display text-xs sm:text-sm font-bold tracking-widest text-primary uppercase">
                What Sets Us Apart
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
              WHAT MAKES VERTICAL AUTOMOTIVE{" "}
              <span className="text-primary">DIFFERENT</span>
            </h2>
            <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-4 sm:mb-6" />
          </div>

          <p className="text-sm sm:text-lg leading-relaxed text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto text-center">
            Vertical Automotive combines modern automotive technology with real-world experience to deliver accurate diagnostics, transparent communication, and dependable results. Instead of focusing only on repairs, the team helps drivers prevent future issues and maintain long-term vehicle performance.
          </p>

          <div className="mb-6 sm:mb-10">
            <h3 className="font-display text-base sm:text-xl font-bold tracking-wider mb-4 sm:mb-6 text-center">
              KEY STRENGTHS RECOGNIZED BY <span className="text-primary">CUSTOMERS</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {[
                { icon: HeartHandshake, text: "Honest and clear recommendations" },
                { icon: SearchIcon, text: "Diagnostic-first approach" },
                { icon: Wrench, text: "Professional mechanical expertise" },
                { icon: ShieldCheck, text: "Reliable maintenance strategies" },
                { icon: MapPin, text: "Local trusted reputation in Wilton Manors & Fort Lauderdale" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-5 border-2 border-border hover:border-primary/50 bg-card transition-colors ${
                    i === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="flex-shrink-0 w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-primary/10 text-primary">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <span className="font-display text-xs sm:text-sm font-bold tracking-wide">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
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
                Real Solutions
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
              HOW WE SOLVE REAL{" "}
              <span className="text-primary">DRIVER PROBLEMS</span>
            </h2>
            <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-4 sm:mb-6" />
            <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Drivers often search for solutions, not services. Vertical Automotive helps with:
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            {[
              "Cars that don't feel right but have no clear warning lights",
              "Vehicles needing reliable maintenance to avoid breakdowns",
              "Drivers wanting expert advice instead of guesswork",
              "Customers looking for quality work without dealership pricing",
              "Vehicle owners who want long-term reliability and safety",
            ].map((problem, i) => (
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
              Local Authority
            </span>
          </div>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-4 sm:mb-6">
            YOUR TRUSTED <span className="text-primary">NEIGHBORHOOD</span> SHOP
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-4 sm:mb-8" />
          <p className="text-sm sm:text-lg leading-relaxed text-secondary-foreground/80 max-w-3xl mx-auto">
            Serving both Wilton Manors and Fort Lauderdale, Vertical Automotive is recognized as a local automotive expert that combines dealership-level diagnostics with personalized service from a trusted neighborhood shop.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 sm:py-20 bg-muted">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {[
              { value: String(COMPANY.yearsExperience), label: "YEARS OF EXPERIENCE", icon: Award },
              { value: COMPANY.vehiclesRepaired, label: "VEHICLES REPAIRED", icon: TrendingUp },
              { value: String(COMPANY.staff), label: "LOCATIONS", icon: MapPin },
              { value: COMPANY.satisfaction, label: "SATISFIED CUSTOMERS", icon: CheckCircle },
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
            ASE CERTIFIED PROFESSIONALS
          </h2>
          <p className="text-xs sm:text-lg opacity-90 max-w-2xl mx-auto">
            {ABOUT_CONTENT.certificationText}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
