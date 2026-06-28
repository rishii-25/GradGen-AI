import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Sparkles, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { CopyButton } from '@/components/copy-button';
import { AITypewriter } from '@/components/ai-typewriter';

interface CoverLetterProps {
  onClose: () => void;
  addToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

const sampleLetters: Record<string, string> = {
  internship: `Dear Hiring Manager,

I am writing to express my enthusiastic interest in the internship position at [Company Name]. As a [Year] student majoring in [Field] at [University], I have developed a strong foundation in [relevant skills] that I am eager to apply in a professional setting.

During my academic journey, I have worked on several projects including [Project Name], where I [achievement with numbers]. This experience taught me the importance of [skill] and strengthened my ability to [relevant capability].

I am particularly drawn to [Company Name] because of your commitment to [something about the company]. I am confident that my background in [skills] and my passion for [field] make me a strong candidate for this role.

I would welcome the opportunity to discuss how I can contribute to your team. Thank you for considering my application.

Sincerely,
[Your Name]`,
  job: `Dear Hiring Manager,

I am excited to apply for the [Position] role at [Company Name]. With [X] years of experience in [field] and a proven track record of [achievement], I am confident in my ability to make a meaningful contribution to your team.

In my previous role at [Previous Company], I successfully [achievement with metrics]. I specialize in [key skills] and have consistently delivered results that exceeded expectations. My experience with [technology/methodology] aligns well with the requirements outlined in your job description.

What excites me most about [Company Name] is [specific reason]. I am eager to bring my expertise in [skills] to help drive [company goal].

I look forward to the opportunity to discuss how my background and skills align with your needs.

Best regards,
[Your Name]`,
};

export function CoverLetterGenerator({ onClose, addToast }: CoverLetterProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [type, setType] = useState('internship');
  const [generated, setGenerated] = useState('');
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true);
    setGenerated('');
    setTimeout(() => {
      let letter = sampleLetters[type];
      letter = letter.replace(/\[Your Name\]/g, name || '[Your Name]');
      letter = letter.replace(/\[Company Name\]/g, company || '[Company Name]');
      letter = letter.replace(/\[Position\]/g, role || '[Position]');
      letter = letter.replace(/\[Field\]/g, role || '[Field]');
      letter = letter.replace(/\[skills\]/g, skills || '[skills]');
      letter = letter.replace(/\[relevant skills\]/g, skills || '[relevant skills]');
      letter = letter.replace(/\[achievement with numbers\]/g, experience || '[achievement]');
      setGenerated(letter);
      setGenerating(false);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-[#ff4dff]" /><h2 className="text-base font-medium text-white">Cover Letter Generator</h2></div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08]"><X className="w-5 h-5 text-white/60" /></button>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-5 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Your Details</h3>
            <div className="flex gap-2 mb-2">
              {['internship', 'job'].map(t => (
                <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-full text-sm transition-all ${type === t ? 'bg-gradient-to-r from-[#ff4dff] to-[#f90082] text-white' : 'bg-white/[0.05] border border-white/[0.1] text-white/60'}`}>
                  {t === 'internship' ? 'Internship' : 'Full-time Job'}
                </button>
              ))}
            </div>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#ff4dff]/50 focus:outline-none" />
            <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Company Name" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#ff4dff]/50 focus:outline-none" />
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="Role/Position" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#ff4dff]/50 focus:outline-none" />
            <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="Key Skills (comma separated)" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#ff4dff]/50 focus:outline-none" />
            <textarea value={experience} onChange={e => setExperience(e.target.value)} rows={3} placeholder="Brief experience highlights..." className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#ff4dff]/50 focus:outline-none resize-none" />
            <button onClick={generate} disabled={generating} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff4dff] to-[#f90082] text-white font-medium flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50">
              {generating ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</> : <><Sparkles className="w-5 h-5" /> Generate Letter</>}
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold text-white">Your Cover Letter</h3>{generated && <div className="flex gap-2"><button onClick={generate} className="p-2 rounded-lg hover:bg-white/[0.08]"><RefreshCw className="w-4 h-4 text-white/60" /></button><CopyButton text={generated} onCopy={() => addToast('Copied!', 'success')} /></div>}</div>
            <GlassCard className="min-h-[400px]">
              {generating && <div className="space-y-3 py-4">{[...Array(8)].map((_, i) => <div key={i} className="h-3 rounded bg-white/[0.05] animate-shimmer" style={{ width: `${60 + Math.random() * 40}%` }} />)}</div>}
              {generated && !generating && <div className="text-sm text-white/90 whitespace-pre-line leading-relaxed"><AITypewriter text={generated} speed={10} trigger={true} /></div>}
              {!generated && !generating && <div className="flex flex-col items-center justify-center h-[400px]"><Mail className="w-12 h-12 text-white/10 mb-4" /><p className="text-[#aeadae]">Fill details and generate your cover letter.</p></div>}
            </GlassCard>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
