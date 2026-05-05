import React from 'react';
import { Logo } from '../common/Logo';
import { Map, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavClick: (view: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        {/* Brand */}
        <div>
          <div 
            onClick={() => onNavClick('home')}
            className="mb-8 block group cursor-pointer"
          >
            <Logo size={32} textColor="light" />
          </div>
          <p className="text-slate-500 text-xs leading-relaxed mb-8 font-medium">
            Pakistan's premier gateway to the Karakoram for international travelers. We bridge the gap between world-class expectations and raw local reality.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-sky-500 hover:text-white transition-all"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-10 text-slate-500">Quick Links</h4>
          <ul className="flex flex-col gap-5">
            {[
              { label: 'Experiences', view: 'experiences' },
              { label: 'Shore Excursions', view: 'shore-excursions' },
              { label: 'Find Guides', view: 'find-guides' },
              { label: 'Explore Map', view: 'explore' },
              { label: 'Adventure Blog', view: 'blog' },
            ].map((link) => (
              <li key={link.label}>
                <button 
                  onClick={() => onNavClick(link.view)}
                  className="text-left text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-10 text-slate-500">Company</h4>
          <ul className="flex flex-col gap-5">
            {[
              { label: 'About Us', view: 'about' },
              { label: 'How It Works', view: 'how-it-works' },
              { label: 'Help Center', view: 'help' },
              { label: 'Privacy Policy', view: 'legal' },
              { label: 'Contact Us', view: 'contact' },
            ].map((link) => (
              <li key={link.label}>
                <button 
                  onClick={() => onNavClick(link.view)}
                  className="text-left text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-10 text-slate-500">Contact Us</h4>
          <ul className="flex flex-col gap-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-500 shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Email</p>
                <p className="text-sm font-medium">hello@ghoomers.com</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-500 shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Phone</p>
                <p className="text-sm font-medium">+92 300 1234567</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-500 shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Office</p>
                <p className="text-sm font-medium">Gilgit City, Pakistan</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-slate-500 text-xs font-medium">
          © {new Date().getFullYear()} GHOOMERS. All rights reserved.
        </p>
        <div className="flex gap-8">
          <button onClick={() => onNavClick('legal')} className="text-slate-500 hover:text-white transition-colors text-xs font-medium">Privacy Policy</button>
          <button onClick={() => onNavClick('legal')} className="text-slate-500 hover:text-white transition-colors text-xs font-medium">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
};
