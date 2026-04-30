import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, MapPin, Mountain, Star, ArrowRight, CheckCircle2, ChevronLeft } from 'lucide-react';
import { DISTRICT_DATA } from '../data/districtData';
import { cn } from '../lib/utils';

interface ExplorePageProps {
  onBack: () => void;
  initialDistrict?: string;
}

const ExplorePage: React.FC<ExplorePageProps> = ({ onBack, initialDistrict }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict || Object.keys(DISTRICT_DATA)[0]);
  const data = DISTRICT_DATA[selectedDistrict];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold transition-colors"
          >
            <ChevronLeft size={20} />
            Back to Home
          </button>
          <div className="text-slate-900 font-black tracking-tighter text-xl uppercase">
            District <span className="text-emerald-500">Guides</span>
          </div>
          <div className="w-24 px-4" /> {/* Spacer */}
        </div>
      </nav>

      <main className="pt-32 pb-24 relative overflow-hidden">
        {/* Decorative Background Text */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-[0.03] select-none">
          <h2 className="text-[35vw] font-black uppercase leading-none whitespace-nowrap -ml-[15%] mt-[5%] rotate-[-5deg]">
            {selectedDistrict}
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6">
                <Globe size={14} />
                Global Destination Explorer
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 font-display mb-8 tracking-tight leading-[0.85]">
                Uncover the <br />
                <span className="text-emerald-500 italic">North</span>
              </h1>
              <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-xl">
                A definitive guide to the districts of Pakistan. Navigate through ancient routes, alpine summits, and cultural heartlands.
              </p>
            </div>

            {/* Sticky District Selector */}
            <div className="lg:sticky lg:top-32 flex flex-wrap items-center justify-start gap-3 max-w-xl bg-slate-50/50 p-6 rounded-[32px] border border-slate-100 backdrop-blur-sm">
              <h3 className="w-full text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 text-center lg:text-left">Select a District</h3>
              {Object.keys(DISTRICT_DATA).map((district) => (
                <button
                  key={district}
                  onClick={() => setSelectedDistrict(district)}
                  className={cn(
                    "px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 border",
                    selectedDistrict === district 
                      ? "bg-slate-900 border-slate-900 text-white shadow-2xl shadow-slate-900/30 scale-105" 
                      : "bg-white border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-600"
                  )}
                >
                  {district}
                </button>
              ))}
            </div>
          </div>

          {/* Featured District View */}
          <div className="space-y-24">
            {/* Hero Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <motion.div 
                key={`${selectedDistrict}-main-img`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="lg:col-span-7 relative rounded-[56px] overflow-hidden aspect-square lg:aspect-auto h-[600px] shadow-2xl"
              >
                <img 
                  src={data.image} 
                  alt={selectedDistrict} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                <div className="absolute bottom-12 left-12">
                  <h2 className="text-8xl font-black text-white tracking-tighter uppercase leading-[0.8]">
                    {selectedDistrict}
                  </h2>
                </div>
              </motion.div>

              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-4">The Essence</h3>
                    <p className="text-3xl font-bold text-slate-800 leading-tight">
                      {data.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between">
                      <div className="text-4xl font-black text-slate-900 mb-1">{data.stats.guides}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest uppercase">Verified Guides</div>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col justify-between">
                      <div className="text-4xl font-black text-emerald-600 mb-1">{data.stats.expeditions}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest uppercase">Tours</div>
                    </div>
                  </div>

                  <div className="pt-8">
                    <button className="px-10 py-5 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest inline-flex items-center gap-3 hover:bg-emerald-600 transition-colors shadow-xl group">
                      Book a Guide for {selectedDistrict}
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {/* Column 1: Locations */}
              <div>
                <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-6 uppercase">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-600 italic font-black">
                    L
                  </div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tighter">Iconic Landmarks</h4>
                </div>
                <div className="space-y-4">
                  {(data.locations || []).map((loc, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all cursor-default border border-transparent hover:border-slate-200"
                    >
                      <div className="w-8 h-8 rounded-full border-2 border-sky-200 flex items-center justify-center text-[10px] font-black text-sky-600">
                        {i + 1}
                      </div>
                      <span className="text-sm font-bold text-slate-700">{loc}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Column 2: Treks */}
              <div>
                <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-6 uppercase">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 italic font-black">
                    T
                  </div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tighter">Wilderness Trails</h4>
                </div>
                <div className="space-y-3">
                  {(data.treksHikes || []).map((trek, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="group p-5 bg-slate-900 rounded-[24px] hover:bg-emerald-600 transition-all duration-300"
                    >
                      <span className="text-sm font-bold text-white block mb-1">{trek}</span>
                      <span className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest">Karakoram Route</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Column 3: Things to Do */}
              <div>
                <div className="flex items-center gap-4 mb-10 border-b border-slate-100 pb-6 uppercase">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 italic font-black">
                    E
                  </div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tighter">Signature Acts</h4>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {(data.thingsToDo || []).map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-4 p-4 hover:bg-amber-50/50 rounded-2xl transition-colors group"
                    >
                      <div className="mt-1">
                        <CheckCircle2 size={18} className="text-amber-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <span className="text-sm font-medium text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
