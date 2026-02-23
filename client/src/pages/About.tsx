/**
 * About Us Page — Matches verticalautomotive.com/about-us-vertical-automotive/
 * Hero, intro text, why choose us grid, community involvement
 */
import { ABOUT_CONTENT, COMPANY } from "@/lib/data";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
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
      <section className="bg-white text-black py-16">
        <div className="container max-w-4xl">
          <p className="text-lg leading-relaxed text-gray-700 mb-8">
            {ABOUT_CONTENT.intro}
          </p>

          <h2 className="font-display text-3xl font-black tracking-wider mb-4">
            OUTSTANDING REPUTATION
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            {ABOUT_CONTENT.reputation}
          </p>

          <h2 className="font-display text-3xl font-black tracking-wider mb-4">
            COMMUNITY INVOLVEMENT
          </h2>
          <p className="text-gray-700 leading-relaxed mb-12">
            {ABOUT_CONTENT.community}
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-black py-16">
        <div className="container">
          <h2 className="font-display text-4xl md:text-5xl font-black text-center tracking-wider mb-12">
            WHY CHOOSE US
          </h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {ABOUT_CONTENT.whyChooseUs.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 p-8 hover:border-green-400/30 transition-colors"
              >
                <h3 className="font-display text-xl font-bold tracking-wider mb-4 text-green-400">
                  {item.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-sm">
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
                <div className="font-display text-5xl md:text-7xl font-black text-white">
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
