import { motion } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import { GradientText } from '@/components/gradient-text';

interface HeroProps {
  onOpenAuth: () => void;
  onScrollToTools: () => void;
}

export function Hero({ onOpenAuth, onScrollToTools }: HeroProps) {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-[#0c0b0e]">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'url(/assets/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'gradient-shift 20s ease-in-out infinite',
          }}
        />
        {/* Radial overlay for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0c0b0e]/90" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[800px] mx-auto px-5 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium uppercase tracking-widest border border-[#693def]/50 text-[#693def] bg-transparent">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Student Toolkit
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[96px] font-bold text-white leading-[1] tracking-[-0.02em] mb-6"
        >
          Your{' '}
          <GradientText variant="violet" className="animate-gradient-shift bg-[length:200%_auto]">
            AI-Powered
          </GradientText>
          <br />
          Academic Assistant
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-lg md:text-2xl text-[#aeadae] max-w-[600px] leading-relaxed mb-10"
        >
          Generate resumes, LinkedIn bios, project abstracts, presentations, and academic tools in seconds.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={onOpenAuth}
            className="btn-primary flex items-center gap-2 text-base px-8 py-4"
          >
            <Sparkles className="w-5 h-5" />
            Get Started
          </button>
          <button
            onClick={onScrollToTools}
            className="btn-secondary text-base px-8 py-4"
          >
            Explore Tools
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
