import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Info } from 'lucide-react';
import { motion } from '../../utils/motion';
import { useLanguage } from '../../context/LanguageContext';

export const featuredDestinationsList = [
  {
    id: "lalibela",
    slug: "lalibela",
    name: "Lalibela",
    corridor: "Northern Historical Corridor",
    category: "UNESCO Rock-Hewn Churches",
    image: "/images/lalibela.jpg",
    narrative: "Monolithic churches chiseled from volcanic tuff in the 12th–13th century, connected by subterranean trenches."
  },
  {
    id: "gondar",
    slug: "gondar",
    name: "Gondar",
    corridor: "Imperial Northern Corridor",
    category: "17th Century Royal Castles",
    image: "/images/gondar.jpg",
    narrative: "The 'Camelot of Africa', featuring the stone palaces of Emperor Fasilides and angelic ceiling frescoes of Debre Berhan Selassie."
  },
  {
    id: "axum",
    slug: "axum",
    name: "Axum",
    corridor: "Ancient Tigray Corridor",
    category: "Aksumite Monolithic Stelae",
    image: "/images/axum.jpg",
    narrative: "The cradle of ancient Ethiopian civilization, famous for soaring granite obelisks, archaeological crypts, and historic roots."
  },
  {
    id: "harar-jugol",
    slug: "harar-jugol",
    name: "Harar Jugol",
    corridor: "Eastern Cultural Corridor",
    category: "Historic Walled Islamic City",
    image: "/images/harar-jugol.jpg",
    narrative: "Centuries-old fortified city with maze-like alleyways, distinct Harari cultural houses, and enduring traditions."
  },
  {
    id: "dallol",
    slug: "dallol",
    name: "Dallol & Danakil Basin",
    corridor: "Afar Geothermal Corridor",
    category: "Hydrothermal Geological Wonder",
    image: "/images/dallol.jpg",
    narrative: "Vibrant neon-hued mineral springs, salt pans, and volcanic formations set in one of Earth's lowest terrestrial basins."
  },
  {
    id: "blue-nile-falls",
    slug: "blue-nile-falls",
    name: "Blue Nile Falls",
    corridor: "Lake Tana Corridor",
    category: "Highland Cascade (Tis Abay)",
    image: "/images/blue-nile-falls.jpg",
    narrative: "The roaring smoke of fire, where the Blue Nile cascades over volcanic basalt cliffs near Bahir Dar."
  },
  {
    id: "sof-omar-caves",
    slug: "sof-omar-caves",
    name: "Sof Omar Caves",
    corridor: "Southeastern Karst Corridor",
    category: "Underground Limestone System",
    image: "/images/sof-omar-caves.jpg",
    narrative: "One of Africa's most extensive subterranean cavern networks, carved by the meandering Weyib River through limestone pillars."
  }
];

export default function PopularDestinations() {
  const { language } = useLanguage();
  const rotatingDestinations = [...featuredDestinationsList, ...featuredDestinationsList];

  return (
    <section className="py-20 sm:py-28 bg-[#F8F6F0] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* Section Header with Reveal Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-[#1F3D28] bg-[#E8DCC4] border border-[#D8C9AA] mb-3">
              <Compass className="w-3.5 h-3.5 text-[#8B5CF6]" />
              <span>ILLUSTRATIVE DESTINATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#1F3D28] tracking-tight">
              Landmarks of Regional Discovery
            </h2>
          </div>

          <div className="flex items-center gap-4 self-start md:self-end">
            <span className="hidden md:inline-block text-xs font-mono text-slate-500">
              Hover to examine
            </span>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1F3D28] hover:text-[#8B5CF6] transition-colors group"
            >
              <span>Explore All Landmarks</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 text-[#8B5CF6]" />
            </Link>
          </div>
        </motion.div>

        {/* Informative Guidance Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 p-4 rounded-2xl bg-white border border-[#E8DCC4] flex items-center gap-3 text-xs text-slate-600 shadow-2xs"
        >
          <Info className="w-4 h-4 text-[#8B5CF6] shrink-0" />
          <span>
            <strong>Traveler Note:</strong> Regional destinations are presented illustratively for corridor context. Confirmed itineraries, transport schedules, and verified quotes are customized upon inquiry.
          </span>
        </motion.div>

      </div>

      {/* Infinite Slow Rotating Marquee Track with Smooth Pause on Hover */}
      <div className="relative w-full overflow-hidden group">
        {/* Left & Right Vignette Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-[#F8F6F0] via-[#F8F6F0]/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-[#F8F6F0] via-[#F8F6F0]/80 to-transparent" />

        {/* Scrolling Strip */}
        <div className="animate-marquee-slow flex items-stretch gap-6 px-4">
          {rotatingDestinations.map((dest, idx) => (
            <Link
              key={`${dest.id}-${idx}`}
              to={`/destinations#${dest.slug}`}
              className="group/card flex flex-col w-[260px] sm:w-[290px] md:w-[320px] shrink-0 bg-white rounded-3xl overflow-hidden border border-[#E8DCC4] shadow-xs hover:shadow-2xl hover:-translate-y-2 hover:border-[#1F3D28] transition-all duration-400 select-none"
            >
              {/* Image Container with Zoom Physics */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#1F3D28]">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover/card:scale-108 transition-transform duration-700 ease-out filter brightness-[0.88]"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/images/lalibela.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B12]/80 via-transparent to-transparent" />
                
                {/* Micro Corridor Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0D1B12]/80 backdrop-blur-md text-[10px] font-mono text-[#E8DCC4] border border-white/20">
                  {dest.corridor}
                </div>
              </div>

              {/* Card Info Area */}
              <div className="p-5 flex flex-col justify-between flex-1 bg-white">
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#1F3D28] group-hover/card:text-[#8B5CF6] transition-colors">
                    {dest.name}
                  </h3>
                  <p className="text-xs font-mono text-[#8B5CF6] mt-0.5 font-semibold">
                    {dest.category}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {dest.narrative}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#1F3D28]">
                  <span>Corridor Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8B5CF6] transition-transform group-hover/card:translate-x-1.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
