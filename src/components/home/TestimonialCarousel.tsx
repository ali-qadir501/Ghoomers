import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS, type Testimonial } from '../../lib/utils';

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const testimonial = TESTIMONIALS[currentIndex];

  return (
    <section className="py-32 bg-[#0a0f1d] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] mb-6 block"
          >
            Verified Feedback
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-light text-white mb-8 font-display tracking-tight leading-[0.95]"
          >
            TRUSTED BY <br />
            <span className="font-extrabold text-emerald-500 italic uppercase">GLOBAL EXPLORERS.</span>
          </motion.h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative h-[550px] md:h-[450px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.5 },
                  scale: { duration: 0.5 }
                }}
                className="absolute w-full"
              >
                <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[56px] p-10 md:p-20 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)]">
                  <div className="flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
                    <div className="relative shrink-0">
                      <div className="w-28 h-28 md:w-44 md:h-44 rounded-[40px] overflow-hidden border-4 border-white/10 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white p-3 rounded-2xl shadow-xl">
                        <Quote size={24} fill="currentColor" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-center md:justify-start gap-1.5 mb-8">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16} 
                            className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-white/10"} 
                          />
                        ))}
                      </div>
                      
                      <p className="text-2xl md:text-4xl font-light text-white italic leading-tight mb-12 font-display tracking-tight">
                        "{testimonial.text}"
                      </p>

                      <div className="flex items-center justify-center md:justify-start gap-4">
                        <div className="h-px w-8 bg-emerald-500/50" />
                        <div>
                          <h4 className="text-xl font-bold text-white mb-1 font-display tracking-tight">{testimonial.name}</h4>
                          <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em]">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-10 mt-12">
            <button 
              onClick={prevTestimonial}
              className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all duration-500 group"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            
            <div className="flex gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`h-1 rounded-full transition-all duration-700 ${
                    i === currentIndex ? "w-12 bg-emerald-500" : "w-4 bg-white/10 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={nextTestimonial}
              className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all duration-500 group"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
