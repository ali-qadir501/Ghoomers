import React from 'react';
import { motion } from 'motion/react';
import { Search, Compass, Calendar, CheckCircle2, Star, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      title: "Discover Local Hosts",
      desc: "Connect with verified local experts from GB and Chitral who show you their own world, not a rehearsed itinerary.",
      icon: <Search className="text-sky-600" />,
      color: "bg-sky-50"
    },
    {
      title: "Select Your Journey",
      desc: "Choose between Cultural, Adventure, or Elite packages tailored for international standards of safety and comfort.",
      icon: <Compass className="text-emerald-600" />,
      color: "bg-emerald-50"
    },
    {
      title: "Direct Connect",
      desc: "Reserve your dates and chat with your host. We provide full visa support and secure logistics for international arrivals.",
      icon: <Calendar className="text-amber-600" />,
      color: "bg-amber-50"
    },
    {
      title: "Secure Journey",
      desc: "Enjoy your experience with full GHOOMERS SOS support and secure payment release after the tour ends.",
      icon: <ShieldCheck className="text-indigo-600" />,
      color: "bg-indigo-50"
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 block">Connections</span>
          <h2 className="text-5xl md:text-8xl font-light text-slate-900 mb-10 font-display tracking-tight leading-[0.95]">
            FROM GB TO <br />
            <span className="font-extrabold text-emerald-500 italic">YOUR WORLD</span>
          </h2>
          <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto opacity-70">
            We've removed the agencies. Ghoomers.pk is about raw, person-to-person connections with the people of Northern Pakistan.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col p-10 rounded-[48px] bg-slate-50/50 border border-slate-100 group hover:bg-white hover:border-sky-500/20 transition-all duration-700"
              >
                <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-10 shadow-lg shadow-black/5 transition-all duration-700 group-hover:scale-110", step.color)}>
                  {React.cloneElement(step.icon as React.ReactElement, { size: 28 })}
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-black text-slate-300 tabular-nums">0{i + 1}</span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight font-display">{step.title}</h3>
                <p className="text-slate-500 font-medium text-base leading-relaxed opacity-80">
                   {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-32 p-16 bg-slate-900 rounded-[56px] overflow-hidden relative shadow-[0_64px_128px_-32px_rgba(0,0,0,0.4)]">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-sky-500/5 blur-3xl rounded-full" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
            <div className="max-w-xl">
              <h4 className="text-4xl font-light text-white mb-6 font-display tracking-tight leading-[1.1]">
                Ready to start your <br />
                <span className="font-extrabold italic text-sky-400">mountain odyssey?</span>
              </h4>
              <p className="text-xl text-slate-400 font-medium">Join thousands of travelers who have discovered the real Pakistan through our local expert network.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
               <button className="px-10 py-5 bg-white/5 text-white border border-white/10 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all duration-500">
                 Become a Guide
               </button>
               <button className="px-10 py-5 bg-sky-600 text-white rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-sky-500 transition-all duration-500 flex items-center justify-center gap-2 group shadow-xl shadow-sky-600/20">
                 Explore Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
