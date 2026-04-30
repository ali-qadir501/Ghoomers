import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Users, 
  Calendar, 
  CreditCard, 
  ArrowRight, 
  ShieldCheck, 
  Star, 
  MapPin,
  Clock,
  ChevronRight,
  ChevronLeft,
  Crown,
  Gem,
  Backpack
} from 'lucide-react';
import { format, addDays, differenceInDays } from 'date-fns';
import { Guide, type Booking, type PackageTier } from '../../lib/utils';
import { BookingCalendar } from './BookingCalendar';
import { useCurrency } from '../../context/CurrencyContext';
import { cn } from '../../lib/utils';

interface GuideBookingModalProps {
  guide: Guide;
  isOpen: boolean;
  onClose: () => void;
  onBookingSubmit?: (booking: any) => void;
}

export const GuideBookingModal: React.FC<GuideBookingModalProps> = ({ 
  guide, 
  isOpen, 
  onClose,
  onBookingSubmit
}) => {
  const { formatPrice } = useCurrency();
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [duration, setDuration] = useState(1);
  const [travelers, setTravelers] = useState(1);
  const [tripName, setTripName] = useState(guide.upcomingTours?.[0]?.title || 'Custom Adventure');
  const [tier, setTier] = useState<PackageTier>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Exploria Model Pricing Tiers
  const TIERS = [
    { 
      id: 'standard', 
      name: 'Trekker', 
      icon: <Backpack size={18} />, 
      multiplier: 1, 
      desc: 'Authentic local stays & local trails',
      inclusions: ['Local Guide', 'Village Heritage Stays', 'Breakfast & Dinner', 'Private Transport (Corolla/BRV)']
    },
    { 
      id: 'deluxe', 
      name: 'Expedition', 
      icon: <Crown size={18} />, 
      multiplier: 1.8, 
      desc: 'High-altitude mastery & premium lodges',
      inclusions: ['Elite Specialized Guide', 'Full Gourmet Board', 'Toyota Hilux / Revo 4x4', 'Oxygen & First Aid Gears']
    },
    { 
      id: 'executive', 
      name: 'Elite', 
      icon: <Gem size={18} />, 
      multiplier: 3.2, 
      desc: 'The ultimate Karakoram VVIP protocol',
      inclusions: ['Expedition Leader', 'VIP Glamping / 5-Star Suites', 'Land Cruiser V8 / Prado', 'Visa & Logistics Porter', 'Dedicated Chef & Helper']
    }
  ];

  const selectedTier = TIERS.find(t => t.id === tier)!;
  
  // Base calculation inspired by Pakistani tour operators (exploria.pk)
  // If a specific tour is selected and has package pricing, use that.
  // Otherwise fallback to guide-based multiplier.
  const matchedTour = guide.upcomingTours?.find(t => t.title === tripName);
  const matchedPackage = matchedTour?.packages?.[tier as keyof typeof matchedTour.packages];
  
  const totalPrice = matchedPackage 
    ? matchedPackage.price * travelers
    : (guide.pricePerDay * duration * travelers * selectedTier.multiplier);

  const handleBooking = async () => {
    if (!startDate) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const booking = {
      guideId: guide.id,
      guideName: guide.name,
      tripName: tripName,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(addDays(startDate, duration), 'yyyy-MM-dd'),
      days: duration,
      travelers,
      totalPrice,
      tier,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    
    onBookingSubmit?.(booking);
    setIsSubmitting(false);
    setBookingSuccess(true);
  };

  const handleReset = () => {
    setStep(1);
    setStartDate(undefined);
    setDuration(1);
    setTravelers(1);
    setBookingSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

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
          className="bg-white dark:bg-slate-950 w-full max-w-2xl rounded-[40px] overflow-hidden shadow-2xl relative"
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full transition-all z-20"
          >
            <X size={20} />
          </button>

          {!bookingSuccess ? (
            <div className="flex flex-col md:flex-row h-full">
              {/* Left Sidebar - Summary */}
              <div className="md:w-72 bg-slate-50 dark:bg-slate-900/50 p-8 border-r border-slate-100 dark:border-slate-800">
                <div className="mb-8">
                  <div className="w-20 h-20 rounded-3xl overflow-hidden mb-4 shadow-xl ring-4 ring-white dark:ring-slate-900">
                    <img src={guide.image} className="w-full h-full object-cover" alt={guide.name} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white leading-tight mb-1">{guide.name}</h3>
                  <p className="text-xs font-bold text-sky-500 uppercase tracking-widest flex items-center gap-1">
                    <MapPin size={12} />
                    {guide.location}
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Price Details</p>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Base Rate</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{formatPrice(guide.pricePerDay)}/pp</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Duration</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{duration} {duration === 1 ? 'Day' : 'Days'}</span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Travelers</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{travelers}</span>
                    </div>
                    {tier !== 'standard' && (
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 capitalize">{tier} Tier</span>
                        <span className="text-xs font-bold text-emerald-600">x{selectedTier.multiplier}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Marketplace Breakdown</p>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-slate-500">Service Fee ({(guide.commissionRate || 15)}%)</span>
                      <span className="text-xs font-bold text-slate-600">{formatPrice(totalPrice * (guide.commissionRate || 15) / 100)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xs font-medium text-slate-500">Host Earnings</span>
                      <span className="text-xs font-bold text-emerald-600">{formatPrice(totalPrice * (1 - (guide.commissionRate || 15) / 100))}</span>
                    </div>
                    
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{formatPrice(totalPrice)}</p>
                  </div>

                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
                      <ShieldCheck size={16} />
                      <span className="text-xs font-black uppercase tracking-widest">GHOOMERS Secure</span>
                    </div>
                    <p className="text-[10px] text-emerald-700/70 dark:text-emerald-400/70 leading-relaxed font-medium">
                      Direct connection. Tiered support included. Secure Escrow payment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Content - Form */}
              <div className="flex-1 p-10 overflow-y-auto max-h-[85vh] custom-scrollbar">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    {[1, 2, 3].map(s => (
                      <div 
                        key={s} 
                        className={cn(
                          "h-1.5 flex-1 rounded-full transition-all duration-500",
                          step >= s ? "bg-sky-500 shadow-sm" : "bg-slate-100 dark:bg-slate-800"
                        )}
                      />
                    ))}
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {step === 1 ? 'When are you going?' : step === 2 ? 'Choose your Package' : 'Traveler Details'}
                  </h2>
                </div>

                {step === 1 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <BookingCalendar 
                      availability={guide.availability || []}
                      selectedDate={startDate}
                      onDateSelect={setStartDate}
                    />

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">
                          Duration (Days)
                        </label>
                        <span className="text-xl font-black text-sky-500">{duration}</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="14" 
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                      />
                      <div className="flex justify-between mt-2">
                        <span className="text-[10px] font-bold text-slate-400">1 Day</span>
                        <span className="text-[10px] font-bold text-slate-400">14 Days</span>
                      </div>
                    </div>

                    <button
                      disabled={!startDate}
                      onClick={() => setStep(2)}
                      className="w-full py-4 bg-sky-500 hover:bg-sky-600 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 text-white rounded-2xl font-black shadow-xl shadow-sky-500/20 transition-all flex items-center justify-center gap-2 group"
                    >
                      Choose Package
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="grid grid-cols-1 gap-4">
                      {TIERS.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTier(t.id as PackageTier)}
                          className={cn(
                            "group p-6 rounded-3xl border-2 text-left transition-all relative overflow-hidden",
                            tier === t.id 
                              ? "bg-white dark:bg-slate-800 border-sky-500 shadow-xl shadow-sky-500/10 scale-[1.02]" 
                              : "bg-slate-50/50 dark:bg-slate-900/30 border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                          )}
                        >
                          <div className="flex items-start justify-between relative z-10">
                            <div className="flex gap-4">
                              <div className={cn(
                                "p-3 rounded-2xl transition-colors",
                                tier === t.id ? "bg-sky-500 text-white" : "bg-white dark:bg-slate-800 text-slate-400"
                              )}>
                                {t.icon}
                              </div>
                              <div>
                                <h4 className={cn(
                                  "font-black text-lg uppercase tracking-tight",
                                  tier === t.id ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400"
                                )}>
                                  {t.name}
                                </h4>
                                <p className="text-xs text-slate-500 font-medium">{t.desc}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Multiplier</p>
                              <p className="text-lg font-black text-slate-900 dark:text-white">x{t.multiplier}</p>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {t.inclusions.map((inc, i) => (
                              <span key={i} className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                                {inc}
                              </span>
                            ))}
                          </div>

                          {tier === t.id && (
                            <motion.div 
                              layoutId="tier-border"
                              className="absolute inset-0 bg-sky-500/5"
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="flex-[2] py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black shadow-xl shadow-sky-500/20 transition-all flex items-center justify-center gap-2 group"
                      >
                        Finalize Details
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                      {/* Trip Selection */}
                      <div className="mb-6">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Choose Adventure</label>
                        <div className="grid grid-cols-1 gap-2">
                          {guide.upcomingTours && guide.upcomingTours.length > 0 ? (
                            guide.upcomingTours.map((tour) => (
                              <button
                                key={tour.id}
                                onClick={() => setTripName(tour.title)}
                                className={cn(
                                  "text-left p-3 rounded-2xl border transition-all text-sm font-bold",
                                  tripName === tour.title 
                                    ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/20" 
                                    : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-sky-300"
                                )}
                              >
                                {tour.title}
                              </button>
                            ))
                          ) : (
                            <input 
                              type="text"
                              value={tripName}
                              onChange={(e) => setTripName(e.target.value)}
                              placeholder="Enter trip name..."
                              className="w-full p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                            />
                          )}
                          <button
                            onClick={() => setTripName('Custom Adventure')}
                            className={cn(
                              "text-left p-3 rounded-2xl border transition-all text-sm font-bold",
                              tripName === 'Custom Adventure' 
                                ? "bg-sky-500 border-sky-500 text-white shadow-lg shadow-sky-500/20" 
                                : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-sky-300"
                            )}
                          >
                            Generic Custom Trip
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-sky-500 text-white rounded-xl">
                            <Users size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Number of Travelers</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Who's joining?</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => setTravelers(Math.max(1, travelers - 1))}
                            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all"
                          >
                            <ChevronLeft size={20} />
                          </button>
                          <span className="text-2xl font-black text-slate-900 dark:text-white w-6 text-center">{travelers}</span>
                          <button 
                            onClick={() => setTravelers(Math.min(10, travelers + 1))}
                            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                          <Clock size={16} className="text-sky-500" />
                          <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                            Trip starts on <span className="font-black text-slate-900 dark:text-white">{startDate ? format(startDate, 'MMM dd, yyyy') : '-'}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                          <CreditCard size={16} className="text-sky-500" />
                          <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
                            Total amount <span className="font-black text-slate-900 dark:text-white">{formatPrice(totalPrice)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(2)}
                        className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleBooking}
                        disabled={isSubmitting}
                        className="flex-[2] py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black shadow-xl shadow-sky-500/20 transition-all flex items-center justify-center gap-2 group"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            Checkout
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-16 text-center animate-in fade-in zoom-in duration-700">
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShieldCheck size={48} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">Booking Confirmed!</h2>
              <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl mb-8 max-w-sm mx-auto border border-slate-100 dark:border-slate-800">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase">Guide</span>
                    <span className="text-slate-900 dark:text-white font-black">{guide.name}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase">Adventure</span>
                    <span className="text-slate-900 dark:text-white font-black">{tripName}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase">Package</span>
                    <span className="text-emerald-500 font-black uppercase text-[10px]">{tier}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-bold uppercase">Date</span>
                    <span className="text-slate-900 dark:text-white font-black">{startDate ? format(startDate, 'MMM dd, yyyy') : '-'}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs pt-4 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400 font-bold uppercase">Total Travelers</span>
                    <span className="text-slate-900 dark:text-white font-black">{travelers} {travelers === 1 ? 'Person' : 'People'}</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 max-w-sm mx-auto leading-relaxed">
                Your booking for <span className="font-black text-slate-900 dark:text-white">{tripName}</span> has been successfully processed. 
                A confirmation email will be sent shortly.
              </p>
              <button
                onClick={handleReset}
                className="px-12 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black shadow-xl shadow-sky-500/20 transition-all"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
