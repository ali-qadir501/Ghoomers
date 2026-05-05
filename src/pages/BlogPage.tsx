import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, User, ArrowRight, BookOpen, Search, Filter } from 'lucide-react';

const POSTS = [
  {
    id: 1,
    title: "10 Essential Tips for Trekking to K2 Base Camp",
    excerpt: "Preparation is key for the world's most epic trek. Here's everything you need to know before you fly to Skardu.",
    category: "Trekking",
    author: "Zahid Ali",
    date: "May 12, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Hunza's Hidden Gems",
    excerpt: "Beyond Karimabad and Altit Fort, discover the secret valleys that offer true serenity and untouched beauty.",
    category: "Destinations",
    author: "Sara Khan",
    date: "May 08, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Photography Guide: Capturing the Karakoram",
    excerpt: "The light in the high mountains is unforgiving. Learn how to master your settings for stunning landscape shots.",
    category: "Photography",
    author: "Imran Ahmed",
    date: "May 05, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Local Flavors: What to Eat in Gilgit-Baltistan",
    excerpt: "From Chapshuro to Mamtu, explore the rich culinary heritage that fuels the resilient people of the north.",
    category: "Food",
    author: "Aminah Shah",
    date: "May 01, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80"
  }
];

export const BlogPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sky-600 font-black text-xs uppercase tracking-widest mb-4 block">Adventure Journal</span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none">
            STORIES FROM<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500 font-display">THE FIELD</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xl font-medium leading-relaxed">
            Expert insights, destination guides, and stories of epic journeys across the mountains of Pakistan.
          </p>
        </div>

        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[600px] rounded-[48px] overflow-hidden mb-24 cursor-pointer group shadow-2xl shadow-black/5"
        >
          <img src={POSTS[0].image} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Featured post" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <div className="absolute bottom-12 left-12 right-12">
            <div className="flex items-center gap-6 mb-6">
              <span className="px-5 py-2 bg-sky-500 text-white rounded-full text-xs font-black uppercase tracking-widest">
                Featured Article
              </span>
              <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                <Calendar size={14} />
                {POSTS[0].date}
              </div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-none group-hover:text-sky-400 transition-colors">
              {POSTS[0].title}
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mb-8 font-medium">
              {POSTS[0].excerpt}
            </p>
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <User size={20} />
               </div>
               <div>
                  <p className="text-white font-black text-sm uppercase tracking-tight">{POSTS[0].author}</p>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{POSTS[0].readTime}</p>
               </div>
            </div>
          </div>
        </motion.div>

        {/* Grid of Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {POSTS.slice(1).map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-72 rounded-[32px] overflow-hidden mb-6 shadow-xl shadow-black/5">
                <img src={post.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={post.title} />
                <div className="absolute top-6 right-6">
                   <div className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl text-white text-[10px] font-black uppercase tracking-widest">
                      {post.category}
                   </div>
                </div>
              </div>
              <div className="px-2">
                <div className="flex items-center gap-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                   <div className="flex items-center gap-1.5 leading-none">
                      <Calendar size={12} className="text-sky-500" />
                      {post.date}
                   </div>
                   <div className="flex items-center gap-1.5 leading-none">
                      <Clock size={12} className="text-emerald-500" />
                      {post.readTime}
                   </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-sky-600 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-6 line-clamp-3">
                   {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                         <User size={14} />
                      </div>
                      <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">{post.author}</span>
                   </div>
                   <button className="text-sky-500 group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={20} />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter / CTA */}
        <div className="mt-24 p-12 md:p-20 bg-slate-900 rounded-[48px] relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-900/20 to-emerald-900/20" />
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                 <BookOpen className="text-sky-500 mb-8" size={48} />
                 <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-none">
                    NEVER MISS<br />
                    <span className="text-sky-400">AN ADVENTURE</span>
                 </h2>
                 <p className="text-white/60 text-lg font-medium leading-relaxed mb-0">
                    Get monthly trekking tips, destination updates, and exclusive guide reviews delivered to your inbox.
                 </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                 <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
                 />
                 <button className="px-10 py-5 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-sky-500/20 transition-all active:scale-95">
                    Subscribe
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
