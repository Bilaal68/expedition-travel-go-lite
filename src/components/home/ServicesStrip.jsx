import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Compass, Building2, MapPin, ArrowRight } from 'lucide-react';
import { fourServices } from '../../data/navigation';

export default function ServicesStrip() {
  const iconMap = {
    "guzo-certified-ticketing": Plane,
    "corridor-tour-operations": Compass,
    "b2b-corporate-travel-logistics": Building2,
    "local-hospitality-curation": MapPin,
  };

  return (
    <section className="w-full bg-[#E8DCC4] border-y border-[#D8C9AA] relative z-20 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D8C9AA]">
          {fourServices.map((svc) => {
            const Icon = iconMap[svc.id] || Compass;
            return (
              <Link
                key={svc.id}
                to={`/services/${svc.slug}`}
                className="group flex items-center justify-between p-4 sm:py-5 sm:px-6 transition-all duration-200 hover:bg-[#F3EDE0]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1F3D28] text-[#E8DCC4] flex items-center justify-center shrink-0 group-hover:bg-[#152B1C] transition-colors">
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-[#1F3D28]/60 uppercase tracking-widest block font-bold">
                      {svc.tag}
                    </span>
                    <span className="text-xs sm:text-[13px] font-bold text-[#1F3D28] group-hover:text-[#152B1C] transition-colors block">
                      {svc.title}
                    </span>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-[#8B5CF6] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
