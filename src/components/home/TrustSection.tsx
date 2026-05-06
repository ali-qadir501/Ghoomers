import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, MapPin, Clock, Users, Zap, Award, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export const TrustSection: React.FC = () => {
  const benefits = [
    {
      title: "Licensed Specialists",
      desc: "Every host is a verified resident with deep local knowledge and government-back credentials.",
      icon: <ShieldCheck className="text-emerald-500" />,
      tag: "Verification",
      bg: "bg-emerald-50"
    },
    {
      title: "Real People",
      desc: "Connect with locals from GB and Chitral who show you their own world, not a rehearsed itinerary.",
      icon: <MapPin className="text-sky-500" />,
      tag: "Authenticity",
      bg: "bg-sky-50"
    },
    {
      title: "Fast Response",
      desc: "Our top hosts maintain a response time of under 1 hour for all inquiries.",
      icon: <Zap className="text-amber-500" />,
      tag: "Efficiency",
      bg: "bg-amber-50"
    },
    {
      title: "Secure Payments",
      desc: "Your funds are held safely and only released to the host after your experience.",
      icon: <Award className="text-indigo-500" />,
      tag: "Security",
      bg: "bg-indigo-50"
    }
  ];

  return (
    <section id="trust" className="py-32 bg-[#fdfcfb] overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start gap-16 mb-20">
          <div className="lg:w-[45%] sticky top-32">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <CheckCircle2 size={12} className="text-slate-900" />
              The Ghoomers Truth
            </div>
            <h2 className="text-5xl md:text-7xl font-light text-slate-900 mb-10 font-display tracking-tight leading-[0.95]">
              Raw. Local. <br />
              <span className="font-extrabold text-sky-500 italic">Unpackaged.</span>
            </h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10">
              Experience a morning hike to a hidden waterfall, ride motorbikes on mountain roads with a local kid who grew up on them, or eat lunch at a family home in a village with no TripAdvisor listing.
            </p>
            <div className="flex gap-4">
              <div className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm transition-all hover:border-sky-500/30 flex-1">
                <div className="text-4xl font-black text-slate-900 mb-1 tabular-nums">500+</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Verified Guides</div>
              </div>
              <div className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-sm transition-all hover:border-sky-500/30 flex-1">
                <div className="text-4xl font-black text-slate-900 mb-1 tabular-nums">12k</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Happy Travelers</div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-8 rounded-[40px] bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 group"
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-black/5 outline outline-4 outline-slate-50", benefit.bg)}>
                  {React.cloneElement(benefit.icon as React.ReactElement, { size: 24 })}
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                  {benefit.tag}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight font-display tracking-tight">{benefit.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium opacity-80">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Brand Bar */}
        <div className="pt-24 border-t border-slate-200/60 flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
           {['GILGIT BALTISTAN', 'TOURISM DEPARTMENT', 'SKARDU COUNCIL', 'HUNZA ASSOCIATION', 'PTDC'].map((brand) => (
             <div key={brand} className="text-[10px] font-black text-slate-400 tracking-[0.4em] uppercase">
               {brand}
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};
