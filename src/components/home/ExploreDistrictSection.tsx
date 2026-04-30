import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ArrowRight, Mountain, Star, CheckCircle2, Navigation } from 'lucide-react';
import { cn } from '../../lib/utils';

// We'll define the district data locally for now or pass it as props
const DISTRICT_DATA: Record<string, any> = {
  'Skardu': {
    image: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&fit=crop&q=80&w=1200',
    stats: { guides: 42, treks: 15, elevation: '2,228m' },
    highlights: ['Cold Desert', 'Shangrila Lake', 'Manthoka Waterfall'],
    treksHikes: ['Deosai National Park Trail', 'Marsur Rock Hike', 'Katpana Dunes Walk'],
    thingsToDo: ['Local organic dining in City Center', 'Traditional polo matches', 'Handicraft shopping']
  },
  'Hunza': {
    image: 'https://images.unsplash.com/photo-1594916812420-534bc6761ce6?auto=format&fit=crop&q=80&w=1200',
    stats: { guides: 85, treks: 24, elevation: '2,438m' },
    highlights: ['Altit/Baltit Forts', 'Attabad Lake', 'Passu Cones'],
    treksHikes: ['Rakaposhi Base Camp', 'Passu Glacier Trek', 'Eagle Nest Hike'],
    thingsToDo: ['Apricot blossom festivals', 'Ancient fort tours', 'Hussaini Bridge crossing']
  },
  'Chitral': {
    image: 'https://images.unsplash.com/photo-1627814420959-5777df48092f?auto=format&fit=crop&q=80&w=1200',
    stats: { guides: 28, treks: 12, elevation: '1,500m' },
    highlights: ['Kalash Valley', 'Lowari Pass', 'Tirich Mir'],
    treksHikes: ['Garam Chashma Trail', 'Kalasha Village Walk', 'Bumburet Valley Trek'],
    thingsToDo: ['Chilam Joshi festival', 'Kalasha cultural experiences', 'Thermal spring baths']
  }
};

interface ExploreDistrictSectionProps {
  onExploreDistrict?: (district: string) => void;
}

export const ExploreDistrictSection: React.FC<ExploreDistrictSectionProps> = ({ onExploreDistrict }) => {
  const [selectedDistrict, setSelectedDistrict] = useState('Hunza');
  const data = DISTRICT_DATA[selectedDistrict];

  return (
    <section id="explore" className="py-32 bg-white overflow-hidden relative border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 block">Interactive Atlas</span>
            <h2 className="text-5xl md:text-8xl font-light text-slate-900 mb-8 font-display tracking-tight leading-[0.95]">
              DIVE INTO THE <br />
              <span className="font-extrabold text-emerald-500 italic uppercase">NORTHERN VALLEYS.</span>
            </h2>
            <p className="text-slate-500 text-xl font-medium leading-relaxed opacity-70">
              Every valley has its own soul. Select a district to find real people from GB and Chitral showing you their world through raw, unpackaged experiences.
            </p>
          </div>

          <div className="flex bg-slate-50 p-2 rounded-full w-full lg:w-auto h-fit overflow-x-auto no-scrollbar border border-slate-100">
            {Object.keys(DISTRICT_DATA).map((district) => (
              <button
                key={district}
                onClick={() => setSelectedDistrict(district)}
                className={cn(
                  "px-8 py-4 rounded-full text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-[0.2em]",
                  selectedDistrict === district 
                    ? "bg-white text-slate-900 shadow-xl shadow-black/5" 
                    : "text-slate-400 hover:text-slate-600"
                )}
              >
                {district}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Main Content Area */}
          <motion.div 
            key={selectedDistrict}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full"
          >
            <div className="relative aspect-[16/10] rounded-[56px] overflow-hidden mb-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] group border-8 border-slate-50">
              <img 
                src={data.image} 
                alt={selectedDistrict} 
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                <div className="bg-white/10 backdrop-blur-md px-6 py-5 rounded-[24px] border border-white/20">
                  <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">Elevation</div>
                  <div className="text-2xl font-bold text-white font-display">{data.stats.elevation}</div>
                </div>
                <button 
                  onClick={() => onExploreDistrict?.(selectedDistrict)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white p-7 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 group/btn"
                >
                  <ArrowRight size={32} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 mb-12">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-emerald-600 font-black uppercase tracking-[0.2em] text-[10px]">
                  <Navigation size={14} /> Local Supply
                </div>
                <div className="text-4xl font-bold text-slate-900 font-display tracking-tight">{data.stats.guides} Verified</div>
                <p className="text-slate-500 text-sm font-medium opacity-70">Native experts born and raised in {selectedDistrict}.</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-emerald-600 font-black uppercase tracking-[0.2em] text-[10px]">
                  <Mountain size={14} /> Active Routes
                </div>
                <div className="text-4xl font-bold text-slate-900 font-display tracking-tight">{data.stats.treks} Major Treks</div>
                <p className="text-slate-500 text-sm font-medium opacity-70">From easy day-walks to 12-day base camp expeditions.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Highlights</div>
              <div className="flex flex-wrap gap-2">
                {data.highlights.map((h: string) => (
                  <span key={h} className="px-4 py-2 rounded-xl bg-slate-50 text-slate-600 text-xs font-bold border border-slate-100">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Details Sidebar Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            <motion.div 
              key={`${selectedDistrict}-treks`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-black/10">
                  <Mountain size={22} />
                </div>
                <h4 className="text-3xl font-bold text-slate-900 tracking-tight font-display leading-[0.9]">Trek & <br/>Hike</h4>
              </div>
              <div className="space-y-4">
                {data.treksHikes.map((trek: string, i: number) => (
                  <div key={i} className="group p-5 bg-white border border-slate-100 hover:border-emerald-500/30 hover:bg-emerald-50/30 rounded-[28px] transition-all duration-500 cursor-pointer">
                    <div className="flex items-center gap-5">
                      <span className="text-[10px] font-black text-emerald-600 opacity-40 group-hover:opacity-100 transition-opacity tracking-[0.1em]">{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-sm font-bold text-slate-700 leading-tight group-hover:text-slate-900 transition-colors uppercase tracking-widest">{trek}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              key={`${selectedDistrict}-todo`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col"
            >
              <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-xl shadow-amber-500/20">
                  <Star size={22} />
                </div>
                <h4 className="text-3xl font-bold text-slate-900 tracking-tight font-display leading-[0.9]">Culture & <br/>Dining</h4>
              </div>
              <div className="space-y-5">
                {data.thingsToDo.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-4 pb-5 border-b border-slate-100 hover:border-amber-500/30 transition-all group cursor-default">
                    <div className="mt-1">
                      <CheckCircle2 size={16} className="text-amber-500 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-sm font-medium text-slate-500 group-hover:text-slate-900 transition-colors leading-tight">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-auto pt-16">
                 <button 
                  onClick={() => onExploreDistrict?.(selectedDistrict)}
                  className="w-full py-5 bg-slate-900 text-white rounded-full font-black uppercase tracking-[0.2em] text-[10px] hover:bg-emerald-600 transition-all shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)]"
                 >
                   Explore Full {selectedDistrict} Map
                 </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
