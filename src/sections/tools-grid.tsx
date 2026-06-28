import { motion } from 'framer-motion';
import {
  FileText, Linkedin, FlaskConical, Calculator, Presentation,
  FileCheck, Mail, CalendarCheck, HelpCircle,
  Code2, Map, Github, Mic, Layers, Sparkles, BookOpenText,
  Briefcase
} from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { ScrollReveal } from '@/components/scroll-reveal';
import { SectionDivider } from '@/components/section-divider';

interface Tool { id: string; name: string; description: string; icon: React.ElementType; gradient: string; iconBg: string; category: string; }

const tools: Tool[] = [
  // Core Tools
  { id: 'resume', name: 'AI Resume Generator', description: 'Build professional, ATS-friendly resumes with 10+ templates and AI summaries.', icon: FileText, gradient: 'from-[#0072f5] to-[#0b98e3]', iconBg: 'bg-gradient-to-br from-[#0072f5] to-[#0b98e3]', category: 'Core' },
  { id: 'linkedin', name: 'LinkedIn Bio Generator', description: 'Craft compelling LinkedIn About sections with 4 selectable tones.', icon: Linkedin, gradient: 'from-[#693def] to-[#00d4ff]', iconBg: 'bg-gradient-to-br from-[#693def] to-[#00d4ff]', category: 'Core' },
  { id: 'abstract', name: 'Project Abstract Generator', description: 'Generate professional academic abstracts in seconds.', icon: FlaskConical, gradient: 'from-[#00e3a0] to-[#00b97b]', iconBg: 'bg-gradient-to-br from-[#00e3a0] to-[#00b97b]', category: 'Core' },
  { id: 'cgpa', name: 'CGPA Calculator', description: 'Calculate SGPA, CGPA with beautiful charts and grade predictions.', icon: Calculator, gradient: 'from-[#f90082] to-[#ff4dff]', iconBg: 'bg-gradient-to-br from-[#f90082] to-[#ff4dff]', category: 'Core' },
  { id: 'ppt', name: 'PPT Content & Templates', description: 'Generate presentation content and choose from professional slide templates.', icon: Presentation, gradient: 'from-[#a6f800] to-[#f90082]', iconBg: 'bg-gradient-to-br from-[#a6f800] to-[#f90082]', category: 'Core' },

  // Career Tools
  { id: 'ats', name: 'ATS Resume Checker', description: 'Check ATS score, find missing keywords, grammar issues, and improvements.', icon: FileCheck, gradient: 'from-[#00e3a0] to-[#008a5e]', iconBg: 'bg-gradient-to-br from-[#00e3a0] to-[#008a5e]', category: 'Career' },
  { id: 'coverletter', name: 'Cover Letter Generator', description: 'Generate tailored cover letters for internships and jobs.', icon: Briefcase, gradient: 'from-[#ff4dff] to-[#f90082]', iconBg: 'bg-gradient-to-br from-[#ff4dff] to-[#f90082]', category: 'Career' },
  { id: 'coldemail', name: 'Cold Email Generator', description: 'Generate professional emails for Professors, HR, and Recruiters.', icon: Mail, gradient: 'from-[#0072f5] to-[#1e9de7]', iconBg: 'bg-gradient-to-br from-[#0072f5] to-[#1e9de7]', category: 'Career' },
  { id: 'mockinterview', name: 'AI Mock Interview', description: 'Practice interview questions with AI-generated answers and hints.', icon: Mic, gradient: 'from-[#ff4dff] to-[#693def]', iconBg: 'bg-gradient-to-br from-[#ff4dff] to-[#693def]', category: 'Career' },
  { id: 'careerroadmap', name: 'Career Roadmap Generator', description: 'Get step-by-step career roadmaps for any tech field.', icon: Map, gradient: 'from-[#00d4ff] to-[#0072f5]', iconBg: 'bg-gradient-to-br from-[#00d4ff] to-[#0072f5]', category: 'Career' },
  { id: 'readme', name: 'GitHub README Generator', description: 'Create stunning GitHub README.md files for your projects.', icon: Github, gradient: 'from-white to-white/60', iconBg: 'bg-gradient-to-br from-white/20 to-white/10', category: 'Career' },

  // Study Tools
  { id: 'notes', name: 'AI Notes Generator', description: 'Generate Short Notes, Detailed Notes, and Flashcards from any topic.', icon: Layers, gradient: 'from-[#00e3a0] to-[#00d4ff]', iconBg: 'bg-gradient-to-br from-[#00e3a0] to-[#00d4ff]', category: 'Study' },
  { id: 'quiz', name: 'Quiz & MCQ Generator', description: 'Generate practice quizzes with instant scoring and explanations.', icon: HelpCircle, gradient: 'from-[#f90082] to-[#ffba00]', iconBg: 'bg-gradient-to-br from-[#f90082] to-[#ffba00]', category: 'Study' },
  { id: 'studyplanner', name: 'AI Study Planner', description: 'Create personalized study schedules for any exam.', icon: CalendarCheck, gradient: 'from-[#ffba00] to-[#f90082]', iconBg: 'bg-gradient-to-br from-[#ffba00] to-[#f90082]', category: 'Study' },
  { id: 'codeexplainer', name: 'Code Explainer & Debugger', description: 'Explain code line-by-line and find bugs with fixes.', icon: Code2, gradient: 'from-[#693def] to-[#00d4ff]', iconBg: 'bg-gradient-to-br from-[#693def] to-[#00d4ff]', category: 'Study' },
  { id: 'research', name: 'Research Paper Summarizer', description: 'Summarize academic papers in short or detailed format.', icon: BookOpenText, gradient: 'from-[#00d4ff] to-[#0072f5]', iconBg: 'bg-gradient-to-br from-[#00d4ff] to-[#0072f5]', category: 'Study' },

  // Utility Tools
  { id: 'attendance', name: 'Attendance Calculator', description: 'Track attendance, calculate safe bunks and required classes.', icon: CalendarCheck, gradient: 'from-[#a6f800] to-[#00e3a0]', iconBg: 'bg-gradient-to-br from-[#a6f800] to-[#00e3a0]', category: 'Utility' },
];

interface ToolsGridProps { onOpenTool: (toolId: string) => void; }

export function ToolsGrid({ onOpenTool }: ToolsGridProps) {
  const categories = ['Core', 'Career', 'Study', 'Utility'];

  return (
    <>
      <SectionDivider />
      <section id="tools" className="relative py-24 md:py-32 bg-[#0c0b0e]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="text-xs font-medium uppercase tracking-widest text-[#693def]">Our Tools</span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-4xl md:text-[52px] font-bold text-white tracking-[-0.02em] mt-3 leading-tight">
                20+ AI-Powered Tools
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-[#aeadae] max-w-[560px] mx-auto mt-4">
                Everything you need for academics, career, and productivity — all in one place.
              </p>
            </ScrollReveal>
          </div>

          {categories.map((category) => (
            <div key={category} className="mb-12">
              <ScrollReveal>
                <h3 className="text-lg font-medium text-white/40 mb-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#693def]" /> {category} Tools
                </h3>
              </ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tools.filter(t => t.category === category).map((tool, index) => (
                  <ScrollReveal key={tool.id} delay={index * 0.05}>
                    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.3 }} onClick={() => onOpenTool(tool.id)} className="cursor-pointer group h-full">
                      <GlassCard className="h-full !p-5 flex flex-col">
                        <div className={`w-10 h-10 rounded-xl ${tool.iconBg} flex items-center justify-center mb-4`}>
                          <tool.icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-base font-medium text-white mb-2">{tool.name}</h4>
                        <p className="text-sm text-[#aeadae] leading-relaxed flex-1">{tool.description}</p>
                        <span className="text-xs font-medium text-[#693def] opacity-0 group-hover:opacity-100 transition-opacity mt-3 flex items-center gap-1">
                          Launch <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </span>
                      </GlassCard>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
