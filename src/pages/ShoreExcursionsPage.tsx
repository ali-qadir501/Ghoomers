import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Ship, Anchor, MapPin, Search, Calendar, Star, ArrowRight, Shield } from 'lucide-react';

const PORTS = [
  { name: 'Karachi Port', cruises: ['Queen Elizabeth', 'Majestic Princess', 'MSC Virtuosa'] },
  { name: 'Gwadar Port', cruises: ['Silver Whisper', 'Seven Seas Explorer'] },
  { name: 'Bin Qasim', cruises: ['Carnival Splendor'] },
];

const EXCURSIONS = [
  {
    id: 1,
    title: "Old Karachi Heritage Walk",
    port: "Karachi Port",
    duration: "6 Hours",
    price: 85,
    rating: 4.9,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1563294101-70094b8e727c?auto=format&fit=crop&w=800&q=80",
    desc: "A deep dive into the colonial architecture and bustling markets of Karachi's historic core."
  },
  {
    id: 2,
    title: "Churna Island Snorkeling",
    port: "Karachi Port",
    duration: "8 Hours",
    price: 110,
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1544551763-47a0159f963f?auto=format&fit=crop&w=800&q=80",
    desc: "Venture out to the jewel of the Arabian Sea for a day of snorkeling and cliff jumping."
  },
  {
    id: 3,
    title: "Gwadar Coastal Drive",
    port: "Gwadar Port",
    duration: "5 Hours",
    price: 95,
    rating: 4.7,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=800&q=80",
    desc: "Experience the dramatic cliffs and turquoise waters of Hammerhead and the Golden Beach."
  }
];

export const ShoreExcursionsPage: React.FC = () => {
  const [selectedPort, setSelectedPort] = useState('All Ports');

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Port-to-Plate Experiences</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
              PRIVATE SHORE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-600 font-display">EXCURSIONS</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed mb-12">
              Skip the crowded cruise buses. Experience Pakistan with a private local guide who guarantees to get you back to your ship on time.
            </p>
            
            <div className="flex flex-wrap gap-8">
               {[
                 { label: 'Ships Supported', value: '45+', icon: <Ship /> },
                 { label: 'Back-to-Ship', value: '100%', icon: <Shield /> },
               ].map((stat, i) => (
                 <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sky-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-sky-500">
                       {React.cloneElement(stat.icon as React.ReactElement, { size: 24 })}
                    </div>
                    <div>
                       <p className="text-xl font-black text-slate-900 dark:text-white">{stat.value}</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-[48px] p-10 border border-white/10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Anchor size={200} />
             </div>
             <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-8 tracking-tight">Search by Cruise Line</h3>
                <div className="space-y-6">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Arrival Port</label>
                      <div className="relative">
                         <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-sky-500" size={18} />
                         <select 
                            className="w-full pl-14 pr-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                            onChange={(e) => setSelectedPort(e.target.value)}
                         >
                            <option value="All Ports">Select Port</option>
                            {PORTS.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                         </select>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Your Cruise Ship</label>
                      <div className="relative">
                         <Ship className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500" size={18} />
                         <select className="w-full pl-14 pr-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/50">
                            <option>Select Ship</option>
                            {PORTS.find(p => p.name === selectedPort)?.cruises.map(c => <option key={c}>{c}</option>) || 
                             PORTS.flatMap(p => p.cruises).map(c => <option key={c}>{c}</option>)}
                         </select>
                      </div>
                   </div>
                   <button className="w-full py-5 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 group">
                      <Search size={18} />
                      Find Excursions
                   </button>
                </div>
             </div>
          </div>
        </div>

        {/* Excursion Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {EXCURSIONS.map((ex, i) => (
             <motion.div
               key={ex.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="group cursor-pointer"
             >
               <div className="relative h-80 rounded-[40px] overflow-hidden mb-6 shadow-xl shadow-black/5">
                  <img src={ex.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={ex.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                     <div>
                        <div className="flex items-center gap-1.5 text-white/80 text-[10px] font-black uppercase tracking-widest mb-1">
                           <MapPin size={12} className="text-sky-400" />
                           {ex.port}
                        </div>
                        <h4 className="text-xl font-black text-white tracking-tight">{ex.title}</h4>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Duration</p>
                        <p className="text-white font-black text-sm">{ex.duration}</p>
                     </div>
                  </div>
               </div>
               
               <div className="px-4">
                  <div className="flex items-center gap-4 mb-4">
                     <div className="flex items-center gap-1.5 text-amber-500 text-xs font-black">
                        <Star size={14} fill="currentColor" />
                        {ex.rating}
                     </div>
                     <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{ex.reviews} Reviews</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-6 line-clamp-2">
                     {ex.desc}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                     <div className="text-slate-900 dark:text-white">
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">From</p>
                        <p className="text-2xl font-black">${ex.price}</p>
                     </div>
                     <button className="w-12 h-12 bg-slate-900 dark:bg-sky-500 rounded-2xl flex items-center justify-center text-white transition-all group-hover:scale-110">
                        <ArrowRight size={20} />
                     </button>
                  </div>
               </div>
             </motion.div>
           ))}
        </div>

        {/* Safety Guarantee */}
        <div className="mt-24 p-12 md:p-20 bg-emerald-900 rounded-[48px] relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <Shield className="text-emerald-400 mb-8" size={64} />
                 <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-none">
                    OUR "BACK-TO-SHIP"<br />
                    <span className="text-emerald-400">GUARANTEE</span>
                 </h2>
                 <p className="text-white/70 text-lg font-medium leading-relaxed">
                    We understand the risks of cruise travel. Ghoomers guarantees that if for any reason you miss your ship departure due to our tour, we will pay for your transportation and stay to meet the ship at its next destination.
                 </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 {[
                    'Never Miss Departure',
                    'Private VIP Transport',
                    'Verified Local Experts',
                    'Instant Cancellation',
                    'Multilingual Support',
                    'Full Port Coverage'
                 ].map((feat, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
                       <p className="text-white font-black text-xs uppercase tracking-widest">{feat}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
