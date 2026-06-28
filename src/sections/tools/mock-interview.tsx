import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Play, SkipForward, Lightbulb } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';

interface MockProps { onClose: () => void; addToast?: (msg: string, type: 'success' | 'error' | 'info') => void; }

interface QnA { q: string; hint: string; model: string; }

const questionBank: Record<string, QnA[]> = {
  'software engineer': [
    { q: 'Explain the difference between REST and GraphQL. When would you choose one over the other?', hint: 'Consider data fetching efficiency, type safety, and client flexibility.', model: 'REST uses multiple endpoints with fixed data structures, while GraphQL uses a single endpoint allowing clients to request exactly what they need. Choose GraphQL for complex, nested data relationships and when frontend teams need flexibility. Choose REST for simple CRUD operations and when caching is critical.' },
    { q: 'What are the SOLID principles? Give an example of how you have applied one.', hint: 'S-Single Responsibility, O-Open/Closed, L-Liskov Substitution, I-Interface Segregation, D-Dependency Inversion.', model: 'SOLID principles guide maintainable OOP design. For example, I applied Single Responsibility by separating a monolithic UserService into AuthService, ProfileService, and NotificationService, making each class handle one concern.' },
    { q: 'Explain how garbage collection works in JavaScript/V8 engine.', hint: 'Talk about mark-and-sweep, generational collection, and memory leaks.', model: 'V8 uses generational garbage collection. The heap is divided into New Space (for short-lived objects, collected via Scavenge) and Old Space (for long-lived objects, collected via Mark-Sweep-Compact). Memory leaks occur with forgotten event listeners, global variables, and closure references.' },
    { q: 'Design a URL shortening service like bit.ly.', hint: 'Consider database choice, hashing strategy, scaling, and analytics.', model: 'Use base62 encoding of auto-incrementing IDs for short URLs. Store mappings in a distributed key-value store like Redis with persistent backup in PostgreSQL. Use consistent hashing for horizontal scaling. Add analytics with a separate write-optimized database.' },
  ],
  'data science': [
    { q: 'Explain bias-variance tradeoff. How do you handle it?', hint: 'High bias = underfitting, High variance = overfitting. Discuss regularization, ensemble methods.', model: 'Bias is error from overly simple assumptions; variance is error from sensitivity to training data noise. High bias causes underfitting; high variance causes overfitting. I handle it using cross-validation, regularization (L1/L2), ensemble methods (Random Forest, XGBoost), and early stopping.' },
    { q: 'What is the difference between L1 and L2 regularization?', hint: 'L1 = Lasso (sparse solutions), L2 = Ridge (weight decay).', model: 'L1 regularization adds the absolute value of weights, promoting sparsity (feature selection). L2 adds squared weights, shrinking all weights uniformly without eliminating features. L1 is useful for high-dimensional data; L2 provides more stable solutions.' },
    { q: 'Explain how a Random Forest works.', hint: 'Bootstrap aggregating (bagging), multiple decision trees, feature randomness.', model: 'Random Forest builds multiple decision trees on bootstrapped samples of data (bagging). Each tree also uses a random subset of features at each split. Predictions are aggregated via voting (classification) or averaging (regression). This reduces overfitting while maintaining low bias.' },
  ],
  'general': [
    { q: 'Tell me about yourself.', hint: 'Keep it professional. Start with education, then skills, then achievements.', model: 'Structure: "I am a [year] student at [university] studying [field]. I specialize in [skills] and have experience through [projects/internships]. I am passionate about [specific area] and looking for opportunities to [goal]."' },
    { q: 'What is your greatest strength and weakness?', hint: 'Be honest but strategic. Show self-awareness.', model: 'Strength: "My analytical thinking — I break complex problems into manageable parts." Weakness: "I sometimes over-optimize solutions. I am working on balancing perfectionism with deadlines by setting time-boxes for each task phase."' },
    { q: 'Why should we hire you?', hint: 'Connect your skills to their needs. Be specific.', model: 'Highlight 2-3 skills that match the job description, mention a specific achievement with metrics, and express genuine enthusiasm for the company. Example: "My experience with React and your tech stack overlap perfectly. At my last internship, I improved page load times by 40%. I am excited about your mission to democratize education."' },
  ],
};

export function MockInterview({ onClose }: MockProps) {
  const [role, setRole] = useState('software engineer');
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [questions, setQuestions] = useState<QnA[]>([]);

  const start = () => {
    const pool = questionBank[role] || questionBank['general'];
    setQuestions([...pool].sort(() => Math.random() - 0.5));
    setStarted(true);
    setCurrent(0);
    setShowAnswer(false);
  };

  const next = () => { setCurrent(c => Math.min(c + 1, questions.length - 1)); setShowAnswer(false); };
  const q = questions[current];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[700px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3"><Mic className="w-5 h-5 text-[#ff4dff]" /><h2 className="text-base font-medium text-white">AI Mock Interview</h2></div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08]"><X className="w-5 h-5 text-white/60" /></button>
        </div>
      </div>
      <div className="max-w-[700px] mx-auto px-5 py-8">
        {!started ? (
          <div className="text-center py-20">
            <Mic className="w-16 h-16 text-[#ff4dff]/20 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Practice Interview</h3>
            <p className="text-[#aeadae] mb-6">Select a role and practice with AI-generated interview questions.</p>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {Object.keys(questionBank).map(r => (
                <button key={r} onClick={() => setRole(r)} className={`px-4 py-2 rounded-full text-sm transition-all ${role === r ? 'bg-gradient-to-r from-[#ff4dff] to-[#f90082] text-white' : 'bg-white/[0.05] border border-white/[0.1] text-white/60'}`}>{r.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</button>
              ))}
            </div>
            <button onClick={start} className="px-8 py-3 rounded-full bg-gradient-to-r from-[#ff4dff] to-[#f90082] text-white font-medium flex items-center gap-2 mx-auto hover:brightness-110 transition-all">
              <Play className="w-5 h-5" /> Start Interview
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/40">Question {current + 1} of {questions.length}</span>
              <div className="flex-1 mx-4 h-1 bg-white/[0.1] rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-[#ff4dff] to-[#f90082]" initial={{ width: 0 }} animate={{ width: `${((current + 1) / questions.length) * 100}%` }} />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <GlassCard>
                  <h3 className="text-lg font-medium text-white mb-4">{q.q}</h3>
                  <button onClick={() => setShowAnswer(!showAnswer)} className="flex items-center gap-2 text-sm text-[#ffba00] hover:text-[#ffba00]/80 transition-colors mb-3">
                    <Lightbulb className="w-4 h-4" /> {showAnswer ? 'Hide Hint' : 'Show Hint'}
                  </button>
                  {showAnswer && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3">
                      <div className="p-3 rounded-xl bg-[#ffba00]/5 border border-[#ffba00]/10">
                        <p className="text-xs text-[#ffba00] font-medium mb-1">HINT</p>
                        <p className="text-sm text-white/70">{q.hint}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#00e3a0]/5 border border-[#00e3a0]/10">
                        <p className="text-xs text-[#00e3a0] font-medium mb-1">MODEL ANSWER</p>
                        <p className="text-sm text-white/70">{q.model}</p>
                      </div>
                    </motion.div>
                  )}
                </GlassCard>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between">
              <button onClick={() => setStarted(false)} className="text-sm text-white/40 hover:text-white transition-colors">End Interview</button>
              <button onClick={next} disabled={current >= questions.length - 1} className="btn-primary flex items-center gap-1 disabled:opacity-30">
                Next <SkipForward className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
