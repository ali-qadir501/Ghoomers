import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, ChevronDown, ArrowRight, Sparkles, Compass, Globe, Bike, Heart } from 'lucide-react';
import { type Destination } from '../../lib/utils';
import { cn } from '../../lib/utils';

interface HeroProps {
  onBecomeGuide: () => void;
  onDestinationSelect: (dest: Destination) => void;
  onNavClick: (id: string) => void;
  onExploreClick: () => void;
  onSearch: (query: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onBecomeGuide, 
  onDestinationSelect, 
  onNavClick, 
  onExploreClick,
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [mountainIndex, setMountainIndex] = useState(0);
  const mountains = ["Karakoram", "Himalaya", "Hindu Kush", "Pamir"];

  useEffect(() => {
    const timer = setInterval(() => {
      setMountainIndex((prev) => (prev + 1) % mountains.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-slate-900">
      {/* Background with higher quality mountain image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=2000" 
          alt="Pakistan Mountains" 
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900" />
      </div>

      {/* Animated geometric elements for modern feel */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-sky-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Sparkles size={12} className="animate-spin-slow" />
              Premier International Gateway
            </div>
            
            <h1 className="text-5xl md:text-8xl font-light text-white leading-[0.95] tracking-tight mb-8 font-display">
              The <br />
              <div className="relative inline-block h-[1.1em] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={mountains[mountainIndex]}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-emerald-400 font-black whitespace-nowrap"
                  >
                    {mountains[mountainIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="invisible font-black">Hindu Kush</span>
              </div>
              <br />
              Has a Guide<br />
              For You.
            </h1>

            <p className="text-xl text-slate-400 font-medium leading-relaxed mb-10 max-w-xl">
              Not expeditions. Not agencies. Real people from GB and Chitral showing you their world—raw, local, and unpackaged.
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              {[
                { label: 'Visa Support', icon: <Sparkles size={14} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                { label: 'Zero Middleman', icon: <MapPin size={14} />, color: 'text-sky-400', bg: 'bg-sky-500/10' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                  <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", item.bg, item.color)}>
                    {item.icon}
                  </div>
                  <span className="text-white font-bold text-[10px] uppercase tracking-widest">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { label: 'Treks', icon: <Compass size={12} /> },
                { label: 'Culture', icon: <Globe size={12} /> },
                { label: 'Cycling', icon: <Bike size={12} /> },
                { label: 'Honeymoon', icon: <Heart size={12} /> },
                { label: 'Day Tours', icon: <MapPin size={12} /> }
              ].map((style, i) => (
                <button
                  key={i}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-bold text-white/70 hover:text-white uppercase tracking-widest transition-all flex items-center gap-2"
                >
                  {style.icon}
                  {style.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSearch} className="relative max-w-xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-emerald-500 rounded-[34px] blur opacity-20 group-focus-within:opacity-40 transition duration-1000" />
              <div className="relative bg-white/95 backdrop-blur-xl rounded-[32px] p-1.5 flex items-center shadow-2xl transition-all duration-500">
                <div className="flex-1 flex items-center px-6">
                  <Search className="text-slate-400 mr-3 group-focus-within:text-sky-600 transition-colors" size={20} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search destinations or guides..." 
                    className="w-full bg-transparent border-none outline-none py-3.5 text-slate-900 font-medium placeholder:text-slate-400"
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-slate-900 hover:bg-black text-white px-8 py-3.5 rounded-[26px] font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl flex items-center gap-2"
                >
                  Search
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Visual content for hero right side */}
            <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl border-8 border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=1200" 
                alt="Guide in action" 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
              
              {/* Floating review card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 p-6 bg-white/90 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl max-w-sm"
              >
                <div className="flex gap-1 text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => <Sparkles key={i} size={16} className="fill-current" />)}
                </div>
                <p className="text-slate-800 font-bold mb-4 italic">"Ali was the best guide I've ever had. He took us to places in Skardu that weren't even on the map!"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 font-black">S</div>
                  <div>
                    <div className="text-slate-900 font-black text-sm uppercase tracking-tighter">David Thorne</div>
                    <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">Expeditionist from USA</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
