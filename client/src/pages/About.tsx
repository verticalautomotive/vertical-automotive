/**
 * About Us Page — Industrial Brutalism Design
 * Blue accents, diagonal elements, bold typography
 */
import { ABOUT_CONTENT, COMPANY } from "@/lib/data";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <PageHero
        title="ABOUT US"
        breadcrumb={[
          { label: "HOME", href: "/" },
          { label: "ABOUT US" },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1400&q=80"
      />

      {/* About Content */}
      <section className="bg-background py-16">
        <div className="container max-w-4xl">
          <p className="text-lg leading-relaxed text-muted-foreground mb-8">
            {ABOUT_CONTENT.intro}
          </p>

          <h2 className="font-display text-3xl font-black tracking-wider mb-4">
            OUTSTANDING <span className="text-primary">REPUTATION</span>
          </h2>
          <div className="h-1 w-16 bg-primary mb-6" />
          <p className="text-muted-foreground leading-relaxed mb-12">
            {ABOUT_CONTENT.reputation}
          </p>

          <h2 className="font-display text-3xl font-black tracking-wider mb-4">
            COMMUNITY <span className="text-primary">INVOLVEMENT</span>
          </h2>
          <div className="h-1 w-16 bg-primary mb-6" />
          <p className="text-muted-foreground leading-relaxed mb-12">
            {ABOUT_CONTENT.community}
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-secondary text-secondary-foreground py-16 diagonal-top">
        <div className="container">
          <h2 className="font-display text-4xl md:text-5xl font-black text-center tracking-wider mb-4">
            WHY <span className="text-primary">CHOOSE US</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-12" />

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {ABOUT_CONTENT.whyChooseUs.map((item, i) => (
              <div
                key={i}
                className="border border-border p-8 hover:border-primary/50 transition-colors grid-pattern"
              >
                <h3 className="font-display text-xl font-bold tracking-wider mb-4 text-primary">
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

      {/* Stats Banner */}
      <section
        className="relative py-20"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1400&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: COMPANY.yearsExperience, label: "Years of Experience" },
              { value: COMPANY.vehiclesRepaired, label: "Vehicles Repaired" },
              { value: COMPANY.staff, label: "Staff" },
              { value: COMPANY.satisfaction, label: "Satisfied Customers" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-5xl md:text-7xl font-black text-white mono-number">
                  {stat.value}
                </div>
                <p className="text-white/80 text-sm mt-2 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
