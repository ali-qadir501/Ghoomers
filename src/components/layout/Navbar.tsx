import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Search, Globe, ChevronDown, User, Heart, 
  LayoutDashboard, LogOut, Mountain, Compass, MapPin, 
  Bike, Footprints, Info, ShieldCheck
} from 'lucide-react';
import { type Destination } from '../../lib/utils';
import { Logo } from '../common/Logo';
import { cn } from '../../lib/utils';

interface NavbarProps {
  onDashboardClick: () => void;
  onBecomeGuide: () => void;
  onLogoClick: () => void;
  onNavClick: (view: string) => void;
  onDestinationSelect: (dest: Destination) => void;
  user: any;
  onLoginClick: () => void;
  onLogout: () => void;
  onProfileClick: () => void;
  onFindGuidesClick: () => void;
  onExperiencesClick: () => void;
  onExploreClick: () => void;
  onMotoTrekClick: () => void;
  onMicroTrekClick: () => void;
  destinations: Destination[];
  isLoading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onDashboardClick,
  onBecomeGuide,
  onLogoClick,
  onNavClick,
  onDestinationSelect,
  user,
  onLoginClick,
  onLogout,
  onProfileClick,
  onFindGuidesClick,
  onExperiencesClick,
  onExploreClick,
  onMotoTrekClick,
  onMicroTrekClick,
  destinations,
  isLoading
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Experiences', action: onExperiencesClick, icon: <Compass size={18} /> },
    { label: 'Find Guides', action: onFindGuidesClick, icon: <User size={18} /> },
    { label: 'Moto Trek', action: onMotoTrekClick, icon: <Bike size={18} /> },
    { label: 'Explore', action: onExploreClick, icon: <Mountain size={18} /> },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "py-3 px-6" 
          : "py-6 px-10"
      )}
    >
      <div className={cn(
        "max-w-7xl mx-auto rounded-full transition-all duration-700 border",
        isScrolled 
          ? "bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] px-8 py-2 border-slate-100" 
          : "bg-white/5 backdrop-blur-sm px-8 py-3 border-white/10"
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <button onClick={onLogoClick} className="flex items-center gap-2.5 group">
              <Logo 
                size={32} 
                showText={true} 
                textColor={isScrolled ? 'dark' : 'light'}
                className="transition-transform duration-500 group-hover:rotate-12" 
              />
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={cn(
                    "px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-2",
                    isScrolled 
                      ? "text-slate-500 hover:text-slate-900 hover:bg-slate-50" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="relative">
                <button
                  onMouseEnter={() => setIsDestinationsOpen(true)}
                  onMouseLeave={() => setIsDestinationsOpen(false)}
                  className={cn(
                    "px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all flex items-center gap-2",
                    isScrolled 
                      ? "text-slate-500 hover:text-slate-900 hover:bg-slate-50" 
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  )}
                >
                  Destinations <ChevronDown size={12} className={cn("transition-transform duration-500", isDestinationsOpen && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                  {isDestinationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      onMouseEnter={() => setIsDestinationsOpen(true)}
                      onMouseLeave={() => setIsDestinationsOpen(false)}
                      className="absolute top-full left-0 mt-2 w-80 bg-white rounded-3xl shadow-2xl shadow-slate-200 p-6 border border-slate-100 overflow-hidden"
                    >
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Popular Valleys</div>
                      <div className="grid grid-cols-2 gap-3">
                        {isLoading ? (
                          Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-10 bg-slate-50 animate-pulse rounded-xl" />
                          ))
                        ) : (
                          destinations.slice(0, 6).map((dest) => (
                            <button
                              key={dest.id}
                              onClick={() => {
                                onDestinationSelect(dest);
                                setIsDestinationsOpen(false);
                              }}
                              className="text-left py-2 px-3 rounded-xl hover:bg-sky-50 text-sm font-bold text-slate-700 hover:text-sky-600 transition-all flex items-center gap-2"
                            >
                              <MapPin size={12} className="text-sky-400" />
                              {dest.name}
                            </button>
                          ))
                        )}
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-50">
                        <button onClick={onExploreClick} className="w-full text-center py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-sky-600 transition-all">
                          View All Destinations
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBecomeGuide}
              className={cn(
                "hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                isScrolled 
                  ? "bg-slate-900 text-white hover:bg-black shadow-lg shadow-black/10" 
                  : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20"
              )}
            >
              Host a Trip
            </button>

            {user ? (
              <div className="relative">
                <button
                  onMouseEnter={() => setIsUserMenuOpen(true)}
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 p-1 rounded-full transition-all pl-3",
                    isScrolled ? "bg-slate-100 pr-1" : "bg-white/10 pr-1 border border-white/10"
                  )}
                >
                  <span className={cn("text-[10px] font-black uppercase tracking-widest", isScrolled ? "text-slate-900" : "text-white")}>
                    {user.name.split(' ')[0]}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-sky-500 border border-white/20 flex items-center justify-center text-white text-[10px] font-black">
                    {user.name.charAt(0)}
                  </div>
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      onMouseEnter={() => setIsUserMenuOpen(true)}
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                      className="absolute top-full right-0 mt-2 w-64 bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden"
                    >
                      <div className="p-6 border-b border-slate-50">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Signed in as</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <button 
                          onClick={() => { onDashboardClick(); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-2xl transition-all"
                        >
                          <LayoutDashboard size={18} /> My Dashboard
                        </button>
                        <button 
                          onClick={() => { onProfileClick(); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-2xl transition-all"
                        >
                          <User size={18} /> Profile Settings
                        </button>
                        <div className="h-px bg-slate-50 my-2 mx-4" />
                        <button 
                          onClick={() => { onLogout(); setIsUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-2xl transition-all"
                        >
                          <LogOut size={18} /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className={cn(
                  "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
                  isScrolled 
                    ? "bg-sky-600 text-white hover:bg-sky-700 shadow-lg shadow-sky-600/20" 
                    : "bg-white text-slate-900 shadow-xl shadow-black/10"
                )}
              >
                Sign In
              </button>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden p-3 rounded-2xl transition-all",
                isScrolled ? "bg-slate-100 text-slate-900" : "bg-white/10 text-white border border-white/20"
              )}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50 lg:hidden bg-white"
          >
            <div className="flex flex-col h-full">
              <div className="p-8 flex justify-between items-center border-b border-slate-50">
                <Logo size={32} />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-slate-50 rounded-2xl">
                  <X size={24} className="text-slate-900" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Explore Ghoomers.pk</p>
                  {[
                    { label: 'Experiences', action: onExperiencesClick, icon: <Compass /> },
                    { label: 'Local Guides', action: onFindGuidesClick, icon: <User /> },
                    { label: 'Moto Treks', action: onMotoTrekClick, icon: <Bike /> },
                    { label: 'Micro Treks', action: onMicroTrekClick, icon: <Footprints /> },
                    { label: 'Explore Map', action: onExploreClick, icon: <Mountain /> },
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => { item.action(); setIsMobileMenuOpen(false); }}
                      className="w-full flex items-center gap-4 p-4 rounded-2xl text-lg font-black text-slate-900 hover:bg-sky-50 transition-all"
                    >
                      <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
                        {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                      </div>
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="mt-12 pt-12 border-t border-slate-50">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">About Us</p>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50 text-left">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400">
                        <Info size={16} />
                      </div>
                      <span className="text-xs font-bold text-slate-900">How it Works</span>
                    </button>
                    <button className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50 text-left">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-slate-400">
                        <ShieldCheck size={16} />
                      </div>
                      <span className="text-xs font-bold text-slate-900">Safety Policy</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-slate-50 bg-slate-50/50">
                {user ? (
                  <div className="space-y-4">
                    <button 
                      onClick={() => { onDashboardClick(); setIsMobileMenuOpen(false); }}
                      className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl"
                    >
                      GO TO DASHBOARD
                    </button>
                    <button 
                      onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                      className="w-full py-4 bg-white text-rose-600 border-2 border-rose-100 rounded-2xl font-black"
                    >
                      LOGOUT
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => { onLoginClick(); setIsMobileMenuOpen(false); }}
                    className="w-full py-4 bg-sky-600 text-white rounded-2xl font-black shadow-xl shadow-sky-200"
                  >
                    SIGN IN TO ACCOUNT
                  </button>
                )}
                <button 
                  onClick={() => { onBecomeGuide(); setIsMobileMenuOpen(false); }}
                  className="w-full mt-4 flex items-center justify-center gap-2 text-sky-600 font-bold text-sm"
                >
                  Want to be a guide? <span className="underline uppercase tracking-widest text-[10px] font-black">Join supply</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
