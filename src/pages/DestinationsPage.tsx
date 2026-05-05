import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowRight, Star, TrendingUp } from 'lucide-react';
import { DESTINATIONS } from '../lib/utils';

export const DestinationsPage: React.FC<{ onSelect: (dest: any) => void }> = ({ onSelect }) => {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Our Reach</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
            DISCOVER THE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500 font-display">EPICENTERS</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
            From the soaring peaks of the Karakoram to the historic streets of Lahore, explore Pakistan's most iconic destinations.
          </p>
        </div>

        {/* Featured Regions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {DESTINATIONS.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative h-[500px] rounded-[40px] overflow-hidden cursor-pointer shadow-2xl shadow-black/5"
              onClick={() => onSelect(dest)}
            >
              <div className="absolute inset-0">
                <img 
                  src={dest.image} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={dest.name} 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
              </div>

              <div className="absolute top-8 right-8">
                <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center gap-2 text-white">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-black uppercase tracking-widest">{dest.rating || '4.9'}</span>
                </div>
              </div>

              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-2 text-sky-400 text-[10px] font-black uppercase tracking-widest mb-3">
                  <MapPin size={14} />
                  {dest.region}
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight font-display">{dest.name}</h3>
                <p className="text-white/60 text-sm font-medium mb-8 line-clamp-2">
                  {dest.description}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="text-white">
                      <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Starts From</p>
                      <p className="text-xl font-black">${dest.price}</p>
                    </div>
                  </div>
                  <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 transition-all group-hover:bg-sky-500 group-hover:text-white group-hover:scale-110">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Categories / Styles */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-[48px] p-12 md:p-20 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <TrendingUp size={300} />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Trending Now</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
                POPULAR<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">TRAVEL STYLES</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-12">
                We believe adventure is personal. Choose a destination based on the type of experience you're seeking.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Alpine Expeditions', count: 24 },
                  { name: 'Heritage Trails', count: 18 },
                  { name: 'Coastal Escapes', count: 12 },
                  { name: 'Jeep Adventures', count: 35 },
                ].map((style) => (
                  <div key={style.name} className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between group cursor-pointer hover:border-sky-500 transition-all">
                    <div>
                      <h4 className="text-slate-900 dark:text-white font-black text-sm uppercase tracking-tight mb-1">{style.name}</h4>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{style.count} Tours</p>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
               <div className="grid grid-cols-2 gap-4">
                  <img src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=600&q=80" className="rounded-3xl h-64 object-cover mt-12" alt="Mountain" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80" className="rounded-3xl h-64 object-cover" alt="Lake" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80" className="rounded-3xl h-64 object-cover" alt="Valley" referrerPolicy="no-referrer" />
                  <img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80" className="rounded-3xl h-64 object-cover -mt-12" alt="Starlit sky" referrerPolicy="no-referrer" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
