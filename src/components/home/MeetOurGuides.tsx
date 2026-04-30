import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, ShieldCheck, Zap, ArrowRight, User } from 'lucide-react';
import { type Guide } from '../../lib/utils';
import { cn } from '../../lib/utils';

interface MeetOurGuidesProps {
  onSelect: (guide: Guide) => void;
  onViewAll: () => void;
  guides: Guide[];
  isLoading: boolean;
}

export const MeetOurGuides: React.FC<MeetOurGuidesProps> = ({ onSelect, onViewAll, guides, isLoading }) => {
  return (
    <section id="guides" className="py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-emerald-50/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
          <div className="max-w-2xl">
            <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 block">Meet the Locals</span>
            <h2 className="text-5xl md:text-8xl font-light text-slate-900 mb-8 font-display tracking-tight leading-[0.95]">
              VERIFIED EXPERTS, <br />
              <span className="font-extrabold text-emerald-500 italic uppercase">BORN AT ALTITUDE.</span>
            </h2>
            <p className="text-slate-500 text-xl font-medium leading-relaxed opacity-70">
              Our guides are not just tour leaders—they are brothers, fathers, and elders of their respective villages who hold the keys to the secret trails.
            </p>
          </div>
          <button 
            onClick={onViewAll}
            className="group px-10 py-5 bg-slate-900 text-white rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-500/10 flex items-center gap-3"
          >
            <User size={18} />
            Explore Full Directory
            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] rounded-[48px] bg-slate-100 animate-pulse" />
            ))
          ) : (
            (guides || []).slice(0, 3).map((guide, i) => (
              <motion.div 
                key={guide.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                onClick={() => onSelect(guide)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden mb-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group-hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.25)] transition-all duration-700">
                  <img 
                    src={guide.image} 
                    alt={guide.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" 
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Glass Card Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/10 to-transparent" />
                  
                  <div className="absolute bottom-10 left-10 right-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.isCNICVerified && (
                        <div className="bg-emerald-500/90 backdrop-blur-md text-white text-[8px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1.5 uppercase tracking-widest shadow-lg">
                          <ShieldCheck size={10} /> CNIC Verified
                        </div>
                      )}
                      {guide.stats?.responseTimeBadge && (
                        <div className="bg-sky-500/90 backdrop-blur-md text-white text-[8px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1.5 uppercase tracking-widest shadow-lg">
                          <Zap size={10} /> Quick Responder
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-white/70 text-[9px] font-black uppercase tracking-[0.2em] mb-2">
                      <MapPin size={12} className="text-emerald-400" />
                      {guide.location}
                    </div>
                    
                    <h3 className="text-4xl font-bold text-white mb-3 tracking-tight font-display">{guide.name}</h3>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Star size={16} className="fill-amber-400 text-amber-400" />
                        <span className="text-xl font-bold text-white font-display">{guide.rating}</span>
                        <span className="text-white/50 text-[9px] uppercase font-black ml-1 tracking-[0.1em]">Rating</span>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-700 shadow-xl">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 relative">
                  <div className="absolute top-0 left-0 w-8 h-1 bg-emerald-500 group-hover:w-24 transition-all duration-700" />
                  <p className="text-slate-500 font-medium leading-relaxed italic text-sm mt-8 opacity-70">
                    "{guide.bio}"
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {(guide.specialties || []).slice(0, 2).map(s => (
                      <span key={s} className="text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 px-3 py-1 rounded-full group-hover:border-emerald-100 group-hover:text-emerald-600 transition-colors">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
