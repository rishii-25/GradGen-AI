import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Code2, Sparkles, Bug, Lightbulb } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { CopyButton } from '@/components/copy-button';
import { AITypewriter } from '@/components/ai-typewriter';

interface CodeProps { onClose: () => void; addToast: (msg: string, type: 'success' | 'error' | 'info') => void; }

const explanations: Record<string, Record<string, string>> = {
  python: {
    explain: `**Line-by-line Explanation:**\n\n1. \`def calculate_average(numbers):\` — Defines a function named calculate_average that takes a list of numbers as input.\n\n2. \`total = sum(numbers)\` — Uses Python's built-in sum() to add all numbers in the list.\n\n3. \`count = len(numbers)\` — Gets the count of elements using len().\n\n4. \`return total / count\` — Returns the division result (the average).\n\n**Key Concepts:** Functions, built-in methods (sum, len), return statements, division operation.`,
    debug: `**Bugs Found:**\n\n1. **Division by Zero Error** — If numbers list is empty, len() returns 0 causing ZeroDivisionError.\n\n**Fix:** Add a guard clause:\n\n\`\`\`python\ndef calculate_average(numbers):\n    if not numbers:\n        return 0\n    total = sum(numbers)\n    count = len(numbers)\n    return total / count\n\`\`\`\n\n**Other Improvements:**\n- Add type hints: \`def calculate_average(numbers: list[float]) -> float:\`\n- Add docstring for documentation\n- Consider handling non-numeric inputs with try-except`,
  },
  javascript: {
    explain: `**Line-by-line Explanation:**\n\n1. \`const fetchData = async () => {\` — Defines an async arrow function that can use await.\n\n2. \`const response = await fetch('/api/data');\` — Makes HTTP GET request, pauses execution until response.\n\n3. \`const data = await response.json();\` — Parses response body as JSON.\n\n4. \`return data;\` — Returns parsed data to caller.\n\n**Key Concepts:** Async/await, fetch API, Promise handling, JSON parsing.`,
    debug: `**Bugs Found:**\n\n1. **No error handling** — Network failure or invalid JSON will crash.\n\n**Fix:** Add try-catch and response validation:\n\n\`\`\`javascript\nconst fetchData = async () => {\n  try {\n    const response = await fetch('/api/data');\n    if (!response.ok) {\n      throw new Error(\`HTTP \${response.status}\`);\n    }\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Fetch failed:', error);\n    return null;\n  }\n};\n\`\`\`\n\n**Other Improvements:**\n- Add timeout handling\n- Add retry logic with exponential backoff\n- Validate response data structure`,
  },
  java: {
    explain: `**Line-by-line Explanation:**\n\n1. \`public class Main {\` — Declares a public class named Main.\n\n2. \`public static void main(String[] args) {\` — Entry point method, static so it can run without object.\n\n3. \`System.out.println("Hello");\` — Prints text to console with newline.\n\n**Key Concepts:** Class declaration, main method, static members, System I/O.`,
    debug: `**Issues Found:**\n\n1. **No issues** — Simple Hello World is correct.\n\n**Improvements:**\n- Add command-line argument handling: \`if (args.length > 0)\`\n- Use logger instead of System.out\n- Add exception handling for robustness`,
  },
};

export function CodeExplainer({ onClose, addToast }: CodeProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [mode, setMode] = useState<'explain' | 'debug'>('explain');
  const [generated, setGenerated] = useState('');
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    if (!code.trim()) return;
    setGenerating(true); setGenerated('');
    setTimeout(() => {
      setGenerated(explanations[language]?.[mode] || explanations.python[mode]);
      setGenerating(false);
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3"><Code2 className="w-5 h-5 text-[#693def]" /><h2 className="text-base font-medium text-white">Code Explainer & Debugger</h2></div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08]"><X className="w-5 h-5 text-white/60" /></button>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto px-5 py-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {['python', 'javascript', 'java', 'cpp', 'go'].map(l => (
            <button key={l} onClick={() => setLanguage(l)} className={`px-4 py-2 rounded-full text-sm transition-all ${language === l ? 'bg-gradient-to-r from-[#693def] to-[#00d4ff] text-white' : 'bg-white/[0.05] border border-white/[0.1] text-white/60'}`}>{l.toUpperCase()}</button>
          ))}
          <div className="ml-auto flex gap-2">
            <button onClick={() => setMode('explain')} className={`px-4 py-2 rounded-full text-sm flex items-center gap-1 transition-all ${mode === 'explain' ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30' : 'bg-white/[0.05] border border-white/[0.1] text-white/60'}`}><Lightbulb className="w-3.5 h-3.5" /> Explain</button>
            <button onClick={() => setMode('debug')} className={`px-4 py-2 rounded-full text-sm flex items-center gap-1 transition-all ${mode === 'debug' ? 'bg-[#f90082]/20 text-[#f90082] border border-[#f90082]/30' : 'bg-white/[0.05] border border-white/[0.1] text-white/60'}`}><Bug className="w-3.5 h-3.5" /> Debug</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <textarea value={code} onChange={e => setCode(e.target.value)} rows={20} placeholder={`Paste your ${language} code here...`}
              className="w-full bg-[#111] border border-white/[0.1] rounded-xl p-4 text-sm text-white placeholder:text-white/30 focus:border-[#693def]/50 focus:outline-none resize-none font-mono" />
            <button onClick={generate} disabled={generating || !code.trim()} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#693def] to-[#00d4ff] text-white font-medium flex items-center justify-center gap-2 hover:brightness-110 transition-all disabled:opacity-50">
              {generating ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Analyzing...</> : <><Sparkles className="w-5 h-5" /> {mode === 'explain' ? 'Explain Code' : 'Debug Code'}</>}
            </button>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{mode === 'explain' ? 'Explanation' : 'Debug Report'}</h3>
              {generated && <CopyButton text={generated} onCopy={() => addToast('Copied!', 'success')} />}
            </div>
            <GlassCard className="min-h-[500px]">
              {generating && <div className="space-y-3 py-4">{[...Array(8)].map((_, i) => <div key={i} className="h-3 rounded bg-white/[0.05] animate-shimmer" style={{ width: `${60 + Math.random() * 40}%` }} />)}</div>}
              {generated && !generating && <div className="text-sm text-white/90 whitespace-pre-line leading-relaxed"><AITypewriter text={generated} speed={8} trigger={true} /></div>}
              {!generated && !generating && <div className="flex flex-col items-center justify-center h-[500px]"><Code2 className="w-12 h-12 text-white/10 mb-4" /><p className="text-[#aeadae]">Paste code and click analyze.</p></div>}
            </GlassCard>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
