import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Map, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { CopyButton } from '@/components/copy-button';
import { AITypewriter } from '@/components/ai-typewriter';

interface CareerProps { onClose: () => void; addToast: (msg: string, type: 'success' | 'error' | 'info') => void; }

const roadmaps: Record<string, string> = {
  'software engineer': `## Software Engineer Career Roadmap

### Phase 1: Foundation (0-1 Year)
**Goal:** Land first job/internship
- **Learn:** Python/JavaScript, Git, HTML/CSS, SQL
- **Build:** 3 portfolio projects (web app, API, CLI tool)
- **Certify:** FreeCodeCamp Responsive Web Design
- **Apply:** 100+ applications, target startups

### Phase 2: Growth (1-3 Years)
**Goal:** Become mid-level engineer
- **Learn:** System design basics, cloud (AWS/GCP), testing
- **Build:** Open source contributions, side projects
- **Lead:** Mentor juniors, code reviews
- **Target:** $80K-$120K salary range

### Phase 3: Senior (3-5 Years)
**Goal:** Senior/Staff engineer
- **Master:** Architecture patterns, microservices, scaling
- **Specialize:** Backend, Frontend, ML, or DevOps
- **Lead:** Tech lead for features/teams
- **Target:** $150K-$250K+ salary range

### Phase 4: Expert (5+ Years)
**Goal:** Principal/Architect/Manager
- **Paths:** Individual Contributor (Staff/Principal) or Engineering Manager
- **Impact:** Company-wide technical decisions
- **Target:** $300K-$500K+ total compensation`,
  'data scientist': `## Data Scientist Career Roadmap

### Phase 1: Foundation (0-1 Year)
- **Learn:** Python, Pandas, NumPy, Matplotlib, Statistics
- **Math:** Linear Algebra, Calculus, Probability
- **Projects:** 3 Kaggle competitions, data analysis portfolio
- **Certify:** IBM Data Science Professional Certificate

### Phase 2: Growth (1-3 Years)
- **Learn:** Scikit-learn, SQL advanced, Feature engineering
- **ML:** Classification, Regression, Clustering, NLP basics
- **Deploy:** Flask/FastAPI models, Docker containers
- **Target:** Junior Data Scientist role

### Phase 3: Senior (3-5 Years)
- **Master:** Deep Learning, Transformers, MLOps
- **Tools:** TensorFlow/PyTorch, MLflow, Kubeflow
- **Impact:** Production ML systems, A/B testing
- **Target:** Senior Data Scientist / ML Engineer

### Phase 4: Expert (5+ Years)
- **Paths:** Principal DS, ML Architect, Chief Data Officer
- **Research:** Papers, conferences, patents
- **Compensation:** $200K-$500K+`,
  'web developer': `## Web Developer Career Roadmap

### Phase 1: Foundation (0-6 Months)
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Framework:** React or Vue
- **Tools:** Git, npm, VS Code, Chrome DevTools
- **Projects:** Portfolio site, Todo app, Weather app

### Phase 2: Full Stack (6 Months - 2 Years)
- **Backend:** Node.js/Express or Python/Django
- **Database:** MongoDB, PostgreSQL, Redis
- **Deploy:** Vercel, Netlify, AWS basics
- **Advanced:** TypeScript, Next.js, Tailwind CSS

### Phase 3: Senior (2-4 Years)
- **Architecture:** Micro-frontends, Design Systems
- **Performance:** Web vitals, Lighthouse optimization
- **Lead:** Technical decisions, mentoring
- **Specialize:** Frontend Architect or Full Stack Lead

### Phase 4: Expert (4+ Years)
- **Staff/Principal:** Engineering-wide frontend strategy
- **Consulting:** Freelance or agency ownership
- **Compensation:** $150K-$400K+`,
};

const fallbackRoadmap = (field: string) => `## ${field} Career Roadmap

### Phase 1: Foundation (0-1 Year)
- Learn core fundamentals and tools
- Build 2-3 practical projects
- Get certified in foundational skills
- Network with professionals in the field

### Phase 2: Growth (1-3 Years)
- Deepen technical expertise
- Take on increasingly complex projects
- Start mentoring juniors
- Contribute to open source or community

### Phase 3: Senior (3-5 Years)
- Lead projects and technical decisions
- Specialize in a niche area
- Develop soft skills (communication, leadership)
- Build a personal brand (blog, talks)

### Phase 4: Expert (5+ Years)
- Industry thought leader or executive
- Shape organizational strategy
- High compensation and impact
- Consider entrepreneurship or consulting`;

export function CareerRoadmap({ onClose, addToast }: CareerProps) {
  const [field, setField] = useState('');
  const [years, setYears] = useState('1-3');
  const [generated, setGenerated] = useState('');
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true); setGenerated('');
    setTimeout(() => {
      const key = Object.keys(roadmaps).find(k => field.toLowerCase().includes(k));
      setGenerated(key ? roadmaps[key] : fallbackRoadmap(field || 'Your Field'));
      setGenerating(false);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3"><Map className="w-5 h-5 text-[#00d4ff]" /><h2 className="text-base font-medium text-white">Career Roadmap Generator</h2></div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08]"><X className="w-5 h-5 text-white/60" /></button>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto px-5 py-8">
        <div className="flex flex-wrap gap-3 mb-6">
          <input value={field} onChange={e => setField(e.target.value)} placeholder="Career field (e.g., Software Engineer)" className="flex-1 min-w-[200px] bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00d4ff]/50 focus:outline-none" />
          <select value={years} onChange={e => setYears(e.target.value)} className="bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white focus:border-[#00d4ff]/50 focus:outline-none">
            <option value="0-1">0-1 years</option><option value="1-3">1-3 years</option><option value="3-5">3-5 years</option><option value="5+">5+ years</option>
          </select>
          <button onClick={generate} disabled={generating || !field} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#0072f5] text-white font-medium flex items-center gap-2 hover:brightness-110 transition-all disabled:opacity-50">
            {generating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /></> : <><Sparkles className="w-4 h-4" /> Generate</>}
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Your Career Roadmap</h3>
          {generated && <CopyButton text={generated} onCopy={() => addToast('Copied!', 'success')} />}
        </div>

        <GlassCard className="min-h-[400px]">
          {generating && <div className="space-y-3 py-4">{[...Array(10)].map((_, i) => <div key={i} className="h-3 rounded bg-white/[0.05] animate-shimmer" style={{ width: `${50 + Math.random() * 50}%` }} />)}</div>}
          {generated && !generating && <div className="text-sm text-white/90 whitespace-pre-line leading-relaxed"><AITypewriter text={generated} speed={8} trigger={true} /></div>}
          {!generated && !generating && <div className="flex flex-col items-center justify-center h-[400px]"><Map className="w-12 h-12 text-white/10 mb-4" /><p className="text-[#aeadae]">Enter a career field to generate your roadmap.</p></div>}
        </GlassCard>
      </div>
    </motion.div>
  );
}
