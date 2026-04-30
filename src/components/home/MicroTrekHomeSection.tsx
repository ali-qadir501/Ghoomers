import React from 'react';
import { motion } from 'motion/react';
import { Trees, Users, Navigation, CreditCard, MessageSquare, ArrowRight, Quote } from 'lucide-react';

interface MicroTrekHomeSectionProps {
  onExplore: () => void;
}

export const MicroTrekHomeSection: React.FC<MicroTrekHomeSectionProps> = ({ onExplore }) => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Organic Shapes Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-50 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-sky-50 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-black uppercase tracking-[0.2em] mb-8">
              <Trees size={14} className="fill-emerald-600/20" /> 
              COMMUNITY: MICRO TREKS
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-none font-display uppercase">
              WALK WITH THE <br />
              <span className="text-emerald-500">VILLAGE ELDERS.</span>
            </h2>
            <p className="text-slate-500 text-xl mb-12 leading-relaxed font-medium">
              A morning hike to a hidden waterfall, or lunch at a family home in a village that has no TripAdvisor listing. This is unpackaged Northern Pakistan.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
              {[
                { label: 'Village Hosts', value: '30+ Natives', icon: Users, color: 'text-sky-500', bg: 'bg-sky-50' },
                { label: 'Time-Honored Routes', value: 'Short & Soulful', icon: Navigation, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { label: 'Transparent Price', value: 'Fixed: $15 - $25', icon: CreditCard, color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'Heritage Stories', value: 'Tea & Folklore', icon: MessageSquare, color: 'text-indigo-500', bg: 'bg-indigo-50' }
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-lg shadow-black/5", stat.bg, stat.color)}>
                    <stat.icon size={28} />
                  </div>
                  <div>
                    <p className="text-slate-900 font-black text-lg tracking-tight leading-none mb-1">{stat.value}</p>
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onExplore}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-widest transition-all shadow-2xl shadow-emerald-500/20 flex items-center gap-3 group text-sm"
            >
              EXPLORE COMMUNITY TREKS
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative rounded-[64px] overflow-hidden border-[12px] border-slate-50 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1000" 
                alt="Hiking with local guide" 
                className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-12 left-12 right-12 p-8 rounded-[40px] bg-white/90 backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                    <Quote size={28} className="fill-current opacity-20" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-black text-lg tracking-tight uppercase">Local Wisdom</p>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Village Host Network</p>
                  </div>
                </div>
                <p className="text-slate-700 text-base font-bold italic leading-relaxed">
                  "These trails have been our life for generations. We don't just show you the path; we show you the soul of our mountains."
                </p>
              </div>
            </div>
            
            {/* Visual accent */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-[20px] border-emerald-500/10 rounded-full animate-spin-slow" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Internal utility since I cannot use the external one yet without import loop worries if I'm not careful
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
