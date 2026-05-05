import React, { useState, useEffect } from 'react';
import { Mountain, Trees, Menu, X, Bolt, Search, MapPin, Calendar, Users, ShieldCheck, Star, ArrowRight, Facebook, Instagram, Twitter, Youtube, Linkedin, CheckCircle2, MessageSquare, Share2, Heart, CreditCard, Clock, ChevronLeft, ChevronRight, Car, Quote, Mail, Phone, Info, LayoutDashboard, Lock, Headphones, Map, LogOut, User as UserIcon, Video, Bike, Wrench, Navigation, Fuel, Backpack, GraduationCap, Leaf, TreePine, Trash2, Check, Globe, Crown, Gem, Zap } from 'lucide-react';
import { User } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { cn, FEATURED_GUIDES, DESTINATIONS, CARS, TESTIMONIALS, type Guide, type Destination, type Booking, type Car as CarType, type Testimonial } from './lib/utils';
import { GUIDES } from './data/sampleData';

import { useAppContext } from './context/AppContext';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { ExperienceDetailPage } from './pages/ExperienceDetailPage';
import { FindGuidesPage } from './pages/FindGuidesPage';
import { GuideDetailPage } from './pages/GuideDetailPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { WaterAdventuresPage } from './pages/WaterAdventuresPage';
import { ShoreExcursionsPage } from './pages/ShoreExcursionsPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { LegalPage } from './pages/LegalPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { AgencySignupPage } from './pages/AgencySignupPage';
import ExplorePage from './pages/ExplorePage';
import { LocalExperience, getFeaturedExperiences, LocalExperience as LocalExperienceType } from './data/experiences';
import { DISTRICT_DATA } from './data/districtData';
import { ExperienceCard } from './components/common/ExperienceCard';
import { TestimonialCarousel } from './components/home/TestimonialCarousel';
import { BookingCalendar } from './components/common/BookingCalendar';
import { Logo } from './components/common/Logo';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { ExploreDistrictSection } from './components/home/ExploreDistrictSection';
import { TravelStyleSection } from './components/home/TravelStyleSection';
import { MeetOurGuides } from './components/home/MeetOurGuides';
import { MotoTrekHomeSection } from './components/home/MotoTrekHomeSection';
import { PrivateToursSection } from './components/home/PrivateToursSection';
import { format } from 'date-fns';

interface Bike {
  id: number;
  name: string;
  type: string;
  price_per_day: number;
  image: string;
  shop_name: string;
  location: string;
  insurance_included: boolean;
}

interface Mechanic {
  id: number;
  name: string;
  location: string;
  lat: number;
  lng: number;
  phone: string;
  rating: number;
  specialty: string;
}

interface Route {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  distance: string;
  duration: string;
  start_point: string;
  end_point: string;
  waypoints: string[];
  fuel_stops: string[];
  accommodations: string[];
  image: string;
}

interface Gear {
  id: number;
  name: string;
  type: string;
  price_per_day: number;
  image: string;
}

// --- Components ---

const SkeletonCard = () => (
  <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm h-full flex flex-col">
    <div className="h-64 bg-slate-100 animate-pulse relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
    </div>
    <div className="p-8 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="h-4 bg-slate-100 rounded-full w-24 animate-pulse" />
        <div className="h-4 bg-slate-100 rounded-full w-12 animate-pulse" />
      </div>
      <div className="h-8 bg-slate-100 rounded-xl w-3/4 mb-4 animate-pulse" />
      <div className="space-y-2 mb-8">
        <div className="h-3 bg-slate-100 rounded-full w-full animate-pulse" />
        <div className="h-3 bg-slate-100 rounded-full w-5/6 animate-pulse" />
      </div>
      <div className="mt-auto flex justify-between items-center pt-6 border-t border-slate-50">
        <div className="space-y-2">
          <div className="h-3 bg-slate-100 rounded-full w-16 animate-pulse" />
          <div className="h-6 bg-slate-100 rounded-full w-20 animate-pulse" />
        </div>
        <div className="h-12 bg-slate-100 rounded-2xl w-28 animate-pulse" />
      </div>
    </div>
  </div>
);

const GlobalLoader = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center"
  >
    <div className="relative w-24 h-24 mb-8">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="absolute inset-0 border-4 border-slate-100 rounded-full"
      />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="absolute inset-0 border-4 border-sky-500 border-t-transparent rounded-full"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Mountain className="text-sky-500" size={32} />
      </div>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-center"
    >
      <Logo size={48} isStacked textColor="dark" />
      <p className="text-slate-400 font-medium text-sm animate-pulse mt-4">Preparing your adventure...</p>
    </motion.div>
  </motion.div>
);

const Tooltip: React.FC<{ text: string; children: React.ReactNode }> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg whitespace-nowrap z-50 shadow-xl"
          >
            {text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DestinationModal: React.FC<{ 
  destination: Destination | null; 
  onClose: () => void; 
  onBook: (dest: Destination, date: string, pkg?: string) => void;
  selectedDate: string;
  onDateChange: (date: string) => void;
}> = ({ destination, onClose, onBook, selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activeImage, setActiveImage] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<'standard' | 'deluxe' | 'executive'>('standard');

  if (!destination) return null;

  const packages = [
    {
      id: 'standard',
      name: 'Cultural',
      price: destination.price,
      icon: <Backpack className="text-sky-500" size={20} />,
      multiplier: 1,
      inclusions: ['Private Local Guide', 'Heritage Stays', 'Breakfast & Dinner', 'Standard 4x4']
    },
    {
      id: 'deluxe',
      name: 'Adventure',
      price: Math.round(destination.price * 1.8),
      icon: <Crown className="text-emerald-500" size={20} />,
      multiplier: 1.8,
      popular: true,
      inclusions: ['Elite High-Altitude Guide', 'Premium Hotels', 'All Meals (Gourmet)', 'Toyota Hilux/Prado']
    },
    {
      id: 'executive',
      name: 'Elite',
      price: Math.round(destination.price * 3.2),
      icon: <Gem className="text-amber-500" size={20} />,
      multiplier: 3.2,
      inclusions: ['Expert Expedition Leader', 'VIP Hospitality', 'Visa Support & Logistics', 'Full Porter Support', 'Toyota Land Cruiser V8']
    }
  ];

  const currentPkg = packages.find(p => p.id === selectedPackage) || packages[0];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  const isSelected = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return selectedDate === dateStr;
  };

  const handleDateClick = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateChange(dateStr);
  };

  const relatedGuides = GUIDES.filter(guide => 
    guide.location.toLowerCase().includes(destination.name.toLowerCase()) ||
    guide.specialties.includes(destination.activityType)
  ).slice(0, 3);

  const galleryImages = destination.gallery || [destination.image];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-5xl h-[90vh] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-all z-20"
          >
            <X size={24} />
          </button>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Left Column: Images & Gallery */}
              <div className="bg-slate-50">
                <div className="h-96 lg:h-[500px] overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={activeImage}
                      src={galleryImages[activeImage]} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full object-cover" 
                      alt={destination.name} 
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-center gap-2 text-sky-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                      <MapPin size={14} />
                      {destination.region}
                    </div>
                    <h2 className="text-4xl font-bold text-white font-display tracking-tight">{destination.name}</h2>
                  </div>
                </div>

                {/* Gallery Thumbnails */}
                {galleryImages.length > 1 && (
                  <div className="p-6 flex gap-3 overflow-x-auto no-scrollbar">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={cn(
                          "flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all",
                          activeImage === idx ? "border-sky-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                        )}
                      >
                        <img src={img} className="w-full h-full object-cover" alt={`Gallery ${idx}`} />
                      </button>
                    ))}
                  </div>
                )}

                {/* Highlights & Activities */}
                <div className="p-8 space-y-8">
                  {destination.highlights && (
                    <div>
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Highlights</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {destination.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100">
                            <CheckCircle2 size={16} className="text-emerald-500 mt-0.5" />
                            <span className="text-sm text-slate-700 font-medium">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {destination.popularActivities && (
                    <div>
                      <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Popular Activities</h3>
                      <div className="flex flex-wrap gap-2">
                        {destination.popularActivities.map((a, i) => (
                          <span key={i} className="px-4 py-2 bg-sky-50 text-sky-600 rounded-full text-xs font-bold border border-sky-100">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Details & Booking */}
              <div className="p-8 lg:p-12 bg-white">
                <div className="mb-10">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">About Destination</h3>
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    {destination.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        destination.difficulty === 'Easy' ? "bg-emerald-500" :
                        destination.difficulty === 'Moderate' ? "bg-sky-500" :
                        destination.difficulty === 'Challenging' ? "bg-amber-500" : "bg-rose-500"
                      )} />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Difficulty</span>
                    </div>
                    <div className="text-slate-900 font-bold">{destination.difficulty}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={14} className="text-sky-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Best Season</span>
                    </div>
                    <div className="text-slate-900 font-bold">{destination.bestSeason}</div>
                  </div>
                </div>

                {/* Related Guides */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Top Rated Guides</h3>
                    <span className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">{destination.guideCount} Available</span>
                  </div>
                  <div className="space-y-3">
                    {relatedGuides.map(guide => (
                      <div key={guide.id} className="flex items-center gap-4 p-3 rounded-2xl border border-slate-100 hover:border-sky-100 transition-all group cursor-pointer">
                        <img src={guide.image} className="w-12 h-12 rounded-xl object-cover" alt={guide.name} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-slate-900">{guide.name}</h4>
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star size={12} fill="currentColor" />
                              <span className="text-xs font-bold">{guide.rating}</span>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-500 font-medium">{guide.specialties.slice(0, 2).join(' • ')}</p>
                        </div>
                        <ArrowRight size={16} className="text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Calendar */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Start Date</h3>
                    <div className="flex gap-1">
                      <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="p-1 hover:bg-slate-100 rounded-lg transition-colors"><ChevronLeft size={16} /></button>
                      <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="p-1 hover:bg-slate-100 rounded-lg transition-colors"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                    <div className="text-center font-bold text-slate-900 mb-4 text-sm">{monthNames[month]} {year}</div>
                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                        <div key={d} className="text-[10px] font-bold text-slate-400 uppercase">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {blanks.map(i => <div key={`blank-${i}`} />)}
                      {days.map(day => (
                        <button
                          key={day}
                          onClick={() => handleDateClick(day)}
                          className={cn(
                            "aspect-square flex items-center justify-center text-xs rounded-lg transition-all",
                            isSelected(day) 
                              ? "bg-sky-500 text-white font-bold shadow-md shadow-sky-100" 
                              : isToday(day)
                                ? "bg-sky-50 text-sky-600 font-bold"
                                : "hover:bg-white text-slate-600"
                          )}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tour Packages */}
                <div className="mb-10">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Choose Tour Package</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg.id as any)}
                        className={cn(
                          "relative p-4 rounded-2xl border-2 text-left transition-all",
                          selectedPackage === pkg.id 
                            ? "bg-slate-900 text-white border-slate-900 shadow-xl" 
                            : "bg-slate-50 border-transparent hover:border-slate-200"
                        )}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full">
                            Popular
                          </div>
                        )}
                        <div className="flex items-center gap-2 mb-3">
                          <div className={cn(
                            "p-2 rounded-xl",
                            selectedPackage === pkg.id ? "bg-white/10" : "bg-white shadow-sm border border-slate-100"
                          )}>
                            {pkg.icon}
                          </div>
                        </div>
                        <h4 className="text-xs font-black mb-1">{pkg.name}</h4>
                        <p className={cn(
                          "text-[10px] font-black mb-2",
                          selectedPackage === pkg.id ? "text-sky-300" : "text-sky-600"
                        )}>${pkg.price}</p>
                        <div className="space-y-1">
                          {pkg.inclusions.slice(0, 2).map((inc, j) => (
                            <div key={j} className="flex items-center gap-1.5 opacity-80">
                              <Check size={8} className="flex-shrink-0" />
                              <span className="text-[7px] font-bold truncate">{inc}</span>
                            </div>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="sticky bottom-0 bg-white pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Package ({currentPkg.name})</div>
                    <div className="text-3xl font-black text-slate-900">${currentPkg.price}</div>
                  </div>
                  <button 
                    onClick={() => onBook(destination, selectedDate, selectedPackage)}
                    disabled={!selectedDate}
                    className={cn(
                      "px-10 py-4 rounded-2xl font-black shadow-xl transition-all hover:-translate-y-1 active:scale-95",
                      selectedDate 
                        ? "bg-sky-500 hover:bg-sky-600 text-white shadow-sky-100" 
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    )}
                  >
                    Book This Adventure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


const PaymentModal = ({ 
  booking, 
  onClose, 
  onSuccess 
}: { 
  booking: Booking; 
  onClose: () => void; 
  onSuccess: () => void;
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'jazzcash'>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const endpoint = paymentMethod === 'stripe' 
        ? `/api/bookings/${booking.id}/pay/stripe` 
        : `/api/payments/jazzcash`;
      
      const body = paymentMethod === 'stripe' 
        ? {} 
        : { amount: booking.totalPrice, bookingId: booking.id, phoneNumber };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        onSuccess();
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative p-8"
          onClick={e => e.stopPropagation()}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Complete Payment</h2>
            <p className="text-slate-500 text-sm font-bold">Secure checkout for your adventure</p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 mb-8 border border-slate-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Adventure</span>
              <span className="text-sm font-black text-slate-900">{booking.tripName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Amount</span>
              <span className="text-lg font-black text-sky-600">${booking.totalPrice}</span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Payment Method</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('stripe')}
                className={cn(
                  "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                  paymentMethod === 'stripe' ? "border-sky-500 bg-sky-50" : "border-slate-100 hover:border-slate-200"
                )}
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <CreditCard size={18} className="text-sky-500" />
                </div>
                <span className="text-xs font-black text-slate-900">Stripe</span>
              </button>
              <button
                onClick={() => setPaymentMethod('jazzcash')}
                className={cn(
                  "p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2",
                  paymentMethod === 'jazzcash' ? "border-amber-500 bg-amber-50" : "border-slate-100 hover:border-slate-200"
                )}
              >
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <Phone size={18} className="text-amber-500" />
                </div>
                <span className="text-xs font-black text-slate-900">JazzCash</span>
              </button>
            </div>
          </div>

          {paymentMethod === 'jazzcash' && (
            <div className="mb-8">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">JazzCash Phone Number</label>
              <input
                type="text"
                placeholder="03xx xxxxxxx"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
              />
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={isProcessing || (paymentMethod === 'jazzcash' && !phoneNumber)}
            className={cn(
              "w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all flex items-center justify-center gap-2",
              paymentMethod === 'stripe' ? "bg-sky-500 hover:bg-sky-600 shadow-sky-100" : "bg-amber-500 hover:bg-amber-600 shadow-amber-100",
              isProcessing && "opacity-70 cursor-not-allowed"
            )}
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck size={20} />
                Pay ${booking.totalPrice}
              </>
            )}
          </button>

          <p className="text-center text-[10px] text-slate-400 font-bold mt-6 uppercase tracking-widest">
            Your payment is encrypted and secure
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CancellationModal = ({ 
  booking, 
  onClose, 
  onConfirm 
}: { 
  booking: Booking; 
  onClose: () => void; 
  onConfirm: () => void;
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative p-8"
          onClick={e => e.stopPropagation()}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Info size={32} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Cancel Booking?</h2>
            <p className="text-slate-500 text-sm font-bold">Please review the cancellation policy</p>
          </div>

          <div className="bg-rose-50 rounded-2xl p-6 mb-8 border border-rose-100">
            <h3 className="text-rose-900 font-black text-sm mb-2">Cancellation Policy: {booking.cancellationPolicy || '24h'}</h3>
            <p className="text-rose-700 text-xs font-medium leading-relaxed">
              {booking.cancellationPolicy === '24h' ? "Free cancellation up to 24 hours before the trip starts. After that, a 50% fee applies." :
               booking.cancellationPolicy === '7d' ? "Free cancellation up to 7 days before the trip starts. After that, a 70% fee applies." :
               "This booking is non-refundable. Cancellations will not receive a refund."}
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onConfirm}
              className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black shadow-xl shadow-rose-100 transition-all"
            >
              Confirm Cancellation
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-2xl font-black transition-all"
            >
              Keep Booking
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const FilterSidebar = ({ 
  onFilterChange, 
  activeFilters 
}: { 
  onFilterChange: (type: string, value: string) => void;
  activeFilters: any;
}) => {
  return (
    <div className="w-full lg:w-80 space-y-8">
      <div>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Region</h3>
        <div className="space-y-2">
          {['All', 'Gilgit-Baltistan', 'Khyber Pakhtunkhwa', 'Azad Kashmir', 'Balochistan'].map(region => (
            <button
              key={region}
              onClick={() => onFilterChange('region', region)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                activeFilters.region === region ? "bg-sky-500 text-white shadow-lg shadow-sky-100" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
              )}
            >
              {region}
              {activeFilters.region === region && <CheckCircle2 size={16} />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Price Range</h3>
        <div className="space-y-2">
          {['All', 'Under $50', '$50 - $100', '$100 - $200', 'Over $200'].map(range => (
            <button
              key={range}
              onClick={() => onFilterChange('priceRange', range)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all",
                activeFilters.priceRange === range ? "bg-sky-500 text-white shadow-lg shadow-sky-100" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
              )}
            >
              {range}
              {activeFilters.priceRange === range && <CheckCircle2 size={16} />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Activity Type</h3>
        <div className="flex flex-wrap gap-2">
          {['All', 'Trekking', 'Cultural', 'Mountaineering', 'Photography', 'Sightseeing'].map(activity => (
            <button
              key={activity}
              onClick={() => onFilterChange('activity', activity)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                activeFilters.activity === activity ? "bg-sky-500 text-white border-sky-500 shadow-md" : "bg-white text-slate-600 border-slate-100 hover:border-slate-200"
              )}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const MapView = ({ 
  items, 
  onItemClick 
}: { 
  items: any[]; 
  onItemClick: (item: any) => void;
}) => {
  return (
    <div className="w-full h-[600px] bg-slate-100 rounded-[40px] relative overflow-hidden border border-slate-200 shadow-inner">
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/74.0,35.0,6,0/1200x600?access_token=mock_token')] bg-cover bg-center opacity-60" />
      
      {/* Mock Markers */}
      {items.map((item, i) => (
        <motion.button
          key={item.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05 }}
          onClick={() => onItemClick(item)}
          className="absolute group"
          style={{ 
            left: `${30 + (Math.random() * 40)}%`, 
            top: `${20 + (Math.random() * 50)}%` 
          }}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-white rounded-2xl shadow-xl border-2 border-sky-500 flex items-center justify-center group-hover:scale-110 transition-all overflow-hidden">
              <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
              {item.name}
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-sky-500 rounded-full border-2 border-white" />
          </div>
        </motion.button>
      ))}

      <div className="absolute bottom-8 left-8 right-8 flex justify-center">
        <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-sky-500" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Guide Locations</span>
          </div>
          <div className="w-[1px] h-4 bg-slate-300" />
          <span className="text-[10px] font-bold text-slate-500">{items.length} results found in this area</span>
        </div>
      </div>
    </div>
  );
};

const SortDropdown = ({ 
  onSort, 
  currentSort 
}: { 
  onSort: (value: string) => void; 
  currentSort: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { value: 'rating', label: 'Top Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'experience', label: 'Most Experienced' }
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-slate-700 hover:border-slate-200 transition-all shadow-sm"
      >
        <Bolt size={18} className="text-sky-500" />
        Sort by: {options.find(o => o.value === currentSort)?.label}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 p-2"
          >
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => {
                  onSort(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all",
                  currentSort === option.value ? "bg-sky-50 text-sky-600" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {option.label}
                {currentSort === option.value && <CheckCircle2 size={16} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const StudentGuideApplication = ({ 
  onClose, 
  onSubmit 
}: { 
  onClose: () => void; 
  onSubmit: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    university: '',
    studentIdUrl: '',
    motivation: ''
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden"
      >
        <div className="p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Student Guide Program</h2>
              <p className="text-slate-500 font-medium">Earn while you study and share your local knowledge.</p>
            </div>
            <button onClick={onClose} className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
              <X size={24} className="text-slate-400" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">University Name</label>
                <input
                  type="text"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  placeholder="e.g. Karakoram International University"
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-sky-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Student ID (URL)</label>
                <input
                  type="text"
                  value={formData.studentIdUrl}
                  onChange={(e) => setFormData({ ...formData, studentIdUrl: e.target.value })}
                  placeholder="Link to your ID photo"
                  className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-sky-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">Why do you want to be a guide?</label>
              <textarea
                rows={4}
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                placeholder="Tell us about your local knowledge and passion..."
                className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-sky-500 transition-all resize-none"
              />
            </div>

            <div className="bg-sky-50 p-6 rounded-3xl flex gap-4">
              <div className="w-12 h-12 bg-sky-500 rounded-2xl flex items-center justify-center shrink-0">
                <GraduationCap size={24} className="text-white" />
              </div>
              <div>
                <h4 className="text-sky-900 font-black text-sm mb-1">Student Benefits</h4>
                <p className="text-sky-700 text-xs font-medium leading-relaxed">
                  Verified students get 0% platform fees for their first 10 bookings and access to exclusive training workshops.
                </p>
              </div>
            </div>

            <button
              onClick={() => onSubmit(formData)}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all mt-4"
            >
              Submit Application
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const MotoTrekMap = ({ 
  mechanics, 
  routes 
}: { 
  mechanics: Mechanic[]; 
  routes: Route[];
}) => {
  return (
    <div className="w-full h-[700px] bg-slate-900 rounded-[50px] relative overflow-hidden border-8 border-slate-800 shadow-2xl">
      <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/74.0,35.0,7,0/1200x700?access_token=mock_token')] bg-cover bg-center opacity-40" />
      
      {/* Routes visualization */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
        <path d="M 200 300 Q 400 100 600 400 T 1000 200" stroke="#0ea5e9" strokeWidth="4" fill="none" strokeDasharray="8 8" />
        <path d="M 100 500 Q 300 600 500 400 T 900 500" stroke="#f59e0b" strokeWidth="4" fill="none" strokeDasharray="8 8" />
      </svg>

      {/* Mechanics Markers */}
      {(mechanics || []).map((mech, i) => (
        <div
          key={mech.id}
          className="absolute group cursor-pointer"
          style={{ left: `${20 + (i * 15)}%`, top: `${30 + (i * 10)}%` }}
        >
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 border-2 border-white group-hover:scale-110 transition-all">
            <Wrench size={20} className="text-white" />
          </div>
          <div className="absolute top-0 left-14 bg-white p-3 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-10">
            <p className="text-xs font-black text-slate-900">{mech.name}</p>
            <p className="text-[10px] font-bold text-slate-500">{mech.specialty}</p>
          </div>
        </div>
      ))}

      <div className="absolute top-10 left-10 space-y-4">
        <div className="bg-slate-800/80 backdrop-blur-xl p-6 rounded-[32px] border border-slate-700 w-80 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
              <Navigation size={20} className="text-white" />
            </div>
            <h3 className="text-white font-black tracking-tight">MotoTrek Explorer</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs font-bold text-slate-300">Mechanics</span>
              </div>
              <span className="text-xs font-black text-white">{(mechanics || []).length}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-sky-500" />
                <span className="text-xs font-bold text-slate-300">Active Routes</span>
              </div>
              <span className="text-xs font-black text-white">{(routes || []).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImpactDashboard = ({ 
  tokens, 
  projects 
}: { 
  tokens: number; 
  projects: any[];
}) => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-100/50">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Impact Dashboard</h2>
              <p className="text-slate-500 font-medium">Your contribution to local communities in Northern Pakistan.</p>
            </div>
            <div className="flex items-center gap-4 bg-emerald-50 px-6 py-4 rounded-3xl border border-emerald-100">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Leaf size={24} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">GHOOMER Tokens</p>
                <p className="text-2xl font-black text-slate-900">{tokens.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Trees Planted', value: '124', icon: TreePine, color: 'emerald' },
              { label: 'Local Jobs', value: '42', icon: Users, color: 'sky' },
              { label: 'Waste Collected', value: '850kg', icon: Trash2, color: 'amber' }
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <stat.icon size={24} className={`text-${stat.color}-500 mb-4`} />
                <p className="text-2xl font-black text-slate-900 mb-1">{stat.value}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl -mr-32 -mt-32" />
          <h3 className="text-xl font-black mb-6 relative">Active Projects</h3>
          <div className="space-y-6 relative">
            {projects.map((project, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                  <p className="text-sm font-bold text-slate-300">{project.name}</p>
                  <p className="text-xs font-black text-sky-400">{project.progress}%</p>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    className="h-full bg-sky-500"
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-sm transition-all mt-10 border border-white/10">
            Redeem Tokens
          </button>
        </div>
      </div>
    </div>
  );
};

const GuidePassPricing = ({ 
  onSubscribe 
}: { 
  onSubscribe: (plan: string) => void;
}) => {
  const plans = [
    {
      name: 'Monthly',
      price: '$19',
      period: '/mo',
      features: ['Unlimited Bookings', 'Priority Support', 'Exclusive Routes', '100 Impact Tokens'],
      color: 'slate',
      popular: false
    },
    {
      name: 'Yearly',
      price: '$149',
      period: '/yr',
      features: ['All Monthly Features', '2 Months Free', 'Gear Discounts', '500 Impact Tokens', 'VIP Meetups'],
      color: 'sky',
      popular: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {plans.map((plan, i) => (
        <div
          key={i}
          className={cn(
            "relative p-10 rounded-[40px] border-2 transition-all hover:scale-[1.02]",
            plan.popular ? "bg-white border-sky-500 shadow-2xl shadow-sky-100" : "bg-white border-slate-100 shadow-xl"
          )}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
              Best Value
            </div>
          )}
          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-900 mb-2">{plan.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black text-slate-900">{plan.price}</span>
              <span className="text-slate-400 font-bold">{plan.period}</span>
            </div>
          </div>
          <div className="space-y-4 mb-10">
            {plan.features.map((feature, j) => (
              <div key={j} className="flex items-center gap-3">
                <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", plan.popular ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-400")}>
                  <Check size={12} />
                </div>
                <span className="text-sm font-bold text-slate-600">{feature}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => onSubscribe(plan.name)}
            className={cn(
              "w-full py-5 rounded-2xl font-black text-lg transition-all shadow-lg",
              plan.popular ? "bg-sky-500 text-white shadow-sky-200 hover:bg-sky-600" : "bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800"
            )}
          >
            Get GuidePass
          </button>
        </div>
      ))}
    </div>
  );
};

const BookingConfirmation = ({ 
  booking, 
  onClose 
}: { 
  booking: any; 
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden text-center"
      >
        <div className="p-10">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-emerald-500" />
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Booking Confirmed!</h2>
          <p className="text-slate-500 font-medium mb-8">
            Your adventure with <span className="text-slate-900 font-bold">{booking.guideName}</span> is all set. 
            A confirmation email and SMS have been sent to you.
          </p>

          <div className="bg-slate-50 rounded-3xl p-6 mb-8 text-left space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Booking ID</span>
              <span className="text-sm font-bold text-slate-900">#GMR-{booking.id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Date</span>
              <span className="text-sm font-bold text-slate-900">{format(new Date(booking.date), 'MMMM dd, yyyy')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Amount Paid</span>
              <span className="text-sm font-bold text-emerald-600">${booking.amount}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={onClose}
              className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all"
            >
              Go to Dashboard
            </button>
            <button className="w-full py-4 text-slate-500 font-bold text-sm hover:text-slate-900 transition-all">
              Download Receipt
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


















const CarCard: React.FC<{ car: CarType }> = ({ car }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group"
  >
    <div className="h-48 overflow-hidden relative">
      <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wider shadow-sm">
        {car.type}
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{car.name}</h3>
          <div className="flex items-center gap-2 text-slate-400 text-xs mt-1">
            <Users size={12} />
            <span>Up to {car.capacity} passengers</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sky-500 font-bold text-lg">${car.pricePerDay}</div>
          <div className="text-[10px] text-slate-400 uppercase font-bold">per day</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {car.features.map(feature => (
          <span key={feature} className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-lg border border-slate-100">
            {feature}
          </span>
        ))}
      </div>
      <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
        <Car size={16} />
        Rent Now
      </button>
    </div>
  </motion.div>
);


const DestinationCard: React.FC<{ dest: Destination; onClick: () => void; onBook: () => void }> = ({ dest, onClick, onBook }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="relative h-[450px] rounded-[40px] overflow-hidden group shadow-2xl border border-white/10 cursor-pointer"
  >
    <div onClick={onClick} className="absolute inset-0">
      <img 
        src={dest.image} 
        alt={dest.name} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />
    </div>
    
    <div className="absolute top-8 left-8 flex flex-col gap-2 pointer-events-none">
      <span className="w-fit px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
        {dest.region}
      </span>
    </div>

    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
      <div onClick={onClick} className="cursor-pointer">
        <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-3">
          <Users size={14} />
          100% Private Tour
        </div>
        <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors font-display">{dest.name}</h3>
        <p className="text-slate-300 text-sm mb-8 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed font-medium">
          {dest.description}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col" onClick={onClick}>
          <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Starting from</span>
          <span className="text-2xl font-black text-white">${dest.price}</span>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onBook();
          }}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 flex items-center gap-2"
        >
          Book Now
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  </motion.div>
);

const StarRating: React.FC<{ rating: number; size?: number }> = ({ rating, size = 14 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={size} className="fill-amber-500 text-amber-500" />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star size={size} className="text-slate-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star size={size} className="fill-amber-500 text-amber-500" />
          </div>
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} size={size} className="text-slate-300" />
      ))}
    </div>
  );
};

const GuideCard: React.FC<{ 
  guide: Guide; 
  onSelect: (guide: Guide) => void; 
  onContact: (guide: Guide) => void;
  onBook: (guide: Guide) => void;
  isSaved?: boolean;
  onToggleSave?: (guideId: string) => void;
}> = ({ guide, onSelect, onContact, onBook, isSaved, onToggleSave }) => {
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: `${guide.name} - Verified Guide on GHOOMERS`,
      text: `Check out ${guide.name}, a verified local guide in ${guide.location}!`,
      url: window.location.origin + `?guide=${guide.id}`,
    };

    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert('Link copied to clipboard!');
    }
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave?.(guide.id);
  };

  return (
    <motion.div 
      whileHover={{ y: -12, scale: 1.02 }}
      onClick={() => onSelect(guide)}
      className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-slate-100 group cursor-pointer transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)]"
    >
      <div className="relative h-72 overflow-hidden">
        <img 
          src={guide.image} 
          alt={guide.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        <div className="absolute top-6 left-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-slate-100">
              <img 
                src={guide.image} 
                alt={guide.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {guide.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-sky-600 text-white rounded-full p-1.5 border-2 border-white shadow-lg">
                <CheckCircle2 size={12} />
              </div>
            )}
          </div>
        </div>

        <div className="absolute top-6 right-6 flex flex-col gap-2">
          <div className="px-4 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-xl flex items-center gap-2 backdrop-blur-md border border-white/20">
            <Users size={12} /> Tours
          </div>
          {guide.badge && (
            <div className="px-4 py-1.5 rounded-full bg-sky-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-xl backdrop-blur-md border border-white/20">
              {guide.badge}
            </div>
          )}
        </div>

        <div className="absolute bottom-6 right-6 flex gap-2 transition-all duration-300">
          <button 
            onClick={handleShare}
            className="w-10 h-10 bg-white/90 backdrop-blur-md hover:bg-white text-slate-900 rounded-full flex items-center justify-center shadow-xl transition-all"
          >
            <Share2 size={18} />
          </button>
          <button 
            onClick={handleToggleSave}
            className={cn(
              "w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl transition-all",
              isSaved ? "bg-rose-500 text-white" : "bg-white/90 text-slate-900"
            )}
          >
            <Heart size={18} className={cn(isSaved && "fill-current")} />
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">{guide.name}</h3>
            <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium">
              <MapPin size={14} className="text-sky-500" />
              {guide.location}
            </div>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            <StarRating rating={guide.rating} size={14} />
            <span className="text-amber-700 font-black text-sm">{guide.rating}</span>
          </div>
        </div>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 font-medium italic">
          "{guide.bio}"
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Per Day</span>
            <span className="text-xl font-black text-slate-900">${guide.pricePerDay}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onContact(guide); }}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <MessageSquare size={14} />
              Contact
            </button>
            <div className="relative group/tooltip">
              <button 
                onClick={(e) => { e.stopPropagation(); onBook(guide); }}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-sky-600/20"
              >
                Book Now
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20 shadow-xl">
                Book this guide for your next adventure
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const GuideModal: React.FC<{ guide: Guide | null; onClose: () => void; onBook: (guide: Guide) => void; onContact: (guide: Guide) => void }> = ({ guide, onClose, onBook, onContact }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'trips' | 'reviews'>('about');

  if (!guide) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white rounded-full transition-all z-10"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 h-80 lg:h-auto relative">
              <img 
                src={guide.image} 
                alt={guide.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent lg:hidden" />
              <div className="absolute bottom-6 left-6 text-white lg:hidden">
                <h2 className="text-3xl font-bold font-display">{guide.name}</h2>
                <p className="opacity-80 flex items-center gap-1"><MapPin size={16} /> {guide.location}</p>
              </div>
            </div>

            <div className="lg:col-span-7 p-8 lg:p-10">
              <div className="hidden lg:block mb-8">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-4xl font-bold text-slate-900 font-display">{guide.name}</h2>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={20} className="fill-amber-500" />
                    {guide.rating}
                  </div>
                </div>
                <p className="text-slate-500 flex items-center gap-1.5"><MapPin size={18} /> {guide.location}</p>
              </div>

              <div className="flex border-b border-slate-100 mb-8">
                {(['about', 'trips', 'reviews'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "px-6 py-3 text-sm font-bold capitalize transition-all relative",
                      activeTab === tab ? "text-sky-600" : "text-slate-400 hover:text-slate-600"
                    )}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-600" />
                    )}
                  </button>
                ))}
              </div>

              <div className="min-h-[300px]">
                {activeTab === 'about' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Biography</h4>
                      <p className="text-slate-600 leading-relaxed italic">"{guide.bio}"</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Experience</h4>
                        <p className="text-slate-900 font-bold text-lg">{guide.experienceYears} Years</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Languages</h4>
                        <p className="text-slate-900 font-bold text-sm">{guide.languages.join(', ')}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekly Availability</h4>
                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                          <CheckCircle2 size={10} />
                          Next: {guide.availability[0]}
                        </span>
                      </div>
                      <div className="grid grid-cols-7 gap-1.5">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                          const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
                          const isAvailable = guide.availability.includes(fullDays[i]);
                          return (
                            <Tooltip key={day} text={isAvailable ? "Available for booking" : "Fully booked"}>
                              <div 
                                className={cn(
                                  "flex flex-col items-center justify-center py-3 rounded-xl border text-[10px] font-bold transition-all",
                                  isAvailable 
                                    ? "bg-emerald-50 border-emerald-100 text-emerald-700 shadow-sm" 
                                    : "bg-slate-50 border-slate-100 text-slate-300"
                                )}
                              >
                                {day}
                                <div className={cn(
                                  "w-1 h-1 rounded-full mt-1",
                                  isAvailable ? "bg-emerald-400" : "bg-slate-200"
                                )} />
                              </div>
                            </Tooltip>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'trips' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {DESTINATIONS.slice(0, 2).map(dest => (
                      <div key={dest.id} className="border border-slate-100 rounded-2xl overflow-hidden group">
                        <div className="h-32 overflow-hidden">
                          <img src={dest.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                        </div>
                        <div className="p-4">
                          <h5 className="font-bold text-slate-900 text-sm mb-1">{dest.name}</h5>
                          <p className="text-xs text-slate-500 mb-2">{dest.activityType}</p>
                          <div className="text-sky-600 font-bold text-sm">From ${dest.price}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'reviews' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                    {[1, 2].map(i => (
                      <div key={i} className="border-b border-slate-50 pb-6 last:border-0">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold">U</div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">Verified Traveler</div>
                            <div className="flex text-amber-400"><Star size={12} className="fill-amber-400" /> <Star size={12} className="fill-amber-400" /> <Star size={12} className="fill-amber-400" /> <Star size={12} className="fill-amber-400" /> <Star size={12} className="fill-amber-400" /></div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed italic">"An incredible experience! {guide.name} was professional, knowledgeable, and made us feel safe throughout the entire trek."</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              <div className="pt-8 border-t border-slate-100 flex items-center gap-4 mt-8">
                <div className="flex-1">
                  <div className="text-slate-400 text-xs mb-1 uppercase font-bold tracking-widest">Price per day</div>
                  <div className="text-2xl font-bold text-slate-900 font-display">${guide.pricePerDay}</div>
                </div>
                <button 
                  onClick={() => onContact(guide)}
                  className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl font-bold transition-all flex items-center gap-2"
                >
                  <MessageSquare size={20} />
                  <span className="hidden sm:inline">Contact</span>
                </button>
                <button 
                  onClick={() => onBook(guide)}
                  className="flex-1 px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold shadow-lg shadow-sky-100 transition-all hover:-translate-y-1"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const BookingModal: React.FC<{ 
  isOpen: boolean;
  guide: Guide | null; 
  onClose: () => void; 
  onBookingComplete: (booking: Booking) => void;
  onViewDashboard: () => void;
  initialStartDate?: string;
  initialTripName?: string;
  initialDays?: number;
  initialTravelers?: number;
  initialPackage?: string;
  user: User | null;
  onLoginClick: () => void;
  guides: Guide[];
}> = ({ isOpen, guide: initialGuide, onClose, onBookingComplete, onViewDashboard, initialStartDate, initialTripName, initialDays, initialTravelers, initialPackage, user, onLoginClick, guides }) => {
  const [step, setStep] = useState<'guide' | 'dates' | 'policy' | 'success'>(initialGuide ? 'dates' : 'guide');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');
  const [error, setError] = useState('');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(initialGuide);
  const [formData, setFormData] = useState({
    tripName: initialTripName || '',
    startDate: initialStartDate || '',
    days: initialDays || 3,
    travelers: initialTravelers || 1,
    selectedPackage: initialPackage || 'standard',
    cancellationPolicy: '24h' as '24h' | '7d' | 'Non-refundable'
  });

  const packages = [
    { id: 'standard', name: 'Standard', multiplier: 1, icon: <Backpack size={14} />, desc: 'Local Guide, Standard Meals' },
    { id: 'deluxe', name: 'Deluxe', multiplier: 1.5, icon: <Crown size={14} />, desc: 'Expert Guide, 3* Hotel, Private Jeep' },
    { id: 'executive', name: 'Executive', multiplier: 2.2, icon: <Gem size={14} />, desc: 'Elite Guide, Luxury Stay, Dedicated 4x4' }
  ];

  const steps = [
    { id: 'guide', label: 'Guide' },
    { id: 'dates', label: 'Details' },
    { id: 'policy', label: 'Policy' },
    { id: 'success', label: 'Done' }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  useEffect(() => {
    if (initialGuide) {
      setSelectedGuide(initialGuide);
    }
  }, [initialGuide]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      tripName: initialTripName || prev.tripName,
      startDate: initialStartDate || prev.startDate,
      days: initialDays || prev.days,
      travelers: initialTravelers || prev.travelers,
      selectedPackage: initialPackage || prev.selectedPackage
    }));
  }, [initialStartDate, initialTripName, initialDays, initialTravelers, initialPackage]);

  if (!isOpen) return null;

  const activeGuide = selectedGuide || ((guides || []).length > 0 ? guides[0] : null);
  if (!activeGuide) return null;

  const guideToUse = activeGuide;
  const pkgMultiplier = packages.find(p => p.id === formData.selectedPackage)?.multiplier || 1;
  const basePrice = guideToUse.pricePerDay * pkgMultiplier;
  const travelersExtra = (formData.travelers > 1 ? (formData.travelers - 1) * 20 : 0);
  const totalPrice = (basePrice + travelersExtra) * formData.days;

  const handleGuideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGuide) {
      setError('Please select a guide');
      return;
    }
    setError('');
    setStep('dates');
  };

  const handleDatesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onLoginClick();
      return;
    }
    if (!formData.startDate) {
      setError('Please select a start date');
      return;
    }
    setError('');
    setStep('policy');
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const endDate = new Date(new Date(formData.startDate).getTime() + formData.days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guideId: guideToUse.id,
          guideName: guideToUse.name,
          tripName: formData.tripName || "Custom Expedition",
          startDate: formData.startDate,
          endDate,
          days: formData.days,
          travelers: formData.travelers,
          totalPrice,
          cancellationPolicy: formData.cancellationPolicy
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Booking request failed');

      onBookingComplete(data.booking);
      setConfirmedBookingId(data.booking.id);
      setStep('success');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-all z-10"
          >
            <X size={20} />
          </button>

          {step !== 'success' && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.slice(0, 3).map((s, i) => (
                  <div key={s.id} className="flex items-center flex-1 last:flex-none">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                      currentStepIndex >= i 
                        ? "bg-sky-500 text-white shadow-lg shadow-sky-100" 
                        : "bg-slate-100 text-slate-400"
                    )}>
                      {i + 1}
                    </div>
                    {i < 2 && (
                      <div className={cn(
                        "h-0.5 flex-1 mx-2 transition-all",
                        currentStepIndex > i ? "bg-sky-500" : "bg-slate-100"
                      )} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between px-1">
                {steps.slice(0, 3).map((s, i) => (
                  <span key={s.id} className={cn(
                    "text-[10px] font-black uppercase tracking-widest transition-all",
                    currentStepIndex === i ? "text-sky-600" : "text-slate-400"
                  )}>
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {step === 'success' ? (
            <div className="text-center py-8">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Clock size={40} />
              </motion.div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h2>
              <p className="text-slate-500 mb-6">Your booking request has been sent to {guideToUse.name}. You'll be notified once they approve the trip.</p>
              
              <div className="p-4 bg-slate-50 rounded-2xl text-left space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Request ID:</span>
                  <span className="font-mono font-bold text-sky-600">{confirmedBookingId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Trip:</span>
                  <span className="font-bold text-slate-900">{formData.tripName || "Custom Expedition"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Status:</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest">Pending Approval</span>
                </div>
              </div>

              <button 
                onClick={onViewDashboard}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
              >
                View My Bookings
              </button>
            </div>
          ) : step === 'guide' ? (
            <form onSubmit={handleGuideSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Select Your Guide</h2>
              <p className="text-slate-500 text-sm mb-6">Choose the expert who will lead your adventure.</p>
              
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {guides.map(g => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedGuide(g)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group",
                      selectedGuide?.id === g.id 
                        ? "border-sky-500 bg-sky-50 ring-2 ring-sky-500/20" 
                        : "border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <img src={g.image} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900">{g.name}</h4>
                      <p className="text-xs text-slate-500">{g.location} • ${g.pricePerDay}/day</p>
                    </div>
                    {selectedGuide?.id === g.id && <CheckCircle2 size={20} className="text-sky-500" />}
                  </button>
                ))}
              </div>

              {error && <p className="text-rose-500 text-xs font-bold">{error}</p>}

              <button 
                type="submit"
                className="w-full py-4 bg-sky-500 text-white rounded-2xl font-bold hover:bg-sky-600 transition-all flex items-center justify-center gap-2"
              >
                Next Step <ArrowRight size={18} />
              </button>
            </form>
          ) : step === 'dates' ? (
            <form onSubmit={handleDatesSubmit} className="space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <img src={guideToUse.image} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{guideToUse.name}</h2>
                  <p className="text-xs text-slate-500">{guideToUse.location}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Trip Name</label>
                  <input 
                    type="text"
                    placeholder="e.g. Hunza Valley Expedition"
                    value={formData.tripName}
                    onChange={e => setFormData({...formData, tripName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Start Date</label>
                    <input 
                      type="date"
                      value={formData.startDate}
                      onChange={e => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Duration (Days)</label>
                    <input 
                      type="number"
                      min="1"
                      max="30"
                      value={formData.days}
                      onChange={e => setFormData({...formData, days: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Number of Travelers</label>
                  <input 
                    type="number"
                    min="1"
                    max="10"
                    value={formData.travelers}
                    onChange={e => setFormData({...formData, travelers: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              {error && <p className="text-rose-500 text-xs font-bold">{error}</p>}

              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setStep('guide')}
                  className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 bg-sky-500 text-white rounded-2xl font-bold hover:bg-sky-600 transition-all"
                >
                  Next Step
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRequestSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Cancellation Policy</h2>
              <p className="text-slate-500 text-sm mb-6">Select a cancellation policy for this booking.</p>

              <div className="space-y-3">
                {[
                  { id: '24h', label: 'Flexible (24h)', desc: 'Full refund if cancelled 24h before start.' },
                  { id: '7d', label: 'Moderate (7d)', desc: 'Full refund if cancelled 7 days before start.' },
                  { id: 'Non-refundable', label: 'Strict', desc: 'No refunds once confirmed and paid.' }
                ].map((policy) => (
                  <button
                    key={policy.id}
                    type="button"
                    onClick={() => setFormData({...formData, cancellationPolicy: policy.id as any})}
                    className={cn(
                      "w-full p-4 rounded-2xl border transition-all text-left",
                      formData.cancellationPolicy === policy.id 
                        ? "border-sky-500 bg-sky-50 ring-2 ring-sky-500/20" 
                        : "border-slate-100 hover:border-slate-200"
                    )}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-900">{policy.label}</span>
                      {formData.cancellationPolicy === policy.id && <CheckCircle2 size={18} className="text-sky-500" />}
                    </div>
                    <p className="text-xs text-slate-500">{policy.desc}</p>
                  </button>
                ))}
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Estimated Total:</span>
                  <span className="font-bold text-slate-900">${totalPrice}</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Payment will be required only after the guide approves your request.</p>
              </div>

              {error && <p className="text-rose-500 text-xs font-bold">{error}</p>}

              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setStep('dates')}
                  className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Send Request'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const ContactModal: React.FC<{ guide: Guide | null; onClose: () => void; user: User | null }> = ({ guide, onClose, user }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!guide) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      guideId: guide.id,
      guideName: guide.name,
      userName: formData.get('userName'),
      adventure: formData.get('adventure'),
      message: formData.get('message'),
    };
    
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-all"
          >
            <X size={20} />
          </button>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h2>
              <p className="text-slate-500">{guide.name} will get back to you soon.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600">
                  <MessageSquare size={32} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Contact {guide.name}</h3>
                  <p className="text-slate-500 text-sm">Send a direct message</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-medium">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Name</label>
                  <input 
                    name="userName" 
                    required 
                    type="text" 
                    defaultValue={user?.name || ''}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Adventure of Interest</label>
                  <select name="adventure" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all">
                    {DESTINATIONS.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                    <option value="Custom Expedition">Custom Expedition</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Message</label>
                  <textarea 
                    name="message"
                    required 
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all resize-none" 
                    placeholder={`Hi ${guide.name}, I'm interested in...`}
                  ></textarea>
                </div>
                <button 
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold shadow-lg shadow-sky-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


// --- Services Section ---


const ProfileView = ({ 
  user, 
  onUpdate, 
  bookings, 
  savedGuides, 
  onBack,
  onLeaveReview,
  onSelectGuide,
  onContactGuide,
  onBookGuide,
  onToggleSave,
  onCheckIn,
  onCheckOut,
  onDownloadItinerary,
  onPay,
  onCancel
}: { 
  user: User | null; 
  onUpdate: (user: User) => void; 
  bookings: Booking[]; 
  savedGuides: Guide[];
  onBack: () => void;
  onLeaveReview: (booking: Booking) => void;
  onSelectGuide: (guide: Guide) => void;
  onContactGuide: (guide: Guide) => void;
  onBookGuide: (guide: Guide) => void;
  onToggleSave: (id: string) => void;
  onCheckIn: (bookingId: string) => Promise<void>;
  onCheckOut: (bookingId: string) => Promise<void>;
  onDownloadItinerary: (bookingId: string) => Promise<void>;
  onPay: (booking: any) => void;
  onCancel: (booking: any) => void
}) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'saved'>('profile');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, avatar, email })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Update failed');

      onUpdate(data.user);
      alert('Profile updated successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <button onClick={onBack} className="p-2 hover:bg-white rounded-full transition-colors">
            <ChevronLeft size={24} className="text-slate-600" />
          </button>
          <h1 className="text-3xl font-bold text-slate-900 font-display">User Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-6 text-center">
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden border-4 border-white shadow-lg">
                {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <UserIcon size={48} className="text-emerald-500" />}
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-display">{user.name}</h2>
              <p className="text-slate-500 text-sm mb-6">{user.email}</p>
              
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('profile')}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3",
                    activeTab === 'profile' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <UserIcon size={18} /> Edit Profile
                </button>
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3",
                    activeTab === 'bookings' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <Calendar size={18} /> Booking History
                </button>
                <button 
                  onClick={() => setActiveTab('saved')}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3",
                    activeTab === 'saved' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-100" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <Heart size={18} /> Saved Guides
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-8">
                <h3 className="text-xl font-bold text-slate-900 font-display mb-6">Edit Information</h3>
                <form onSubmit={handleSubmit} className="max-w-md space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Display Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Avatar URL</label>
                    <input
                      type="text"
                      value={avatar}
                      onChange={e => setAvatar(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-emerald-500 transition-colors text-sm"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 font-display">Booking History</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trip</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guide</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-5 font-mono text-[11px] font-bold text-sky-600">{booking.id}</td>
                          <td className="px-8 py-5 font-bold text-slate-900 text-sm">{booking.tripName}</td>
                          <td className="px-8 py-5 text-slate-600 text-sm">{booking.guideName}</td>
                          <td className="px-8 py-5 text-slate-500 text-sm">{booking.startDate}</td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3">
                              {booking.status === 'Paid' && (
                                <button 
                                  onClick={() => onCheckIn(booking.id)}
                                  className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100 hover:bg-emerald-100 transition-colors"
                                >
                                  Check In
                                </button>
                              )}
                              {booking.status === 'In Progress' && (
                                <button 
                                  onClick={() => onCheckOut(booking.id)}
                                  className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100 hover:bg-amber-100 transition-colors"
                                >
                                  Check Out
                                </button>
                              )}
                              {(booking.status === 'Paid' || booking.status === 'In Progress' || booking.status === 'Completed') && (
                                <button 
                                  onClick={() => onDownloadItinerary(booking.id)}
                                  className="p-2 text-slate-400 hover:text-sky-600 transition-colors"
                                  title="Download Itinerary"
                                >
                                  <Mail size={16} />
                                </button>
                              )}
                              {booking.status === 'Completed' && (
                                <button 
                                  onClick={() => onLeaveReview(booking)}
                                  className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-sky-100 hover:bg-sky-100 transition-colors"
                                >
                                  Review
                                </button>
                              )}
                              <span className={cn(
                                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border",
                                booking.status === 'Confirmed' ? "bg-emerald-100/50 text-emerald-700 border-emerald-200" :
                                booking.status === 'Paid' ? "bg-emerald-100/50 text-emerald-700 border-emerald-200" :
                                booking.status === 'In Progress' ? "bg-amber-100/50 text-amber-700 border-amber-200" :
                                booking.status === 'Completed' ? "bg-sky-100/50 text-sky-700 border-sky-200" :
                                booking.status === 'Pending' ? "bg-amber-100/50 text-amber-700 border-amber-200" :
                                "bg-rose-100/50 text-rose-700 border-rose-200"
                              )}>
                                {booking.status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {(bookings || []).length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-medium">
                            No bookings found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedGuides.map((guide) => (
                  <GuideCard 
                    key={guide.id} 
                    guide={guide} 
                    onSelect={onSelectGuide}
                    onContact={onContactGuide}
                    onBook={onBookGuide}
                    isSaved={true}
                    onToggleSave={onToggleSave}
                  />
                ))}
                {(savedGuides || []).length === 0 && (
                  <div className="col-span-full bg-white rounded-3xl border border-slate-200/50 shadow-sm p-20 text-center">
                    <Heart className="text-slate-200 mx-auto mb-4" size={48} />
                    <p className="text-slate-400 font-medium">You haven't saved any guides yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardView = ({ onBack, bookings, user, onLeaveReview, isLoading, isFavoritesLoading, savedGuides, onSelectGuide, onContactGuide, onBookGuide, onToggleSave, onCheckIn, onCheckOut, onDownloadItinerary, onPay, onCancel }: { 
  onBack: () => void, 
  bookings: Booking[], 
  user: User | null, 
  onLeaveReview: (booking: Booking) => void,
  isLoading: boolean,
  isFavoritesLoading: boolean,
  savedGuides: Guide[],
  onSelectGuide: (g: Guide) => void,
  onContactGuide: (g: Guide) => void,
  onBookGuide: (g: Guide) => void,
  onToggleSave: (id: string) => void,
  onCheckIn: (bookingId: string) => Promise<void>,
  onCheckOut: (bookingId: string) => Promise<void>,
  onDownloadItinerary: (bookingId: string) => Promise<void>,
  onPay: (booking: any) => void,
  onCancel: (booking: any) => void
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'bookings' | 'saved' | 'impact'>('bookings');

  const filteredBookings = (bookings || []).filter(b => 
    statusFilter === 'All' || b.status === statusFilter
  );

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Confirmed': return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case 'Paid': return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case 'In Progress': return "bg-amber-50 text-amber-700 border-amber-200";
      case 'Completed': return "bg-slate-100 text-slate-700 border-slate-200";
      case 'Pending': return "bg-blue-50 text-blue-700 border-blue-200";
      case 'Cancelled': return "bg-red-50 text-red-700 border-red-200";
      case 'Rejected': return "bg-red-50 text-red-700 border-red-200";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Confirmed': return "bg-emerald-500";
      case 'Paid': return "bg-emerald-500";
      case 'In Progress': return "bg-amber-500";
      case 'Completed': return "bg-slate-500";
      case 'Pending': return "bg-blue-500";
      case 'Cancelled': return "bg-red-500";
      case 'Rejected': return "bg-red-500";
      default: return "bg-slate-500";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <p className="text-slate-500 text-sm mb-1">Good morning ☀️</p>
            <h1 className="text-3xl font-bold text-slate-900 font-display">Welcome back, {user?.name.split(' ')[0] || 'Traveller'}</h1>
          </div>
          <button onClick={onBack} className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all">
            Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Trips Taken", val: (bookings || []).filter(b => b.status === 'Completed').length.toString(), change: "Lifetime total", icon: <Mountain className="text-sky-500" /> },
            { label: "Upcoming", val: (bookings || []).filter(b => b.status === 'Confirmed' || b.status === 'Paid' || b.status === 'In Progress').length.toString(), change: (bookings || []).length > 0 ? `Next: ${bookings[0].startDate}` : "No trips", icon: <Calendar className="text-emerald-500" /> },
            { label: "Impact Tokens", val: "1,240", change: "View Dashboard", icon: <Globe className="text-emerald-500" />, onClick: () => setActiveTab('impact') },
            { label: "Total Spent", val: `$${(bookings || []).reduce((acc, b) => acc + (b.totalPrice || 0), 0)}`, change: "Verified bookings", icon: <CreditCard className="text-indigo-500" /> },
          ].map((stat, i) => (
            <div 
              key={i} 
              onClick={stat.onClick}
              className={cn(
                "bg-white p-6 rounded-3xl border border-slate-200/50 shadow-sm transition-all",
                stat.onClick && "cursor-pointer hover:border-emerald-200 hover:shadow-emerald-100/20"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">{stat.icon}</div>
              </div>
              {isLoading ? (
                <div className="h-9 bg-slate-100 rounded-lg w-20 animate-pulse mb-1" />
              ) : (
                <div className="text-3xl font-bold text-slate-900 font-display mb-1">{stat.val}</div>
              )}
              <div className="text-xs text-emerald-600 font-bold">{stat.change}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'bookings', label: 'My Bookings', icon: <Calendar size={18} /> },
            { id: 'saved', label: 'Saved Guides', icon: <Heart size={18} /> },
            { id: 'impact', label: 'Impact Dashboard', icon: <Globe size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap",
                activeTab === tab.id 
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                  : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'impact' ? (
          <ImpactDashboard tokens={1240} projects={[]} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {activeTab === 'bookings' ? (
                <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden">
                  <div className="px-8 py-6 border-b border-slate-100/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="font-bold text-slate-900 font-display">Your Bookings</h3>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Filter Status:</span>
                      <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600 outline-none focus:border-sky-500 transition-all cursor-pointer"
                      >
                        <option value="All">All Bookings</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Paid">Paid</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-0">
                    {(filteredBookings || []).length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[800px]">
                          <thead>
                            <tr className="border-b border-slate-100/50 bg-slate-50/30">
                              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Booking ID</th>
                              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Trip Name</th>
                              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Guide</th>
                              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Duration</th>
                              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</th>
                              <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100/50">
                            {filteredBookings.map((booking) => (
                              <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-8 py-5 font-mono text-[11px] font-bold text-sky-600">{booking.id}</td>
                                <td className="px-8 py-5 font-bold text-slate-900 text-sm">{booking.tripName}</td>
                                <td className="px-8 py-5 text-slate-600 text-sm">{booking.guideName}</td>
                                <td className="px-8 py-5 text-slate-500 text-sm">{booking.startDate}</td>
                                <td className="px-8 py-5 text-slate-500 text-sm">{booking.days} {booking.days === 1 ? 'day' : 'days'}</td>
                                <td className="px-8 py-5 font-bold text-slate-900 text-sm">${booking.totalPrice}</td>
                                <td className="px-8 py-5 text-right">
                                  <div className="flex items-center justify-end gap-3">
                                    {booking.status === 'Pending' && (
                                      <button 
                                        onClick={() => onPay(booking)}
                                        className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-100"
                                      >
                                        Pay Now
                                      </button>
                                    )}
                                    {booking.status === 'Paid' && (
                                      <button 
                                        onClick={() => onCheckIn(booking.id)}
                                        className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-emerald-100 hover:bg-emerald-100 transition-colors"
                                      >
                                        Check In
                                      </button>
                                    )}
                                    {booking.status === 'In Progress' && (
                                      <button 
                                        onClick={() => onCheckOut(booking.id)}
                                        className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-amber-100 hover:bg-amber-100 transition-colors"
                                      >
                                        Check Out
                                      </button>
                                    )}
                                    {(booking.status === 'Pending' || booking.status === 'Confirmed' || booking.status === 'Approved') && (
                                      <button 
                                        onClick={() => onCancel(booking)}
                                        className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-rose-100 hover:bg-rose-100 transition-colors"
                                      >
                                        Cancel
                                      </button>
                                    )}
                                    {(booking.status === 'Paid' || booking.status === 'In Progress' || booking.status === 'Completed') && (
                                      <button 
                                        onClick={() => onDownloadItinerary(booking.id)}
                                        className="p-2 text-slate-400 hover:text-sky-600 transition-colors"
                                        title="Download Itinerary"
                                      >
                                        <Mail size={16} />
                                      </button>
                                    )}
                                    {booking.status === 'Completed' && (
                                      <button 
                                        onClick={() => onLeaveReview(booking)}
                                        className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-sky-100 hover:bg-sky-100 transition-colors"
                                      >
                                        Review
                                      </button>
                                    )}
                                    <span className={cn(
                                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border",
                                      getStatusStyles(booking.status)
                                    )}>
                                      <span className={cn("w-1.5 h-1.5 rounded-full", getStatusDot(booking.status))} />
                                      {booking.status}
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-20 px-8">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Mountain className="text-slate-200" size={32} />
                        </div>
                        <p className="text-slate-400 font-medium">
                          {statusFilter === 'All' 
                            ? "No bookings yet. Start your adventure today!" 
                            : `No ${statusFilter.toLowerCase()} bookings found.`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-slate-900 font-display">Saved Guides</h3>
                    <button className="text-sky-600 text-sm font-bold hover:underline">View All</button>
                  </div>
                  {(savedGuides || []).length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {savedGuides.map((guide) => (
                        <div key={guide.id} className="p-4 rounded-2xl border border-slate-100 hover:border-sky-100 hover:bg-sky-50/30 transition-all group">
                          <div className="flex items-center gap-4 mb-4">
                            <img src={guide.image} alt={guide.name} className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                            <div>
                              <h4 className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">{guide.name}</h4>
                              <div className="flex items-center gap-1 text-amber-500">
                                <Star size={12} fill="currentColor" />
                                <span className="text-xs font-bold">{guide.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400">{guide.location}</span>
                            <button 
                              onClick={() => onSelectGuide(guide)}
                              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-900 hover:text-white transition-all"
                            >
                              View Profile
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="text-slate-200 mx-auto mb-4" size={32} />
                      <p className="text-slate-400 text-sm">No saved guides yet.</p>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2 font-display">Need Help?</h3>
                  <p className="text-slate-400 mb-6">Our 24/7 support team is here to assist you with your expeditions.</p>
                  <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold text-sm">Contact Support</button>
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-sky-500/20 to-transparent" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-8">
                <h3 className="font-bold text-slate-900 font-display mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { label: "Find a Guide", icon: <Search size={18} />, color: "sky" },
                    { label: "GigaByte Planning", icon: <Bolt size={18} />, color: "amber" },
                    { label: "Safety Center", icon: <ShieldCheck size={18} />, color: "rose" },
                  ].map((action, i) => (
                    <button key={i} className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:border-sky-100 hover:bg-sky-50/30 transition-all text-left group">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", `bg-${action.color}-50 text-${action.color}-500`)}>{action.icon}</div>
                      <span className="font-bold text-slate-700 group-hover:text-sky-600 transition-colors">{action.label}</span>
                      <ArrowRight size={16} className="ml-auto text-slate-300 group-hover:text-sky-500 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-rose-500 rounded-3xl p-8 text-white shadow-lg shadow-rose-200 cursor-pointer hover:scale-[1.02] transition-all">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 font-display">Emergency SOS</h3>
                <p className="text-rose-100 text-sm leading-relaxed">Tap to alert emergency services and your emergency contacts immediately.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ReviewModal: React.FC<{ 
  booking: Booking | null; 
  onClose: () => void; 
  onSubmit: (review: { rating: number; comment: string; bookingId: string; guideId: string }) => Promise<void>;
}> = ({ booking, onClose, onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!booking) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit({
        rating,
        comment,
        bookingId: booking.id,
        guideId: booking.guideId
      });
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl relative"
          onClick={e => e.stopPropagation()}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-all"
          >
            <X size={20} />
          </button>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 font-display">Rate Your Experience</h2>
            <p className="text-slate-500 text-sm">How was your trip with {booking.guideName} to {booking.tripName}?</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Your Rating</label>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-all hover:scale-110"
                  >
                    <Star 
                      size={32} 
                      className={cn(
                        "transition-colors",
                        star <= rating ? "text-amber-400 fill-current" : "text-slate-200"
                      )} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Your Review</label>
              <textarea
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all resize-none text-sm"
                placeholder="Share your thoughts about the guide and the adventure..."
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const GuideRegistrationModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 3000);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-all"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <ShieldCheck size={48} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Received!</h2>
                <p className="text-slate-500 max-w-md mx-auto">
                  Thank you for applying to become a Ghoomer guide. Our team will review your profile and contact you for a verification interview within 3-5 business days.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Become a Verified Guide</h2>
                  <p className="text-slate-500">Join Pakistan's premier adventure network and start earning.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                      <input required type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" placeholder="Ali Raza" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                      <input required type="email" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" placeholder="ali@GHOOMERS" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                      <input required type="tel" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" placeholder="+92 3XX XXXXXXX" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Daily Rate (USD)</label>
                      <input required type="number" min="1" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" placeholder="45" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Primary Location</label>
                      <select required className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all">
                        <option value="">Select Location</option>
                        <option value="Hunza">Hunza Valley</option>
                        <option value="Skardu">Skardu</option>
                        <option value="Gilgit">Gilgit</option>
                        <option value="Chitral">Chitral</option>
                        <option value="Swat">Swat Valley</option>
                        <option value="Neelum">Neelum Valley</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Experience (Years)</label>
                      <input required type="number" min="1" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" placeholder="5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Specialties</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {["Trekking", "Mountaineering", "Photography", "Cultural Tours", "Winter Sports", "Food Tours"].map(spec => (
                        <label key={spec} className="flex items-center gap-2 p-3 rounded-xl border border-slate-100 bg-slate-50 cursor-pointer hover:bg-white hover:border-sky-200 transition-all">
                          <input type="checkbox" className="rounded text-sky-500 focus:ring-sky-500" />
                          <span className="text-sm text-slate-600">{spec}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Short Bio</label>
                    <textarea required rows={4} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all resize-none" placeholder="Tell us about your experience and why you love guiding..."></textarea>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Languages Spoken</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" placeholder="English, Urdu, Balti..." />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Gallery Photos & Portfolio</label>
                    <p className="text-[10px] text-slate-400 mb-2">Do you have photos of your past tours or a portfolio to share? (Google Drive or Portfolio Link)</p>
                    <input type="url" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-sky-500 outline-none transition-all" placeholder="https://drive.google.com/..." />
                  </div>

                  <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 flex items-start gap-3">
                    <ShieldCheck className="text-sky-600 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-xs text-sky-800 leading-relaxed">
                      By submitting this application, you agree to our Guide Code of Conduct and undergo a verification process including ID check and certification review.
                    </p>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold shadow-lg shadow-sky-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Private Verified Guides",
      description: "Book professionally vetted local experts who speak your language and know every secret of the mountains.",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80",
      icon: <Users size={24} className="text-sky-500" />
    },
    {
      title: "MotoTrek Support",
      description: "Dedicated motorcycle rentals, backup mechanics, and route planning for the ultimate Karakoram Highway ride.",
      image: "https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&w=800&q=80",
      icon: <Bike size={24} className="text-sky-600" />
    },
    {
      title: "Village Immersion",
      description: "Experience genuine northern hospitality with homestays, traditional cooking classes, and local festival access.",
      image: "https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=800&q=80",
      icon: <Trees size={24} className="text-emerald-500" />
    },
    {
      title: "Safety & Emergency",
      description: "24/7 support with one-tap SOS alerts, mountain rescue coordination, and satellite comms for remote treks.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      icon: <ShieldCheck size={24} className="text-rose-500" />
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sky-600 font-bold text-sm uppercase tracking-widest mb-4 block">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-display">What We Offer</h2>
          <p className="text-slate-500 text-lg">
            We provide a range of services to ensure your journey through Pakistan is authentic, safe, and unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-slate-50 rounded-[32px] overflow-hidden border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-64 lg:h-auto overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">{service.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <button className="flex items-center gap-2 text-sky-600 font-bold hover:gap-3 transition-all">
                    Learn More <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StorySection = () => (
  <section className="py-24 overflow-hidden">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sky-600 font-bold text-sm uppercase tracking-widest mb-4 block">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
            Connecting the World to the <span className="gradient-text">Heart of Pakistan</span>
          </h2>
          <div className="space-y-6 text-slate-600 leading-relaxed">
            <p>
              GHOOMERS was born in the high valleys of Gilgit-Baltistan, founded by a group of local guides and travelers who shared a common vision: to make Pakistan's breathtaking landscapes accessible while empowering the communities that call them home.
            </p>
            <p>
              Our mission is to provide a bridge between global adventurers and verified local experts. We believe that the best way to experience a place is through the eyes of those who live there. By connecting you directly with local guides, we ensure authentic experiences while keeping the economic benefits within the local community.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              <div>
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-sky-500 rounded-full" />
                  Authenticity
                </h4>
                <p className="text-sm">Real experiences, real people, real Pakistan.</p>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  Sustainability
                </h4>
                <p className="text-sm">Empowering local economies through tourism.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=1000&q=80" 
              alt="Local guide in Pakistan" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hidden md:block max-w-xs">
            <p className="text-slate-900 font-bold italic mb-4">
              "We don't just show you the mountains; we show you the soul of our people."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 font-bold">
                QA
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Qadir Ali</div>
                <div className="text-xs text-slate-500">CEO & Co-founder</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const AuthModal = ({ isOpen, onClose, onAuthSuccess, initialMode = 'login', initialType = 'traveler' }: { 
  isOpen: boolean, 
  onClose: () => void, 
  onAuthSuccess: (user: User) => void,
  initialMode?: 'login' | 'signup',
  initialType?: 'traveler' | 'partner'
}) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [authType, setAuthType] = useState<'traveler' | 'partner'>(initialType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLogin(initialMode === 'login');
    setAuthType(initialType);
  }, [initialMode, initialType, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const body = isLogin ? { email, password } : { email, password, name };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Authentication failed');

      onAuthSuccess(data.user);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative p-8"
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>

          <div className="text-center mb-8">
            <div className="flex justify-center gap-2 mb-8 p-1 bg-slate-100 rounded-2xl">
              <button 
                onClick={() => setAuthType('traveler')}
                className={cn(
                  "flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all",
                  authType === 'traveler' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                Traveler
              </button>
              <button 
                onClick={() => setAuthType('partner')}
                className={cn(
                  "flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-xl transition-all",
                  authType === 'partner' ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"
                )}
              >
                Partner
              </button>
            </div>
            <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              {authType === 'traveler' ? (
                <UserIcon size={32} className="text-sky-500" />
              ) : (
                <ShieldCheck size={32} className="text-emerald-500" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              {isLogin ? (authType === 'traveler' ? 'Explore Again' : 'Partner Login') : (authType === 'traveler' ? 'Join the Journey' : 'Become a Partner')}
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              {isLogin 
                ? (authType === 'traveler' ? 'Log in to manage your bookings and profile' : 'Access your dashboard and manage inquiries') 
                : (authType === 'traveler' ? 'Connect with verified experts in Northern Pakistan' : 'Grow your business with GHoomers platform')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-emerald-500 transition-colors text-sm"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-emerald-500 transition-colors text-sm"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none focus:border-emerald-500 transition-colors text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-4 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50",
                authType === 'traveler' ? "bg-sky-500 hover:bg-sky-600 shadow-sky-100" : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100"
              )}
            >
              {isLoading ? 'Processing...' : (isLogin ? 'Log In' : (authType === 'traveler' ? 'Create Traveler Account' : 'Sign Up as Partner'))}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className={cn(
                  "ml-2 font-bold hover:underline",
                  authType === 'traveler' ? "text-sky-600" : "text-emerald-600"
                )}
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const MicroTrekView = ({ onBack }: { onBack: () => void }) => {
  const [treks, setTreks] = useState<any[]>([]);
  const [selectedTrek, setSelectedTrek] = useState<any | null>(null);
  const [guides, setGuides] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [includeAddon, setIncludeAddon] = useState(false);

  useEffect(() => {
    const fetchTreks = async () => {
      try {
        const res = await fetch('/api/micro-treks');
        if (res.ok) setTreks(await res.json());
      } catch (err) {
        console.error("Failed to fetch micro treks", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTreks();
  }, []);

  const fetchGuides = async (village: string) => {
    try {
      const res = await fetch(`/api/micro-treks/${village}/guides`);
      if (res.ok) setGuides(await res.json());
    } catch (err) {
      console.error("Failed to fetch guides", err);
    }
  };

  const handleBook = async (guideId: number) => {
    setIsBooking(true);
    try {
      const res = await fetch('/api/micro-treks/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trekId: selectedTrek.id,
          guideId,
          date: format(new Date(), 'yyyy-MM-dd'),
          includeAddon
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setSelectedTrek(null);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error("Booking failed", err);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button 
            onClick={onBack}
            className="flex items-center text-slate-500 hover:text-emerald-500 transition-colors mb-4 group"
          >
            <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Micro Treks</h1>
          <p className="text-slate-500 mt-2">Short, impactful hikes led by local village experts.</p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treks.map(trek => (
              <motion.div 
                key={trek.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={trek.image} alt={trek.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-600">
                    {trek.village}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="flex items-center text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                      <Clock size={12} className="mr-1" /> {trek.duration}
                    </span>
                    <span className="flex items-center text-xs font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                      <Navigation size={12} className="mr-1" /> {trek.elevation_gain}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{trek.name}</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">{trek.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div>
                      <span className="text-2xl font-black text-slate-900">PKR {trek.price}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedTrek(trek);
                        fetchGuides(trek.village);
                      }}
                      className="bg-emerald-500 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedTrek && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedTrek(null)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl relative"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedTrek(null)}
                  className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors z-10"
                >
                  <X size={20} className="text-slate-600" />
                </button>

                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-64 md:h-auto relative">
                    <img src={selectedTrek.image} alt={selectedTrek.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8">
                      <h2 className="text-2xl font-black text-white mb-2">{selectedTrek.name}</h2>
                      <p className="text-white/80 text-sm">{selectedTrek.village} Village</p>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Select Local Guide</h3>
                    <div className="space-y-4 mb-6">
                      {guides.map(guide => (
                        <div 
                          key={guide.id}
                          className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-emerald-500 transition-all group cursor-pointer"
                          onClick={() => handleBook(guide.id)}
                        >
                          <div className="flex items-center gap-3">
                            <img src={guide.avatar} alt={guide.name} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{guide.name}</p>
                              <div className="flex items-center text-amber-500 text-[10px] font-bold">
                                <Star size={10} className="fill-current mr-1" /> {guide.rating} • {guide.experience}
                              </div>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                            <ArrowRight size={14} />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={includeAddon}
                          onChange={e => setIncludeAddon(e.target.checked)}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500"
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-900">Cultural Tea Add-on</p>
                          <p className="text-xs text-slate-500">Tea with a local family (+PKR {selectedTrek.cultural_addon_price})</p>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Price</p>
                        <p className="text-2xl font-black text-slate-900">PKR {selectedTrek.price + (includeAddon ? selectedTrek.cultural_addon_price : 0)}</p>
                      </div>
                      {isBooking && <div className="text-emerald-500 font-bold text-sm">Booking...</div>}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const MotoTrekView = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'rentals' | 'mechanics' | 'routes' | 'tours'>('rentals');
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [gear, setGear] = useState<Gear[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [bikesRes, mechanicsRes, routesRes, gearRes] = await Promise.all([
          fetch('/api/moto/bikes'),
          fetch('/api/moto/mechanics'),
          fetch('/api/moto/routes'),
          fetch('/api/moto/gear')
        ]);
        
        if (bikesRes.ok) setBikes(await bikesRes.json());
        if (mechanicsRes.ok) setMechanics(await mechanicsRes.json());
        if (routesRes.ok) setRoutes(await routesRes.json());
        if (gearRes.ok) setGear(await gearRes.json());
      } catch (err) {
        console.error("Failed to fetch Moto Trek data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSOS = async (mechanicId: number) => {
    try {
      const res = await fetch('/api/moto/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mechanicId, location: "Current GPS Location" })
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error("SOS failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center text-slate-500 hover:text-sky-500 transition-colors mb-4 group"
            >
              <ChevronLeft size={20} className="mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Moto Trek Adventure</h1>
            <p className="text-slate-500 mt-2">Everything you need for your motorcycle journey in the mountains.</p>
          </div>
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
            {[
              { id: 'rentals', label: 'Rentals', icon: Bike },
              { id: 'mechanics', label: 'Mechanics', icon: Wrench },
              { id: 'routes', label: 'Routes', icon: Navigation },
              { id: 'tours', label: 'Tours', icon: Backpack }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center px-4 py-2 rounded-xl text-sm font-bold transition-all",
                  activeTab === tab.id 
                    ? "bg-sky-500 text-white shadow-md shadow-sky-200" 
                    : "text-slate-500 hover:bg-slate-50"
                )}
              >
                <tab.icon size={18} className="mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'rentals' && (
              <div className="space-y-12">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <Bike className="mr-2 text-sky-500" /> Available Bikes
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bikes.map(bike => (
                      <div key={bike.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                        <div className="h-48 relative overflow-hidden">
                          <img src={bike.image} alt={bike.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-sky-600">
                            {bike.type}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-slate-900 mb-1">{bike.name}</h3>
                          <p className="text-slate-500 text-sm mb-4 flex items-center">
                            <MapPin size={14} className="mr-1" /> {bike.shop_name}, {bike.location}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div>
                              <span className="text-2xl font-black text-slate-900">PKR {bike.price_per_day}</span>
                              <span className="text-slate-400 text-xs font-medium ml-1">/ day</span>
                            </div>
                            <button className="bg-sky-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-sky-600 transition-colors">
                              Rent Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                    <Backpack className="mr-2 text-sky-500" /> Riding Gear
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {gear.map(item => (
                      <div key={item.id} className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm p-4 flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-2xl object-cover" referrerPolicy="no-referrer" />
                        <div>
                          <h3 className="font-bold text-slate-900">{item.name}</h3>
                          <p className="text-slate-500 text-xs">{item.type}</p>
                          <p className="text-sky-600 font-bold mt-1">PKR {item.price_per_day}/day</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === 'mechanics' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm p-6 h-[600px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                    <div className="text-center">
                      <Map size={48} className="text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500 font-medium">Interactive Mechanic Map</p>
                      <p className="text-slate-400 text-sm">Showing {(mechanics || []).length} mechanics nearby</p>
                    </div>
                  </div>
                  {/* In a real app, this would be a Google Map with markers */}
                  {mechanics.map(m => (
                    <div 
                      key={m.id} 
                      className="absolute p-2 bg-white rounded-full shadow-lg border-2 border-sky-500 animate-bounce"
                      style={{ top: `${(m.lat - 35) * 100}%`, left: `${(m.lng - 74) * 50}%` }}
                    >
                      <Wrench size={16} className="text-sky-500" />
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-100 rounded-[32px] p-6 mb-6">
                    <h3 className="text-red-900 font-bold flex items-center mb-2">
                      <Bolt className="mr-2 animate-pulse" /> Emergency SOS
                    </h3>
                    <p className="text-red-700 text-sm mb-4">Stuck on the road? Call the nearest mechanic immediately.</p>
                    <button 
                      onClick={() => handleSOS(mechanics[0]?.id)}
                      className="w-full bg-red-600 text-white py-3 rounded-2xl font-black hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone size={20} /> SOS MECHANIC
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Top Rated Mechanics</h3>
                  {mechanics.map(m => (
                    <div key={m.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-slate-900">{m.name}</h4>
                        <div className="flex items-center text-amber-500 text-sm font-bold">
                          <Star size={14} className="fill-current mr-1" /> {m.rating}
                        </div>
                      </div>
                      <p className="text-slate-500 text-xs mb-3 flex items-center">
                        <MapPin size={12} className="mr-1" /> {m.location}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sky-600 text-xs font-bold bg-sky-50 px-2 py-1 rounded-lg">{m.specialty}</span>
                        <a href={`tel:${m.phone}`} className="text-slate-400 hover:text-sky-500 transition-colors">
                          <Phone size={18} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'routes' && (
              <div className="grid grid-cols-1 gap-8">
                {routes.map(route => (
                  <div key={route.id} className="bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm flex flex-col lg:flex-row">
                    <div className="lg:w-1/3 h-64 lg:h-auto relative">
                      <img src={route.image} alt={route.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-black text-slate-900 shadow-sm">
                        {route.difficulty}
                      </div>
                    </div>
                    <div className="p-8 lg:w-2/3">
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600">
                          <Clock size={14} className="mr-1.5" /> {route.duration}
                        </div>
                        <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600">
                          <Navigation size={14} className="mr-1.5" /> {route.distance}
                        </div>
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">{route.name}</h3>
                      <p className="text-slate-500 mb-8 leading-relaxed">{route.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Waypoints</h4>
                          <ul className="space-y-2">
                            {(route.waypoints || []).map((wp, i) => (
                              <li key={i} className="text-sm font-bold text-slate-700 flex items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mr-2" /> {wp}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Fuel Stops</h4>
                          <ul className="space-y-2">
                            {(route.fuel_stops || []).map((fs, i) => (
                              <li key={i} className="text-sm font-bold text-slate-700 flex items-center">
                                <Fuel size={14} className="mr-2 text-amber-500" /> {fs}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Stays</h4>
                          <ul className="space-y-2">
                            {(route.accommodations || []).map((acc, i) => (
                              <li key={i} className="text-sm font-bold text-slate-700 flex items-center">
                                <Trees size={14} className="mr-2 text-emerald-500" /> {acc}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <button className="bg-sky-500 text-white px-8 py-3 rounded-2xl font-black hover:bg-sky-600 transition-all shadow-lg shadow-sky-100 flex items-center gap-2">
                          <Map size={20} /> DOWNLOAD OFFLINE MAP
                        </button>
                        <button className="bg-slate-100 text-slate-900 px-8 py-3 rounded-2xl font-black hover:bg-slate-200 transition-all">
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'tours' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-[40px] p-10 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-3xl font-black mb-4">Group Ride: Karakoram Pass</h3>
                    <p className="text-sky-100 mb-8 max-w-md">Join a community of riders for a 7-day expedition through the highest paved road in the world.</p>
                    <div className="flex items-center gap-6 mb-8">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                          <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-12 h-12 rounded-full border-4 border-sky-500 object-cover" />
                        ))}
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-xs font-bold">+12</div>
                      </div>
                      <span className="text-sm font-bold">16 riders joined</span>
                    </div>
                    <button className="bg-white text-sky-600 px-8 py-4 rounded-2xl font-black hover:bg-sky-600 transition-all shadow-xl">
                      BOOK GROUP TOUR
                    </button>
                  </div>
                  <Bike size={200} className="absolute -bottom-10 -right-10 text-white/10 rotate-12" />
                </div>
                
                <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-10 flex flex-col justify-between">
                  <div>
                    <div className="bg-emerald-50 text-emerald-600 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                      <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-4">Support Vehicle Option</h3>
                    <p className="text-slate-500 mb-6">Don't worry about luggage or breakdowns. Our 4x4 support vehicle follows the group with tools, spare parts, and your bags.</p>
                    <ul className="space-y-3 mb-8">
                      {['Luggage transport', 'Mechanical support', 'Emergency medical kit', 'Refreshments & snacks'].map((item, i) => (
                        <li key={i} className="flex items-center text-sm font-bold text-slate-700">
                          <CheckCircle2 size={16} className="mr-2 text-emerald-500" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="w-full border-2 border-slate-100 text-slate-900 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all">
                    ADD SUPPORT VEHICLE (PKR 5,000/day)
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const { 
    user, setUser, 
    guides, isGuidesLoading, 
    destinations, isDestinationsLoading,
    bookings, setBookings, isBookingsLoading,
    isAuthLoading,
    refreshBookings
  } = useAppContext();

  const [view, setView] = useState<'home' | 'dashboard' | 'guide' | 'destination' | 'profile' | 'find-guides' | 'experiences' | 'experience-detail' | 'moto-trek' | 'micro-trek' | 'explore' | 'destinations' | 'blog' | 'contact' | 'water-adventures' | 'shore-excursions' | 'about' | 'legal' | 'help' | 'how-it-works' | 'agency-signup'>('home');
  const [selectedExperience, setSelectedExperience] = useState<LocalExperience | null>(null);
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>(() => localStorage.getItem('ghoomer_region') || 'All');
  const [selectedActivity, setSelectedActivity] = useState<string>(() => localStorage.getItem('ghoomer_activity') || 'All');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>(() => localStorage.getItem('ghoomer_priceRange') || 'All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(() => localStorage.getItem('ghoomer_difficulty') || 'All');
  const [selectedSeason, setSelectedSeason] = useState<string>(() => localStorage.getItem('ghoomer_season') || 'All');
  const [selectedGroupSize, setSelectedGroupSize] = useState<string>(() => localStorage.getItem('ghoomer_groupSize') || 'All');
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingGuide, setBookingGuide] = useState<Guide | null>(null);
  const [contactGuide, setContactGuide] = useState<Guide | null>(null);
  const [guideSearchQuery, setGuideSearchQuery] = useState('');
  const [destinationSearchQuery, setDestinationSearchQuery] = useState('');
  const [savedGuideIds, setSavedGuideIds] = useState<string[]>([]);
  const [isRegisteringGuide, setIsRegisteringGuide] = useState(false);
  const [selectedGuideLocation, setSelectedGuideLocation] = useState<string>('All');
  const [selectedGuideSpecialty, setSelectedGuideSpecialty] = useState<string>('All');
  const [selectedGuideRating, setSelectedGuideRating] = useState<string>('All');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentBooking, setPaymentBooking] = useState<any>(null);
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false);
  const [cancellationBooking, setCancellationBooking] = useState<any>(null);
  const [isStudentApplicationOpen, setIsStudentApplicationOpen] = useState(false);
  const [isBookingConfirmationOpen, setIsBookingConfirmationOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
  const [isGuidePassOpen, setIsGuidePassOpen] = useState(false);
  const [selectedExploreDistrict, setSelectedExploreDistrict] = useState<string | undefined>(undefined);
  const savedGuides = (guides || []).filter(g => (savedGuideIds || []).includes(g.id));

  const [bookingStartDate, setBookingStartDate] = useState<string>('');
  const [bookingTripName, setBookingTripName] = useState<string>('');
  const [bookingDays, setBookingDays] = useState<number>(3);
  const [bookingTravelers, setBookingTravelers] = useState<number>(1);
  const [selectedPackage, setSelectedPackage] = useState<string>('standard');

  const fetchFavorites = async () => {
    if (!user) {
      setSavedGuideIds([]);
      return;
    }
    try {
      setIsFavoritesLoading(true);
      const response = await fetch('/api/favorites');
      if (response.ok) {
        const data = await response.json();
        setSavedGuideIds(data.favorites);
      }
    } catch (err) {
      console.error("Failed to fetch favorites", err);
    } finally {
      setIsFavoritesLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      setView('home');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const submitReview = async (review: { rating: number; comment: string; bookingId: string; guideId: string }) => {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || "Failed to submit review");
    }
    
    alert("Review submitted successfully!");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    localStorage.setItem('ghoomer_region', selectedRegion);
    localStorage.setItem('ghoomer_activity', selectedActivity);
    localStorage.setItem('ghoomer_priceRange', selectedPriceRange);
    localStorage.setItem('ghoomer_difficulty', selectedDifficulty);
    localStorage.setItem('ghoomer_season', selectedSeason);
    localStorage.setItem('ghoomer_groupSize', selectedGroupSize);
  }, [selectedRegion, selectedActivity, selectedPriceRange, selectedDifficulty, selectedSeason, selectedGroupSize]);

  const toggleSaveGuide = async (guideId: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    // Optimistic update
    setSavedGuideIds(prev => 
      prev.includes(guideId) 
        ? prev.filter(id => id !== guideId) 
        : [...prev, guideId]
    );

    try {
      const response = await fetch('/api/favorites/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guideId })
      });

      if (!response.ok) {
        // Revert on error
        const data = await response.json();
        console.error("Failed to toggle favorite:", data.message);
        setSavedGuideIds(prev => 
          prev.includes(guideId) 
            ? prev.filter(id => id !== guideId) 
            : [...prev, guideId]
        );
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      // Revert on error
      setSavedGuideIds(prev => 
        prev.includes(guideId) 
          ? prev.filter(id => id !== guideId) 
          : [...prev, guideId]
      );
    }
  };

  const addBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  const filteredDestinations = (destinations || []).filter(dest => {
    const query = destinationSearchQuery.toLowerCase();
    const searchMatch = dest.name.toLowerCase().includes(query) || 
                       dest.description.toLowerCase().includes(query) ||
                       dest.region.toLowerCase().includes(query);
    
    const regionMatch = selectedRegion === 'All' || dest.region === selectedRegion;
    const activityMatch = selectedActivity === 'All' || dest.activityType === selectedActivity;
    const difficultyMatch = selectedDifficulty === 'All' || dest.difficulty === selectedDifficulty;
    const seasonMatch = selectedSeason === 'All' || dest.bestSeason === selectedSeason;
    const groupSizeMatch = selectedGroupSize === 'All' || dest.groupSize === selectedGroupSize;
    
    let priceMatch = true;
    if (selectedPriceRange === '< $400') priceMatch = dest.price < 400;
    else if (selectedPriceRange === '$400 - $800') priceMatch = dest.price >= 400 && dest.price <= 800;
    else if (selectedPriceRange === '> $800') priceMatch = dest.price > 800;

    return searchMatch && regionMatch && activityMatch && priceMatch && difficultyMatch && seasonMatch && groupSizeMatch;
  });

  const filteredGuides = (guides || [])
    .filter(guide => {
      const query = guideSearchQuery.toLowerCase();
      const searchMatch = query === '' || 
                         guide.name.toLowerCase().includes(query) || 
                         guide.location.toLowerCase().includes(query) ||
                         (guide.specialties || []).some(s => s.toLowerCase().includes(query));
      
      const locationMatch = selectedGuideLocation === 'All' || (guide.location || '').includes(selectedGuideLocation);
      const specialtyMatch = selectedGuideSpecialty === 'All' || (guide.specialties || []).includes(selectedGuideSpecialty);
      
      let ratingMatch = true;
      if (selectedGuideRating === '4.5+') ratingMatch = guide.rating >= 4.5;
      else if (selectedGuideRating === '4.0+') ratingMatch = guide.rating >= 4.0;
      else if (selectedGuideRating === '3.5+') ratingMatch = guide.rating >= 3.5;

      return searchMatch && locationMatch && specialtyMatch && ratingMatch;
    })
    .sort((a, b) => {
      const query = guideSearchQuery.toLowerCase();
      if (!query) return 0;

      const getScore = (guide: Guide) => {
        let score = 0;
        const name = guide.name.toLowerCase();
        const location = guide.location.toLowerCase();
        
        // Name matches - Highest priority
        if (name === query) score += 100;
        else if (name.startsWith(query)) score += 60;
        else if (name.includes(query)) score += 20;

        // Location matches
        if (location === query) score += 80;
        else if (location.startsWith(query)) score += 40;
        else if (location.includes(query)) score += 15;

        // Specialty matches
        guide.specialties.forEach(s => {
          const specialty = s.toLowerCase();
          if (specialty === query) score += 70;
          else if (specialty.startsWith(query)) score += 35;
          else if (specialty.includes(query)) score += 10;
        });

        return score;
      };

      return getScore(b) - getScore(a);
    });

  const regions = ['All', ...Array.from(new Set((destinations || []).map(d => d.region)))];
  const activities = ['All', ...Array.from(new Set((destinations || []).map(d => d.activityType)))];
  const priceRanges = ['All', '< $400', '$400 - $800', '> $800'];
  const difficulties = ['All', ...Array.from(new Set((destinations || []).map(d => d.difficulty)))];
  const seasons = ['All', ...Array.from(new Set((destinations || []).map(d => d.bestSeason)))];
  const groupSizes = ['All', ...Array.from(new Set((destinations || []).map(d => d.groupSize)))];

  const guideLocations = ['All', ...Array.from(new Set((guides || []).map(g => g.location)))];
  const guideSpecialties = ['All', ...Array.from(new Set((guides || []).flatMap(g => g.specialties || [])))];
  const guideRatings = ['All', '4.5+', '4.0+', '3.5+'];

  const scrollToSection = (id: string) => {
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        const element = document.querySelector(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      <Navbar 
        onDashboardClick={() => setView('dashboard')} 
        onBecomeGuide={() => setIsRegisteringGuide(true)} 
        onLogoClick={() => setView('home')}
        onNavClick={(v) => {
          if (v.startsWith('explore:')) {
            const district = v.split(':')[1];
            setSelectedExploreDistrict(district);
            setView('explore');
          } else {
            setView(v as any);
          }
        }}
        onDestinationSelect={(dest) => {
          setSelectedDestination(dest);
        }}
        user={user}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onProfileClick={() => setView('profile')}
        onFindGuidesClick={() => setView('find-guides')}
        onExperiencesClick={() => setView('experiences')}
        onExploreClick={() => setView('explore')}
        onMotoTrekClick={() => setView('moto-trek')}
        onMicroTrekClick={() => setView('micro-trek')}
        onBlogClick={() => setView('blog')}
        onContactClick={() => setView('contact')}
        onWaterAdventuresClick={() => setView('water-adventures')}
        onDestinationsClick={() => setView('destinations')}
        onShoreExcursionsClick={() => setView('shore-excursions')}
        onAboutClick={() => setView('about')}
        onHowItWorksClick={() => setView('how-it-works')}
        onLegalClick={() => setView('legal')}
        onHelpClick={() => setView('help')}
        destinations={destinations}
        isLoading={isDestinationsLoading}
      />
      
      <AnimatePresence mode="wait">
        {view === 'micro-trek' ? (
          <motion.div
            key="micro-trek"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <MicroTrekView onBack={() => setView('home')} />
          </motion.div>
        ) : view === 'explore' ? (
          <motion.div
            key="explore-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen overflow-hidden"
          >
            <ExplorePage 
              onBack={() => setView('home')} 
              initialDistrict={selectedExploreDistrict}
            />
          </motion.div>
        ) : view === 'agency-signup' ? (
          <motion.div
            key="agency-signup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <AgencySignupPage onBack={() => setView('home')} />
          </motion.div>
        ) : view === 'destinations' ? (
          <motion.div
            key="destinations"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <DestinationsPage onSelect={(dest) => {
              setSelectedDestination(dest);
               // If a destination is selected, we might want to stay on the page 
               // but the modal will pop up.
            }} />
          </motion.div>
        ) : view === 'blog' ? (
          <motion.div
            key="blog"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <BlogPage />
          </motion.div>
        ) : view === 'contact' ? (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <ContactPage />
          </motion.div>
        ) : view === 'water-adventures' ? (
          <motion.div
            key="water-adventures"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <WaterAdventuresPage />
          </motion.div>
        ) : view === 'shore-excursions' ? (
          <motion.div
            key="shore-excursions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <ShoreExcursionsPage />
          </motion.div>
        ) : view === 'about' ? (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <AboutPage />
          </motion.div>
        ) : view === 'how-it-works' ? (
          <motion.div
            key="how-it-works"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <HowItWorksPage />
          </motion.div>
        ) : view === 'legal' ? (
          <motion.div
            key="legal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <LegalPage />
          </motion.div>
        ) : view === 'help' ? (
          <motion.div
            key="help"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <HelpCenterPage />
          </motion.div>
        ) : view === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <DashboardView 
              onBack={() => setView('home')} 
              bookings={bookings} 
              user={user} 
              onLeaveReview={(booking) => setReviewBooking(booking)}
              isLoading={isBookingsLoading}
              isFavoritesLoading={isFavoritesLoading}
              savedGuides={savedGuides}
              onSelectGuide={(g) => {
                setSelectedGuide(g);
                setView('guide-profile');
              }}
              onContactGuide={(g) => {
                setContactGuide(g);
              }}
              onBookGuide={(g) => {
                setBookingGuide(g);
                setIsBookingModalOpen(true);
              }}
              onToggleSave={toggleSaveGuide}
              onCheckIn={async (id) => {
                try {
                  const res = await fetch(`/api/bookings/${id}/check-in`, { method: 'POST' });
                  if (!res.ok) throw new Error('Check-in failed');
                  refreshBookings();
                } catch (err) {
                  console.error(err);
                }
              }}
              onCheckOut={async (id) => {
                try {
                  const res = await fetch(`/api/bookings/${id}/check-out`, { method: 'POST' });
                  if (!res.ok) throw new Error('Check-out failed');
                  refreshBookings();
                } catch (err) {
                  console.error(err);
                }
              }}
              onDownloadItinerary={async (id) => {
                try {
                  const res = await fetch(`/api/bookings/${id}/itinerary`);
                  if (!res.ok) throw new Error('Failed to download itinerary');
                  const blob = await res.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Itinerary_${id}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                } catch (err) {
                  console.error(err);
                }
              }}
              onPay={(booking) => {
                setPaymentBooking(booking);
                setIsPaymentModalOpen(true);
              }}
              onCancel={(booking) => {
                setCancellationBooking(booking);
                setIsCancellationModalOpen(true);
              }}
            />
          </motion.div>
        ) : view === 'profile' ? (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <ProfileView 
              user={user}
              onUpdate={(u) => setUser(u)}
              bookings={bookings}
              savedGuides={(guides || []).filter(g => (savedGuideIds || []).includes(g.id))}
              onBack={() => setView('home')}
              onLeaveReview={(booking) => setReviewBooking(booking)}
              onSelectGuide={(g) => { setSelectedGuide(g); setView('guide'); }}
              onContactGuide={(g) => setContactGuide(g)}
              onBookGuide={(g) => {
                setBookingGuide(g);
                setIsBookingModalOpen(true);
              }}
              onToggleSave={toggleSaveGuide}
              onCheckIn={async (id) => {
                try {
                  const res = await fetch(`/api/bookings/${id}/check-in`, { method: 'POST' });
                  if (!res.ok) throw new Error('Check-in failed');
                  refreshBookings();
                } catch (err) {
                  console.error(err);
                }
              }}
              onCheckOut={async (id) => {
                try {
                  const res = await fetch(`/api/bookings/${id}/check-out`, { method: 'POST' });
                  if (!res.ok) throw new Error('Check-out failed');
                  refreshBookings();
                } catch (err) {
                  console.error(err);
                }
              }}
              onDownloadItinerary={async (id) => {
                try {
                  const res = await fetch(`/api/bookings/${id}/itinerary`);
                  if (!res.ok) throw new Error('Failed to download itinerary');
                  const blob = await res.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Itinerary_${id}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                } catch (err) {
                  console.error(err);
                }
              }}
              onPay={(booking) => {
                setPaymentBooking(booking);
                setIsPaymentModalOpen(true);
              }}
              onCancel={(booking) => {
                setCancellationBooking(booking);
                setIsCancellationModalOpen(true);
              }}
            />
          </motion.div>
        ) : view === 'moto-trek' ? (
          <motion.div
            key="moto-trek"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <MotoTrekView onBack={() => setView('home')} />
          </motion.div>
        ) : view === 'find-guides' ? (
          <motion.div
            key="find-guides"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <div className="max-w-7xl mx-auto px-6 pt-24">
              <button 
                onClick={() => setView('home')}
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold"
              >
                <ChevronLeft size={20} /> Back to Home
              </button>
            </div>
            <FindGuidesPage onSelectGuide={(g) => { setSelectedGuide(g); setView('guide'); }} />
          </motion.div>
        ) : view === 'experiences' ? (
          <motion.div
            key="experiences"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <div className="max-w-7xl mx-auto px-6 pt-24">
              <button 
                onClick={() => setView('home')}
                className="mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold"
              >
                <ChevronLeft size={20} /> Back to Home
              </button>
            </div>
            <ExperiencesPage onSelect={(exp) => { setSelectedExperience(exp); setView('experience-detail'); }} />
          </motion.div>
        ) : view === 'experience-detail' && selectedExperience ? (
          <motion.div
            key="experience-detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <ExperienceDetailPage 
              experience={selectedExperience}
              onBack={() => setView('experiences')}
              onBook={(exp) => {
                setBookingTripName(exp.title);
                setIsBookingModalOpen(true);
              }}
            />
          </motion.div>
        ) : view === 'guide' && selectedGuide ? (
          <motion.div
            key="guide-detail"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            <GuideDetailPage 
              guide={selectedGuide}
              onBack={() => setView('home')}
              onBook={(guide, date, tripName, pkg) => {
                setBookingGuide(guide);
                setBookingStartDate(date);
                if (tripName) setBookingTripName(tripName);
                if (pkg) setSelectedPackage(pkg);
                setIsBookingModalOpen(true);
              }}
              onContact={(guide) => setContactGuide(guide)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="min-h-screen"
          >
            <HomePage 
              onSearch={(query) => {
                setGuideSearchQuery(query);
                setView('find-guides');
              }}
              onExploreClick={() => setView('explore')}
              onExperiencesClick={() => setView('experiences')}
              onFindGuidesClick={() => setView('find-guides')}
              onBecomeGuide={() => setIsRegisteringGuide(true)}
              onConciergeClick={() => {
                // Scroll to concierge or action
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer onNavClick={(v) => setView(v)} />

      <DestinationModal 
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onBook={(dest, date, pkg) => {
          const guide = guides.find(g => g.location.includes(dest.name)) || guides[0];
          setBookingGuide(guide);
          setBookingTripName(dest.name);
          setBookingStartDate(date);
          if (pkg) setSelectedPackage(pkg);
          setSelectedDestination(null);
          setIsBookingModalOpen(true);
        }}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <BookingModal 
        isOpen={isBookingModalOpen}
        guide={bookingGuide}
        onClose={() => {
          setIsBookingModalOpen(false);
          setBookingGuide(null);
          setBookingStartDate('');
          setBookingTripName('');
          setSelectedPackage('standard');
        }}
        onViewDashboard={() => {
          setIsBookingModalOpen(false);
          setBookingGuide(null);
          setBookingStartDate('');
          setBookingTripName('');
          setSelectedPackage('standard');
          setView('dashboard');
        }}
        onBookingComplete={() => {
          refreshBookings();
        }}
        initialStartDate={bookingStartDate}
        initialTripName={bookingTripName}
        initialPackage={selectedPackage}
        initialDays={bookingDays}
        initialTravelers={bookingTravelers}
        user={user}
        onLoginClick={() => setIsAuthModalOpen(true)}
        guides={guides}
      />

      <ContactModal 
        guide={contactGuide}
        onClose={() => setContactGuide(null)}
        user={user}
      />

      <GuideRegistrationModal 
        isOpen={isRegisteringGuide}
        onClose={() => setIsRegisteringGuide(false)}
      />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={(u) => setUser(u)}
      />

      <ReviewModal 
        booking={reviewBooking}
        onClose={() => setReviewBooking(null)}
        onSubmit={submitReview}
      />

      {isPaymentModalOpen && paymentBooking && (
        <PaymentModal 
          booking={paymentBooking}
          onClose={() => setIsPaymentModalOpen(false)}
          onSuccess={() => {
            setIsPaymentModalOpen(false);
            refreshBookings();
          }}
        />
      )}

      {isCancellationModalOpen && cancellationBooking && (
        <CancellationModal 
          booking={cancellationBooking}
          onClose={() => setIsCancellationModalOpen(false)}
          onConfirm={async () => {
            try {
              const res = await fetch(`/api/bookings/${cancellationBooking.id}/cancel`, { method: 'POST' });
              if (!res.ok) throw new Error('Cancellation failed');
              setIsCancellationModalOpen(false);
              refreshBookings();
            } catch (err) {
              console.error(err);
            }
          }}
        />
      )}

      {isStudentApplicationOpen && (
        <StudentGuideApplication 
          onClose={() => setIsStudentApplicationOpen(false)}
          onSubmit={async (data) => {
            try {
              const res = await fetch('/api/student/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              if (!res.ok) throw new Error('Application failed');
              alert("Application submitted successfully!");
              setIsStudentApplicationOpen(false);
            } catch (err) {
              console.error(err);
            }
          }}
        />
      )}

      {isBookingConfirmationOpen && confirmedBooking && (
        <BookingConfirmation 
          booking={confirmedBooking}
          onClose={() => setIsBookingConfirmationOpen(false)}
        />
      )}

      {isGuidePassOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white w-full max-w-5xl rounded-[40px] shadow-2xl overflow-hidden p-10"
          >
            <div className="flex justify-between items-start mb-10">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">GuidePass Subscriptions</h2>
                <p className="text-slate-500 font-medium">Unlock exclusive benefits and support local guides.</p>
              </div>
              <button onClick={() => setIsGuidePassOpen(false)} className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                <X size={24} className="text-slate-400" />
              </button>
            </div>
            <GuidePassPricing onSubscribe={async (plan) => {
              try {
                const res = await fetch('/api/guidepass/subscribe', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ plan })
                });
                if (!res.ok) throw new Error('Subscription failed');
                alert(`Subscribed to ${plan} plan!`);
                setIsGuidePassOpen(false);
              } catch (err) {
                console.error(err);
              }
            }} />
          </motion.div>
        </div>
      )}
    </div>
  );
}
