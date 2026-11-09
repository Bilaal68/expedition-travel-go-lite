import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import SectionHeading from '../components/common/SectionHeading';
import ScrollReveal from '../components/common/ScrollReveal';
import { 
  ShieldCheck, Plane, Compass, Building2, MapPin, 
  FileCheck, Phone, Mail, ArrowRight, Check 
} from 'lucide-react';
import { companyInfo, fourServices } from '../data/navigation';
import { getWhatsAppUrl } from '../utils/whatsapp';

export default function About() {
  const primaryPhone = companyInfo.phones[0];

  useEffect(() => {
    document.title = "About Us | Expedition Travel – Go Lite";
  }, []);

  const credentials = [
    { label: "Company Legal Name", value: "Expedition Travel – Go Lite" },
    { label: "Association Accreditation", value: "Ethiopian Travel Agents Association (ETAA)" },
    { label: "Trade License Number", value: "MOT/ETA/2024/042" },
    { label: "Primary Executive Contact", value: "Hana Lema" },
    { label: "Direct Phone / WhatsApp", value: "+251 912 669 088" },
    { label: "Official Communications Email", value: "expeditionsguzo@gmail.com" },
    { label: "Operations Desk", value: "Addis Ababa, Ethiopia" },
    { label: "Ticketing Certification", value: "Certified Guzo Aviation Workflows" },
  ];

  const operatingPrinciples = [
    {
      title: "Regulatory Compliance & ETAA Standards",
      desc: "Operating strictly under active trade license MOT/ETA/2024/042 with certified ETAA consumer protections and ethical standards.",
    },
    {
      title: "Certified Aviation Logistics",
      desc: "Official Guzo ticketing authorization enabling rapid e-ticket issuance, seat choices, and reliable flight adjustments.",
    },
    {
      title: "Transit Corridor Ground Security",
      desc: "Safety-inspected transport, seasoned regional drivers, and checkpoint monitoring across strategic Ethiopian corridors.",
    },
    {
      title: "Direct Accountability with Hana Lema",
      desc: "Personalized travel coordination where clients and corporate managers communicate directly with agency leadership.",
    },
  ];

  return (
    <div className="flex flex-col bg-[#F8F6F0]">
      {/* Page Hero */}
      <PageHero
        badge="AGENCY CREDENTIALS"
        title="About Expedition Travel – Go Lite"
        subtitle="ETAA-accredited Ethiopian travel agency based in Addis Ababa. Certified Guzo flight ticketing, transit corridor tour operations, B2B corporate logistics, and vetted hospitality."
        breadcrumbs={[{ label: "About" }]}
        image="/images/hero-1.jpg"
      />

      {/* Narrative Section */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#E8DCC4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <ScrollReveal direction="left" className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-[#1F3D28] bg-[#E8DCC4]/60 border border-[#D8C9AA]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>EXECUTIVE OVERVIEW</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#1F3D28] leading-tight">
                Authentic Travel Management with Grounded Local Intelligence
              </h2>

              <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                <strong>Expedition Travel – Go Lite</strong> is an accredited Ethiopian travel agency based in Addis Ababa, operating as an active member of the <strong>Ethiopian Travel Agents Association (ETAA)</strong> under Trade License <strong>MOT/ETA/2024/042</strong>.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Led by <strong>Hana Lema</strong>, our agency provides travelers, international visitors, and organizations with verified ticketing pipelines, structured corridor logistics, and reliable corporate travel management.
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                From domestic flight bookings between regional centers to cross-country transit operations, our Addis Ababa desk coordinates every detail with verified documentation and attentive oversight.
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="bg-[#1F3D28] hover:bg-[#152B1C] text-[#E8DCC4] hover:text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full inline-flex items-center gap-2 transition-all shadow-md"
                >
                  <span>Connect with Hana Lema</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6]" />
                </Link>

                <a
                  href={getWhatsAppUrl(primaryPhone.raw)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-full bg-[#E8DCC4] text-[#1F3D28] font-bold text-xs uppercase tracking-wider hover:bg-[#F3EDE0] transition-colors"
                >
                  Direct WhatsApp
                </a>
              </div>
            </ScrollReveal>

            {/* Official Credentials Dossier */}
            <ScrollReveal direction="right" className="lg:col-span-5">
              <div className="bg-[#152B1C] p-6 sm:p-8 rounded-3xl border border-[#1F3D28] text-[#E8DCC4] shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#8B5CF6]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">Verified Credentials</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8B5CF6] uppercase">Active</span>
                </div>

                <div className="space-y-2.5 text-xs">
                  {credentials.map((item, idx) => (
                    <div key={idx} className="flex flex-col py-1.5 border-b border-white/5 last:border-0">
                      <span className="text-[#E8DCC4]/60 font-mono text-[11px]">{item.label}</span>
                      <strong className="text-white text-xs sm:text-sm font-semibold mt-0.5">{item.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-[11px] font-mono text-[#E8DCC4]/50 leading-relaxed">
                  Verified with the Ethiopian Ministry of Trade & Regional Integration & ETAA.
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Operating Principles Grid */}
      <section className="py-20 sm:py-24 bg-[#F8F6F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-[#1F3D28] bg-[#E8DCC4] border border-[#D8C9AA] mb-3">
              <span>SERVICE PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#1F3D28] tracking-tight">
              Principles of Direct Accountability
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              How Expedition Travel – Go Lite coordinates travel logistics for individual explorers and organizational partners.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {operatingPrinciples.map((p, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-[#E8DCC4] shadow-xs flex flex-col justify-between hover:shadow-xl hover:border-[#1F3D28] transition-all duration-300"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#1F3D28] text-[#8B5CF6] flex items-center justify-center font-mono font-bold text-sm mb-5">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#1F3D28] mb-2.5">
                    {p.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4 Pillars Presentation Strip */}
      <section className="py-20 bg-white border-y border-[#E8DCC4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#8B5CF6] block mb-1">
                OPERATIONAL SCOPE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1F3D28]">
                Four Verified Service Capabilities
              </h2>
            </div>
            <Link
              to="/services"
              className="text-xs font-bold uppercase tracking-wider text-[#1F3D28] hover:text-[#8B5CF6] inline-flex items-center gap-1.5"
            >
              <span>Explore Pillar Details</span>
              <ArrowRight className="w-4 h-4 text-[#8B5CF6]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fourServices.map((svc) => (
              <Link
                key={svc.id}
                to={`/services/${svc.slug}`}
                className="p-6 rounded-3xl bg-[#F8F6F0] border border-[#E8DCC4] hover:border-[#1F3D28] hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#8B5CF6] uppercase tracking-wider block mb-2">
                    {svc.tag}
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#1F3D28] group-hover:text-[#152B1C] transition-colors mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {svc.shortDesc}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8DCC4] flex items-center justify-between text-xs font-bold text-[#1F3D28]">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6] transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Consultation CTA */}
      <section className="py-16 bg-[#1F3D28] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-white">
            Plan Directly with Our Addis Ababa Operations Desk
          </h2>
          <p className="text-[#E8DCC4]/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Contact Hana Lema at +251 912 669 088 or expeditionsguzo@gmail.com for verified booking assistance, corporate accounts, or corridor expedition planning.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="bg-[#E8DCC4] hover:bg-white text-[#1F3D28] font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-full inline-flex items-center gap-2"
            >
              <span>Submit Travel Inquiry</span>
              <ArrowRight className="w-4 h-4 text-[#8B5CF6]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
