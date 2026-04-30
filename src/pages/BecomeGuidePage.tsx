import React from 'react';
import { motion } from 'motion/react';
import { Users, ShieldCheck, Zap, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

export const BecomeGuidePage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Partner with Us</span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter leading-none">
              BECOME A<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">LOCAL GUIDE</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-12">
              Share your passion for Pakistan with the world. Join our community of verified local experts and grow your business.
            </p>
            
            <div className="space-y-8 mb-12">
              {[
                { title: 'Earn More', desc: 'Keep 90% of your earnings with our transparent pricing model.', icon: <Zap /> },
                { title: 'Get Verified', desc: 'Build trust with travelers through our verification and review system.', icon: <ShieldCheck /> },
                { title: 'Flexible Schedule', desc: 'You decide when and where you want to guide.', icon: <Heart /> },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-sky-500 shrink-0 shadow-xl shadow-black/5">
                    {React.cloneElement(item.icon as React.ReactElement, { size: 28 })}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{item.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-8 md:p-12 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-black/5">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Apply to Join</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-10">Fill out the details below and our team will get in touch with you.</p>
            
            <form className="space-y-10">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1.5 h-6 bg-sky-500 rounded-full" />
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Personal Information</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:border-sky-500 transition-all text-sm font-bold shadow-sm" placeholder="Ali Khan" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:border-sky-500 transition-all text-sm font-bold shadow-sm" placeholder="ali@example.com" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone / WhatsApp</label>
                    <input type="tel" className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:border-sky-500 transition-all text-sm font-bold shadow-sm" placeholder="+92 300 1234567" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Location</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:border-sky-500 transition-all text-sm font-bold shadow-sm" placeholder="Hunza Valley, Gilgit" />
                  </div>
                </div>
              </div>

              {/* Professional Details Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Professional Details</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Availability</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:border-sky-500 transition-all text-sm font-bold shadow-sm appearance-none cursor-pointer">
                      <option value="">Select Availability</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="seasonal">Seasonal</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Experience (Years)</label>
                    <input type="number" className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:border-sky-500 transition-all text-sm font-bold shadow-sm" placeholder="5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tour Type Preference</label>
                    <select className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:border-sky-500 transition-all text-sm font-bold shadow-sm appearance-none cursor-pointer">
                      <option value="">Select Tour Type</option>
                      <option value="day">Day Trips</option>
                      <option value="multi-day">Multi-day Tours</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pricing Comfort</label>
                    <div className="flex gap-4 p-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50 has-[:checked]:bg-sky-500 has-[:checked]:text-white">
                        <input type="radio" name="pricing" value="yes" className="hidden" />
                        <span className="text-xs font-bold">Yes, Comfortable</span>
                      </label>
                      <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50 has-[:checked]:bg-sky-500 has-[:checked]:text-white">
                        <input type="radio" name="pricing" value="guidance" className="hidden" />
                        <span className="text-xs font-bold">Need Guidance</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Specialties & Expertise</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      'Trekking / Hiking', 'Cultural Tours', 'Food Experiences', 
                      'Photography Tours', 'Motorcycle Tours', 'Camping / Adventure',
                      'History & Heritage', 'Snow Sports', 'Wildlife Safari'
                    ].map((spec) => (
                      <label key={spec} className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-sky-500 transition-all group">
                        <div className="w-5 h-5 rounded flex items-center justify-center border-2 border-slate-200 dark:border-slate-600 group-has-[:checked]:bg-sky-500 group-has-[:checked]:border-sky-500 transition-all">
                          <input type="checkbox" className="hidden" />
                          <CheckCircle2 size={12} className="text-white scale-0 group-has-[:checked]:scale-100 transition-transform" />
                        </div>
                        <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 leading-tight">{spec}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Assets & Verification Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-1.5 h-6 bg-amber-500 rounded-full" />
                  <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Assets & Verification</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Verification Documents</label>
                    <div className="space-y-3">
                      {[
                        { id: 'cnic', label: 'ID Card (CNIC)' },
                        { id: 'license', label: 'Driving License' },
                        { id: 'cert', label: 'Tour Guide Certificate' }
                      ].map((doc) => (
                        <label key={doc.id} className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-emerald-500 transition-all group">
                          <input type="checkbox" className="w-5 h-5 rounded border-2 border-slate-200 dark:border-slate-600 accent-emerald-500" />
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{doc.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 block">Transportation Access</label>
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { id: 'bike', label: 'Motorcycle' },
                        { id: 'car', label: 'Car / Jeep' },
                        { id: 'none', label: 'None (Walk only)' }
                      ].map((trans) => (
                        <label key={trans.id} className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-amber-500 transition-all group has-[:checked]:border-amber-500">
                          <input type="radio" name="transport" className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-slate-600 accent-amber-500" />
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{trans.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">About Your Experience</label>
                <textarea className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:border-sky-500 transition-all text-sm font-bold min-h-[140px] shadow-sm" placeholder="Tell us about the regions you know best and why you'd be a great guide..." />
              </div>

              <button className="w-full py-5 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-sky-500/20 flex items-center justify-center gap-2 group mt-4">
                Submit Application
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
