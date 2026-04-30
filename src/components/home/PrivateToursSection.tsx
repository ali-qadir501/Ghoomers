import React from 'react';
import { motion } from 'motion/react';
import { Compass, ArrowRight, Star, Clock, User, ShieldCheck } from 'lucide-react';
import { type LocalExperience, getFeaturedExperiences } from '../../data/experiences';
import { cn } from '../../lib/utils';

interface PrivateToursSectionProps {
  onViewAll: () => void;
  onSelect: (exp: LocalExperience) => void;
}

export const PrivateToursSection: React.FC<PrivateToursSectionProps> = ({ onViewAll, onSelect }) => {
  const featured = getFeaturedExperiences(3);
  
  return (
    <section id="private-tours" className="py-32 bg-[#faf9f6]/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 block">Premium Inventory</span>
            <h2 className="text-5xl md:text-8xl font-light text-slate-900 mb-8 font-display tracking-tight leading-[0.95]">
              PRIVATE MOUNTAIN <br />
              <span className="font-extrabold text-emerald-500 italic uppercase">Logistics.</span>
            </h2>
            <p className="text-slate-500 text-xl font-medium leading-relaxed opacity-70">
              Find 100% private, fully-customizable tours led by verified local experts. From luxury valley stays to high-altitude base camp logistics.
            </p>
          </div>
          <button 
            onClick={onViewAll}
            className="px-10 py-5 bg-slate-900 text-white rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] flex items-center gap-3 group shrink-0"
          >
            <Compass size={18} />
            Explore Full Inventory
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featured.map((experience, i) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group"
            >
               <ExperienceCard experience={experience} onSelect={onSelect} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Internal Experience Card for this section to maintain distinct look
const ExperienceCard: React.FC<{ experience: LocalExperience; onSelect: (exp: LocalExperience) => void }> = ({ experience, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(experience)}
      className="bg-white rounded-[48px] overflow-hidden border border-slate-100 shadow-xl hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 cursor-pointer group"
    >
      <div className="relative h-80 overflow-hidden">
        <img 
          src={experience.image} 
          alt={experience.title} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0f172a]/90 to-transparent" />
        
        <div className="absolute top-8 left-8 flex flex-col gap-2">
           <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
             {experience.category}
           </div>
        </div>

        <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                 {[1, 2, 3].map(j => (
                   <div key={j} className="w-8 h-8 rounded-full border border-white/20 bg-slate-200 overflow-hidden shadow-lg">
                     <img src={`https://i.pravatar.cc/100?u=${experience.id}${j}`} alt="Guide" className="w-full h-full object-cover" />
                   </div>
                 ))}
              </div>
              <div className="text-[10px] font-black text-white/70 uppercase tracking-widest">+ {experience.maxGroupSize} Specialists</div>
           </div>
           <div className="bg-emerald-500/90 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-sm">
             <ShieldCheck size={10} />
             Verified
           </div>
        </div>
      </div>

      <div className="p-10">
        <div className="flex items-center gap-2 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6">
          <Star size={12} className="fill-current" />
          {experience.rating || 5.0} • {experience.reviewCount || 0} REVIEWS
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-emerald-600 transition-colors tracking-tight leading-tight font-display line-clamp-2">
          {experience.title}
        </h3>
        
        <div className="flex items-center gap-6 mb-10 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
           <div className="flex items-center gap-2.5">
             <Clock size={14} className="text-slate-300" />
             {experience.duration}
           </div>
           <div className="flex items-center gap-2.5">
             <User size={14} className="text-slate-300" />
             PRIVATE GROUP
           </div>
        </div>

        <div className="flex items-center justify-between pt-10 border-t border-slate-100">
           <div>
              <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest block mb-2 opacity-60">Estimated Cost</span>
              <div className="flex items-baseline gap-1.5 text-slate-900">
                 <span className="text-3xl font-bold font-display">Rs{experience.pricePerPersonPKR.toLocaleString()}</span>
                 <span className="text-[10px] font-black uppercase tracking-widest opacity-40">PKR</span>
              </div>
           </div>
           <div className="w-14 h-14 rounded-2xl bg-white text-slate-900 border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all duration-700 shadow-sm group-hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]">
              <ArrowRight size={20} />
           </div>
        </div>
      </div>
    </div>
  );
}
