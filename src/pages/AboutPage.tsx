import React from 'react';
import { motion } from 'motion/react';
import { Globe, Users, Target, Award, ArrowRight, ShieldCheck, Heart, Sparkles } from 'lucide-react';

const TEAM = [
  { name: 'Imran Malik', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80' },
  { name: 'Saba Ahmed', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80' },
  { name: 'Zaid Khan', role: 'Community Lead', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80' },
  { name: 'Ayesha Omer', role: 'Guide Vetting', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80' },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="mb-24 text-center">
          <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Our Story</span>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[0.9]">
            REDEFINING<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500 font-display">ADVENTURE</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Born in the heart of the Karakoram, Ghoomers was founded to connect world travelers with the raw, authentic spirit of Pakistan through the eyes of local experts.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          <div className="p-12 bg-slate-50 dark:bg-slate-900 rounded-[48px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 text-sky-500 group-hover:scale-110 transition-transform">
               <Globe size={200} />
            </div>
            <div className="relative z-10">
               <div className="w-16 h-16 bg-sky-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-sky-500/20">
                  <Target size={32} />
               </div>
               <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Our Mission</h2>
               <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                  To empower local communities by providing a platform where their knowledge and heritage become an asset, while giving travelers the most authentic and safe experiences imaginable.
               </p>
            </div>
          </div>
          <div className="p-12 bg-emerald-50 dark:bg-emerald-950/20 rounded-[48px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-5 text-emerald-500 group-hover:scale-110 transition-transform">
               <Sparkles size={200} />
            </div>
            <div className="relative z-10">
               <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/20">
                  <Globe size={32} />
               </div>
               <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Our Vision</h2>
               <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed">
                  To become the world's most trusted gateway to South Asian adventure, where every journey contributes to the preservation of culture and the sustainability of the mountains.
               </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-32">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">WHY CHOOSE US?</h2>
              <div className="w-24 h-2 bg-gradient-to-r from-sky-500 to-emerald-500 mx-auto rounded-full" />
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Verified Experts', icon: <ShieldCheck />, desc: 'Every guide goes through a 9-step vetting process including local background checks.' },
                { title: 'Ethical Travel', icon: <Heart />, desc: 'We ensure fair wages and direct support to the local families hosted in the valleys.' },
                { title: 'Safety First', icon: <Award />, desc: '24/7 dedicated support and real-time tracking for high-altitude expeditions.' },
              ].map((item, i) => (
                <div key={i} className="text-center p-8">
                   <div className="text-sky-500 mb-6 flex justify-center">
                      {React.cloneElement(item.icon, { size: 48 })}
                   </div>
                   <h4 className="text-xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">{item.title}</h4>
                   <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Team Section */}
        <div className="mb-32">
           <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
              <div className="max-w-2xl">
                 <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">The Humans Behind</span>
                 <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">MEET OUR TEAM</h2>
              </div>
              <button className="flex items-center gap-2 text-sky-600 font-black text-xs uppercase tracking-widest group">
                 Join the team
                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {TEAM.map((member, i) => (
                <div key={i} className="group text-center">
                   <div className="relative mb-6 rounded-[32px] overflow-hidden aspect-square shadow-xl shadow-black/5">
                      <img src={member.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={member.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                   </div>
                   <h4 className="text-lg font-black text-slate-900 dark:text-white mb-1 uppercase tracking-tight">{member.name}</h4>
                   <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{member.role}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Press / Careers Stub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-12 border-2 border-slate-100 dark:border-slate-800 rounded-[48px] flex flex-col items-center text-center">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">PRESS ROOM</h3>
              <p className="text-slate-500 font-medium mb-8">Download media kits, brand assets, and read our latest press releases.</p>
              <button className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all">
                 Newsroom
              </button>
           </div>
           <div className="p-12 border-2 border-slate-100 dark:border-slate-800 rounded-[48px] flex flex-col items-center text-center">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">JOIN US</h3>
              <p className="text-slate-500 font-medium mb-8">We're always looking for passionate people to join our global mission.</p>
              <button className="px-8 py-4 bg-sky-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-sky-600 transition-all">
                 Careers
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
