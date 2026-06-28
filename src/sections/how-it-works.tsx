import { motion } from 'framer-motion';
import { User, Grid3X3, Download } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SectionDivider } from '@/components/section-divider';
import { GradientText } from '@/components/gradient-text';

const steps = [
  {
    number: '01',
    title: 'Set Up Your Profile',
    description: 'Create your account and tell us about your academic background, skills, and career interests.',
    icon: User,
    gradient: 'violet' as const,
    iconBg: 'bg-gradient-to-br from-[#693def] to-[#00d4ff]',
    circleBg: 'from-[#693def]/20 to-[#00d4ff]/10',
  },
  {
    number: '02',
    title: 'Choose a Tool',
    description: 'Select from our suite of AI-powered tools — resume builder, LinkedIn bio, abstract generator, and more.',
    icon: Grid3X3,
    gradient: 'blue' as const,
    iconBg: 'bg-gradient-to-br from-[#0072f5] to-[#1e9de7]',
    circleBg: 'from-[#0072f5]/20 to-[#1e9de7]/10',
  },
  {
    number: '03',
    title: 'Generate & Export',
    description: 'Watch AI create professional content in seconds. Edit, save, and export in your preferred format.',
    icon: Download,
    gradient: 'green' as const,
    iconBg: 'bg-gradient-to-br from-[#00e3a0] to-[#008a5e]',
    circleBg: 'from-[#00e3a0]/20 to-[#008a5e]/10',
  },
];

export function HowItWorks() {
  return (
    <>
      <SectionDivider colors={['#ff4dff', '#f90082', '#a6f800']} />
      <section className="relative py-24 md:py-32 bg-[#0c0b0e]">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-20">
            <ScrollReveal>
              <span className="text-xs font-medium uppercase tracking-widest text-[#0072f5]">
                How It Works
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-[52px] font-bold text-white tracking-[-0.02em] mt-3 leading-tight">
                Three Steps to Success
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-[#aeadae] max-w-[560px] mx-auto mt-4">
                Getting started with GradGenie is simple. Set up your profile, choose a tool, and let AI do the heavy lifting.
              </p>
            </ScrollReveal>
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Connecting Line (desktop only) */}
            <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-[1px]">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full h-full border-t border-dashed border-white/15"
                style={{ transformOrigin: 'left' }}
              />
            </div>

            {steps.map((step, index) => (
              <ScrollReveal key={step.number} delay={index * 0.2}>
                <div className="text-center">
                  {/* Step Number */}
                  <h3 className="text-5xl md:text-6xl font-bold mb-4">
                    <GradientText variant={step.gradient}>{step.number}</GradientText>
                  </h3>

                  {/* Icon Circle */}
                  <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-br ${step.circleBg} border border-white/[0.08] flex items-center justify-center mb-6`}>
                    <div className={`w-12 h-12 rounded-xl ${step.iconBg} flex items-center justify-center`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h4 className="text-xl font-medium text-white mb-3">{step.title}</h4>
                  <p className="text-base text-[#aeadae] leading-relaxed max-w-[280px] mx-auto">
                    {step.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
