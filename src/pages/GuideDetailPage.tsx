import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Calendar, 
  MessageCircle, 
  Share2, 
  Heart, 
  Clock, 
  Languages, 
  Award,
  CheckCircle2,
  Image as ImageIcon,
  User as UserIcon,
  Users,
  ArrowRight,
  Mail,
  Phone,
  Backpack,
  Crown,
  Gem,
  Zap
} from 'lucide-react';
import { Guide, cn } from '../lib/utils';
import { BookingCalendar } from '../components/common/BookingCalendar';
import { WeeklyAvailability } from '../components/common/WeeklyAvailability';
import { format } from 'date-fns';

interface GuideDetailPageProps {
  guide: Guide;
  onBack: () => void;
  onBook: (guide: Guide, date: string, tripName?: string, pkg?: string) => void;
  onContact: (guide: Guide) => void;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ guide, onBack, onBook, onContact }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'photos' | 'availability' | 'packages'>('about');
  const [isLiked, setIsLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const handleBook = (pkgName?: string) => {
    if (selectedDate) {
      onBook(guide, format(selectedDate, 'yyyy-MM-dd'), undefined, pkgName);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-bold group"
        >
          <div className="p-2 rounded-full bg-white dark:bg-slate-900 shadow-sm group-hover:shadow-md transition-all">
            <ChevronLeft size={20} />
          </div>
          Back to Guides
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Profile Info */}
          <div className="lg:col-span-8 space-y-8">
            {/* Main Profile Card */}
            <div className="bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800">
              <div className="relative h-96 lg:h-[450px]">
                <img 
                  src={guide.image} 
                  alt={guide.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-8 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      {guide.isVerified && (
                        <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                          <ShieldCheck size={12} /> Verified Expert
                        </span>
                      )}
                      {guide.isCNICVerified && (
                        <span className="px-3 py-1 rounded-full bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                          <ShieldCheck size={12} /> CNIC Verified
                        </span>
                      )}
                      {guide.stats?.responseTimeBadge && (
                        <span className="px-3 py-1 rounded-full bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                          <Zap size={12} /> Quick Responder
                        </span>
                      )}
                    </div>
                    <h1 className="text-5xl font-black text-white font-display tracking-tight mb-2">{guide.name}</h1>
                    <div className="flex items-center gap-4 text-white/80">
                      <span className="flex items-center gap-1.5 text-sm font-medium">
                        <MapPin size={18} className="text-sky-400" /> {guide.location}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm font-medium">
                        <Clock size={18} className="text-sky-400" /> {guide.experienceYears} Years Experience
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className={`p-4 rounded-2xl backdrop-blur-md border transition-all ${
                        isLiked 
                          ? "bg-rose-500 border-rose-500 text-white" 
                          : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                      }`}
                    >
                      <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                    </button>
                    <button className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all">
                      <Share2 size={24} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-slate-100 dark:border-slate-800 px-8 overflow-x-auto no-scrollbar">
                {(['about', 'packages', 'reviews', 'photos', 'availability'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-6 text-sm font-black uppercase tracking-widest transition-all relative whitespace-nowrap ${
                      activeTab === tab 
                        ? "text-sky-500" 
                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 rounded-t-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-8 lg:p-12">
                <AnimatePresence mode="wait">
                   {activeTab === 'about' && (
                    <motion.div
                      key="about"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-10"
                    >
                      {/* Video Intro */}
                      {guide.videoIntro && (
                        <div className="rounded-[32px] overflow-hidden bg-slate-900 aspect-video relative group">
                          <video 
                            src={guide.videoIntro} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            controls
                          />
                          <div className="absolute top-6 left-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                            Guide Introduction
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 rounded-3xl bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-900/20 text-center">
                          <p className="text-2xl font-black text-sky-600 dark:text-sky-400">{guide.stats?.completedTours || 0}+</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tours Completed</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20 text-center">
                          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{guide.stats?.successRate || 100}%</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Success Rate</p>
                        </div>
                        <div className="p-6 rounded-3xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 text-center">
                          <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{guide.stats?.responseTime || '2h'}</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Response Time</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Biography</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed italic font-medium">
                          "{guide.bio}"
                        </p>
                      </div>

                      {/* Highlights Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-[40px] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl -mr-16 -mt-16" />
                           <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                             <MapPin size={20} className="text-sky-400" /> Favorite Regions
                           </h4>
                           <div className="space-y-3">
                             {['Hunza Valley', 'Skardu', 'Swat'].map((region, i) => (
                               <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-300">
                                 <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                                 {region}
                               </div>
                             ))}
                           </div>
                        </div>
                 
                        <div className="p-8 rounded-[40px] bg-sky-500 text-white relative overflow-hidden shadow-2xl shadow-sky-500/20">
                           <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-16 -mb-16" />
                           <h4 className="text-lg font-black mb-4 flex items-center gap-2">
                             <Award size={20} className="text-white" /> Certifications
                           </h4>
                           <div className="space-y-3">
                            {(guide.certifications || []).slice(0, 3).map((cert, i) => (
                               <div key={i} className="flex items-center gap-3 text-sm font-bold text-white">
                                 <CheckCircle2 size={16} />
                                 {cert}
                               </div>
                             ))}
                           </div>
                        </div>
                      </div>

                      {/* Contact Information */}
                      {(guide.email || guide.phone) && (
                        <div>
                          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Contact Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {guide.email && (
                              <div className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-sky-200 dark:hover:border-sky-900/40 transition-all group shadow-sm">
                                <div className="p-3 bg-sky-50 dark:bg-sky-900/20 text-sky-500 rounded-2xl group-hover:scale-110 transition-transform">
                                  <Mail size={20} />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Email Address</p>
                                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{guide.email}</p>
                                </div>
                              </div>
                            )}
                            {guide.phone && (
                              <div className="flex items-center gap-4 p-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-900/40 transition-all group shadow-sm">
                                <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-2xl group-hover:scale-110 transition-transform">
                                  <Phone size={20} />
                                </div>
                                <div>
                                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Phone Number</p>
                                  <p className="text-sm font-bold text-slate-900 dark:text-white">{guide.phone}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400">
                              <Languages size={20} />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Languages</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {(guide.languages || []).map(lang => (
                              <span key={lang} className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-100 dark:border-slate-800">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                              <Award size={20} />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Certifications</h4>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {(guide.certifications || []).map(cert => (
                              <div key={cert} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                                <CheckCircle2 size={14} className="text-emerald-500" />
                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Why Choose {guide.name.split(' ')[0]}?</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            "Certified Local Expert",
                            "Safety-First Approach",
                            "Deep Cultural Knowledge",
                            "Flexible Itineraries"
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                              <CheckCircle2 size={20} className="text-emerald-500" />
                              <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'packages' && (
                    <motion.div
                      key="packages"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-12"
                    >
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
                        <div>
                          <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Tour Packages</h3>
                          <p className="text-slate-500 font-medium">Standard, Deluxe and Executive options tailored for Pakistan expeditions.</p>
                        </div>
                        <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                          <span className="px-4 py-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">Per Person</span>
                          <span className="px-4 py-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">All Inclusive</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                          {
                            id: 'standard',
                            name: 'Trekker',
                            price: Math.round(guide.pricePerDay),
                            icon: <Backpack className="text-sky-500" size={32} />,
                            desc: 'Authentic local stays & local trails',
                            inclusions: ['Local Guide', 'Village Heritage Stays', 'Breakfast & Dinner', 'Private Transport (Corolla/BRV)']
                          },
                          {
                            id: 'deluxe',
                            name: 'Expedition',
                            price: Math.round(guide.pricePerDay * 1.8),
                            icon: <Crown className="text-emerald-500" size={32} />,
                            desc: 'High-altitude mastery & premium lodges',
                            popular: true,
                            inclusions: ['Elite Specialized Guide', 'Full Gourmet Board', 'Toyota Hilux / Revo 4x4', 'Oxygen & First Aid Gears']
                          },
                          {
                            id: 'executive',
                            name: 'Elite',
                            price: Math.round(guide.pricePerDay * 3.2),
                            icon: <Gem className="text-amber-500" size={32} />,
                            desc: 'The ultimate Karakoram VVIP protocol',
                            inclusions: ['Expedition Leader', 'VIP Glamping / 5-Star Suites', 'Land Cruiser V8 / Prado', 'Visa & Logistics Porter', 'Dedicated Chef & Helper']
                          }
                        ].map((pkg, i) => (
                          <div 
                            key={pkg.id}
                            className={cn(
                              "relative group p-8 rounded-[40px] flex flex-col h-full border-2 transition-all hover:scale-[1.02]",
                              pkg.popular 
                                ? "bg-white dark:bg-slate-900 border-emerald-500 shadow-2xl shadow-emerald-500/10" 
                                : "bg-slate-50 dark:bg-slate-800/30 border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                            )}
                          >
                            {pkg.popular && (
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                Most Popular Choice
                              </div>
                            )}

                            <div className="flex items-center justify-between mb-8">
                              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                {pkg.icon}
                              </div>
                              <div className="text-right">
                                <p className="text-3xl font-black text-slate-900 dark:text-white">${pkg.price}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">per day</p>
                              </div>
                            </div>

                            <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">{pkg.name}</h4>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8">{pkg.desc}</p>

                            <div className="space-y-4 mb-10 flex-1">
                              {pkg.inclusions.map((inc, j) => (
                                <div key={j} className="flex items-start gap-3">
                                  <div className="mt-1 w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 size={10} className="text-emerald-500" />
                                  </div>
                                  <span className="text-sm font-bold text-slate-600 dark:text-slate-400">{inc}</span>
                                </div>
                              ))}
                            </div>

                            <button
                              onClick={() => handleBook(pkg.id)}
                              className={cn(
                                "w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all",
                                pkg.popular 
                                  ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/20" 
                                  : "bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                              )}
                            >
                              Select {pkg.name}
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="p-8 rounded-[40px] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-transparent" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                          <div className="max-w-md">
                            <h4 className="text-2xl font-black mb-2">Need a Custom Package?</h4>
                            <p className="text-slate-400 font-medium">We can tailor the transport, accommodation and extra features specifically for your needs across Northern Pakistan.</p>
                          </div>
                          <button className="px-12 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-white/5">
                            Request Custom Quote
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'availability' && (
                    <motion.div
                      key="availability"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-12"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Availability Overview</h3>
                            <div className="p-8 rounded-[38px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 h-full">
                              <WeeklyAvailability availability={guide.availability || []} />
                              <div className="mt-8 space-y-4">
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-start gap-3">
                                  <Clock size={18} className="text-sky-500 mt-0.5" />
                                  <span>This guide is generally available on the highlighted days of the week.</span>
                                </p>
                                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-start gap-3">
                                  <ShieldCheck size={18} className="text-emerald-500 mt-0.5" />
                                  <span>Instant confirmation available for verified slots.</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Select Your Date</h3>
                          <BookingCalendar 
                            availability={guide.availability || []}
                            onDateSelect={(date) => setSelectedDate(date)}
                            selectedDate={selectedDate}
                          />
                          {selectedDate && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="p-6 bg-sky-500 rounded-[32px] text-white shadow-xl shadow-sky-500/20"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Selected Date</p>
                                  <p className="text-xl font-black">{format(selectedDate, 'EEEE, MMMM dd, yyyy')}</p>
                                </div>
                                <button 
                                  onClick={handleBook}
                                  className="px-6 py-3 bg-white text-sky-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all"
                                >
                                  Book Now
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Upcoming Group Tours</h3>
                        <div className="grid grid-cols-1 gap-6">
                          {guide.upcomingTours?.map((tour) => (
                            <div 
                              key={tour.id} 
                              className="group bg-slate-50 dark:bg-slate-800/50 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row hover:shadow-lg transition-all"
                            >
                              <div className="md:w-48 h-48 md:h-auto relative overflow-hidden">
                                <img src={tour.image} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black text-slate-900 uppercase tracking-widest">
                                  {tour.difficulty}
                                </div>
                              </div>
                              <div className="flex-1 p-6 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors">{tour.title}</h4>
                                  <div className="text-right">
                                    <span className="text-xl font-black text-slate-900 dark:text-white">${tour.price}</span>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">per person</p>
                                  </div>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">{tour.description}</p>
                                
                                <div className="mt-auto grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                  <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-sky-500" />
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{format(new Date(tour.date), 'MMM d, yyyy')}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-sky-500" />
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{tour.duration}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Users size={14} className="text-sky-500" />
                                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{tour.availableSlots} slots left</span>
                                  </div>
                                  <button 
                                    onClick={() => onBook(guide, tour.date, tour.title)}
                                    className="flex items-center justify-center gap-2 text-sky-500 font-black text-xs uppercase tracking-widest hover:gap-3 transition-all"
                                  >
                                    Join Tour <ArrowRight size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'reviews' && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-1">{guide.rating}</h3>
                          <div className="flex items-center gap-1 text-amber-500 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} fill={i < Math.floor(guide.rating) ? "currentColor" : "none"} />
                            ))}
                          </div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Based on {guide.reviews} reviews</p>
                        </div>
                        <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm hover:scale-105 transition-all">
                          Write a Review
                        </button>
                      </div>

                      <div className="space-y-8">
                        {guide.reviewsList?.map((review) => (
                          <div key={review.id} className="p-8 rounded-[32px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white font-bold text-lg">
                                  {review.userAvatar ? <img src={review.userAvatar} className="w-full h-full object-cover rounded-2xl" /> : review.userName[0]}
                                </div>
                                <div>
                                  <h4 className="text-base font-black text-slate-900 dark:text-white">{review.userName}</h4>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{review.date}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-amber-500">
                                <Star size={16} fill="currentColor" />
                                <span className="text-lg font-black">{review.rating}</span>
                              </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed font-medium mb-6">
                              "{review.comment}"
                            </p>
                            
                            {review.images && review.images.length > 0 && (
                              <div className="flex flex-wrap gap-3">
                                {review.images.map((img, idx) => (
                                  <div key={idx} className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
                                    <img src={img} className="w-full h-full object-cover" alt="Review" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'photos' && (
                    <motion.div
                      key="photos"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="space-y-6"
                    >
                      {guide.gallery && guide.gallery.length > 0 ? (
                        <div className="space-y-6">
                          {/* Hero Image */}
                          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-800">
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={activeImage}
                                src={(guide.gallery || [])[activeImage]}
                                initial={{ opacity: 0, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, filter: 'blur(10px)' }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full object-cover"
                                alt={`Gallery Featured`}
                              />
                            </AnimatePresence>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                              <div className="p-2 px-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                                Image {activeImage + 1} of {(guide.gallery || []).length}
                              </div>
                            </div>
                          </div>

                          {/* Thumbnails */}
                          <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                            {(guide.gallery || []).map((img, idx) => (
                              <motion.button
                                key={idx}
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveImage(idx)}
                                className={cn(
                                  "relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 transition-all duration-300",
                                  activeImage === idx 
                                    ? "border-sky-500 scale-105 shadow-lg shadow-sky-500/20" 
                                    : "border-transparent opacity-60 hover:opacity-100"
                                )}
                              >
                                <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx}`} />
                                {activeImage === idx && (
                                  <div className="absolute inset-0 bg-sky-500/10" />
                                )}
                              </motion.button>
                            ))}
                          </div>

                          <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 text-center">Adventure Gallery</h4>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 text-center">
                              A collection of moments from {guide.name.split(' ')[0]}'s past expeditions and specialty adventure tours.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="py-24 text-center bg-slate-50 dark:bg-slate-900/30 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800">
                          <ImageIcon size={48} className="text-slate-300 mx-auto mb-4" />
                          <p className="text-slate-500 font-black uppercase tracking-widest text-xs">No photos shared yet</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: Booking & Availability */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[40px] p-8 shadow-xl border border-slate-100 dark:border-slate-800 sticky top-32">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-4xl font-black text-slate-900 dark:text-white">${guide.pricePerDay}</span>
                  <span className="text-slate-400 text-xs font-bold ml-1 uppercase tracking-widest">/ Day</span>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-amber-500 font-black">
                    <Star size={16} fill="currentColor" />
                    <span>{guide.rating}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{guide.reviews} Reviews</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Availability</label>
                  <BookingCalendar 
                    availability={guide.availability || []}
                    onDateSelect={(date) => setSelectedDate(date)}
                    selectedDate={selectedDate}
                  />
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <Clock size={18} />
                    <span className="text-xs font-bold">Responds within {guide.stats?.responseTime || '2h'}</span>
                  </div>
                </div>

                <button 
                  onClick={handleBook}
                  disabled={!selectedDate}
                  className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${
                    selectedDate 
                      ? "bg-sky-500 hover:bg-sky-600 text-white shadow-sky-200 dark:shadow-none hover:-translate-y-1 active:scale-95" 
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <Calendar size={20} />
                  Book Now
                </button>

                <button 
                  onClick={() => onContact(guide)}
                  className="w-full py-5 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-black text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                >
                  <MessageCircle size={20} />
                  Message {guide.name.split(' ')[0]}
                </button>
              </div>

              <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                No charge until you confirm
              </p>
            </div>

            {/* Quick Stats */}
            <div className="bg-emerald-500 rounded-[40px] p-8 text-white shadow-xl shadow-emerald-200 dark:shadow-none">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-black text-lg leading-none mb-1">GHOOMERS Safe</h4>
                  <p className="text-white/80 text-xs font-medium">Verified & Insured</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "Identity (CNIC) Verified",
                  "Background Checked",
                  "Official GHOOMERS Partner",
                  "Local Resident & Artisan",
                  "First Aid Certified"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
