import { Zap, FileText, Download, Star, Calculator, Shield } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SectionDivider } from '@/components/section-divider';

const features = [
  {
    id: 'ai',
    title: 'AI-Powered Generation',
    description: 'Leverage advanced AI models to generate professional content tailored to your academic profile and career goals.',
    icon: Zap,
    iconBg: 'bg-gradient-to-br from-[#0072f5] to-[#0b98e3]',
  },
  {
    id: 'templates',
    title: 'Multiple Templates',
    description: 'Choose from professionally designed templates for resumes, presentations, and academic documents.',
    icon: FileText,
    iconBg: 'bg-gradient-to-br from-[#693def] to-[#00d4ff]',
  },
  {
    id: 'export',
    title: 'One-Click Export',
    description: 'Download your generated content as PDF, DOCX, or plain text. Copy to clipboard with a single click.',
    icon: Download,
    iconBg: 'bg-gradient-to-br from-[#00e3a0] to-[#00b97b]',
  },
  {
    id: 'save',
    title: 'Save & Organize',
    description: 'Save all your generated content to your account. Access your resume history, bios, and calculations anytime.',
    icon: Star,
    iconBg: 'bg-gradient-to-br from-[#f90082] to-[#ff4dff]',
  },
  {
    id: 'calculations',
    title: 'Smart Calculations',
    description: 'CGPA, SGPA, and percentage calculations with beautiful visual charts and grade predictions.',
    icon: Calculator,
    iconBg: 'bg-gradient-to-br from-[#a6f800] to-[#f90082]',
  },
  {
    id: 'dark',
    title: 'Dark Mode Design',
    description: "A premium dark interface that's easy on the eyes during late-night study sessions and project work.",
    icon: Shield,
    iconBg: 'bg-gradient-to-br from-[#0072f5] to-[#1e9de7]',
  },
];

export function Features() {
  return (
    <>
      <SectionDivider colors={['#00e3a0', '#00b97b', '#008a5e']} />
      <section id="features" className="relative py-24 md:py-32 bg-[#0c0b0e]">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="text-xs font-medium uppercase tracking-widest text-[#f90082]">
                Why GradGenie
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-[52px] font-bold text-white tracking-[-0.02em] mt-3 leading-tight">
                Built for Student Success
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-[#aeadae] max-w-[560px] mx-auto mt-4">
                From resume building to academic calculations, every tool is designed to save time and deliver professional results.
              </p>
            </ScrollReveal>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.id} delay={index * 0.1}>
                <GlassCard className="h-full">
                  <div className={`w-10 h-10 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">{feature.title}</h3>
                  <p className="text-base text-[#aeadae] leading-relaxed">{feature.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
