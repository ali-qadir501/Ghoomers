import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, Shield, Phone, HelpCircle, BookOpen, Clock, AlertTriangle } from 'lucide-react';

const FAQS = [
  { q: "How do I book a private tour?", a: "To book a tour, simply navigate to the tour page, select your preferred date and group size, and click 'Book Now'. You will be guided through a secure checkout process." },
  { q: "Are the guides verified?", a: "Yes, every guide on Ghoomers undergoes a 9-step vetting process, including ID verification, local background checks, and professional certifications." },
  { q: "What is the cancellation policy?", a: "We offer three tiers of cancellation policies. Most tours offer free cancellation up to 48 hours before the trip. Check the specific tour page for details." },
  { q: "Can I customize an itinerary?", a: "Absolutely! You can message any guide directly from their profile to discuss custom requirements and bespoke itineraries." },
  { q: "Is travel insurance required?", a: "While not mandatory for booking, we strongly recommend all travelers have comprehensive travel insurance, especially for high-altitude trekking." },
];

export const HelpCenterPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Header */}
        <div className="bg-slate-900 rounded-[48px] p-12 md:p-20 text-center mb-20 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-900/20 to-emerald-900/20" />
           <div className="relative z-10">
              <span className="text-sky-500 font-black text-xs uppercase tracking-widest mb-4 block">Support Hub</span>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tighter">HOW CAN WE<br /><span className="text-sky-400">HELP YOU?</span></h1>
              <div className="max-w-2xl mx-auto relative">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                 <input 
                    type="text" 
                    placeholder="Search for articles, guides, or help topics..." 
                    className="w-full pl-16 pr-8 py-5 bg-white/10 border border-white/10 rounded-2xl text-white font-bold placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                 />
              </div>
           </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
           {[
             { title: 'Safety Guide', icon: <Shield />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
             { title: 'Booking Help', icon: <BookOpen />, color: 'text-sky-500', bg: 'bg-sky-50' },
             { title: 'Payments', icon: <Clock />, color: 'text-amber-500', bg: 'bg-amber-50' },
             { title: 'Emergency', icon: <Phone />, color: 'text-rose-500', bg: 'bg-rose-50' },
           ].map((item, i) => (
             <div key={i} className="p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl text-center group cursor-pointer hover:shadow-xl hover:shadow-black/5 transition-all">
                <div className={`${item.bg} dark:bg-white/5 ${item.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                   {React.cloneElement(item.icon, { size: 32 })}
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">{item.title}</h4>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
           {/* FAQ Section */}
           <div className="lg:col-span-2">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-10 tracking-tight flex items-center gap-4">
                 <HelpCircle className="text-sky-500" size={28} />
                 FREQUENTLY ASKED QUESTIONS
              </h2>
              <div className="space-y-4">
                 {FAQS.map((faq, i) => (
                    <div key={i} className="border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
                       <button 
                          onClick={() => setOpenIndex(openIndex === i ? null : i)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                       >
                          <span className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">{faq.q}</span>
                          <ChevronDown className={`text-slate-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} size={20} />
                       </button>
                       <AnimatePresence>
                          {openIndex === i && (
                             <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-slate-50 dark:bg-slate-900/50"
                             >
                                <p className="p-6 text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                   {faq.a}
                                </p>
                             </motion.div>
                          )}
                       </AnimatePresence>
                    </div>
                 ))}
              </div>
           </div>

           {/* Safety Sidebar */}
           <div>
              <div className="bg-slate-900 p-10 rounded-[40px] text-white">
                 <AlertTriangle className="text-amber-500 mb-6" size={48} />
                 <h3 className="text-2xl font-black mb-6 tracking-tight">TRAVEL ADVISORY</h3>
                 <p className="text-white/60 text-sm font-medium leading-relaxed mb-8">
                    Stay updated with the latest safety protocols for trekking in the Karakoram. Our safety team monitor conditions 24/7.
                 </p>
                 <div className="space-y-4">
                    {[
                      { l: 'Weather Updates', v: 'Normal' },
                      { l: 'Route Status', v: 'Open' },
                      { l: 'Service Level', v: 'Optimal' },
                    ].map((stat, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-white/10">
                         <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.l}</span>
                         <span className="text-emerald-500 font-black text-xs uppercase">{stat.v}</span>
                      </div>
                    ))}
                 </div>
                 <button className="w-full mt-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all">
                    Safety Protocols
                 </button>
              </div>

              <div className="mt-8 p-10 bg-sky-50 dark:bg-slate-900 border border-sky-100 dark:border-slate-800 rounded-[40px]">
                 <h4 className="text-xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">CONTACT SUPPORT</h4>
                 <p className="text-slate-500 text-sm font-medium mb-8">Can't find what you're looking for?</p>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm">
                          <Phone size={18} className="text-sky-500" />
                       </div>
                       <span className="text-slate-900 dark:text-white font-bold">+92 51 000 0000</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm">
                          <HelpCircle size={18} className="text-sky-500" />
                       </div>
                       <span className="text-slate-900 dark:text-white font-bold">24/7 Live Chat</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
