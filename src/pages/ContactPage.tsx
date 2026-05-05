import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageSquare, Send, Globe, Instagram, Facebook, Twitter } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Column: Info */}
          <div>
            <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Get In Touch</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
              WE'RE HERE TO<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500 font-display">HELP YOU</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xl font-medium mb-12 leading-relaxed">
              Have questions about a trek? Need help finding a verified guide? Our team is available 24/7 to ensure your adventure is seamless.
            </p>

            <div className="space-y-8 mb-16">
              {[
                { icon: <Phone />, label: 'Call Us', value: '+92 300 1234567', desc: 'Mon-Sun, 24/7 emergency support' },
                { icon: <Mail />, label: 'Email', value: 'hello@ghoomer.pk', desc: 'Brief us on your requirements' },
                { icon: <MapPin />, label: 'Office', value: 'Gilgit City, Northern Pakistan', desc: 'Visit us for local assistance' },
                { icon: <Globe />, label: 'WhatsApp', value: '+92 300 7654321', desc: 'Instant support for travelers' },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-black/5 shrink-0">
                    {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</h4>
                    <p className="text-lg font-black text-slate-900 dark:text-white mb-1 group-hover:text-sky-600 transition-colors">{item.value}</p>
                    <p className="text-slate-400 text-xs font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
               {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-sky-500 hover:text-white transition-all">
                     <Icon size={20} />
                  </button>
               ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-10 md:p-14 bg-slate-50 dark:bg-slate-900/50 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-black/5"
          >
            <div className="flex items-center gap-4 mb-10">
               <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
                  <MessageSquare size={24} />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Drop us a Message</h3>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">We'll get back within 2 hours</p>
               </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                <select className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all appearance-none cursor-pointer">
                   <option>General Inquiry</option>
                   <option>Booking Assistance</option>
                   <option>Become a Guide</option>
                   <option>Custom Itinerary Plan</option>
                   <option>Safety Concerns</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                <textarea 
                  rows={5}
                  placeholder="Tell us about your next adventure..." 
                  className="w-full px-6 py-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all resize-none"
                />
              </div>

              <button className="w-full py-5 bg-slate-900 dark:bg-sky-500 hover:bg-slate-800 dark:hover:bg-sky-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl group">
                Send Message
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
