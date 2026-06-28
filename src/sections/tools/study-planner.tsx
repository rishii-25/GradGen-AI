import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { CopyButton } from '@/components/copy-button';

interface StudyProps { onClose: () => void; addToast: (msg: string, type: 'success' | 'error' | 'info') => void; }

const examTypes: Record<string, string[]> = {
  'JEE': ['Physics', 'Chemistry', 'Mathematics'],
  'GRE': ['Verbal Reasoning', 'Quantitative Reasoning', 'Analytical Writing'],
  'GATE': ['Engineering Mathematics', 'Technical Core', 'General Aptitude'],
  'CAT': ['Quantitative Aptitude', 'Verbal Ability', 'Data Interpretation', 'Logical Reasoning'],
  'Semester': ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4', 'Subject 5'],
};

export function StudyPlanner({ onClose, addToast }: StudyProps) {
  const [exam, setExam] = useState('Semester');
  const [days, setDays] = useState(30);
  const [hours, setHours] = useState(6);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      const subs = subjects.length > 0 ? subjects : examTypes[exam] || ['Subject 1', 'Subject 2', 'Subject 3'];
      const plan: string[] = [];
      const weeks = Math.ceil(days / 7);

      plan.push(`# ${exam} Study Plan — ${days} Days\n`);
      plan.push(`**Daily Study Hours:** ${hours} hours/day`);
      plan.push(`**Subjects:** ${subs.join(', ')}\n`);

      // Week-by-week breakdown
      for (let w = 1; w <= weeks; w++) {
        plan.push(`## Week ${w} (Days ${(w - 1) * 7 + 1}-${Math.min(w * 7, days)})`);
        const weekGoal = w <= weeks / 3 ? 'Foundation & Concepts' : w <= (2 * weeks) / 3 ? 'Practice & Problem Solving' : 'Revision & Mock Tests';
        plan.push(`**Focus:** ${weekGoal}\n`);

        const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        weekDays.forEach((day, i) => {
          const dayNum = (w - 1) * 7 + i + 1;
          if (dayNum > days) return;
          const subject = subs[i % subs.length];
          const timeSlots = [
            `9:00-11:00 AM — ${subject}: Theory/Concepts`,
            `11:30-1:30 PM — ${subs[(i + 1) % subs.length]}: Practice Problems`,
            `2:30-4:30 PM — ${subject}: Notes & Revision`,
            `5:00-6:00 PM — Mock Test / Previous Year Papers`,
          ].slice(0, Math.ceil(hours / 2));
          plan.push(`${day} (Day ${dayNum}):\n${timeSlots.map(s => `- ${s}`).join('\n')}\n`);
        });
      }

      plan.push(`## Final Week Tips\n- Focus on weak areas\n- Solve previous year papers daily\n- Take full-length mock tests\n- Revise formulas and key concepts\n- Stay hydrated and get 7-8 hours sleep`);

      setSchedule(plan);
      setGenerating(false);
    }, 1500);
  };

  const textSchedule = schedule.join('\n');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto">
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[800px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-[#ffba00]" /><h2 className="text-base font-medium text-white">AI Study Planner</h2></div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08]"><X className="w-5 h-5 text-white/60" /></button>
        </div>
      </div>
      <div className="max-w-[800px] mx-auto px-5 py-8">
        <div className="flex flex-wrap gap-3 mb-6 items-end">
          <select value={exam} onChange={e => { setExam(e.target.value); setSubjects(examTypes[e.target.value] || []); }} className="bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white focus:border-[#ffba00]/50 focus:outline-none">
            {Object.keys(examTypes).map(e => <option key={e} value={e} className="bg-[#111]">{e}</option>)}
          </select>
          <div>
            <label className="text-[10px] text-white/40 block mb-1">Days Left</label>
            <input type="number" min={1} max={365} value={days} onChange={e => setDays(Number(e.target.value))} className="w-24 bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2 text-sm text-white" />
          </div>
          <div>
            <label className="text-[10px] text-white/40 block mb-1">Hours/Day</label>
            <input type="number" min={1} max={16} value={hours} onChange={e => setHours(Number(e.target.value))} className="w-24 bg-white/[0.05] border border-white/[0.1] rounded-xl px-3 py-2 text-sm text-white" />
          </div>
          <button onClick={generate} disabled={generating} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ffba00] to-[#f90082] text-white font-medium flex items-center gap-2 hover:brightness-110 transition-all disabled:opacity-50">
            {generating ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /></> : <><Sparkles className="w-4 h-4" /> Plan</>}
          </button>
          {schedule.length > 0 && <CopyButton text={textSchedule} onCopy={() => addToast('Copied!', 'success')} />}
        </div>

        <div className="space-y-4">
          {generating && <div className="space-y-3">{[...Array(6)].map((_, i) => <GlassCard key={i} className="!p-4"><div className="space-y-2">{[...Array(4)].map((_, j) => <div key={j} className="h-3 rounded bg-white/[0.05] animate-shimmer" style={{ width: `${50 + Math.random() * 50}%` }} />)}</div></GlassCard>)}</div>}
          {schedule.length > 0 && !generating && schedule.map((section, i) => {
            if (section.startsWith('#')) {
              return <h3 key={i} className={`font-bold text-white mt-6 ${section.startsWith('##') ? 'text-lg' : 'text-2xl'}`}>{section.replace(/^#+\s/, '')}</h3>;
            }
            if (section.startsWith('**')) {
              return <p key={i} className="text-sm text-[#00d4ff] font-medium">{section.replace(/\*\*/g, '')}</p>;
            }
            if (section.startsWith('-')) {
              return <div key={i} className="flex items-start gap-2 ml-4"><Clock className="w-3 h-3 text-white/40 mt-1 flex-shrink-0" /><p className="text-sm text-white/70">{section.replace(/^- /, '')}</p></div>;
            }
            return <p key={i} className="text-sm text-white/80 whitespace-pre-line">{section}</p>;
          })}
          {schedule.length === 0 && !generating && <div className="flex flex-col items-center justify-center py-20"><Calendar className="w-12 h-12 text-white/10 mb-4" /><p className="text-[#aeadae]">Configure your exam and generate a study plan.</p></div>}
        </div>
      </div>
    </motion.div>
  );
}
