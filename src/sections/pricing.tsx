import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SectionDivider } from '@/components/section-divider';

type BillingCycle = 'monthly' | 'annual' | 'lifetime';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  prices: Record<BillingCycle, number>;
  features: { text: string; included: boolean }[];
  accent: string;
  borderColor: string;
  featured?: boolean;
  ctaText: string;
}

const plans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    prices: { monthly: 0, annual: 0, lifetime: 0 },
    features: [
      { text: '5 AI generations per month', included: true },
      { text: 'Resume builder (1 template)', included: true },
      { text: 'LinkedIn bio generator', included: true },
      { text: 'Project abstract generator', included: true },
      { text: 'CGPA calculator', included: true },
      { text: 'PPT content generator (3 slides)', included: true },
      { text: 'Copy to clipboard', included: true },
      { text: 'Save up to 10 items', included: true },
      { text: 'Download as PDF', included: false },
      { text: 'Priority support', included: false },
    ],
    accent: '',
    borderColor: 'border-white/[0.08]',
    ctaText: 'Get Started Free',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For serious students',
    prices: { monthly: 9, annual: 7, lifetime: 149 },
    features: [
      { text: 'Unlimited AI generations', included: true },
      { text: 'Resume builder (5 templates)', included: true },
      { text: 'LinkedIn bio generator (all tones)', included: true },
      { text: 'Project abstract generator', included: true },
      { text: 'CGPA calculator with charts', included: true },
      { text: 'PPT content generator (unlimited)', included: true },
      { text: 'Download as PDF/DOCX', included: true },
      { text: 'Copy to clipboard', included: true },
      { text: 'Save unlimited items', included: true },
      { text: 'Priority support', included: true },
    ],
    accent: '#693def',
    borderColor: 'border-[rgba(105,61,239,0.4)]',
    featured: true,
    ctaText: 'Start Pro Trial',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'For power users and teams',
    prices: { monthly: 19, annual: 15, lifetime: 299 },
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Team collaboration (up to 5)', included: true },
      { text: 'Custom AI training', included: true },
      { text: 'Advanced analytics dashboard', included: true },
      { text: 'API access', included: true },
      { text: 'White-label exports', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Early access to new tools', included: true },
      { text: 'SSO authentication', included: true },
      { text: 'Custom integrations', included: true },
    ],
    accent: '#00e3a0',
    borderColor: 'border-[rgba(0,227,160,0.4)]',
    ctaText: 'Go Premium',
  },
];

const cycleLabels: Record<BillingCycle, string> = {
  monthly: '/month',
  annual: '/month',
  lifetime: ' one-time',
};

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [teamSize, setTeamSize] = useState(1);
  const [calcOpen, setCalcOpen] = useState(false);

  const getPrice = (plan: PricingPlan) => {
    const base = plan.prices[billingCycle];
    if (billingCycle === 'lifetime') return base;
    return base * teamSize;
  };

  const getSavings = () => {
    if (billingCycle !== 'annual') return 0;
    const proMonthlyTotal = plans[1].prices.monthly * 12 * teamSize;
    const proAnnualTotal = plans[1].prices.annual * 12 * teamSize;
    return proMonthlyTotal - proAnnualTotal;
  };

  return (
    <>
      <SectionDivider colors={['#00d4ff', '#001a4c', '#693def']} />
      <section id="pricing" className="relative py-24 md:py-32 bg-[#0c0b0e]">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-12">
            <ScrollReveal>
              <span className="text-xs font-medium uppercase tracking-widest text-[#a6f800]">
                Pricing
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-[52px] font-bold text-white tracking-[-0.02em] mt-3 leading-tight">
                Choose Your Plan
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-[#aeadae] max-w-[560px] mx-auto mt-4">
                Start free and upgrade as you grow. All plans include core tools with no credit card required.
              </p>
            </ScrollReveal>
          </div>

          {/* Billing Toggle */}
          <ScrollReveal delay={0.3} className="flex justify-center mb-12">
            <div className="inline-flex items-center p-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
              {(['monthly', 'annual', 'lifetime'] as BillingCycle[]).map((cycle) => (
                <button
                  key={cycle}
                  onClick={() => setBillingCycle(cycle)}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    billingCycle === cycle ? 'text-white' : 'text-white/50 hover:text-white/70'
                  }`}
                >
                  {billingCycle === cycle && (
                    <motion.div
                      layoutId="billing-active"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-2">
                    {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                    {cycle === 'annual' && (
                      <span className="text-[10px] bg-[#00e3a0]/20 text-[#00e3a0] px-2 py-0.5 rounded-full">Save 20%</span>
                    )}
                    {cycle === 'lifetime' && (
                      <span className="text-[10px] bg-[#693def]/20 text-[#693def] px-2 py-0.5 rounded-full">Best</span>
                    )}
                  </span>
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan, index) => (
              <ScrollReveal key={plan.id} delay={index * 0.15}>
                <GlassCard
                  className={`relative h-full ${plan.featured ? '-mt-2 md:-mt-4' : ''}`}
                  glowColor={plan.accent}
                  hover={true}
                >
                  {/* Featured Badge */}
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r from-[#693def] to-[#00d4ff]">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <p className="text-sm text-[#aeadae] mt-1">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold text-white">${getPrice(plan)}</span>
                      <span className="text-sm text-[#aeadae]">{cycleLabels[billingCycle]}</span>
                    </div>
                    {billingCycle === 'annual' && plan.id !== 'free' && (
                      <p className="text-sm text-[#00e3a0] mt-1">
                        Save ${getSavings()}/year vs monthly
                      </p>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/[0.1] my-6" />

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-[#00e3a0] mt-0.5 flex-shrink-0" />
                        ) : (
                          <Minus className="w-4 h-4 text-white/20 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-white/80' : 'text-white/30 line-through'}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className={`w-full py-3 rounded-full text-sm font-medium transition-all duration-200 ${
                      plan.featured
                        ? 'btn-primary'
                        : plan.id === 'premium'
                        ? 'btn-secondary border-[#00e3a0]/30 hover:border-[#00e3a0]'
                        : 'btn-secondary'
                    }`}
                  >
                    {plan.ctaText}
                  </button>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>

          {/* Pricing Calculator Toggle */}
          <ScrollReveal className="mt-12">
            <div className="max-w-[600px] mx-auto">
              <button
                onClick={() => setCalcOpen(!calcOpen)}
                className="w-full flex items-center justify-between p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.12] transition-colors"
              >
                <span className="text-lg font-medium text-white">Pricing Calculator</span>
                <motion.svg
                  animate={{ rotate: calcOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5 text-white/60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>

              {calcOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08]"
                >
                  {/* Team Size */}
                  <div className="mb-6">
                    <label className="text-sm text-[#aeadae] mb-3 block">Team Size: {teamSize}</label>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      value={teamSize}
                      onChange={(e) => setTeamSize(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #693def ${((teamSize - 1) / 49) * 100}%, rgba(255,255,255,0.1) ${((teamSize - 1) / 49) * 100}%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-white/40 mt-2">
                      <span>1</span>
                      <span>50</span>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4">
                    {plans.slice(1).map((plan) => (
                      <div key={plan.id} className="text-center p-4 rounded-xl bg-white/[0.03]">
                        <p className="text-xs text-[#aeadae] mb-1">{plan.name}</p>
                        <p className="text-2xl font-bold text-white">${getPrice(plan)}</p>
                        <p className="text-xs text-white/40">{billingCycle === 'lifetime' ? 'one-time' : '/month'}</p>
                      </div>
                    ))}
                  </div>

                  {billingCycle === 'annual' && (
                    <p className="text-center text-sm text-[#00e3a0] mt-4">
                      You save ${getSavings()}/year with annual billing
                    </p>
                  )}
                </motion.div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
