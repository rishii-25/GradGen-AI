import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SectionDivider } from '@/components/section-divider';

const faqs = [
  {
    question: 'What is GradGenie AI?',
    answer: 'GradGenie AI is an all-in-one AI-powered toolkit designed specifically for students. It helps you create professional resumes, LinkedIn bios, project abstracts, presentation content, and calculate your academic grades — all powered by advanced artificial intelligence.',
  },
  {
    question: 'Is GradGenie free to use?',
    answer: 'Yes! GradGenie offers a generous free plan that includes 5 AI generations per month across all tools. You can upgrade to Pro or Premium for unlimited generations and additional features.',
  },
  {
    question: 'Do I need technical knowledge to use GradGenie?',
    answer: 'Not at all. GradGenie is designed to be intuitive and user-friendly. Simply enter your information, choose your preferences, and let the AI handle the rest.',
  },
  {
    question: 'How does the AI resume builder work?',
    answer: 'Enter your personal information, education, skills, and experience. Our AI analyzes your inputs and generates a professional resume summary, suggests improvements, and formats everything into a polished, ATS-friendly resume template.',
  },
  {
    question: 'Can I download my generated content?',
    answer: 'Yes! Pro and Premium users can download resumes as PDF or DOCX files. All users can copy content to the clipboard with one click.',
  },
  {
    question: 'What tones are available for the LinkedIn bio generator?',
    answer: 'The LinkedIn bio generator offers four tones: Professional (formal and corporate), Confident (bold and assertive), Creative (unique and storytelling), and Technical (skills-focused and detailed).',
  },
  {
    question: 'How accurate is the CGPA calculator?',
    answer: 'The CGPA calculator uses standard university grading formulas and is highly accurate. It supports multiple grading scales and provides visual charts to help you track your academic progress.',
  },
  {
    question: 'How do I create an account?',
    answer: "Click 'Get Started' and sign up with your email or Google account. The onboarding process takes less than 2 minutes.",
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use industry-standard encryption and never share your personal information with third parties. Your data is stored securely and you can delete your account at any time.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer: "You can cancel your subscription anytime from your account settings. You'll continue to have access until the end of your billing period.",
  },
];

function FAQItem({ question, answer, isOpen, onToggle }: { question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-base font-medium text-white pr-4">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-white/60" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="px-5 pb-5">
              <p className="text-base text-[#aeadae] leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <SectionDivider colors={['#f90082', '#ff4dff', '#a6f800']} />
      <section id="faq" className="relative py-24 md:py-32 bg-[#0c0b0e]">
        <div className="max-w-[800px] mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="text-xs font-medium uppercase tracking-widest text-[#0072f5]">
                FAQ
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-[52px] font-bold text-white tracking-[-0.02em] mt-3 leading-tight">
                Frequently Asked Questions
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-[#aeadae] max-w-[560px] mx-auto mt-4">
                Everything you need to know about GradGenie. Can&apos;t find your answer? Contact our support team.
              </p>
            </ScrollReveal>
          </div>

          {/* FAQ Items */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={index * 0.05}>
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
