import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, FileCheck, Sparkles, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';

interface ATSCheckerProps {
  onClose: () => void;
  addToast?: (msg: string, type: 'success' | 'error' | 'info') => void;
}

const keywordsDB: Record<string, string[]> = {
  'software engineer': ['JavaScript', 'Python', 'React', 'Node.js', 'Git', 'Agile', 'REST API', 'Database', 'Testing', 'CI/CD'],
  'data scientist': ['Python', 'Machine Learning', 'SQL', 'TensorFlow', 'Pandas', 'Statistics', 'Visualization', 'Deep Learning', 'NLP', 'Big Data'],
  'web developer': ['HTML', 'CSS', 'JavaScript', 'React', 'Responsive', 'Git', 'TypeScript', 'Next.js', 'Tailwind', 'API'],
  'general': ['Leadership', 'Communication', 'Problem Solving', 'Teamwork', 'Project Management', 'Analysis', 'Microsoft Office', 'Time Management'],
};

export function ATSChecker({ onClose, addToast: _addToast }: ATSCheckerProps) {
  void _addToast;
  const [resumeText, setResumeText] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    found: string[];
    missing: string[];
    grammar: string[];
    suggestions: string[];
  } | null>(null);

  const analyze = () => {
    if (!resumeText.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      const lower = resumeText.toLowerCase();
      const keywords = keywordsDB[jobTitle.toLowerCase()] || keywordsDB['general'];
      const found = keywords.filter(k => lower.includes(k.toLowerCase()));
      const missing = keywords.filter(k => !lower.includes(k.toLowerCase()));
      const score = Math.round((found.length / keywords.length) * 100);

      const grammar: string[] = [];
      if (!lower.includes('education')) grammar.push('Add an Education section');
      if (!lower.includes('experience')) grammar.push('Add a Work Experience section');
      if (!lower.includes('skills')) grammar.push('Add a Skills section');
      if (resumeText.length < 200) grammar.push('Resume is too short — aim for 300+ words');

      const suggestions = [
        'Use standard section headings (Education, Experience, Skills)',
        'Avoid tables, headers, footers, and graphics',
        'Use action verbs to start bullet points',
        'Quantify achievements with numbers and percentages',
        'Keep formatting simple and consistent',
      ];

      setResult({ score, found, missing, grammar, suggestions });
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[900px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileCheck className="w-5 h-5 text-[#00e3a0]" />
            <h2 className="text-base font-medium text-white">ATS Resume Checker</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08]"><X className="w-5 h-5 text-white/60" /></button>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white">Paste Your Resume</h3>
            <input value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="Target Job Title (e.g., Software Engineer)"
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00e3a0]/50 focus:outline-none" />
            <textarea value={resumeText} onChange={e => setResumeText(e.target.value)} rows={15} placeholder="Paste your resume content here..."
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00e3a0]/50 focus:outline-none resize-none" />
            <button onClick={analyze} disabled={analyzing || !resumeText.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00e3a0] to-[#00b97b] text-white font-medium flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50">
              {analyzing ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</> : <><Sparkles className="w-5 h-5" /> Check ATS Score</>}
            </button>
          </div>

          <div>
            {result ? (
              <div className="space-y-4">
                {/* Score */}
                <GlassCard className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full border-4 flex items-center justify-center mb-3"
                    style={{ borderColor: result.score >= 70 ? '#00e3a0' : result.score >= 40 ? '#ffba00' : '#f90082' }}>
                    <span className="text-3xl font-bold" style={{ color: result.score >= 70 ? '#00e3a0' : result.score >= 40 ? '#ffba00' : '#f90082' }}>{result.score}%</span>
                  </div>
                  <p className="text-sm text-[#aeadae]">ATS Compatibility Score</p>
                </GlassCard>

                {/* Keywords Found */}
                <GlassCard className="!p-4">
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#00e3a0]" /> Keywords Found ({result.found.length})</h4>
                  <div className="flex flex-wrap gap-1">
                    {result.found.map(k => <span key={k} className="px-2 py-1 rounded-full text-xs bg-[#00e3a0]/10 text-[#00e3a0] border border-[#00e3a0]/20">{k}</span>)}
                  </div>
                </GlassCard>

                {/* Missing */}
                <GlassCard className="!p-4">
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-[#f90082]" /> Missing Keywords ({result.missing.length})</h4>
                  <div className="flex flex-wrap gap-1">
                    {result.missing.map(k => <span key={k} className="px-2 py-1 rounded-full text-xs bg-[#f90082]/10 text-[#f90082] border border-[#f90082]/20">{k}</span>)}
                  </div>
                </GlassCard>

                {/* Grammar/Issues */}
                {result.grammar.length > 0 && <GlassCard className="!p-4">
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-[#ffba00]" /> Issues Found</h4>
                  <ul className="space-y-1">{result.grammar.map((g, i) => <li key={i} className="text-xs text-[#ffba00]">- {g}</li>)}</ul>
                </GlassCard>}

                {/* Suggestions */}
                <GlassCard className="!p-4">
                  <h4 className="text-sm font-medium text-white mb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#00d4ff]" /> Improvements</h4>
                  <ul className="space-y-1">{result.suggestions.map((s, i) => <li key={i} className="text-xs text-[#aeadae]">- {s}</li>)}</ul>
                </GlassCard>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <FileCheck className="w-12 h-12 text-white/10 mb-4" />
                <p className="text-[#aeadae]">Paste your resume and click Check to see your ATS score.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
