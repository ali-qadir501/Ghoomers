import React from 'react';
import { motion } from 'motion/react';
import { Search, MessageSquare, CreditCard, Mountain, ArrowRight, UserCheck, Calendar, ShieldCheck } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      title: "Find Your Guide",
      desc: "Browse our curated list of verified local experts. Filter by specialty, language, or specific adventure styles like trekking or cultural tours.",
      icon: <Search />,
      color: "bg-sky-500"
    },
    {
      title: "Design Your Trip",
      desc: "Message guides directly to customize your itinerary. Discuss your pace, interests, and any special requirements you might have.",
      icon: <MessageSquare />,
      color: "bg-emerald-500"
    },
    {
      title: "Book Securely",
      desc: "Confirm your dates and pay through our multi-currency secure checkout. Your payment is held safely until the tour is complete.",
      icon: <CreditCard />,
      color: "bg-amber-500"
    },
    {
      title: "Start Exploring",
      desc: "Meet your guide and embark on your journey. Enjoy peace of mind with our 24/7 on-ground support and safety protocols.",
      icon: <Mountain />,
      color: "bg-rose-500"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Travel Simplified</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
            ADVENTURE<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500 font-display">MADE EASY</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed">
            We bridge the gap between world travelers and local legends. Here is how Ghoomers works for you.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
               {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-8 h-px bg-slate-200 dark:bg-slate-800 z-0" />
               )}
               <div className="p-10 bg-slate-50 dark:bg-slate-900 rounded-[40px] h-full border border-slate-100 dark:border-slate-800 hover:border-sky-500/30 transition-all duration-500 shadow-xl shadow-black/5 hover:shadow-2xl">
                  <div className={`w-16 h-16 ${step.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-black/5 group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                     {React.cloneElement(step.icon as React.ReactElement, { size: 32 })}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight">
                    {i + 1}. {step.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                    {step.desc}
                  </p>
               </div>
            </div>
          ))}
        </div>

        {/* Trust Elements */}
        <div className="bg-slate-900 rounded-[48px] p-12 md:p-20 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-12 opacity-5 text-white">
              <ShieldCheck size={300} />
           </div>
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-none">
                    WHY BOOK WITH<br /><span className="text-sky-400">GHOOMERS?</span>
                 </h2>
                 <div className="space-y-8">
                    {[
                      { icon: <UserCheck />, title: 'Verified Guides', desc: 'Every guide is hand-vetted for safety and expertise.' },
                      { icon: <Calendar />, title: 'Instant Booking', desc: 'Real-time availability and transparent pricing.' },
                      { icon: <ShieldCheck />, title: 'Payment Protection', desc: 'Secure payments with local & international support.' },
                    ].map((feat, i) => (
                      <div key={i} className="flex gap-6">
                         <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-sky-400 shrink-0">
                            {React.cloneElement(feat.icon as React.ReactElement, { size: 24 })}
                         </div>
                         <div>
                            <h4 className="text-lg font-black text-white uppercase tracking-tight mb-1">{feat.title}</h4>
                            <p className="text-white/40 text-sm font-medium">{feat.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="relative lg:block hidden">
                 <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[40px] shadow-2xl">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-12 h-12 bg-sky-500 rounded-xl flex items-center justify-center text-white">
                          <CheckCircle size={24} />
                       </div>
                       <h3 className="text-xl font-black text-white">Ready to Go?</h3>
                    </div>
                    <p className="text-white/60 mb-8 font-medium">Join over 12,000 travelers who have experienced Pakistan the GHoomer way.</p>
                    <button className="w-full py-5 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-sky-500/20 transition-all flex items-center justify-center gap-3 group">
                       Start Searching
                       <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const CheckCircle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
