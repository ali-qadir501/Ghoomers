import React from 'react';
import { motion } from 'motion/react';
import { Anchor, Waves, Wind, ArrowRight, Ship, Fish } from 'lucide-react';

const WATER_ACTIVITIES = [
  {
    id: 1,
    title: "Indus River Rafting",
    location: "Skardu",
    level: "Pro",
    price: 120,
    image: "https://images.unsplash.com/photo-1530866495547-08b978d82217?auto=format&fit=crop&w=800&q=80",
    desc: "Experience the thrill of class III-IV rapids on the mighty Indus as it cuts through the Karakoram."
  },
  {
    id: 2,
    title: "Attabad Lake Jet Skiing",
    location: "Hunza",
    level: "Easy",
    price: 45,
    image: "https://images.unsplash.com/photo-1544735745-b81207635b85?auto=format&fit=crop&w=800&q=80",
    desc: "Glide across the vibrant turquoise waters of Attabad Lake surrounded by soaring peaks."
  },
  {
    id: 3,
    title: "Arabian Sea Deep Sea Fishing",
    location: "Karachi/Mubarak Village",
    level: "Medium",
    price: 180,
    image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=800&q=80",
    desc: "Venture into the deep blue of the Arabian Sea for a chance to catch Tuna, Barracuda, and Kingfish."
  },
  {
    id: 4,
    title: "Satpara Lake Boating",
    location: "Skardu",
    level: "Easy",
    price: 30,
    image: "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?auto=format&fit=crop&w=800&q=80",
    desc: "A peaceful rowing experience on the crystal clear Satpara lake, perfect for photography."
  }
];

export const WaterAdventuresPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Aquatic Adventures</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
            RIVERS, LAKES<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-600 font-display">& OCEANS</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-2xl leading-relaxed">
            From high-altitude glacial lakes to the warm waves of the Arabian Sea, discover a different side of Pakistan.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
           {[
              { label: 'Lakes Explored', value: '45+', icon: <Waves /> },
              { label: 'River Miles', value: '1,200', icon: <Wind /> },
              { label: 'Verified Skippers', value: '85', icon: <Anchor /> },
              { label: 'Water Sorts', value: '12', icon: <Fish /> },
           ].map((stat, i) => (
              <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
                 <div className="text-sky-500 mb-4 flex justify-center">{React.cloneElement(stat.icon as React.ReactElement, { size: 28 })}</div>
                 <div className="text-3xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">{stat.value}</div>
                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
           ))}
        </div>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {WATER_ACTIVITIES.map((act, i) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[450px] rounded-[48px] overflow-hidden flex flex-col justify-end p-8"
            >
              <img src={act.image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={act.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1.5 bg-sky-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                    {act.level} Level
                  </span>
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                    <Anchor size={14} className="text-sky-400" />
                    {act.location}
                  </span>
                </div>
                <h3 className="text-3xl font-black text-white mb-4 tracking-tight group-hover:text-sky-400 transition-colors">
                  {act.title}
                </h3>
                <p className="text-white/60 text-sm font-medium mb-8 max-w-md line-clamp-2">
                   {act.desc}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                   <div className="text-white">
                      <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Price per Person</p>
                      <p className="text-2xl font-black">${act.price}</p>
                   </div>
                   <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all transform active:scale-95 shadow-xl">
                      Book Now
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Safety Section */}
        <div className="mt-24 p-12 md:p-20 bg-indigo-900 rounded-[48px] relative overflow-hidden">
           <div className="absolute bottom-0 right-0 p-12 opacity-10">
              <Ship size={250} />
           </div>
           <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-none">
                 SAFETY IS OUR<br />
                 <span className="text-sky-400">ANCHOR</span>
              </h2>
              <p className="text-white/70 text-lg font-medium leading-relaxed mb-10">
                 All our water activities are led by certified skippers and life-guards. We provide international standard safety gear including high-performance life vests and helmets for rafting.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[
                    'UIAA Certified Helmets',
                    'High-Buoyancy Vests',
                    'Certified River Guides',
                    'Equipment Liability'
                 ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80 font-bold text-sm">
                       <div className="w-5 h-5 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400">
                          <Anchor size={12} />
                       </div>
                       {feat}
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
