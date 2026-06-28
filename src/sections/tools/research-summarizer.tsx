import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Sparkles, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { CopyButton } from '@/components/copy-button';
import { AITypewriter } from '@/components/ai-typewriter';

interface ResearchProps { onClose: () => void; addToast: (msg: string, type: 'success' | 'error' | 'info') => void; }

const summaries: Record<string, Record<string, string>> = {
  'transformer architecture': {
    short: `**Title:** Attention Is All You Need\n**Authors:** Vaswani et al. (2017)\n\n**Key Contribution:** Introduced the Transformer architecture that replaces recurrence with self-attention mechanisms, enabling parallel training and better long-range dependency modeling.\n\n**Main Results:** Achieved state-of-the-art on WMT 2014 English-to-German translation (28.4 BLEU) and English-to-French (41.8 BLEU), while training significantly faster than RNN/CNN-based models.\n\n**Impact:** Foundation for GPT, BERT, T5, and virtually all modern NLP systems.`,
    detailed: `# Research Paper Summary: "Attention Is All You Need"\n\n## Paper Information\n- **Title:** Attention Is All You Need\n- **Authors:** Ashish Vaswani, Noam Shazeer, Niki Parmar, et al.\n- **Year:** 2017\n- **Venue:** NeurIPS\n\n## Problem Statement\nPrevious sequence transduction models (RNNs, LSTMs, CNNs) were slow to train due to sequential computation. Long-range dependencies were difficult to capture.\n\n## Proposed Solution: Transformer\n1. **Self-Attention Mechanism** — Computes attention weights between all positions simultaneously\n2. **Multi-Head Attention** — Parallel attention heads capturing different representation subspaces\n3. **Positional Encoding** — Injects sequence order information without recurrence\n4. **Feed-Forward Networks** — Applied independently to each position\n\n## Architecture Components\n- Encoder: 6 identical layers (self-attention + FFN)\n- Decoder: 6 identical layers (masked self-attention + cross-attention + FFN)\n- Residual connections and layer normalization throughout\n\n## Experimental Results\n| Task | Model | Score |\n|------|-------|-------|\n| EN-DE Translation | Transformer (big) | 28.4 BLEU |\n| EN-FR Translation | Transformer (big) | 41.8 BLEU |\n| English Parsing | Transformer | 92.7 F1 |\n\n## Key Advantages\n- **Training Speed:** O(1) sequential operations vs O(n) for RNNs\n- **Scalability:** Easily parallelized across GPU clusters\n- **Long-range Dependencies:** Direct connections between any two positions\n\n## Limitations\n- O(n²) attention complexity with sequence length\n- No inherent notion of position without encoding\n- High memory requirements for long sequences\n\n## Future Impact\nThis paper became the foundation for GPT, BERT, T5, Vision Transformer (ViT), and revolutionized NLP, computer vision, and speech processing.`,
  },
};

const fallbackSummary = (title: string, format: string) => format === 'short'
  ? `**Title:** ${title}\n\n**Key Contribution:** This research presents novel approaches and significant findings in the field.\n\n**Main Results:** The authors demonstrate improvements over existing methods through rigorous experiments.\n\n**Impact:** Contributes meaningfully to the academic and practical understanding of the domain.`
  : `# Research Paper Summary: "${title}"\n\n## Overview\nThis paper addresses important challenges in ${title} through innovative methodology.\n\n## Key Findings\n1. Novel approach to core problems\n2. Significant performance improvements\n3. Robust experimental validation\n\n## Methodology\n- Comprehensive literature review\n- Rigorous experimental design\n- Statistical significance testing\n\n## Implications\n- Advances theoretical understanding\n- Provides practical applications\n- Opens avenues for future research`;

export function ResearchSummarizer({ onClose, addToast }: ResearchProps) {
  const [title, setTitle] = useState('');
  const [format, setFormat] = useState<'short' | 'detailed'>('short');
  const [generated, setGenerated] = useState('');
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true); setGenerated('');
    setTimeout(() => {
      const key = Object.keys(summaries).find(k => title.toLowerCase().includes(k));
      setGenerated(key ? summaries[key][format] : fallbackSummary(title, format));
      setGenerating(false);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3"><BookOpen className="w-5 h-5 text-[#00d4ff]" /><h2 className="text-base font-medium text-white">Research Paper Summarizer</h2></div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08]"><X className="w-5 h-5 text-white/60" /></button>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto px-5 py-8">
        <div className="flex flex-wrap gap-3 mb-6 items-end">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Paper title or topic (e.g., Transformer Architecture)" className="flex-1 min-w-[200px] bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00d4ff]/50 focus:outline-none" />
          <div className="flex gap-2">
            <button onClick={() => setFormat('short')} className={`px-4 py-2 rounded-full text-sm transition-all ${format === 'short' ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30' : 'bg-white/[0.05] border border-white/[0.1] text-white/60'}`}>Short</button>
            <button onClick={() => setFormat('detailed')} className={`px-4 py-2 rounded-full text-sm transition-all ${format === 'detailed' ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30' : 'bg-white/[0.05] border border-white/[0.1] text-white/60'}`}>Detailed</button>
          </div>
          <button onClick={generate} disabled={generating || !title} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00d4ff] to-[#0072f5] text-white font-medium flex items-center gap-2 hover:brightness-110 transition-all disabled:opacity-50">
            {generating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /></> : <><Sparkles className="w-4 h-4" /> Summarize</>}
          </button>
        </div>

        <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold text-white">Summary</h3>{generated && <div className="flex gap-2"><button onClick={generate} className="p-2 rounded-lg hover:bg-white/[0.08]"><RefreshCw className="w-4 h-4 text-white/60" /></button><CopyButton text={generated} onCopy={() => addToast('Copied!', 'success')} /></div>}</div>
        <GlassCard className="min-h-[400px]">
          {generating && <div className="space-y-3 py-4">{[...Array(8)].map((_, i) => <div key={i} className="h-3 rounded bg-white/[0.05] animate-shimmer" style={{ width: `${50 + Math.random() * 50}%` }} />)}</div>}
          {generated && !generating && <div className="text-sm text-white/90 whitespace-pre-line leading-relaxed"><AITypewriter text={generated} speed={8} trigger={true} /></div>}
          {!generated && !generating && <div className="flex flex-col items-center justify-center h-[400px]"><BookOpen className="w-12 h-12 text-white/10 mb-4" /><p className="text-[#aeadae]">Enter a paper title to generate a summary.</p></div>}
        </GlassCard>
      </div>
    </motion.div>
  );
}
