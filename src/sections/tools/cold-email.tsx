import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Sparkles, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { CopyButton } from '@/components/copy-button';
import { AITypewriter } from '@/components/ai-typewriter';

interface ColdEmailProps { onClose: () => void; addToast: (msg: string, type: 'success' | 'error' | 'info') => void; }

const templates: Record<string, (name: string, company: string, role: string, skills: string) => string> = {
  professor: (name, company, role, skills) => `Subject: Research Internship Inquiry - ${role} Position\n\nDear Professor ${company},\n\nI hope this email finds you well. My name is ${name || '[Your Name]'}, and I am currently pursuing my degree in ${role || '[Your Field]'} at [University Name].\n\nI have been following your research work in [Research Area], and I am deeply impressed by your contributions to the field, particularly your paper on [Topic]. Your approach to [specific methodology] aligns closely with my own academic interests.\n\nI am writing to inquire about any research internship opportunities in your lab for [Semester/Time Period]. I have experience with ${skills || '[relevant skills]'}, and I am eager to contribute to ongoing projects while learning from your expertise.\n\nI have attached my resume and transcript for your review. I would be grateful for the opportunity to discuss potential openings at your convenience.\n\nThank you for your time and consideration.\n\nBest regards,\n${name || '[Your Name]'}\n[Phone] | [Email]`,
  hr: (name, company, role, skills) => `Subject: Application for ${role || 'Internship'} Position - ${name || '[Your Name]'}\n\nDear Hiring Manager,\n\nI am writing to express my keen interest in the ${role || '[Position]'} role at ${company || '[Company Name]'} that I discovered on [Platform/Source].\n\nAs a motivated student with expertise in ${skills || '[relevant skills]'}, I am confident that my technical background and passion for innovation make me a strong candidate. During my academic journey, I have [specific achievement/project] which honed my abilities in [relevant area].\n\nI am particularly drawn to ${company || '[Company Name]'} because of [specific reason about company culture, product, or mission]. I would welcome the chance to contribute my skills while growing alongside your talented team.\n\nI have attached my resume and portfolio for your review. I would love the opportunity to discuss how I can add value to your team.\n\nThank you for considering my application.\n\nBest regards,\n${name || '[Your Name]'}\n[Phone] | [Email] | [LinkedIn]`,
  recruiter: (name, company, role, skills) => `Subject: Seeking ${role || 'Opportunities'} - ${name || '[Your Name]'} | [University]\n\nHi ${company || '[Recruiter Name]'},\n\nI came across your profile on LinkedIn and noticed you recruit for [Industry/Domain] roles. I wanted to introduce myself - I am ${name || '[Your Name]'}, a [Year] student at [University] studying ${role || '[Field]'}.\n\nI specialize in ${skills || '[key skills]'} and have hands-on experience through [internships/projects]. I am actively seeking ${role ? role + ' roles' : 'internship opportunities'} and would love to learn about any openings that match my profile.\n\nWould you be open to a brief 10-minute call or email exchange? I would greatly appreciate any guidance or referrals you could offer.\n\nThank you for your time!\n\nBest,\n${name || '[Your Name]'}\n[Phone] | [Email] | [LinkedIn]`,
};

export function ColdEmailGenerator({ onClose, addToast }: ColdEmailProps) {
  const [recipient, setRecipient] = useState('professor');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');
  const [generated, setGenerated] = useState('');
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true); setGenerated('');
    setTimeout(() => { setGenerated(templates[recipient](name, company, role, skills)); setGenerating(false); }, 1200);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3"><Send className="w-5 h-5 text-[#0072f5]" /><h2 className="text-base font-medium text-white">Cold Email Generator</h2></div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08]"><X className="w-5 h-5 text-white/60" /></button>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto px-5 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Email Details</h3>
            <div className="flex flex-wrap gap-2">
              {[{ id: 'professor', label: 'Professor' }, { id: 'hr', label: 'HR Manager' }, { id: 'recruiter', label: 'Recruiter' }].map(r => (
                <button key={r.id} onClick={() => setRecipient(r.id)} className={`px-4 py-2 rounded-full text-sm transition-all ${recipient === r.id ? 'bg-gradient-to-r from-[#0072f5] to-[#1e9de7] text-white' : 'bg-white/[0.05] border border-white/[0.1] text-white/60'}`}>{r.label}</button>
              ))}
            </div>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#0072f5]/50 focus:outline-none" />
            <input value={company} onChange={e => setCompany(e.target.value)} placeholder={recipient === 'professor' ? "Professor's Name" : recipient === 'recruiter' ? "Recruiter's Name" : "Company Name"} className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#0072f5]/50 focus:outline-none" />
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="Target Role / Your Field" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#0072f5]/50 focus:outline-none" />
            <input value={skills} onChange={e => setSkills(e.target.value)} placeholder="Key Skills" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#0072f5]/50 focus:outline-none" />
            <button onClick={generate} disabled={generating} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#0072f5] to-[#1e9de7] text-white font-medium flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50">
              {generating ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</> : <><Sparkles className="w-5 h-5" /> Generate Email</>}
            </button>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold text-white">Generated Email</h3>{generated && <div className="flex gap-2"><button onClick={generate} className="p-2 rounded-lg hover:bg-white/[0.08]"><RefreshCw className="w-4 h-4 text-white/60" /></button><CopyButton text={generated} onCopy={() => addToast('Copied!', 'success')} /></div>}</div>
            <GlassCard className="min-h-[400px]">
              {generating && <div className="space-y-3 py-4">{[...Array(8)].map((_, i) => <div key={i} className="h-3 rounded bg-white/[0.05] animate-shimmer" style={{ width: `${60 + Math.random() * 40}%` }} />)}</div>}
              {generated && !generating && <div className="text-sm text-white/90 whitespace-pre-line leading-relaxed"><AITypewriter text={generated} speed={10} trigger={true} /></div>}
              {!generated && !generating && <div className="flex flex-col items-center justify-center h-[400px]"><Send className="w-12 h-12 text-white/10 mb-4" /><p className="text-[#aeadae]">Fill details and generate your cold email.</p></div>}
            </GlassCard>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
