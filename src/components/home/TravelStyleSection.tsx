import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Mountain, Users, Heart, Bolt, Camera, Bike, Compass, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TravelStyleSectionProps {
  onStyleClick: (style: string) => void;
}

export const TravelStyleSection: React.FC<TravelStyleSectionProps> = ({ onStyleClick }) => {
  const styles = [
    { title: "Sightseeing", icon: <MapPin />, image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=600&q=80", count: 24, color: "from-sky-500" },
    { title: "Hiking & Trekking", icon: <Mountain />, image: "https://images.unsplash.com/photo-1587570441551-789069d2d2a4?auto=format&fit=crop&w=600&q=80", count: 18, color: "from-emerald-500" },
    { title: "Cultural Immersion", icon: <Users />, image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=600&q=80", count: 12, color: "from-indigo-500" },
    { title: "Honey-Trek", icon: <Heart />, image: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&w=600&q=80", count: 8, color: "from-rose-500" },
    { title: "Moto Expeditions", icon: <Bike />, image: "https://images.unsplash.com/photo-1627896157734-4d7d4388f24b?auto=format&fit=crop&w=600&q=80", count: 15, color: "from-amber-500" },
    { title: "Photography", icon: <Camera />, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80", count: 10, color: "from-sky-600" },
    { title: "Village Stays", icon: <Compass />, image: "https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=600&q=80", count: 6, color: "from-emerald-600" },
    { title: "Heritage", icon: <Mountain />, image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=600&q=80", count: 5, color: "from-slate-600" },
  ];

  return (
    <section id="styles" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-4">
            <Bolt size={14} className="fill-indigo-500" />
            Travel Styles
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 font-display mb-6 tracking-tight leading-none uppercase">
            CHOOSE YOUR <span className="text-indigo-600">ADVENTURE</span>
          </h2>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            From high-adrenaline mountain quests to serene cultural escapes, find the travel style that matches your spirit.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((style, i) => (
            <motion.div 
              key={style.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -12 }}
              onClick={() => onStyleClick(style.title)}
              className="relative h-80 rounded-[40px] overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <img 
                src={style.image} 
                alt={style.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              {/* Colorful sweep on hover */}
              <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-40 bg-gradient-to-br transition-opacity duration-500", style.color, "to-transparent")} />

              <div className="absolute bottom-8 left-8 right-8">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white mb-4 border border-white/20 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-500">
                  {React.cloneElement(style.icon as React.ReactElement, { size: 24 })}
                </div>
                <h4 className="text-2xl font-black text-white mb-1 group-hover:text-sky-400 transition-colors">{style.title}</h4>
                <div className="flex items-center gap-2">
                  <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">{style.count} Verified Tours</p>
                  <ArrowRight size={14} className="text-white/40 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button 
            onClick={() => onStyleClick('All')}
            className="inline-flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-200 group"
          >
            <Compass size={24} />
            Browse All Marketplace Listings
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
