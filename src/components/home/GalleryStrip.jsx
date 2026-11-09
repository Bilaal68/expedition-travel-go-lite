import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../common/ScrollReveal';

const galleryItems = [
  {
    id: 1,
    title: "Lalibela",
    region: "Amhara",
    subtitle: "Rock-Hewn Churches",
    link: "/destinations#lalibela",
    image: "/images/lalibela.jpg",
    ratio: "aspect-[4/3] sm:aspect-[4/5] lg:aspect-[1.1/1]",
    span: "col-span-2 sm:col-span-2 lg:col-span-2",
  },
  {
    id: 2,
    title: "Gondar",
    region: "Amhara",
    subtitle: "Historic Royal Castles",
    link: "/destinations#gondar",
    image: "/images/gondar.jpg",
    ratio: "aspect-[3/4] sm:aspect-[9/16]",
    span: "col-span-1",
  },
  {
    id: 3,
    title: "Axum",
    region: "Tigray",
    subtitle: "Ancient Obelisks",
    link: "/destinations#axum",
    image: "/images/axum.jpg",
    ratio: "aspect-[3/4] sm:aspect-[9/16]",
    span: "col-span-1",
  },
  {
    id: 4,
    title: "Harar Jugol",
    region: "Harari",
    subtitle: "Historic Walled City",
    link: "/destinations#harar-jugol",
    image: "/images/harar-jugol.jpg",
    ratio: "aspect-[3/4] sm:aspect-[9/16]",
    span: "col-span-1",
  },
  {
    id: 5,
    title: "Blue Nile Falls",
    region: "Bahir Dar",
    subtitle: "Tis Issat Cascades",
    link: "/destinations#blue-nile-falls",
    image: "/images/blue-nile-falls.jpg",
    ratio: "aspect-[3/4] sm:aspect-[9/16]",
    span: "col-span-1",
  },
  {
    id: 6,
    title: "Sof Omar Caves",
    region: "Bale",
    subtitle: "Underground Caverns",
    link: "/destinations#sof-omar-caves",
    image: "/images/sof-omar-caves.jpg",
    ratio: "aspect-[3/4] sm:aspect-[9/16]",
    span: "col-span-1",
  },
  {
    id: 7,
    title: "Dallol",
    region: "Danakil",
    subtitle: "Geothermal Landscapes",
    link: "/destinations#dallol",
    image: "/images/dallol.jpg",
    ratio: "aspect-[3/4] sm:aspect-[9/16]",
    span: "col-span-1",
  },
];

export default function GalleryStrip() {
  return (
    <section className="w-full bg-white pt-8 sm:pt-12 pb-14 sm:pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delay={50}>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 items-center">
            {galleryItems.map((item) => (
              <Link
                key={item.id}
                to="/destinations"
                className={`group relative rounded-2xl overflow-hidden ${item.span} shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block bg-navy-950 border border-slate-200/80`}
                title={`${item.title} (${item.region})`}
              >
                <div className={`w-full ${item.ratio} relative overflow-hidden`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="500"
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out brightness-[0.92] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <div className="text-[10px] font-bold text-gold-400 uppercase tracking-wider">{item.region}</div>
                    <div className="text-xs font-bold leading-tight truncate">{item.title}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
