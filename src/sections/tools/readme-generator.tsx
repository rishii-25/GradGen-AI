import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Github, Sparkles, RefreshCw } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { CopyButton } from '@/components/copy-button';
import { AITypewriter } from '@/components/ai-typewriter';

interface ReadmeProps { onClose: () => void; addToast: (msg: string, type: 'success' | 'error' | 'info') => void; }

const templates: Record<string, (name: string, desc: string, lang: string) => string> = {
  minimal: (name, desc, lang) => `# ${name || 'Project Name'}\n\n${desc || 'A brief description of what this project does.'}\n\n## Tech Stack\n\n- ${lang || 'Language'}\n\n## Getting Started\n\n\`\`\`bash\ngit clone https://github.com/username/${name?.toLowerCase().replace(/\s/g, '-') || 'repo'}.cd\ncd ${name?.toLowerCase().replace(/\s/g, '-') || 'repo'}\n\`\`\`\n\n## Features\n\n- Feature 1\n- Feature 2\n- Feature 3\n\n## License\n\nMIT`,
  detailed: (name, desc, lang) => `# ${name || 'Project Name'}\n\n<div align="center">\n\n[![Stars](https://img.shields.io/github/stars/username/repo?style=flat-square)]()\n[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)]()\n\n${desc || 'A comprehensive project description.'}\n\n[Demo](https://demo-link.com) · [Documentation](https://docs-link.com) · [Report Bug](https://github.com/username/repo/issues)\n\n</div>\n\n## Table of Contents\n\n- [About](#about)\n- [Features](#features)\n- [Tech Stack](#tech-stack)\n- [Installation](#installation)\n- [Usage](#usage)\n- [API Reference](#api-reference)\n- [Contributing](#contributing)\n- [License](#license)\n\n## About\n\n${desc || 'Describe your project in detail here.'}\n\n## Features\n\n- Feature 1: Description\n- Feature 2: Description\n- Feature 3: Description\n- Feature 4: Description\n\n## Tech Stack\n\n- **Frontend:** ${lang === 'JavaScript' || lang === 'TypeScript' ? 'React, Tailwind CSS' : lang || 'React'}\n- **Backend:** Node.js, Express\n- **Database:** MongoDB/PostgreSQL\n- **Deployment:** Vercel, AWS\n\n## Installation\n\n\`\`\`bash\n# Clone the repository\ngit clone https://github.com/username/${name?.toLowerCase().replace(/\s/g, '-') || 'repo'}.git\n\n# Navigate to project\ncd ${name?.toLowerCase().replace(/\s/g, '-') || 'repo'}\n\n# Install dependencies\nnpm install\n\n# Start development server\nnpm run dev\n\`\`\`\n\n## Usage\n\n\`\`\`bash\nnpm start\n\`\`\`\n\n## API Reference\n\n| Method | Endpoint | Description |\n|--------|----------|-------------|\n| GET | /api/items | Get all items |\n| POST | /api/items | Create item |\n| PUT | /api/items/:id | Update item |\n| DELETE | /api/items/:id | Delete item |\n\n## Contributing\n\n1. Fork the repository\n2. Create your feature branch (\`git checkout -b feature/amazing\`)\n3. Commit changes (\`git commit -m 'Add amazing feature'\`)\n4. Push to branch (\`git push origin feature/amazing\`)\n5. Open a Pull Request\n\n## License\n\nThis project is licensed under the MIT License.`,
  profile: (_name, desc, lang) => `# Hi there! I'm [Your Name] ${desc || ''}\n\n## About Me\n\nI'm a passionate ${lang || 'developer'} who loves building impactful software.\n\n## Tech Stack\n\n\`\`\`\nLanguages:  JavaScript | Python | Java | C++\nFrontend:   React | Vue | Next.js | Tailwind CSS\nBackend:    Node.js | Express | Django | FastAPI\nDatabase:   MongoDB | PostgreSQL | Redis\nDevOps:     Docker | Kubernetes | AWS | CI/CD\n\`\`\`\n\n## GitHub Stats\n\n![Your GitHub stats](https://github-readme-stats.vercel.app/api?username=yourusername&show_icons=true&theme=dark)\n\n## Top Projects\n\n- [Project 1](https://github.com/username/repo1) - Description\n- [Project 2](https://github.com/username/repo2) - Description\n- [Project 3](https://github.com/username/repo3) - Description\n\n## Connect With Me\n\n- LinkedIn: [Your Profile](https://linkedin.com/in/username)\n- Twitter: [@username](https://twitter.com/username)\n- Email: your.email@example.com`,
};

export function ReadmeGenerator({ onClose, addToast }: ReadmeProps) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [lang, setLang] = useState('');
  const [style, setStyle] = useState('detailed');
  const [generated, setGenerated] = useState('');
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true); setGenerated('');
    setTimeout(() => { setGenerated(templates[style](name, desc, lang)); setGenerating(false); }, 1200);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3"><Github className="w-5 h-5 text-white" /><h2 className="text-base font-medium text-white">GitHub README Generator</h2></div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08]"><X className="w-5 h-5 text-white/60" /></button>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto px-5 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Project Details</h3>
            <div className="flex gap-2">
              {[{ id: 'minimal', label: 'Minimal' }, { id: 'detailed', label: 'Detailed' }, { id: 'profile', label: 'Profile' }].map(s => (
                <button key={s.id} onClick={() => setStyle(s.id)} className={`px-4 py-2 rounded-full text-sm transition-all ${style === s.id ? 'bg-white text-[#0c0b0e] font-medium' : 'bg-white/[0.05] border border-white/[0.1] text-white/60'}`}>{s.label}</button>
              ))}
            </div>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Project/Profile Name" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none" />
            <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Description" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none resize-none" />
            <input value={lang} onChange={e => setLang(e.target.value)} placeholder="Primary Language (e.g., JavaScript, Python)" className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none" />
            <button onClick={generate} disabled={generating} className="w-full py-3 rounded-xl bg-white text-[#0c0b0e] font-medium flex items-center justify-center gap-2 hover:bg-white/90 transition-all disabled:opacity-50">
              {generating ? <><div className="w-5 h-5 border-2 border-[#0c0b0e]/30 border-t-[#0c0b0e] rounded-full animate-spin" /> Generating...</> : <><Sparkles className="w-5 h-5" /> Generate README</>}
            </button>
          </div>
          <div>
            <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold text-white">README.md</h3>{generated && <div className="flex gap-2"><button onClick={generate} className="p-2 rounded-lg hover:bg-white/[0.08]"><RefreshCw className="w-4 h-4 text-white/60" /></button><CopyButton text={generated} onCopy={() => addToast('Copied!', 'success')} /></div>}</div>
            <GlassCard className="min-h-[400px] !bg-[#111] font-mono">
              {generating && <div className="space-y-3 py-4">{[...Array(8)].map((_, i) => <div key={i} className="h-3 rounded bg-white/[0.05] animate-shimmer" style={{ width: `${50 + Math.random() * 50}%` }} />)}</div>}
              {generated && !generating && <div className="text-sm text-white/90 whitespace-pre-line leading-relaxed"><AITypewriter text={generated} speed={8} trigger={true} /></div>}
              {!generated && !generating && <div className="flex flex-col items-center justify-center h-[400px]"><Github className="w-12 h-12 text-white/10 mb-4" /><p className="text-[#aeadae]">Fill details to generate README.</p></div>}
            </GlassCard>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
