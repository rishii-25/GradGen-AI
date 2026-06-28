import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, FlaskConical, Sparkles, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { CopyButton } from '@/components/copy-button';
import { AITypewriter } from '@/components/ai-typewriter';

interface AbstractGeneratorProps {
  onClose: () => void;
  addToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

const domains = [
  'AI/ML', 'Web Development', 'Mobile Apps', 'Data Science',
  'Cybersecurity', 'Cloud Computing', 'IoT', 'Blockchain', 'Robotics', 'Other'
];

export function AbstractGenerator({ onClose, addToast }: AbstractGeneratorProps) {
  const [title, setTitle] = useState('');
  const [technologies, setTechnologies] = useState('');
  const [objective, setObjective] = useState('');
  const [features, setFeatures] = useState('');
  const [domain, setDomain] = useState('AI/ML');
  const [generated, setGenerated] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated('');
    setTimeout(() => {
      const abstract = `This project presents ${title || 'a novel system'} developed using ${technologies || 'modern technologies'}. The primary objective is ${objective || 'to address a significant challenge in the field'}. The system incorporates ${features || 'several innovative features'} that collectively enhance performance and user experience. Implemented within the domain of ${domain}, this work leverages cutting-edge methodologies and tools to deliver a robust solution. Experimental results demonstrate the effectiveness of the proposed approach, showing significant improvements over existing methods. This project contributes to the growing body of research in ${domain} and provides a scalable framework for future development.`;
      setGenerated(abstract);
      setGenerating(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto"
    >
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[700px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FlaskConical className="w-5 h-5 text-[#00e3a0]" />
            <h2 className="text-base font-medium text-white">Project Abstract Generator</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08] transition-colors">
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </div>

      <div className="max-w-[700px] mx-auto px-5 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white">Project Details</h3>

            <div>
              <label className="text-sm text-white/60 mb-1 block">Project Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Smart Traffic Management System"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00e3a0]/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1 block">Technologies Used</label>
              <input
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="e.g., IoT, Machine Learning, Python"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00e3a0]/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1 block">Objective</label>
              <textarea
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                placeholder="What problem does this project solve?"
                rows={3}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00e3a0]/50 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1 block">Key Features</label>
              <textarea
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                placeholder="List the main features..."
                rows={3}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00e3a0]/50 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-2 block">Project Domain</label>
              <div className="flex flex-wrap gap-2">
                {domains.map(d => (
                  <button
                    key={d}
                    onClick={() => setDomain(d)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                      domain === d
                        ? 'bg-gradient-to-r from-[#00e3a0] to-[#00b97b] text-white'
                        : 'bg-white/[0.05] border border-white/[0.1] text-white/60 hover:border-white/[0.2]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00e3a0] to-[#00b97b] text-white font-medium flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
            >
              {generating ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Generate Abstract</>
              )}
            </button>
          </div>

          {/* Output Panel */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Generated Abstract</h3>
              {generated && (
                <div className="flex items-center gap-2">
                  <button onClick={handleGenerate} className="p-2 rounded-lg hover:bg-white/[0.08] transition-colors" title="Regenerate">
                    <RefreshCw className="w-4 h-4 text-white/60" />
                  </button>
                  <CopyButton text={generated} onCopy={() => addToast('Copied to clipboard!', 'success')} />
                </div>
              )}
            </div>

            <GlassCard className="min-h-[300px]">
              {!generated && !generating && (
                <div className="flex flex-col items-center justify-center h-[300px] text-center">
                  <FlaskConical className="w-12 h-12 text-white/10 mb-4" />
                  <p className="text-[#aeadae]">Fill in your project details and click Generate.</p>
                </div>
              )}

              {generating && (
                <div className="space-y-3 py-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-3 rounded bg-white/[0.05] animate-shimmer" style={{ width: `${80 + Math.random() * 20}%` }} />
                  ))}
                </div>
              )}

              {generated && !generating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-white/90 leading-relaxed text-sm"
                >
                  <AITypewriter text={generated} speed={12} trigger={true} />
                </motion.div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
