import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, Users, Globe, ShieldCheck, ArrowRight, CheckCircle2, 
  ChevronLeft, LayoutDashboard, Database, Zap, Briefcase
} from 'lucide-react';
import { Logo } from '../components/common/Logo';

interface AgencySignupPageProps {
  onBack: () => void;
}

export const AgencySignupPage: React.FC<AgencySignupPageProps> = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    agencyName: '',
    website: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    fleetSize: '',
    description: ''
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="mb-12 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Info Section */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 text-[10px] font-black uppercase tracking-widest mb-6">
              <Building2 size={14} />
              B2B Agency Partnership
            </div>
            <h1 className="text-5xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
              Scale Your Operation in <span className="text-sky-500 italic">Northern Pakistan</span>
            </h1>
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-12">
              Join GHoomers as an agency partner. Access a global audience, manage your fleet with our dashboard, and provide unforgettable experiences in the mountains.
            </p>

            <div className="space-y-8">
              {[
                {
                  title: "Centralized Dashboard",
                  desc: "Manage bookings, guides, and vehicles from one sophisticated interface.",
                  icon: <LayoutDashboard size={24} className="text-sky-500" />
                },
                {
                  title: "Global Reach",
                  desc: "Direct access to international travelers looking for vetted, professional agencies.",
                  icon: <Globe size={24} className="text-emerald-500" />
                },
                {
                   title: "Fleet Management",
                   desc: "Register your 4x4s, bikes, and specialized equipment for rent and tours.",
                   icon: <Briefcase size={24} className="text-amber-500" />
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm"
                >
                  <div className="p-3 bg-slate-50 rounded-2xl h-fit">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-900 mb-1">{feature.title}</h3>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Signup Form */}
          <div className="lg:col-span-7">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[40px] p-8 lg:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden"
            >
              {/* Progress Bar */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-50">
                <motion.div 
                  initial={{ width: '33.33%' }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  className="h-full bg-sky-500" 
                />
              </div>

              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">Agency Application</h2>
                  <p className="text-slate-500 text-sm font-bold">Step {step} of 3</p>
                </div>
                <Logo size={32} />
              </div>

              <form onSubmit={handleNext} className="space-y-6">
                {step === 1 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Agency Name</label>
                        <input 
                          required
                          type="text" 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
                          placeholder="e.g. Karakoram Expeditions"
                          value={formData.agencyName}
                          onChange={(e) => setFormData({...formData, agencyName: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Website URL (Optional)</label>
                        <input 
                          type="url" 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
                          placeholder="https://..."
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Main Office Location</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
                        placeholder="e.g. Gilgit City, Skardu, Islamabad"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                    <button className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-sky-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group px-4">
                      Continue to Contact Details
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Contact Person</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
                        placeholder="Full Name"
                        value={formData.contactPerson}
                        onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Address</label>
                        <input 
                          required
                          type="email" 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
                          placeholder="agency@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Phone Number</label>
                        <input 
                          required
                          type="tel" 
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all"
                          placeholder="+92 XXX XXXXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button type="button" onClick={() => setStep(step - 1)} className="px-8 py-5 bg-slate-100 text-slate-900 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">
                        Back
                      </button>
                      <button className="flex-1 py-5 bg-slate-900 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-sky-600 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 group px-4">
                        Continue to Fleet Info
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">How many guides/vehicles in your fleet?</label>
                      <select 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all appearance-none"
                        value={formData.fleetSize}
                        onChange={(e) => setFormData({...formData, fleetSize: e.target.value})}
                      >
                        <option value="">Select Size</option>
                        <option value="1-5">1-5 staff/vehicles</option>
                        <option value="5-15">5-15 staff/vehicles</option>
                        <option value="15-50">15-50 staff/vehicles</option>
                        <option value="50+">50+ Large Agency</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Agency Bio & Specialization</label>
                      <textarea 
                        rows={4}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:bg-white focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all resize-none"
                        placeholder="Tell us about the experiences you offer..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                      />
                    </div>
                    <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 flex items-start gap-3">
                      <ShieldCheck className="text-sky-600 mt-0.5" size={18} />
                      <p className="text-[10px] font-bold text-sky-700 leading-relaxed">
                        By submitting, you agree to GHoomers Agency Partnership Terms. Our team will review your application and conduct a physical verification of your operations in Gilgit/Skardu within 48 hours.
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <button type="button" onClick={() => setStep(step - 1)} className="px-8 py-5 bg-slate-100 text-slate-900 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">
                        Back
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 py-5 bg-emerald-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-3 group px-4"
                      >
                        Submit Application
                        <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Testimonial/Badge */}
            <div className="mt-12 flex items-center gap-6 p-8 bg-sky-50/50 rounded-3xl border border-sky-100/50">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?u=agency${i}`} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                ))}
              </div>
              <div>
                <p className="text-xs font-black text-slate-900 mb-1 tracking-tight">Vetted Partner Network</p>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map(i => <Zap key={i} size={8} fill="currentColor" />)}
                  </div>
                  <span className="text-[9px] font-bold text-slate-500">Join 40+ leading agencies in Pakisan</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
