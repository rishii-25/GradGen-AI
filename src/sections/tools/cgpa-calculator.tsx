import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { X, Calculator, Plus, Trash2, TrendingUp } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';

interface Semester {
  id: string;
  name: string;
  sgpa: string;
  credits: string;
}

interface CGPACalculatorProps {
  onClose: () => void;
  addToast?: (msg: string, type: 'success' | 'error' | 'info') => void;
}

export function CGPACalculator({ onClose, addToast: _addToast }: CGPACalculatorProps) {
  // _addToast available for future use
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: '1', name: 'Semester 1', sgpa: '', credits: '' },
    { id: '2', name: 'Semester 2', sgpa: '', credits: '' },
  ]);
  const [targetCGPA, setTargetCGPA] = useState('');

  const addSemester = () => {
    const newSem: Semester = {
      id: Date.now().toString(),
      name: `Semester ${semesters.length + 1}`,
      sgpa: '',
      credits: '',
    };
    setSemesters(prev => [...prev, newSem]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length <= 1) return;
    setSemesters(prev => prev.filter(s => s.id !== id));
  };

  const updateSemester = (id: string, field: 'sgpa' | 'credits', value: string) => {
    setSemesters(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const { cgpa, totalCredits, percentage, validSemesters } = useMemo(() => {
    const valid = semesters.filter(s => parseFloat(s.sgpa) > 0 && parseFloat(s.credits) > 0);
    const totalPoints = valid.reduce((sum, s) => sum + parseFloat(s.sgpa || '0') * parseFloat(s.credits || '0'), 0);
    const credits = valid.reduce((sum, s) => sum + parseFloat(s.credits || '0'), 0);
    const c = credits > 0 ? totalPoints / credits : 0;
    return {
      cgpa: c,
      totalCredits: credits,
      percentage: c > 0 ? (c * 9.5).toFixed(2) : '0',
      validSemesters: valid.length,
    };
  }, [semesters]);

  const getGradeClass = (value: number) => {
    if (value >= 9) return 'text-[#00e3a0]';
    if (value >= 7) return 'text-[#00d4ff]';
    if (value >= 5) return 'text-[#ffba00]';
    return 'text-[#f90082]';
  };

  const getGradeLabel = (value: number) => {
    if (value >= 9) return 'Outstanding';
    if (value >= 8) return 'Excellent';
    if (value >= 7) return 'Good';
    if (value >= 6) return 'Average';
    if (value >= 5) return 'Pass';
    return 'Improve';
  };

  // Chart data for SGPA visualization

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] bg-[#0c0b0e] overflow-y-auto"
    >
      <div className="sticky top-0 z-10 bg-[#111]/95 backdrop-blur-lg border-b border-white/[0.08]">
        <div className="max-w-[900px] mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calculator className="w-5 h-5 text-[#f90082]" />
            <h2 className="text-base font-medium text-white">CGPA Calculator</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/[0.08] transition-colors">
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Semester Details</h3>
              <button onClick={addSemester} className="flex items-center gap-1 text-sm text-[#f90082] hover:text-[#ff4dff]">
                <Plus className="w-4 h-4" /> Add Semester
              </button>
            </div>

            <div className="space-y-3">
              {semesters.map((sem) => (
                <GlassCard key={sem.id} className="!p-4 !rounded-xl flex items-center gap-4">
                  <span className="text-sm font-medium text-white/40 w-28 flex-shrink-0">{sem.name}</span>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    value={sem.sgpa}
                    onChange={(e) => updateSemester(sem.id, 'sgpa', e.target.value)}
                    placeholder="SGPA"
                    className="flex-1 min-w-0 bg-white/[0.05] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#f90082]/50 focus:outline-none"
                  />
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={sem.credits}
                    onChange={(e) => updateSemester(sem.id, 'credits', e.target.value)}
                    placeholder="Credits"
                    className="flex-1 min-w-0 bg-white/[0.05] border border-white/[0.1] rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-[#f90082]/50 focus:outline-none"
                  />
                  <button
                    onClick={() => removeSemester(sem.id)}
                    disabled={semesters.length <= 1}
                    className="p-2 rounded-lg hover:bg-white/[0.08] transition-colors disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4 text-[#f90082]" />
                  </button>
                </GlassCard>
              ))}
            </div>

            {/* Target CGPA */}
            <div className="mt-6">
              <label className="text-sm text-white/60 mb-2 block">Target CGPA (for prediction)</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.01"
                value={targetCGPA}
                onChange={(e) => setTargetCGPA(e.target.value)}
                placeholder="e.g., 8.5"
                className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#f90082]/50 focus:outline-none"
              />
              {targetCGPA && cgpa > 0 && (
                <p className={`text-sm mt-2 ${parseFloat(targetCGPA) <= cgpa ? 'text-[#00e3a0]' : 'text-[#ffba00]'}`}>
                  {parseFloat(targetCGPA) <= cgpa
                    ? `You're exceeding your target by ${(cgpa - parseFloat(targetCGPA)).toFixed(2)} points!`
                    : `You need ${(parseFloat(targetCGPA) - cgpa).toFixed(2)} more points to reach your target.`}
                </p>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div className="space-y-5">
            {/* CGPA Circle */}
            <GlassCard className="text-center">
              <h4 className="text-sm text-white/60 mb-4">Cumulative GPA</h4>
              <div className="relative w-36 h-36 mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                  <motion.circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke="url(#cgpaGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(cgpa / 10) * 264} 264`}
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 264 - (cgpa / 10) * 264 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="cgpaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f90082" />
                      <stop offset="100%" stopColor="#00e3a0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-bold ${getGradeClass(cgpa)}`}>
                    {cgpa > 0 ? cgpa.toFixed(2) : '--'}
                  </span>
                  <span className="text-xs text-white/40">/ 10.0</span>
                </div>
              </div>
              {cgpa > 0 && (
                <p className={`text-sm font-medium mt-3 ${getGradeClass(cgpa)}`}>
                  {getGradeLabel(cgpa)}
                </p>
              )}
            </GlassCard>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <GlassCard className="!p-4 text-center">
                <p className="text-xs text-white/40 mb-1">Percentage</p>
                <p className="text-2xl font-bold text-[#00d4ff]">{percentage}%</p>
              </GlassCard>
              <GlassCard className="!p-4 text-center">
                <p className="text-xs text-white/40 mb-1">Total Credits</p>
                <p className="text-2xl font-bold text-white">{totalCredits}</p>
              </GlassCard>
            </div>

            {/* SGPA Chart */}
            <GlassCard className="!p-4">
              <h4 className="text-sm text-white/60 mb-3">SGPA Trends</h4>
              <div className="flex items-end gap-2 h-32">
                {semesters.map((sem, i) => {
                  const sgpa = parseFloat(sem.sgpa) || 0;
                  const height = sgpa > 0 ? (sgpa / 10) * 100 : 5;
                  return (
                    <div key={sem.id} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] text-white/40">{sgpa > 0 ? sgpa.toFixed(1) : ''}</span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="w-full rounded-t-md"
                        style={{
                          background: `linear-gradient(to top, ${sgpa >= 8 ? '#00e3a0' : sgpa >= 6 ? '#00d4ff' : '#f90082'}, transparent)`,
                          minHeight: sgpa > 0 ? '4px' : '4px',
                          opacity: sgpa > 0 ? 1 : 0.2,
                        }}
                      />
                      <span className="text-[9px] text-white/30">S{i + 1}</span>
                    </div>
                  );
                })}
              </div>
            </GlassCard>

            {/* Grade Prediction */}
            {targetCGPA && cgpa > 0 && (
              <GlassCard className="!p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-[#00e3a0]" />
                  <h4 className="text-sm font-medium text-white">Grade Prediction</h4>
                </div>
                <p className="text-xs text-[#aeadae]">
                  Based on your current trajectory of {cgpa.toFixed(2)} CGPA across {validSemesters} semesters,
                  {parseFloat(targetCGPA) > cgpa
                    ? ` you need to maintain an average SGPA of ${((parseFloat(targetCGPA) * (validSemesters + 1) - cgpa * validSemesters)).toFixed(2)} in upcoming semesters.`
                    : ' you are on track to exceed your goals!'}
                </p>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
