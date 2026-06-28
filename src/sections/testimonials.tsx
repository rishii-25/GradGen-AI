import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SectionDivider } from '@/components/section-divider';

const testimonials = [
  {
    id: '1',
    quote: 'GradGenie helped me create a professional resume that landed me three internship interviews in one week. The AI summary was incredibly well-written.',
    name: 'Sarah Chen',
    university: 'Stanford University',
    role: '3rd Year, Computer Science',
    gradient: 'from-[#693def] to-[#00d4ff]',
  },
  {
    id: '2',
    quote: "The LinkedIn bio generator is a game-changer. I went from a blank About section to a compelling professional story in under 30 seconds.",
    name: 'Marcus Johnson',
    university: 'MIT',
    role: '4th Year, Electrical Engineering',
    gradient: 'from-[#0072f5] to-[#1e9de7]',
  },
  {
    id: '3',
    quote: "I used the PPT content generator for my final year project presentation. My professor asked me how I created such professional slides so quickly!",
    name: 'Priya Sharma',
    university: 'IIT Delhi',
    role: '4th Year, Mechanical Engineering',
    gradient: 'from-[#00e3a0] to-[#008a5e]',
  },
  {
    id: '4',
    quote: "The CGPA calculator with visual charts helped me identify exactly which courses I needed to focus on to improve my grades. Super intuitive.",
    name: 'Alex Rivera',
    university: 'UC Berkeley',
    role: '2nd Year, Data Science',
    gradient: 'from-[#f90082] to-[#ff4dff]',
  },
  {
    id: '5',
    quote: "As someone who struggles with writing, the project abstract generator saved me hours of work. The abstracts are well-structured and professional.",
    name: 'Emily Zhang',
    university: 'Carnegie Mellon',
    role: '3rd Year, AI & Machine Learning',
    gradient: 'from-[#a6f800] to-[#f90082]',
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const t = testimonials[current];

  return (
    <>
      <SectionDivider colors={['#00e3a0', '#00b97b', '#008a5e']} />
      <section className="relative py-24 md:py-32 bg-[#0c0b0e]">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="text-xs font-medium uppercase tracking-widest text-[#00e3a0]">
                Testimonials
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-[52px] font-bold text-white tracking-[-0.02em] mt-3 leading-tight">
                Loved by Students
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-[#aeadae] max-w-[560px] mx-auto mt-4">
                See how students from universities worldwide are using GradGenie to accelerate their careers.
              </p>
            </ScrollReveal>
          </div>

          {/* Carousel */}
          <div
            className="relative max-w-[800px] mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={t.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <GlassCard className="text-center">
                  <Quote className="w-10 h-10 text-[#693def]/40 mx-auto mb-6" />
                  <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} p-[2px]`}>
                      <div className="w-full h-full rounded-full bg-[#161518] flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {t.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-base font-medium text-white">{t.name}</p>
                      <p className="text-sm text-[#aeadae]">{t.university}</p>
                      <p className="text-xs text-[#693def]">{t.role}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setDirection(i > current ? 1 : -1);
                      setCurrent(i);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? 'bg-white w-6' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
