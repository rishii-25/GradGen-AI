import { useState, lazy, Suspense, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Mail, Lock, User, Sparkles } from 'lucide-react';
import { Header } from '@/sections/header';
import { Hero } from '@/sections/hero';
import { ToolsGrid } from '@/sections/tools-grid';
import { InteractiveDemo } from '@/sections/interactive-demo';
import { Features } from '@/sections/features';
import { HowItWorks } from '@/sections/how-it-works';
import { Pricing } from '@/sections/pricing';
import { Testimonials } from '@/sections/testimonials';
import { FAQ } from '@/sections/faq';
import { CTASection } from '@/sections/cta';
import { Footer } from '@/sections/footer';
import { ToastContainer } from '@/components/toast';
import { useToast } from '@/hooks/useToast';

// Lazy load all tools
const ResumeGenerator = lazy(() => import('@/sections/tools/resume-generator').then(m => ({ default: m.ResumeGenerator })));
const LinkedInGenerator = lazy(() => import('@/sections/tools/linkedin-generator').then(m => ({ default: m.LinkedInGenerator })));
const AbstractGenerator = lazy(() => import('@/sections/tools/abstract-generator').then(m => ({ default: m.AbstractGenerator })));
const CGPACalculator = lazy(() => import('@/sections/tools/cgpa-calculator').then(m => ({ default: m.CGPACalculator })));
const PPTGenerator = lazy(() => import('@/sections/tools/ppt-generator').then(m => ({ default: m.PPTGenerator })));
const ATSChecker = lazy(() => import('@/sections/tools/ats-checker').then(m => ({ default: m.ATSChecker })));
const CoverLetterGenerator = lazy(() => import('@/sections/tools/cover-letter').then(m => ({ default: m.CoverLetterGenerator })));
const ColdEmailGenerator = lazy(() => import('@/sections/tools/cold-email').then(m => ({ default: m.ColdEmailGenerator })));
const AttendanceCalculator = lazy(() => import('@/sections/tools/attendance-calc').then(m => ({ default: m.AttendanceCalculator })));
const QuizGenerator = lazy(() => import('@/sections/tools/quiz-generator').then(m => ({ default: m.QuizGenerator })));
const CodeExplainer = lazy(() => import('@/sections/tools/code-explainer').then(m => ({ default: m.CodeExplainer })));
const CareerRoadmap = lazy(() => import('@/sections/tools/career-roadmap').then(m => ({ default: m.CareerRoadmap })));
const ReadmeGenerator = lazy(() => import('@/sections/tools/readme-generator').then(m => ({ default: m.ReadmeGenerator })));
const StudyPlanner = lazy(() => import('@/sections/tools/study-planner').then(m => ({ default: m.StudyPlanner })));
const MockInterview = lazy(() => import('@/sections/tools/mock-interview').then(m => ({ default: m.MockInterview })));
const NotesGenerator = lazy(() => import('@/sections/tools/notes-generator').then(m => ({ default: m.NotesGenerator })));
const ResearchSummarizer = lazy(() => import('@/sections/tools/research-summarizer').then(m => ({ default: m.ResearchSummarizer })));

function AuthModal({ onClose, addToast }: { onClose: () => void; addToast: (msg: string, type: 'success' | 'error' | 'info') => void }) {
  const [mode, setMode] = useState<'login' | 'signup'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(mode === 'signup' ? 'Account created successfully!' : 'Welcome back!', 'success');
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[600] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} transition={{ duration: 0.3 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-[420px] glass-card !p-8">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/[0.08] transition-colors"><X className="w-5 h-5 text-white/60" /></button>
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-[#693def] to-[#00d4ff] flex items-center justify-center mb-4"><Sparkles className="w-6 h-6 text-white" /></div>
          <h2 className="text-2xl font-bold text-white">{mode === 'signup' ? 'Create Account' : 'Welcome Back'}</h2>
          <p className="text-sm text-[#aeadae] mt-1">{mode === 'signup' ? 'Start your AI-powered journey' : 'Sign in to your account'}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="text-sm text-white/60 mb-1 block">Full Name</label>
              <div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" /><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#693def]/50 focus:outline-none" /></div>
            </div>
          )}
          <div>
            <label className="text-sm text-white/60 mb-1 block">Email</label>
            <div className="relative"><Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@email.com" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#693def]/50 focus:outline-none" /></div>
          </div>
          <div>
            <label className="text-sm text-white/60 mb-1 block">Password</label>
            <div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#693def]/50 focus:outline-none" /></div>
          </div>
          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-[#693def] to-[#00d4ff] text-white font-medium hover:brightness-110 transition-all">{mode === 'signup' ? 'Create Account' : 'Sign In'}</button>
        </form>
        <div className="mt-6 text-center">
          <button onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')} className="text-sm text-[#aeadae] hover:text-white transition-colors">{mode === 'signup' ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  // Fix: Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleOpenTool = (toolId: string) => { setActiveTool(toolId); document.body.style.overflow = 'hidden'; };
  const handleCloseTool = () => { setActiveTool(null); document.body.style.overflow = ''; };
  const handleOpenAuth = () => { setShowAuth(true); document.body.style.overflow = 'hidden'; };
  const handleCloseAuth = () => { setShowAuth(false); document.body.style.overflow = ''; };
  const scrollToTools = () => { document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <div className="min-h-screen bg-[#0c0b0e] text-white overflow-x-hidden">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <Header onOpenAuth={handleOpenAuth} />
      <main>
        <Hero onOpenAuth={handleOpenAuth} onScrollToTools={scrollToTools} />
        <ToolsGrid onOpenTool={handleOpenTool} />
        <InteractiveDemo />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <CTASection onOpenAuth={handleOpenAuth} />
      </main>
      <Footer />

      <Suspense fallback={null}>
        <AnimatePresence>
          {activeTool === 'resume' && <ResumeGenerator onClose={handleCloseTool} addToast={addToast} />}
          {activeTool === 'linkedin' && <LinkedInGenerator onClose={handleCloseTool} addToast={addToast} />}
          {activeTool === 'abstract' && <AbstractGenerator onClose={handleCloseTool} addToast={addToast} />}
          {activeTool === 'cgpa' && <CGPACalculator onClose={handleCloseTool} addToast={addToast} />}
          {activeTool === 'ppt' && <PPTGenerator onClose={handleCloseTool} addToast={addToast} />}
          {activeTool === 'ats' && <ATSChecker onClose={handleCloseTool} addToast={addToast} />}
          {activeTool === 'coverletter' && <CoverLetterGenerator onClose={handleCloseTool} addToast={addToast} />}
          {activeTool === 'coldemail' && <ColdEmailGenerator onClose={handleCloseTool} addToast={addToast} />}
          {activeTool === 'attendance' && <AttendanceCalculator onClose={handleCloseTool} />}
          {activeTool === 'quiz' && <QuizGenerator onClose={handleCloseTool} addToast={addToast} />}
          {activeTool === 'codeexplainer' && <CodeExplainer onClose={handleCloseTool} addToast={addToast} />}
          {activeTool === 'careerroadmap' && <CareerRoadmap onClose={handleCloseTool} addToast={addToast} />}
          {activeTool === 'readme' && <ReadmeGenerator onClose={handleCloseTool} addToast={addToast} />}
          {activeTool === 'studyplanner' && <StudyPlanner onClose={handleCloseTool} addToast={addToast} />}
          {activeTool === 'mockinterview' && <MockInterview onClose={handleCloseTool} />}
          {activeTool === 'notes' && <NotesGenerator onClose={handleCloseTool} addToast={addToast} />}
          {activeTool === 'research' && <ResearchSummarizer onClose={handleCloseTool} addToast={addToast} />}
        </AnimatePresence>
      </Suspense>

      <AnimatePresence>
        {showAuth && <AuthModal onClose={handleCloseAuth} addToast={addToast} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
