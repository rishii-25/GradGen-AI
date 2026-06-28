import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Linkedin, Sparkles, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { CopyButton } from '@/components/copy-button';
import { AITypewriter } from '@/components/ai-typewriter';

interface LinkedInGeneratorProps {
  onClose: () => void;
  addToast: (msg: string, type: 'success' | 'error' | 'info') => void;
}

const tones = ['Professional', 'Confident', 'Creative', 'Technical'];

const sampleBios: Record<string, string> = {
  Professional: 'I am a dedicated Computer Science student with a strong foundation in software development and data structures. Currently pursuing my Bachelor\'s degree with a focus on building scalable web applications. Experienced in collaborative team environments through multiple hackathons and internship programs. Passionate about leveraging technology to create meaningful solutions. Open to connecting with professionals in the tech industry.',
  Confident: 'I don\'t just write code — I architect solutions. As a Computer Science student, I\'ve built applications that serve real users, led teams that shipped products, and solved problems others said were impossible. My expertise spans full-stack development, machine learning, and system design. I thrive in high-pressure environments where the only option is excellence. Let\'s build something extraordinary together.',
  Creative: 'Turning caffeine into code and ideas into reality. I\'m a Computer Science student who sees programming as an art form — every line of code is a brushstroke on the canvas of innovation. From building interactive web experiences to training neural networks that recognize patterns humans miss, I live at the intersection of creativity and logic. When I\'m not debugging, you\'ll find me exploring new technologies or mentoring aspiring developers.',
  Technical: 'Computer Science student specializing in distributed systems and machine learning. Proficient in Python, Java, C++, JavaScript/TypeScript, Go, and Rust. Framework expertise includes React, Node.js, Django, FastAPI, TensorFlow, and PyTorch. Strong background in algorithms, data structures, system design, and cloud architecture (AWS/GCP). Experienced with Docker, Kubernetes, CI/CD pipelines, and microservices. Currently researching transformer architectures and their applications in natural language processing.',
};

export function LinkedInGenerator({ onClose, addToast }: LinkedInGeneratorProps) {
  const [profession, setProfession] = useState('');
  const [years, setYears] = useState('');
  const [skills, setSkills] = useState('');
  const [achievements, setAchievements] = useState('');
  const [selectedTone, setSelectedTone] = useState('Professional');
  const [generated, setGenerated] = useState('');
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setGenerated('');
    setTimeout(() => {
      const bio = sampleBios[selectedTone];
      setGenerated(bio);
      setGenerating(false);
    }, 1500);
  };

  const handleRegenerate = () => {
    setGenerated('');
    handleGenerate();
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
            <Linkedin className="w-5 h-5 text-[#693def]" />
            <h2 className="text-base font-medium text-white">LinkedIn Bio Generator</h2>
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
            <h3 className="text-xl font-bold text-white">Your Information</h3>

            <div>
              <label className="text-sm text-white/60 mb-1 block">Profession/Field</label>
              <input
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                placeholder="e.g., Computer Science Student"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#693def]/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1 block">Years of Experience</label>
              <input
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="e.g., 2+ years"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#693def]/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1 block">Key Skills (comma separated)</label>
              <input
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g., Python, React, Machine Learning"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#693def]/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-1 block">Key Achievements</label>
              <textarea
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                placeholder="e.g., Won 3 hackathons, Published research paper"
                rows={3}
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#693def]/50 focus:outline-none resize-none"
              />
            </div>

            {/* Tone Selector */}
            <div>
              <label className="text-sm text-white/60 mb-2 block">Select Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map(tone => (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedTone === tone
                        ? 'bg-gradient-to-r from-[#693def] to-[#00d4ff] text-white'
                        : 'bg-white/[0.05] border border-white/[0.1] text-white/60 hover:border-white/[0.2]'
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#693def] to-[#00d4ff] text-white font-medium flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50"
            >
              {generating ? (
                <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
              ) : (
                <><Sparkles className="w-5 h-5" /> Generate Bio</>
              )}
            </button>
          </div>

          {/* Output Panel */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Generated Bio</h3>
              {generated && (
                <div className="flex items-center gap-2">
                  <button onClick={handleRegenerate} className="p-2 rounded-lg hover:bg-white/[0.08] transition-colors" title="Regenerate">
                    <RefreshCw className="w-4 h-4 text-white/60" />
                  </button>
                  <CopyButton text={generated} onCopy={() => addToast('Copied to clipboard!', 'success')} />
                </div>
              )}
            </div>

            <GlassCard className="min-h-[300px]">
              {!generated && !generating && (
                <div className="flex flex-col items-center justify-center h-[300px] text-center">
                  <Linkedin className="w-12 h-12 text-white/10 mb-4" />
                  <p className="text-[#aeadae]">Fill in your details and click Generate to create your LinkedIn bio.</p>
                </div>
              )}

              {generating && (
                <div className="space-y-3 py-4">
                  {[...Array(4)].map((_, i) => (
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
                  <AITypewriter text={generated} speed={15} trigger={true} />
                </motion.div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
