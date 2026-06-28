import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';

interface CTASectionProps {
  onOpenAuth: () => void;
}

export function CTASection({ onOpenAuth }: CTASectionProps) {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[#0c0b0e]">
        <motion.div
          animate={{ opacity: [0.25, 0.35, 0.25] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(105, 61, 239, 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[700px] mx-auto px-5 text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-[52px] font-bold text-white tracking-[-0.02em] leading-tight">
            Ready to Supercharge Your Academic Journey?
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-lg text-[#aeadae] max-w-[500px] mx-auto mt-6">
            Join thousands of students using GradGenie to build professional profiles, ace their academics, and land dream opportunities.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <button
            onClick={onOpenAuth}
            className="mt-10 inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-medium text-white bg-gradient-to-r from-[#693def] to-[#00d4ff] hover:brightness-110 hover:scale-[1.03] transition-all duration-200 shadow-[0_0_40px_rgba(105,61,239,0.3)]"
          >
            <Sparkles className="w-5 h-5" />
            Get Started for Free
          </button>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mt-4 text-sm text-[#aeadae]/60">
            No credit card required. 5 free AI generations per month.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
