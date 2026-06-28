import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, FileText, Sparkles, BookOpen, Layers, Grid3X3 } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { CopyButton } from '@/components/copy-button';
import { AITypewriter } from '@/components/ai-typewriter';

interface NotesProps { onClose: () => void; addToast: (msg: string, type: 'success' | 'error' | 'info') => void; }

const notesTemplates: Record<string, Record<string, string>> = {
  'machine learning': {
    short: `# Machine Learning — Quick Notes\n\n## Core Concepts\n- **Supervised Learning**: Training with labeled data (classification, regression)\n- **Unsupervised Learning**: Finding patterns in unlabeled data (clustering, PCA)\n- **Reinforcement Learning**: Learning through rewards/penalties\n\n## Key Algorithms\n| Algorithm | Type | Use Case |\n|-----------|------|----------|\n| Linear Regression | Supervised | Continuous predictions |\n| Logistic Regression | Supervised | Binary classification |\n| Random Forest | Supervised | General classification |\n| K-Means | Unsupervised | Customer segmentation |\n| SVM | Supervised | High-dimensional data |\n\n## Important Formulas\n- Cost Function: J = (1/m) * sum of squared errors\n- Gradient Descent: theta = theta - alpha * gradient\n- Accuracy = (TP + TN) / (TP + TN + FP + FN)`,
    detailed: `# Machine Learning — Comprehensive Notes\n\n## 1. Introduction to ML\nMachine Learning is a subset of AI that enables systems to learn from data without explicit programming.\n\n### Types of ML:\n1. **Supervised Learning** — Uses labeled training data\n   - Classification: Predict categories (spam/not spam)\n   - Regression: Predict continuous values (house prices)\n\n2. **Unsupervised Learning** — Works with unlabeled data\n   - Clustering: Group similar data points\n   - Dimensionality Reduction: Feature extraction\n\n3. **Reinforcement Learning** — Agent learns via rewards\n   - Applications: Game playing, robotics, autonomous driving\n\n## 2. Data Preprocessing\n- Missing value imputation (mean, median, mode)\n- Feature scaling: Standardization, Normalization\n- Encoding categorical variables: One-hot, Label encoding\n- Train-test split: Typically 80-20 or 70-30\n\n## 3. Model Evaluation\n- Confusion Matrix: TP, FP, TN, FN\n- Precision = TP / (TP + FP)\n- Recall = TP / (TP + FN)\n- F1-Score = 2 * (Precision * Recall) / (Precision + Recall)\n- Cross-validation: K-fold (typically K=5 or 10)\n\n## 4. Overfitting & Underfitting\n- **Overfitting**: High training accuracy, low test accuracy → Regularization, more data\n- **Underfitting**: Low accuracy on both → More complex model, feature engineering\n\n## 5. Neural Networks Basics\n- Perceptron: Single-layer neural network\n- Multi-Layer Perceptron (MLP): Deep learning foundation\n- Activation functions: ReLU, Sigmoid, Tanh, Softmax\n- Backpropagation: Algorithm to update weights`,
    flashcards: `Q: What is the difference between supervised and unsupervised learning?\nA: Supervised uses labeled data; unsupervised finds patterns in unlabeled data.\n\nQ: What is overfitting?\nA: Model performs well on training data but poorly on new, unseen data.\n\nQ: What does the cost function measure?\nA: The difference between predicted and actual values.\n\nQ: What is gradient descent?\nA: An optimization algorithm that minimizes the cost function iteratively.\n\nQ: What is cross-validation?\nA: Technique to assess model performance by splitting data into K folds.\n\nQ: What is the F1-score?\nA: Harmonic mean of precision and recall.\n\nQ: What is regularization?\nA: Technique to prevent overfitting by adding a penalty to the loss function.`,
  },
};

const fallbackNotes = (topic: string, format: string) => {
  if (format === 'flashcards') return `Q: What is ${topic}?\nA: ${topic} is a fundamental concept in its field that involves core principles and practical applications.\n\nQ: Why is ${topic} important?\nA: Understanding ${topic} is essential for building expertise and solving real-world problems.\n\nQ: What are the key components of ${topic}?\nA: The main components include foundational theory, practical implementation, and ongoing optimization.\n\nQ: How is ${topic} applied in industry?\nA: ${topic} is used across multiple domains including technology, research, and product development.\n\nQ: What are common challenges in ${topic}?\nA: Common challenges include complexity, scalability, and keeping up with evolving best practices.`;
  if (format === 'short') return `# ${topic} — Quick Notes\n\n## Core Concepts\n- Key concept 1: Definition and importance\n- Key concept 2: How it works\n- Key concept 3: Real-world applications\n\n## Key Points\n| Topic | Summary |\n|-------|---------|\n| Basics | Fundamentals of ${topic}\n| Advanced | Deep dive into complex areas\n| Tools | Common technologies used\n\n## Quick Formulas\n- Formula 1: Core equation\n- Formula 2: Important relationship`;
  return `# ${topic} — Detailed Notes\n\n## 1. Introduction\n${topic} is an essential area of study with wide-ranging applications.\n\n## 2. Core Concepts\n1. **Concept A** — Description and significance\n2. **Concept B** — Implementation details\n3. **Concept C** — Advanced applications\n\n## 3. Methodology\n- Step 1: Foundation setup\n- Step 2: Core implementation\n- Step 3: Testing and validation\n- Step 4: Deployment and optimization\n\n## 4. Best Practices\n- Follow industry standards\n- Document thoroughly\n- Test rigorously\n- Iterate based on feedback`;
};

export function NotesGenerator({ onClose, addToast }: NotesProps) {
  const [topic, setTopic] = useState('');
  const [format, setFormat] = useState<'short' | 'detailed' | 'flashcards'>('short');
  const [generated, setGenerated] = useState('');
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true); setGenerated('');
    setTimeout(() => {
      const topicKey = Object.keys(notesTemplates).find(k => topic.toLowerCase().includes(k));
      setGenerated(topicKey ? notesTemplates[topicKey][format] : fallbackNotes(topic, format));
      setGenerating(false);
    }, 1500);
  };

  const icons = { short: FileText, detailed: BookOpen, flashcards: Layers };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3"><FileText className="w-5 h-5 text-[#00e3a0]" /><h2 className="text-base font-medium text-white">AI Notes Generator</h2></div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08]"><X className="w-5 h-5 text-white/60" /></button>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto px-5 py-8">
        <div className="flex flex-wrap gap-3 mb-6 items-end">
          <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Topic (e.g., Machine Learning)" className="flex-1 min-w-[200px] bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#00e3a0]/50 focus:outline-none" />
          <div className="flex gap-2">
            {([['short', 'Short Notes'], ['detailed', 'Detailed'], ['flashcards', 'Flashcards']] as const).map(([f, label]) => {
              const Icon = icons[f];
              return <button key={f} onClick={() => setFormat(f)} className={`px-4 py-2 rounded-full text-sm flex items-center gap-1 transition-all ${format === f ? 'bg-gradient-to-r from-[#00e3a0] to-[#00b97b] text-white' : 'bg-white/[0.05] border border-white/[0.1] text-white/60'}`}><Icon className="w-3.5 h-3.5" /> {label}</button>;
            })}
          </div>
          <button onClick={generate} disabled={generating || !topic} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00e3a0] to-[#00b97b] text-white font-medium flex items-center gap-2 hover:brightness-110 transition-all disabled:opacity-50">
            {generating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /></> : <><Sparkles className="w-4 h-4" /> Generate</>}
          </button>
        </div>

        <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold text-white">Generated Notes</h3>{generated && <CopyButton text={generated} onCopy={() => addToast('Copied!', 'success')} />}</div>
        <GlassCard className="min-h-[400px]">
          {generating && <div className="space-y-3 py-4">{[...Array(10)].map((_, i) => <div key={i} className="h-3 rounded bg-white/[0.05] animate-shimmer" style={{ width: `${50 + Math.random() * 50}%` }} />)}</div>}
          {generated && !generating && <div className="text-sm text-white/90 whitespace-pre-line leading-relaxed"><AITypewriter text={generated} speed={6} trigger={true} /></div>}
          {!generated && !generating && <div className="flex flex-col items-center justify-center h-[400px]"><Grid3X3 className="w-12 h-12 text-white/10 mb-4" /><p className="text-[#aeadae]">Enter a topic and select a format to generate notes.</p></div>}
        </GlassCard>
      </div>
    </motion.div>
  );
}
