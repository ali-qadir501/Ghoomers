import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Lock, FileText, CheckCircle, Scale } from 'lucide-react';

type Tab = 'privacy' | 'terms' | 'cookies';

export const LegalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('privacy');

  const content = {
    privacy: {
      title: "Privacy Policy",
      subtitle: "How we handle your data",
      icon: <Lock size={32} />,
      text: `Your privacy is important to us. It is Ghoomers' policy to respect your privacy regarding any information we may collect from you across our website. We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used. We only retain collected information for as long as necessary to provide you with your requested service.`
    },
    terms: {
      title: "Terms of Service",
      subtitle: "Our agreement with you",
      icon: <FileText size={32} />,
      text: `By accessing the website at Ghoomers.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.`
    },
    cookies: {
      title: "Cookie Policy",
      subtitle: "Understanding our tracking",
      icon: <Shield size={32} />,
      text: `Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you. Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.`
    }
  };

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-slate-400 font-black text-xs uppercase tracking-widest mb-4 block">Compliance & Legal</span>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">LEGAL CENTER</h1>
          <p className="text-slate-500 font-medium">Last Updated: May 2026</p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-50 dark:bg-slate-900 p-2 rounded-3xl mb-12">
          {(['privacy', 'terms', 'cookies'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab 
                  ? 'bg-slate-900 text-white shadow-xl' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab} Policy
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-12 border-2 border-slate-100 dark:border-slate-800 rounded-[48px]"
          >
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
               <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center">
                  {content[activeTab].icon}
               </div>
               <div>
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{content[activeTab].title}</h2>
                  <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">{content[activeTab].subtitle}</p>
               </div>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none">
               <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {content[activeTab].text}
               </p>
               
               <div className="mt-12 space-y-6">
                  <div className="flex items-start gap-4">
                     <CheckCircle className="text-emerald-500 mt-1" size={20} />
                     <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Data Integrity</h4>
                        <p className="text-slate-500 text-sm">We ensure all data is encrypted using AES-256 standards.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <CheckCircle className="text-emerald-500 mt-1" size={20} />
                     <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Your Rights</h4>
                        <p className="text-slate-500 text-sm">You have the right to request deletion of your data at any time.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <Scale className="text-sky-500 mt-1" size={20} />
                     <div>
                        <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Compliance</h4>
                        <p className="text-slate-500 text-sm">Fully GDPR, CCPA and local data protection act compliant.</p>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 p-8 bg-sky-50 dark:bg-sky-950/20 rounded-[32px] text-center border border-sky-100 dark:border-sky-800">
           <p className="text-sky-900 dark:text-sky-400 text-sm font-medium">
              Have questions about our legal policies? <button className="font-black underline">Contact our legal team</button>
           </p>
        </div>
      </div>
    </div>
  );
};
