import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Users, Star, ArrowRight, Shield } from 'lucide-react';
import { LocalExperience } from '../../data/experiences';
import { useCurrency } from '../../context/CurrencyContext';

interface ExperienceCardProps {
  experience: LocalExperience;
  onSelect?: (experience: LocalExperience) => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onSelect }) => {
  const { formatPrice } = useCurrency();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={() => onSelect?.(experience)}
      className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] hover:shadow-[0_40px_80px_-16px_rgba(16,185,129,0.12)] transition-all duration-700 cursor-pointer"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-widest">
            {experience.category}
          </span>
          {experience.difficulty === 'Easy' && (
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase tracking-widest">
              Easy
            </span>
          )}
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center translate-y-12 group-hover:translate-y-0 transition-transform duration-700">
          <div className="flex items-center gap-1.5 text-white">
            <Star className="fill-amber-400 text-amber-400" size={14} />
            <span className="text-sm font-bold font-display">{experience.rating}</span>
            <span className="text-white/40 text-[10px] font-black uppercase ml-1">({experience.reviewCount} Reviews)</span>
          </div>
          <div className="px-4 py-2 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20">
            ₨{experience.pricePerPersonPKR.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="p-10">
        <div className="flex items-center gap-2 text-emerald-600 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
          <MapPin size={12} />
          {experience.district}
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight leading-tight group-hover:text-emerald-600 transition-colors font-display line-clamp-2 uppercase">
          {experience.title}
        </h3>
        
        <p className="text-slate-500 text-sm font-medium mb-10 line-clamp-2 opacity-70">
          {experience.subtitle}
        </p>

        <div className="grid grid-cols-2 gap-6 mb-10">
          <div className="flex items-center gap-2.5 text-slate-400">
            <Clock size={16} className="text-slate-300" />
            <span className="text-[10px] font-black uppercase tracking-widest">{experience.duration}</span>
          </div>
          <div className="flex items-center gap-2.5 text-slate-400">
            <Users size={16} className="text-slate-300" />
            <span className="text-[10px] font-black uppercase tracking-widest">Cap {experience.maxGroupSize}</span>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
              <Shield size={16} />
            </div>
            <div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-0.5 opacity-60">Verified Guide</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase">Native Student</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-900/40 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
            <ArrowRight size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
