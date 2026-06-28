import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Linkedin, FlaskConical, Presentation, Sparkles, Send } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SectionDivider } from '@/components/section-divider';
import { AITypewriter } from '@/components/ai-typewriter';

const demoTabs = [
  {
    id: 'resume',
    label: 'Resume Summary',
    subtitle: 'Generate professional summaries',
    icon: FileText,
    iconBg: 'bg-gradient-to-br from-[#0072f5] to-[#0b98e3]',
    userMessage: 'Generate a resume summary for a Computer Science student skilled in Python, React, and Machine Learning.',
    aiResponse: 'Results-driven Computer Science student with expertise in Python, React, and Machine Learning. Proven ability to develop scalable web applications and deploy intelligent data-driven solutions. Passionate about leveraging AI to solve real-world problems and eager to contribute to innovative engineering teams.',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn Bio',
    subtitle: 'Craft compelling about sections',
    icon: Linkedin,
    iconBg: 'bg-gradient-to-br from-[#693def] to-[#00d4ff]',
    userMessage: 'Write a LinkedIn About section for a final year student passionate about AI and web development.',
    aiResponse: 'I am a final-year Computer Science student with a deep passion for Artificial Intelligence and full-stack web development. Over the past three years, I have built production-ready applications using React, Node.js, and Python, while exploring the frontiers of machine learning and natural language processing. I thrive at the intersection of creativity and technology, turning complex problems into elegant digital solutions.',
  },
  {
    id: 'abstract',
    label: 'Project Abstract',
    subtitle: 'Academic abstracts in seconds',
    icon: FlaskConical,
    iconBg: 'bg-gradient-to-br from-[#00e3a0] to-[#00b97b]',
    userMessage: 'Create an abstract for a Smart Traffic Management System using IoT and Machine Learning.',
    aiResponse: 'This project presents a Smart Traffic Management System that leverages Internet of Things (IoT) sensors and Machine Learning algorithms to optimize urban traffic flow. The system collects real-time traffic data through distributed sensor networks, processes it using a cloud-based analytics pipeline, and applies predictive modeling to dynamically adjust signal timings. Experimental results demonstrate a 35% reduction in average waiting time and a 28% improvement in traffic throughput compared to conventional fixed-time systems.',
  },
  {
    id: 'ppt',
    label: 'PPT Outline',
    subtitle: 'Structured slide content',
    icon: Presentation,
    iconBg: 'bg-gradient-to-br from-[#f90082] to-[#ff4dff]',
    userMessage: 'Generate a presentation outline on "Blockchain Technology in Supply Chain Management".',
    aiResponse: 'Slide 1: Title — Blockchain in Supply Chain: Revolutionizing Transparency\n\nSlide 2: Introduction — Overview of supply chain challenges: lack of transparency, fraud, and inefficiency.\n\nSlide 3: What is Blockchain? — Decentralized ledger, immutability, smart contracts.\n\nSlide 4: Key Benefits — End-to-end traceability, real-time visibility, reduced paperwork, enhanced trust.\n\nSlide 5: Use Cases — Food safety tracking, pharmaceutical verification, luxury goods authentication.\n\nSlide 6: Implementation Framework — Architecture, consensus mechanism, integration with existing ERP systems.\n\nSlide 7: Challenges & Limitations — Scalability, cost, regulatory uncertainty.\n\nSlide 8: Conclusion — The future of supply chains is decentralized, transparent, and automated.',
  },
];

export function InteractiveDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const [phase, setPhase] = useState<'idle' | 'typing-indicator' | 'typing' | 'complete'>('idle');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentTab = demoTabs[activeTab];

  useEffect(() => {
    setPhase('idle');
    const timer1 = setTimeout(() => setPhase('typing-indicator'), 500);
    const timer2 = setTimeout(() => setPhase('typing'), 2000);
    const timer3 = setTimeout(() => setPhase('complete'), 2000 + currentTab.aiResponse.length * 25 + 500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [activeTab]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [phase]);

  return (
    <>
      <SectionDivider colors={['#0072f5', '#0b98e3', '#1e9de7']} />
      <section className="relative py-24 md:py-32 bg-[#161518]">
        <div className="max-w-[1200px] mx-auto px-5">
          {/* Header */}
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="text-xs font-medium uppercase tracking-widest text-[#00e3a0]">
                See It In Action
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-[52px] font-bold text-white tracking-[-0.02em] mt-3 leading-tight">
                Experience the Power of AI
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-[#aeadae] max-w-[560px] mx-auto mt-4">
                Watch how GradGenie transforms your inputs into professional-grade outputs in real-time.
              </p>
            </ScrollReveal>
          </div>

          {/* Demo Area */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Panel: Tabs */}
            <ScrollReveal className="lg:w-[40%]">
              <div className="flex flex-col gap-3">
                {demoTabs.map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    className={`flex items-center gap-4 p-5 rounded-2xl text-left transition-all duration-200 border ${
                      activeTab === index
                        ? 'border-white/[0.2] bg-white/[0.05] border-l-[3px] border-l-[#693def]'
                        : 'border-white/[0.08] bg-[rgba(22,21,24,0.4)] hover:border-white/[0.12]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl ${tab.iconBg} flex items-center justify-center flex-shrink-0`}>
                      <tab.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base font-medium text-white">{tab.label}</h4>
                      <p className="text-sm text-[#aeadae]">{tab.subtitle}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </ScrollReveal>

            {/* Right Panel: Chat */}
            <ScrollReveal delay={0.2} className="lg:w-[60%]">
              <GlassCard className="min-h-[420px] flex flex-col p-0 overflow-hidden">
                {/* Chat Header */}
                <div className="px-5 py-4 border-b border-white/[0.08] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#693def] to-[#00d4ff] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">GradGenie AI</span>
                  <span className="w-2 h-2 rounded-full bg-[#00e3a0] ml-auto animate-pulse" />
                </div>

                {/* Chat Messages */}
                <div className="flex-1 p-5 overflow-y-auto space-y-4 min-h-[300px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* User Message */}
                      <div className="flex justify-end">
                        <div className="max-w-[80%] bg-[rgba(105,61,239,0.3)] border border-[rgba(105,61,239,0.4)] rounded-2xl rounded-br-sm px-4 py-3">
                          <p className="text-sm text-white">{currentTab.userMessage}</p>
                        </div>
                      </div>

                      {/* AI Typing Indicator */}
                      {phase === 'typing-indicator' && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#693def] to-[#00d4ff] flex items-center justify-center flex-shrink-0 mt-1">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div className="bg-white/[0.05] border border-white/[0.1] rounded-2xl rounded-bl-sm px-4 py-3">
                            <div className="flex gap-1">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-2 h-2 rounded-full bg-white/40"
                                  animate={{ scale: [1, 1.3, 1] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                />
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* AI Message */}
                      {(phase === 'typing' || phase === 'complete') && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#693def] to-[#00d4ff] flex items-center justify-center flex-shrink-0 mt-1">
                            <Sparkles className="w-3.5 h-3.5 text-white" />
                          </div>
                          <div className="max-w-[85%] bg-white/[0.05] border border-white/[0.1] rounded-2xl rounded-bl-sm px-4 py-3">
                            <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line">
                              <AITypewriter
                                text={currentTab.aiResponse}
                                speed={20}
                                trigger={phase === 'typing' || phase === 'complete'}
                              />
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                  <div ref={chatEndRef} />
                </div>

                {/* Input Bar (disabled demo) */}
                <div className="px-5 py-4 border-t border-white/[0.08]">
                  <div className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.1] rounded-xl px-4 py-3">
                    <input
                      type="text"
                      placeholder="Try typing a prompt..."
                      disabled
                      className="flex-1 bg-transparent text-sm text-white/30 placeholder:text-white/30 outline-none"
                    />
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#693def] to-[#00d4ff] flex items-center justify-center opacity-50">
                      <Send className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
