/**
 * About Us Page — Industrial Brutalism Design
 * Blue/white/black palette, bold typography
 */
import { ABOUT_CONTENT, COMPANY } from "@/lib/data";
import { Award, CheckCircle, TrendingUp, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />

      <PageHero
        title="ABOUT US"
        subtitle="Family-owned and operated since 1989"
      />

      {/* About Content */}
      <section className="py-20 bg-background">
        <div className="container max-w-5xl">
          <p className="text-lg leading-relaxed text-muted-foreground mb-12">
            {ABOUT_CONTENT.intro}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black mb-4">
                OUTSTANDING <span className="text-primary">REPUTATION</span>
              </h2>
              <div className="h-1 w-16 bg-primary mb-6" />
              <p className="text-muted-foreground leading-relaxed">
                {ABOUT_CONTENT.reputation}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-black mb-4">
                COMMUNITY <span className="text-primary">INVOLVEMENT</span>
              </h2>
              <div className="h-1 w-16 bg-primary mb-6" />
              <p className="text-muted-foreground leading-relaxed">
                {ABOUT_CONTENT.community}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
            WHY <span className="text-primary">CHOOSE US</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-12" />

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {ABOUT_CONTENT.whyChooseUs.map((item, i) => (
              <div
                key={i}
                className="border-2 border-primary/20 p-8 hover:border-primary transition-colors"
              >
                <h3 className="text-xl font-bold mb-4 text-primary">
                  {item.title}
                </h3>
                <p className="text-secondary-foreground/70 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: String(COMPANY.yearsExperience), label: "YEARS OF EXPERIENCE", icon: Award },
              { value: COMPANY.vehiclesRepaired, label: "VEHICLES REPAIRED", icon: TrendingUp },
              { value: String(COMPANY.staff), label: "EXPERT STAFF", icon: Users },
              { value: COMPANY.satisfaction, label: "SATISFIED CUSTOMERS", icon: CheckCircle },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 bg-card border-2 border-border hover:border-primary transition-all duration-300"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <div className="text-5xl md:text-6xl font-black mono-number mb-2 text-primary">
                  {stat.value}
                </div>
                <div className="text-sm font-bold tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            ASE CERTIFIED PROFESSIONALS
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {ABOUT_CONTENT.certificationText}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
