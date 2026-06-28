import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Presentation, Sparkles, RefreshCw, Download } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { CopyButton } from '@/components/copy-button';
import { AITypewriter } from '@/components/ai-typewriter';

interface PPTGeneratorProps {
  onClose: () => void;
  addToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

const sampleSlides: Record<string, string> = {
  'Blockchain Technology in Supply Chain': `SLIDE 1 — TITLE
Blockchain Technology in Supply Chain Management
Subtitle: Revolutionizing Transparency and Traceability
Presenter Name | Date

SLIDE 2 — INTRODUCTION
The global supply chain faces critical challenges:
- Lack of transparency across multiple stakeholders
- Counterfeit products and fraud costing billions
- Inefficient paper-based documentation
- Difficulty in tracking product provenance
Blockchain offers a decentralized, immutable solution.

SLIDE 3 — OBJECTIVES
- Implement end-to-end product traceability
- Reduce documentation overhead by 60%
- Enable real-time visibility for all stakeholders
- Build trust through transparent, verifiable records
- Create a tamper-proof audit trail

SLIDE 4 — METHODOLOGY
Architecture: Ethereum-based permissioned blockchain
Key Components:
- Smart Contracts for automated compliance
- IoT integration for real-time data capture
- IPFS for distributed document storage
- RESTful APIs for enterprise integration
Development: Agile methodology with 3 sprints

SLIDE 5 — RESULTS
- 45% reduction in documentation processing time
- 99.9% data integrity across supply chain nodes
- Real-time tracking achieved within 2-second latency
- 30% cost savings in compliance auditing
- Zero counterfeit incidents post-implementation

SLIDE 6 — CONCLUSION
Blockchain transforms supply chains from opaque networks into transparent, trustless systems. The future of global trade is decentralized, automated, and verifiable.`,
  'Artificial Intelligence in Healthcare': `SLIDE 1 — TITLE
Artificial Intelligence in Healthcare
Subtitle: Transforming Patient Care Through Innovation
Presenter Name | Date

SLIDE 2 — INTRODUCTION
Healthcare generates 30% of world's data volume.
AI addresses critical gaps:
- Diagnostic accuracy and speed
- Personalized treatment plans
- Resource allocation optimization
- Early disease detection
The convergence of big data and AI is reshaping medicine.

SLIDE 3 — OBJECTIVES
- Develop ML models for disease prediction
- Create intelligent diagnostic assistance
- Automate medical image analysis
- Improve patient outcome predictions
- Reduce healthcare operational costs

SLIDE 4 — METHODOLOGY
Technical Stack:
- Deep Learning: CNN for medical imaging
- NLP: Clinical notes processing and extraction
- Predictive Models: Random Forest, XGBoost
- Data: 100K+ anonymized patient records
- Validation: 5-fold cross-validation approach

SLIDE 5 — RESULTS
- 94.2% accuracy in disease classification
- 60% faster diagnosis for radiology scans
- 25% improvement in treatment recommendation
- 40% reduction in false positive rates
- Successfully deployed in 3 pilot hospitals

SLIDE 6 — CONCLUSION
AI is not replacing doctors — it's augmenting their capabilities. The future of healthcare is intelligent, personalized, and accessible to all.`,
};

export function PPTGenerator({ onClose, addToast }: PPTGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [slides, setSlides] = useState(6);
  const [audience, setAudience] = useState('professors');
  const [generated, setGenerated] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated('');
    setTimeout(() => {
      const match = Object.keys(sampleSlides).find(k => topic.toLowerCase().includes(k.toLowerCase()));
      setGenerated(match ? sampleSlides[match] : sampleSlides['Blockchain Technology in Supply Chain']);
      setGenerating(false);
    }, 2000);
  };

  const handleExport = () => {
    const blob = new Blob([generated], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `presentation-${topic.replace(/\s+/g, '-').toLowerCase() || 'slides'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Presentation exported!', 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto"
    >
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Presentation className="w-5 h-5 text-[#a6f800]" />
            <h2 className="text-base font-medium text-white">PPT Content Generator</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08] transition-colors">
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-5 py-8">
        {/* Input Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <label className="text-sm text-white/60 mb-1 block">Topic</label>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Blockchain in Supply Chain"
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#a6f800]/50 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-white/60 mb-1 block">Number of Slides</label>
            <input
              type="number"
              min={3}
              max={20}
              value={slides}
              onChange={(e) => setSlides(Number(e.target.value))}
              className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white focus:border-[#a6f800]/50 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 items-center">
          <span className="text-sm text-white/60">Target Audience:</span>
          {['professors', 'students', 'industry', 'general'].map(a => (
            <button
              key={a}
              onClick={() => setAudience(a)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                audience === a
                  ? 'bg-gradient-to-r from-[#a6f800] to-[#f90082] text-white'
                  : 'bg-white/[0.05] border border-white/[0.1] text-white/60 hover:border-white/[0.2]'
              }`}
            >
              {a.charAt(0).toUpperCase() + a.slice(1)}
            </button>
          ))}
          <button
            onClick={handleGenerate}
            disabled={generating || !topic}
            className="ml-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#a6f800] to-[#f90082] text-white text-sm font-medium flex items-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
          >
            {generating ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
            ) : (
              <><Sparkles className="w-4 h-4" /> Generate Slides</>
            )}
          </button>
        </div>

        {/* Output Panel */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Generated Slides</h3>
          {generated && (
            <div className="flex items-center gap-2">
              <button onClick={handleExport} className="p-2 rounded-lg hover:bg-white/[0.08] transition-colors" title="Export">
                <Download className="w-4 h-4 text-white/60" />
              </button>
              <button onClick={handleGenerate} className="p-2 rounded-lg hover:bg-white/[0.08] transition-colors" title="Regenerate">
                <RefreshCw className="w-4 h-4 text-white/60" />
              </button>
              <CopyButton text={generated} onCopy={() => addToast('Copied to clipboard!', 'success')} />
            </div>
          )}
        </div>

        <GlassCard className="min-h-[400px]">
          {!generated && !generating && (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <Presentation className="w-12 h-12 text-white/10 mb-4" />
              <p className="text-[#aeadae]">Enter a topic and click Generate to create your presentation slides.</p>
            </div>
          )}

          {generating && (
            <div className="space-y-3 py-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-3 rounded bg-white/[0.05] animate-shimmer" style={{ width: `${60 + Math.random() * 40}%` }} />
              ))}
            </div>
          )}

          {generated && !generating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white/90 leading-relaxed text-sm whitespace-pre-line"
            >
              <AITypewriter text={generated} speed={8} trigger={true} />
            </motion.div>
          )}
        </GlassCard>
      </div>
    </motion.div>
  );
}
