import React from 'react';
import { motion } from 'motion/react';
import { Bike, Wrench, Navigation, Backpack, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface MotoTrekHomeSectionProps {
  onExplore: () => void;
}

export const MotoTrekHomeSection: React.FC<MotoTrekHomeSectionProps> = ({ onExplore }) => {
  return (
    <section id="moto-trek" className="py-24 bg-slate-900 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 blur-[160px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-sky-500/10 blur-[160px] rounded-full translate-y-1/2 -translate-x-1/2" />
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
              <Bike size={14} className="text-emerald-500" />
              Vertical Exploration
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-white mb-8 font-display leading-[0.9] tracking-tighter uppercase">
              THROTTLE <br />
              <span className="text-emerald-500">THROUGH CLOUDS.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-xl font-medium">
              Ride motorbikes on mountain roads with a local kid who grew up on them. No agencies, no filters—just raw, visceral exploration.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-12">
              {[
                { icon: <Bike className="text-emerald-500" />, title: "Dual Sport Rentals", desc: "150cc to 250cc heavy duty" },
                { icon: <Wrench className="text-sky-500" />, title: "Mobile Mechanics", desc: "4x4 SOS support vans" },
                { icon: <Navigation className="text-amber-500" />, title: "Digital Routes", desc: "GPX files & Waypoints" },
                { icon: <Backpack className="text-rose-500" />, title: "Touring Gear", desc: "Armor, bags & helmets" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-3 group">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-1 group-hover:bg-white/10 transition-colors border border-white/5">
                    {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <div>
                    <div className="text-white font-black text-sm uppercase tracking-tight">{item.title}</div>
                    <div className="text-slate-500 text-xs font-bold leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onExplore}
              className="px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-emerald-500/30 transition-all flex items-center gap-3 group text-sm"
            >
              EXPLORE MOTO TRACKS
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative perspective-1000"
          >
            <div className="relative rounded-[60px] overflow-hidden aspect-[4/5] shadow-2xl border border-white/10 transform-style-3d group">
              <img 
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200" 
                alt="Motorcycle Adventure" 
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
              
              <div className="absolute top-10 right-10 flex flex-col gap-3">
                <div className="bg-emerald-500 text-white px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                  BEST FOR GROUPS
                </div>
              </div>

              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-[40px] border border-white/20 shadow-2xl">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 animate-pulse">
                    <Navigation size={32} />
                  </div>
                  <div>
                    <div className="text-white font-black text-xl tracking-tight">Karakoram Highway</div>
                    <div className="text-emerald-400 text-xs font-black uppercase tracking-widest mt-1">Difficulty: Extreme • 800 KM</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating mechanical data */}
            <motion.div
              animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-12 -left-12 p-8 bg-white rounded-[40px] shadow-2xl border border-slate-100 hidden md:block"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center">
                  <Wrench size={20} className="text-emerald-500" />
                </div>
                <div className="text-slate-900 font-black text-sm uppercase tracking-tighter">Support Network</div>
              </div>
              <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                 <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Active SOS Crews: 14</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
