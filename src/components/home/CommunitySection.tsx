import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, Instagram, Youtube, Twitter, Facebook, Globe, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

export const CommunitySection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-32 bg-slate-900 overflow-hidden relative">
      {/* Abstract Background Design */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.22em] mb-10">
              <Sparkles size={12} />
              Join the Expedition
            </div>
            <h2 className="text-5xl md:text-8xl font-light text-white mb-10 font-display tracking-tight leading-[0.95]">
              STAY IN THE <br />
              <span className="font-extrabold text-emerald-500 italic uppercase">LOOP.</span>
            </h2>
            <p className="text-white/50 text-xl font-medium leading-relaxed mb-12 max-w-xl">
              Receive raw dispatch notes from high-altitude base camps, early access to new trekking routes, and exclusive community events in the Northern Valleys.
            </p>

            <form onSubmit={handleSubmit} className="relative max-w-lg group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur opacity-20 group-focus-within:opacity-40 transition duration-1000" />
              <div className={cn(
                "relative bg-white/10 backdrop-blur-xl border p-1.5 rounded-full flex items-center transition-all duration-500",
                isSubscribed ? "border-emerald-500/50" : "border-white/10"
              )}>
                <input 
                  type="email" 
                  placeholder={isSubscribed ? "You're on the list!" : "your@email.com"}
                  disabled={isSubscribed}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none outline-none text-white px-6 font-bold text-sm flex-1 placeholder:text-white/20"
                />
                <button 
                  type="submit"
                  disabled={isSubscribed}
                  className={cn(
                    "px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-widest transition-all shrink-0 flex items-center gap-2",
                    isSubscribed ? "bg-emerald-500 text-white" : "bg-emerald-500 hover:bg-emerald-400 text-white"
                  )}
                >
                  {isSubscribed ? 'Subscribed' : 'Join Us'}
                  <ArrowRight size={14} className={isSubscribed ? 'hidden' : ''} />
                </button>
              </div>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { label: 'Instagram', icon: <Instagram />, count: '45k+', link: '#' },
              { label: 'YouTube', icon: <Youtube />, count: '12k+', link: '#' },
              { label: 'Twitter', icon: <Twitter />, count: '8k+', link: '#' },
              { label: 'Facebook', icon: <Facebook />, count: '22k+', link: '#' },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.link}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:bg-emerald-500 transition-colors">
                  {React.cloneElement(social.icon as React.ReactElement, { size: 24 })}
                </div>
                <h4 className="text-white font-bold text-lg mb-1 font-display tracking-tight">{social.label}</h4>
                <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">{social.count} Followers</p>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-2">
             <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-white/30 text-[10px] font-black uppercase tracking-[0.3em]">Operational in 3 Districts</span>
           </div>
           <div className="flex gap-8">
             {['Hunza', 'Skardu', 'Chitral', 'Gilgit'].map(v => (
               <span key={v} className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">{v}</span>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};
