import React from 'react';
import { motion } from 'motion/react';
import { Compass, User, Bike, Footprints, ArrowRight, Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MarketplaceBadgesProps {
  onBadgeClick: (id: string) => void;
}

export const MarketplaceBadges: React.FC<MarketplaceBadgesProps> = ({ onBadgeClick }) => {
  const categories = [
    {
      id: 'expeditions',
      title: 'High Alt. Odyssey',
      desc: 'Base camps, legendary passes, and technical peaks of the Karakoram.',
      icon: <Compass className="text-emerald-600" />,
      tag: 'Grand Traverse',
      bg: 'bg-emerald-500/5',
      accent: 'text-emerald-600'
    },
    {
      id: 'heritage',
      title: 'Sikh & Heritage',
      desc: 'Exploring Kartarpur and the ancient history of the Indus Valley.',
      icon: <Zap className="text-amber-600" />,
      tag: 'Specialty Tours',
      bg: 'bg-amber-500/5',
      accent: 'text-amber-600'
    },
    {
      id: 'autumn',
      title: 'Autumn & Blossoms',
      desc: 'Capture Hunza in spring bloom or the peak colors of fall.',
      icon: <Compass className="text-sky-600" />,
      tag: 'Seasonal',
      bg: 'bg-sky-500/5',
      accent: 'text-sky-600'
    },
    {
      id: 'moto',
      title: 'Moto & 4x4 Support',
      desc: 'Ride mountain roads or self-drive Hilux convoys with total logistics.',
      icon: <Bike className="text-rose-600" />,
      tag: 'Logistics Pro',
      bg: 'bg-rose-500/5',
      accent: 'text-rose-600'
    }
  ];

  return (
    <section className="py-12 bg-transparent relative z-20 -mt-20 sm:-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => onBadgeClick(cat.id)}
              className="group text-left p-8 rounded-[48px] bg-white border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] flex flex-col justify-between h-full relative overflow-hidden transition-all duration-700 hover:border-sky-500/20"
            >
              {/* Subtle hover background sweep */}
              <div className={cn("absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-700 opacity-[0.03]", cat.bg)} />
              
              <div className="relative">
                <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mb-10 shadow-lg shadow-black/5 transition-all duration-700 group-hover:scale-110", cat.bg)}>
                  {React.cloneElement(cat.icon as React.ReactElement, { size: 32 })}
                </div>
                <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] mb-4 transition-colors group-hover:bg-white", cat.accent)}>
                  {cat.tag}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight font-display">{cat.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 opacity-70">
                  {cat.desc}
                </p>
              </div>

              <div className="relative flex items-center gap-2 text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] pt-6 border-t border-slate-50">
                Explore Now
                <ArrowRight size={14} className="translate-x-0 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
